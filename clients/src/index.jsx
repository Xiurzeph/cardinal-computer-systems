import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { Folder, ArrowLeft, Plus, Shield, User as UserIcon } from 'lucide-react';

// ==========================================
//  FIREBASE CONFIGURATION
// ==========================================
// Robustly check for Canvas environment vs Local Machine
const isPreview = typeof __app_id !== 'undefined';
const canvasFirebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

// Fallback to your live keys for local development
const liveFirebaseConfig = {
    apiKey: "AIzaSyC3T-SIQxCSZPd9Vbg7ixDy3hhwfJ5t7rc",
    authDomain: "cardinal-computer-center.firebaseapp.com",
    projectId: "cardinal-computer-center",
    storageBucket: "cardinal-computer-center.firebasestorage.app",
    messagingSenderId: "606626380669",
    appId: "1:606626380669:web:ff374410281763905d6a14",
    measurementId: "G-5SGWF0RT8C"
};

// Use Canvas keys if available, otherwise fallback to local live keys
const app = initializeApp(isPreview && canvasFirebaseConfig.apiKey ? canvasFirebaseConfig : liveFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = isPreview ? __app_id : 'cardinal-portal';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamically set favicon
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = 'https://cardinalcomputersystems.com/cardinal-logo.png';
  }, []);

  // Authentication logic
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Projects Data
  useEffect(() => {
    if (!user) return;

    const projectsRef = collection(db, 'artifacts', appId, 'public', 'data', 'projects');
    
    const unsubscribe = onSnapshot(projectsRef, 
      (snapshot) => {
        const projectData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const generateSampleProject = async () => {
    if (!user) return;
    const projectsRef = collection(db, 'artifacts', appId, 'public', 'data', 'projects');
    await addDoc(projectsRef, {
      name: `Project ${Math.floor(Math.random() * 1000)}`,
      clientName: isAdmin ? "Acme Corp" : "My Business",
      userId: user.uid,
      status: "Active",
      createdAt: new Date().toISOString()
    });
  };

  const deleteProject = async (projectId) => {
    const projectRef = doc(db, 'artifacts', appId, 'public', 'data', 'projects', projectId);
    await deleteDoc(projectRef);
    if (selectedProject?.id === projectId) setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
        <div className="text-[#D92323] text-xl font-bold animate-pulse">Loading Portal...</div>
      </div>
    );
  }

  const displayedProjects = isAdmin 
    ? projects 
    : projects.filter(p => p.userId === user?.uid);

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-[#1A1A1A]">
      <nav className="bg-[#1A1A1A] text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="https://cardinalcomputersystems.com/cardinal-logo.png" 
              alt="Cardinal Computer Systems Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg tracking-wide hidden sm:block">
              Cardinal Computer Systems
            </span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  setSelectedProject(null);
                }}
                className={`flex items-center space-x-2 text-sm px-3 py-1.5 rounded transition-colors ${isAdmin ? 'bg-[#D92323]' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {isAdmin ? <Shield size={16} /> : <UserIcon size={16} />}
                <span className="hidden sm:block">{isAdmin ? 'Admin Mode' : 'Client Mode'}</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-4">
        {selectedProject ? (
          <div className="bg-white rounded-lg shadow p-6">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center text-gray-500 hover:text-[#D92323] mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </button>
            
            <div className="border-b pb-4 mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{selectedProject.name}</h1>
                <p className="text-gray-500">Client: {selectedProject.clientName}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {selectedProject.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Project Details</h3>
                <p className="text-sm text-gray-600">ID: {selectedProject.id}</p>
                <p className="text-sm text-gray-600">Created: {new Date(selectedProject.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <p className="text-sm text-gray-400 italic">No recent activity.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  {isAdmin ? 'All Projects' : 'Your Projects'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {isAdmin ? 'Manage all client portals.' : 'Select a project to view details.'}
                </p>
              </div>
              
              <button 
                onClick={generateSampleProject}
                className="flex items-center bg-[#D92323] hover:bg-red-700 text-white px-4 py-2 rounded shadow transition-colors"
              >
                <Plus size={20} className="mr-2" />
                New Project
              </button>
            </div>

            {displayedProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <Folder size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No projects found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="group bg-white p-6 rounded-lg shadow-sm border-2 border-transparent hover:border-[#D92323] hover:shadow-md transition-all cursor-pointer relative"
                  >
                    <div onClick={() => setSelectedProject(project)}>
                      <div className="flex justify-between items-start mb-4">
                        <Folder className="text-[#D92323] group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {project.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-[#D92323] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">{project.clientName}</p>
                    </div>
                    
                    {isAdmin && (
                       <button 
                         onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                         className="absolute bottom-4 right-4 text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         Delete
                       </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// React 18 Mounting Logic
// We explicitly guard this so it only runs on your local machine, not in the Canvas preview
if (typeof window !== 'undefined' && !isPreview) {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
}