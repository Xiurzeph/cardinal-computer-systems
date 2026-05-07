import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    signInAnonymously
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    onSnapshot, 
    setDoc, 
    updateDoc 
} from 'firebase/firestore';
import { Folder, ArrowLeft, Plus, Shield, User as UserIcon } from 'lucide-react';

// ==========================================
//  ENVIRONMENT CONFIGURATION
// ==========================================
const isPreview = typeof __firebase_config !== 'undefined';
const canvasFirebaseConfig = isPreview ? JSON.parse(__firebase_config) : {};

const liveFirebaseConfig = {
    apiKey: "AIzaSyC3T-SIQxCSZPd9Vbg7ixDy3hhwfJ5t7rc",
    authDomain: "cardinal-computer-center.firebaseapp.com",
    projectId: "cardinal-computer-center",
    storageBucket: "cardinal-computer-center.firebasestorage.app",
    messagingSenderId: "606626380669",
    appId: "1:606626380669:web:ff374410281763905d6a14",
    measurementId: "G-5SGWF0RT8C"
};

const app = initializeApp(isPreview ? canvasFirebaseConfig : liveFirebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const previewAppId = typeof __app_id !== 'undefined' ? __app_id : 'cardinal-tracker';

const CLIENT_PROJECTS = {
    "director@lsfdc.org": "BLDS-WEB-001-REV5",
};

const ADMIN_EMAIL = "xiurzeph112112@gmail.com";

const IS_DEMO_MODE = isPreview || (liveFirebaseConfig.apiKey && liveFirebaseConfig.apiKey.includes("REPLACE"));

const STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    BLOCKED: 'blocked',
    SKIPPED: 'skipped'
};

const STATUS_ORDER = [
    STATUS.TODO,
    STATUS.IN_PROGRESS,
    STATUS.COMPLETED,
    STATUS.BLOCKED,
    STATUS.SKIPPED
];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const initialProjectData = [
    {
        id: "sprint1",
        title: "Sprint 1: Foundation & Identity",
        dates: "Jan 28 - Feb 11",
        goal: "Store infrastructure, security, and visual branding.",
        weeks: [
            {
                id: "w1",
                title: "Week 1: Security & Setup",
                checkIn: "Wed, Feb 4",
                tasks: [
                    { id: "t_dns", title: "Connect Custom Domain (DNS)", note: "" },
                    { id: "t_pay", title: "Configure Shopify Payments & Shipping", note: "" },
                    { id: "t_seo", title: "Technical SEO Basics", note: "" },
                    { id: "t_theme", title: "Initial Theme Installation", note: "" }
                ]
            },
            {
                id: "w2",
                title: "Week 2: Brand Identity",
                checkIn: "Wed, Feb 11",
                tasks: [
                    { id: "t_color", title: "Color Palette Implementation", note: "" },
                    { id: "t_logo", title: "Logo & Sticker Assets Upload", note: "" },
                    { id: "t_media", title: "Homepage Media Sourcing", note: "" },
                    { id: "t_nav", title: "Navigation Menu Structure", note: "" }
                ]
            }
        ]
    }
];

const getProjectDocRef = (targetId) => {
    if (isPreview) {
        return doc(db, 'artifacts', previewAppId, 'public', 'data', 'projects', targetId);
    }
    return doc(db, 'projects', targetId);
};

const LoginScreen = ({ onLogin }) => {
    const [mode, setMode] = useState('client');
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        if (IS_DEMO_MODE) {
            if (isPreview) await signInAnonymously(auth);
            setTimeout(() => onLogin({ email: ADMIN_EMAIL }), 800);
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError("Login failed: " + err.message);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const loginEmail = "director@lsfdc.org";
        if (IS_DEMO_MODE) {
            if (isPreview) await signInAnonymously(auth);
            setTimeout(() => onLogin({ email: loginEmail }), 800);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, loginEmail, password);
        } catch (err) {
            setError("Access Denied. Check credentials.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50">
            <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 border-t-8 border-[#D92323]">
                <div className="text-center mb-8">
                    <img src="https://cardinalcomputersystems.com/cardinal-logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
                    <h1 className="text-3xl font-bold text-[#1A1A1A]">Cardinal CS</h1>
                    <p className="text-gray-500 text-sm mt-1">{mode === 'client' ? "Client Access Portal" : "Admin Login"}</p>
                </div>

                {mode === 'admin' ? (
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-lg transition-all"
                    >
                        Sign in with Google
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#D92323] focus:outline-none" 
                            required 
                            placeholder="Enter access code..." 
                        />
                        <button type="submit" disabled={loading} className="w-full bg-[#1A1A1A] text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors">
                            {loading ? "Verifying..." : "View Dashboard"}
                        </button>
                    </form>
                )}
                {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
                <div className="mt-6 text-center border-t pt-4">
                    <button onClick={() => setMode(mode === 'client' ? 'admin' : 'client')} className="text-xs text-gray-400 hover:text-[#D92323] underline">
                        {mode === 'client' ? "Admin Login" : "Back to Client Access"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ user, onLogout }) => {
    const [plan, setPlan] = useState(initialProjectData);
    const [taskStates, setTaskStates] = useState({});
    const [balanceText, setBalanceText] = useState("");
    const [syncStatus, setSyncStatus] = useState("loading");
    const [activeProjectId, setActiveProjectId] = useState("BLDS-WEB-001-REV5");

    const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    useEffect(() => {
        let targetId = isAdmin ? activeProjectId : (CLIENT_PROJECTS[user.email?.toLowerCase()] || activeProjectId);
        const docRef = getProjectDocRef(targetId);
        
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPlan(data.projectPlan || initialProjectData);
                setTaskStates(data.taskStates || {});
                setBalanceText(data.balanceText || "");
                setSyncStatus("synced");
            } else if (isAdmin) {
                setDoc(docRef, { projectPlan: initialProjectData, taskStates: {}, balanceText: "", createdAt: new Date().toISOString() });
            }
        });
        return () => unsubscribe();
    }, [activeProjectId, isAdmin, user.email]);

    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <header className="bg-white shadow-sm border-b p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="https://cardinalcomputersystems.com/cardinal-logo.png" className="w-10 h-10 object-contain" alt="Logo" />
                        <h1 className="font-bold text-lg">Builds Project Portal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAdmin && (
                            <div className="flex items-center space-x-2 bg-red-50 px-3 py-1.5 rounded text-[#D92323] text-sm font-bold">
                                <Shield size={16} />
                                <span>Admin Mode</span>
                            </div>
                        )}
                        <button onClick={onLogout} className="text-sm text-[#D92323] font-medium hover:underline">Exit Portal</button>
                    </div>
                </div>
            </header>
            <main className="max-w-6xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Folder size={48} className="mx-auto text-[#D92323] mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Project: {activeProjectId}</h2>
                    <p className="text-gray-500">Connected to secure database.</p>
                </div>
            </main>
        </div>
    );
};

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => { 
            setUser(u); 
            setLoading(false); 
        });
        return () => unsub();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    return user ? <Dashboard user={user} onLogout={() => signOut(auth)} /> : <LoginScreen onLogin={setUser} />;
}

if (typeof window !== 'undefined' && !isPreview) {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
}