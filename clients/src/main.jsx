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
    },
    {
        id: "sprint2",
        title: "Sprint 2: Integration & Strategy",
        dates: "Feb 11 - Feb 25",
        goal: "Connecting dropshipping engines and applying Kollab strategy.",
        weeks: [
            {
                id: "w3",
                title: "Week 3: AutoDS Integration",
                checkIn: "Wed, Feb 18",
                tasks: [
                    { id: "t_autods", title: "Connect AutoDS Agent", note: "" },
                    { id: "t_fulfill", title: "Configure Order Fulfillment Automation", note: "" },
                    { id: "t_sync", title: "Inventory Sync Rules Setup", note: "" },
                    { id: "t_price", title: "Pricing Automation Rules", note: "" }
                ]
            },
            {
                id: "w4",
                title: "Week 4: Kollab Strategy",
                checkIn: "Wed, Feb 25",
                tasks: [
                    { id: "t_collec", title: "Collection Page Layouts", note: "" },
                    { id: "t_legal", title: "Legal & Store Policies Setup", note: "" },
                    { id: "t_trust", title: "Trust Badge Implementation", note: "" },
                    { id: "t_cro", title: "Conversion Rate Optimization (Basic)", note: "" }
                ]
            }
        ]
    },
    {
        id: "sprint3",
        title: "Sprint 3: Products & Launch",
        dates: "Feb 25 - Mar 11",
        goal: "Populating the store and preparing for public traffic.",
        weeks: [
            {
                id: "w5",
                title: "Week 5: Product Import (Phase 2)",
                checkIn: "Wed, Mar 4",
                tasks: [
                    { id: "t_res", title: "Niche Product Research", note: "" },
                    { id: "t_imp", title: "AutoDS Product Imports", note: "" },
                    { id: "t_desc", title: "Description Formatting (Kollab Style)", note: "" },
                    { id: "t_img", title: "Image Optimization", note: "" }
                ]
            },
            {
                id: "w6",
                title: "Week 6: QA & Launch",
                checkIn: "Wed, Mar 11",
                tasks: [
                    { id: "t_mob", title: "Mobile Responsiveness Check", note: "" },
                    { id: "t_test", title: "Test Orders (End-to-End)", note: "" },
                    { id: "t_pg", title: "Payment Gateway Verification", note: "" },
                    { id: "t_live", title: "GO LIVE 🚀", note: "" }
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
    const [lockoutTime, setLockoutTime] = useState(0);
    const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';

    useEffect(() => {
        const storedLockout = parseInt(localStorage.getItem('auth_lockout_until') || '0');
        if (storedLockout > Date.now()) {
            setLockoutTime(storedLockout);
        }
    }, []);

    useEffect(() => {
        if (lockoutTime > 0) {
            const timer = setInterval(() => {
                if (Date.now() > lockoutTime) {
                    setLockoutTime(0);
                    localStorage.removeItem('auth_lockout_until');
                    localStorage.removeItem('auth_attempts');
                    setError(null);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [lockoutTime]);

    const switchMode = (newMode) => {
        setMode(newMode);
        setError(null);
        setPassword("");
    };

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
            console.error("Google Login Error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError("Login cancelled.");
            } else if (err.code === 'auth/unauthorized-domain' || err.message.includes('unauthorized domain')) {
                setError("Domain not authorized. Please add this domain to Firebase Console > Auth > Settings > Authorized Domains.");
            } else {
                setError("Google Sign-In failed: " + err.message);
            }
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'client' && lockoutTime > Date.now()) {
            const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
            setError(`Too many attempts. Please wait ${remaining}s.`);
            return;
        }

        setLoading(true);
        setError(null);

        const loginEmail = "director@lsfdc.org";

        if (IS_DEMO_MODE) {
            if (isPreview) await signInAnonymously(auth);
            setTimeout(() => onLogin({ email: loginEmail || "demo@user.com" }), 800);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, loginEmail, password);
            localStorage.removeItem('auth_attempts');
            localStorage.removeItem('auth_lockout_until');
        } catch (err) {
            console.error("Login Error:", err);
            setLoading(false);

            const currentAttempts = parseInt(localStorage.getItem('auth_attempts') || '0') + 1;
            localStorage.setItem('auth_attempts', currentAttempts);

            if (currentAttempts >= 5) {
                const newLockout = Date.now() + 300000;
                setLockoutTime(newLockout);
                localStorage.setItem('auth_lockout_until', newLockout);
                setError("Too many failed attempts. Locked for 5 minutes.");
            } else {
                setError(`Access Denied. Check credentials. (${5 - currentAttempts} attempts remaining)`);
            }
        }
    };

    const isLocked = mode === 'client' && lockoutTime > Date.now();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 border-t-8 border-cardinal-red">
                <div className="text-center mb-8">
                    <img src="https://cardinalcomputersystems.com/cardinal-logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
                    <h1 className="text-3xl font-bold text-cardinal-black">Cardinal CS</h1>
                    <p className="text-gray-500 text-sm mt-1">{mode === 'client' ? "Client Access Portal" : "Admin Login"}</p>
                </div>

                {isFileProtocol && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-xs text-left">
                        <p className="font-bold">⚠️ Local File Detected</p>
                        <p>Firebase Authentication will NOT work when opening the file directly (file://). Please upload this file to a web host (like GitHub Pages) or run a local server.</p>
                    </div>
                )}

                {mode === 'admin' ? (
                    <div className="mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-lg transition-all shadow-sm hover:shadow-md"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Sign in with Google
                        </button>
                        {error && <div className="bg-red-50 border border-red-200 text-cardinal-red text-xs mt-4 p-3 rounded text-center">{error}</div>}
                        <p className="text-xs text-gray-400 text-center mt-4">Restricted to authorized administrators.</p>
                        <p className="text-[10px] text-gray-300 text-center mt-2">Note: Disable AdBlockers if login fails.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Access Code
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-cardinal-red focus:outline-none" required disabled={isLocked || loading} placeholder="Enter your access code..." />
                            {error && <p className="text-cardinal-red text-sm mt-2 font-bold">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading || isLocked}
                            className={`w-full text-white font-bold py-3 rounded transition-colors disabled:opacity-50 ${isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-cardinal-black hover:bg-gray-800'}`}
                        >
                            {loading ? "Verifying..." : (isLocked ? "Locked" : "View Dashboard")}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center border-t pt-4">
                    <button type="button" onClick={() => switchMode(mode === 'client' ? 'admin' : 'client')} className="text-xs text-gray-400 hover:text-cardinal-red underline">
                        {mode === 'client' ? "Admin Login" : "Back to Client Access"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div className="bg-cardinal-red h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
    </div>
);

const StatusCheckbox = ({ status, onClick, disabled }) => {
    const base = `w-6 h-6 min-w-[24px] rounded border-2 flex items-center justify-center mt-0.5 select-none transition-all duration-200 ease-out flex-shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;
    const clickHandler = disabled ? undefined : onClick;

    switch (status) {
        case STATUS.COMPLETED:
            return <div onClick={clickHandler} className={`${base} border-cardinal-red bg-cardinal-red`}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>;
        case STATUS.IN_PROGRESS:
            return <div onClick={clickHandler} className={`${base} border-cardinal-black bg-cardinal-black`}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>;
        case STATUS.BLOCKED:
            return <div onClick={clickHandler} className={`${base} border-amber-500 bg-amber-500`}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>;
        case STATUS.SKIPPED:
            return <div onClick={clickHandler} className={`${base} border-gray-400 bg-gray-400`}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14"></path></svg></div>;
        default:
            return <div onClick={clickHandler} className={`${base} border-gray-300 bg-white hover:border-cardinal-red`}></div>;
    }
};

const Dashboard = ({ user, onLogout }) => {
    const [plan, setPlan] = useState(initialProjectData);
    const [taskStates, setTaskStates] = useState({});
    const [expandedNotes, setExpandedNotes] = useState({});
    const [balanceText, setBalanceText] = useState("");
    const [syncStatus, setSyncStatus] = useState("loading");
    const [activeProjectId, setActiveProjectId] = useState("BLDS-WEB-001-REV5");
    const [taskToDelete, setTaskToDelete] = useState(null);

    const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    useEffect(() => {
        let targetId = "BLDS-WEB-001-REV5";
        if (isAdmin) {
            targetId = activeProjectId;
        } else {
            const clientEmail = user.email?.toLowerCase();
            if (CLIENT_PROJECTS[clientEmail]) {
                targetId = CLIENT_PROJECTS[clientEmail];
            }
            if (activeProjectId !== targetId) setActiveProjectId(targetId);
        }

        const docRef = getProjectDocRef(targetId);
        
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPlan(data.projectPlan || initialProjectData);
                setTaskStates(data.taskStates || {});
                setBalanceText(data.balanceText || "");
                setSyncStatus("synced");
            } else {
                if (isAdmin) {
                    setDoc(docRef, { projectPlan: initialProjectData, taskStates: {}, balanceText: "", createdAt: new Date().toISOString() })
                      .then(() => {
                         setPlan(initialProjectData);
                         setSyncStatus("synced");
                      });
                } else {
                    setSyncStatus("synced");
                }
            }
        }, err => {
            console.error("Sync Error:", err);
            setSyncStatus("error");
        });
        return () => unsubscribe();
    }, [activeProjectId, isAdmin]);

    const saveData = async (newPlan, newStates, newBalance) => {
        if (!isAdmin) return;
        const p = newPlan || plan;
        const s = newStates || taskStates;
        const b = typeof newBalance === 'string' ? newBalance : balanceText;

        if (newPlan) setPlan(newPlan);
        if (newStates) setTaskStates(newStates);
        if (typeof newBalance === 'string') setBalanceText(newBalance);

        setSyncStatus("saving");
        try {
            const docRef = getProjectDocRef(activeProjectId);
            await updateDoc(docRef, {
                projectPlan: p,
                taskStates: s,
                balanceText: b
            });
            setSyncStatus("synced");
        } catch (e) {
            console.error("Save Error:", e);
            setSyncStatus("error");
        }
    };

    const handleSprintChange = (sI, field, val) => {
        if (!isAdmin) return;
        const np = [...plan];
        np[sI][field] = val;
        setPlan(np);
    };

    const handleWeekChange = (sI, wI, field, val) => {
        if (!isAdmin) return;
        const np = [...plan];
        np[sI].weeks[wI][field] = val;
        setPlan(np);
    };

    const handleStatusChange = (taskId) => {
        if (!isAdmin) return;
        const curr = taskStates[taskId] || STATUS.TODO;
        const next = STATUS_ORDER[(STATUS_ORDER.indexOf(curr) + 1) % STATUS_ORDER.length];
        saveData(null, { ...taskStates, [taskId]: next });
    };

    const handleTitleChange = (sI, wI, tI, val) => {
        if (!isAdmin) return;
        const np = [...plan];
        np[sI].weeks[wI].tasks[tI].title = val;
        setPlan(np);
    };

    const handleNoteChange = (sI, wI, tI, val) => {
        if (!isAdmin) return;
        const np = [...plan];
        np[sI].weeks[wI].tasks[tI].note = val;
        setPlan(np);
    };

    const handleTitleBlur = () => saveData(plan, null);
    const handleNoteBlur = () => saveData(plan, null);

    const addTask = (sI, wI) => {
        if (!isAdmin) return;
        const np = [...plan];
        np[sI].weeks[wI].tasks.push({ id: generateId(), title: "New Task", note: "" });
        saveData(np, null);
    };

    const triggerDeleteTask = (sI, wI, tI) => {
        if (!isAdmin) return;
        setTaskToDelete({ sI, wI, tI });
    };

    const confirmRemoveTask = () => {
        if (!isAdmin || !taskToDelete) return;
        const { sI, wI, tI } = taskToDelete;
        const np = [...plan];
        np[sI].weeks[wI].tasks.splice(tI, 1);
        saveData(np, null);
        setTaskToDelete(null);
    };

    const total = plan?.reduce((a, s) => a + s?.weeks.reduce((wa, w) => wa + w.tasks.length, 0), 0);
    const done = Object.values(taskStates).filter(s => s === STATUS.COMPLETED || s === STATUS.SKIPPED).length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-cardinal-black pb-20 relative">
            <header className="bg-white shadow-sm border-b sticky top-0 z-10 p-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <img src="https://cardinalcomputersystems.com/cardinal-logo.png" className="w-10 h-10 object-contain" alt="Cardinal Logo" />
                        <div>
                            <h1 className="font-bold leading-tight text-sm sm:text-base">Builds Setup Tracker</h1>
                            <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                                {syncStatus === 'saving' ? <span className="text-red-600 animate-pulse">Saving...</span> : <span className="text-green-600">✓ Connected</span>}
                                <span className="text-gray-400">|</span>
                                <span className="font-bold uppercase text-gray-400">{isAdmin ? "Admin Mode" : "View Only"}</span>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase text-gray-400 font-bold">Project ID</label>
                            <input
                                type="text"
                                value={activeProjectId}
                                onChange={(e) => setActiveProjectId(e.target.value)}
                                className="text-xs border p-1 rounded bg-zinc-50 font-mono w-32 focus:border-cardinal-red outline-none"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex flex-col items-end">
                            <label className="text-[10px] uppercase text-gray-400 font-bold">Account Balance</label>
                            {isAdmin ? (
                                <input
                                    type="text"
                                    placeholder="e.g. Remaining: $311.67"
                                    value={balanceText}
                                    onChange={(e) => setBalanceText(e.target.value)}
                                    onBlur={() => saveData(null, null, balanceText)}
                                    className="text-xs border-b border-gray-200 outline-none focus:border-cardinal-red p-1 text-right bg-transparent w-40 font-semibold text-gray-700"
                                />
                            ) : (
                                <span className="text-xs font-bold text-gray-700 p-1">{balanceText || "No outstanding balance"}</span>
                            )}
                        </div>

                        {!isAdmin && (
                            <a href="https://www.paypal.com/ncp/payment/EPJHVX6XAGW8C" target="_blank" rel="noreferrer" className="bg-cardinal-red text-white px-4 py-2 rounded text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                                Pay Invoice
                            </a>
                        )}
                        <button onClick={onLogout} className="text-sm text-cardinal-red hover:underline ml-2 font-medium">Exit</button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6 mb-8 border-l-4 border-cardinal-red">
                    <div className="flex justify-between items-end mb-2 font-bold">
                        <h2 className="text-gray-500 uppercase text-xs tracking-wider">Overall Project Progress</h2>
                        <span className="text-3xl text-cardinal-red">{progress}%</span>
                    </div>
                    <ProgressBar progress={progress} />
                </div>

                <div className="space-y-12">
                    {plan.map((sprint, sI) => (
                        <div key={sprint.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                            <div className="bg-cardinal-black text-white p-5 flex justify-between items-center flex-wrap gap-2">
                                <div className="flex-grow min-w-0">
                                    {isAdmin ? (
                                        <input
                                            className="bg-transparent border-none font-bold uppercase tracking-wide text-sm sm:text-base w-full focus:ring-0 p-0 text-white"
                                            value={sprint.title}
                                            onChange={(e) => handleSprintChange(sI, 'title', e.target.value)}
                                            onBlur={() => saveData(plan, null)}
                                        />
                                    ) : (
                                        <h3 className="font-bold uppercase tracking-wide text-sm sm:text-base">{sprint.title}</h3>
                                    )}
                                    
                                    {isAdmin ? (
                                        <input
                                            className="bg-transparent border-none text-[11px] text-gray-400 w-full focus:ring-0 p-0 mt-1"
                                            value={sprint.goal}
                                            onChange={(e) => handleSprintChange(sI, 'goal', e.target.value)}
                                            onBlur={() => saveData(plan, null)}
                                        />
                                    ) : (
                                        <p className="text-[11px] text-gray-400">{sprint.goal}</p>
                                    )}
                                </div>
                                
                                {isAdmin ? (
                                    <input
                                        className="text-[10px] bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-zinc-300 font-medium tracking-wide outline-none focus:border-cardinal-red w-32"
                                        value={sprint.dates}
                                        onChange={(e) => handleSprintChange(sI, 'dates', e.target.value)}
                                        onBlur={() => saveData(plan, null)}
                                    />
                                ) : (
                                    <span className="text-[10px] bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-zinc-300 font-medium tracking-wide">
                                        {sprint.dates}
                                    </span>
                                )}
                            </div>
                            <div className="p-5 grid md:grid-cols-2 gap-8">
                                {sprint.weeks.map((week, wI) => (
                                    <div key={week.id} className="bg-zinc-50 rounded-xl p-5 border border-zinc-100 flex flex-col">
                                        <h4 className="font-bold border-b border-zinc-200 pb-3 mb-5 text-gray-800 flex justify-between items-center gap-2">
                                            {isAdmin ? (
                                                <input
                                                    className="bg-transparent border-none font-bold text-gray-800 focus:ring-0 p-0 flex-grow"
                                                    value={week.title}
                                                    onChange={(e) => handleWeekChange(sI, wI, 'title', e.target.value)}
                                                    onBlur={() => saveData(plan, null)}
                                                />
                                            ) : (
                                                week.title
                                            )}
                                            
                                            {isAdmin ? (
                                                <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                                                    <span className="text-[9px] text-cardinal-red font-bold uppercase tracking-tighter">Check-in:</span>
                                                    <input
                                                        className="bg-transparent border-none text-[9px] text-cardinal-red font-bold uppercase tracking-tighter focus:ring-0 p-0 w-20"
                                                        value={week.checkIn}
                                                        onChange={(e) => handleWeekChange(sI, wI, 'checkIn', e.target.value)}
                                                        onBlur={() => saveData(plan, null)}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-[9px] bg-red-50 text-cardinal-red px-2 py-1 rounded font-bold uppercase tracking-tighter">Check-in: {week.checkIn}</span>
                                            )}
                                        </h4>
                                        <div className="space-y-5 flex-grow">
                                            {week.tasks.map((task, tI) => {
                                                const status = taskStates[task.id] || STATUS.TODO;
                                                const isDone = status === STATUS.COMPLETED || status === STATUS.SKIPPED;
                                                return (
                                                    <div key={task.id} className="flex flex-col gap-1">
                                                        <div className="flex items-start gap-3">
                                                            <StatusCheckbox status={status} onClick={() => handleStatusChange(task.id)} disabled={!isAdmin} />
                                                            <div className="flex-grow min-w-0">
                                                                <input
                                                                    type="text" value={task.title}
                                                                    readOnly={!isAdmin}
                                                                    onChange={(e) => handleTitleChange(sI, wI, tI, e.target.value)}
                                                                    onBlur={handleTitleBlur}
                                                                    className={`w-full text-sm bg-transparent border-none focus:ring-0 p-0 transition-all ${isDone ? 'text-gray-400 line-through' : 'text-gray-700 font-semibold'}`}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => setExpandedNotes(p => ({ ...p, [task.id]: !p[task.id] }))}
                                                                    className={`p-1 rounded hover:bg-zinc-200 transition-colors ${task.note ? 'text-cardinal-red bg-red-50' : 'text-gray-400'}`}
                                                                    title="Notes"
                                                                >
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                                                                </button>
                                                                {isAdmin && (
                                                                    <button
                                                                        onClick={() => triggerDeleteTask(sI, wI, tI)}
                                                                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                                                                        title="Delete"
                                                                    >
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {expandedNotes[task.id] && (
                                                            <textarea
                                                                className="ml-9 mt-2 text-[11px] p-3 bg-white border border-zinc-200 rounded-lg outline-none h-24 shadow-inner text-gray-600 leading-relaxed ring-1 ring-zinc-100"
                                                                placeholder="Project notes, links, or technical details..."
                                                                value={task.note}
                                                                readOnly={!isAdmin}
                                                                onChange={(e) => handleNoteChange(sI, wI, tI, e.target.value)}
                                                                onBlur={() => saveData(plan, null)}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {isAdmin && (
                                            <button
                                                onClick={() => addTask(sI, wI)}
                                                className="mt-6 py-2 text-[10px] font-black text-gray-400 hover:text-cardinal-red hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 flex items-center justify-center gap-2 transition-all uppercase tracking-widest"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Add Milestone Task
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-zinc-200 h-[1px] w-full"></div>

                <div className="mt-8 flex flex-wrap gap-8 justify-center text-[10px] uppercase font-bold tracking-tighter text-gray-400">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded"></div> Needs Action</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cardinal-black rounded"></div> In Progress</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cardinal-red rounded"></div> Completed</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded"></div> Blocked</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-400 rounded"></div> Skipped</div>
                </div>
            </main>

            <footer className="text-center p-12 text-gray-400 text-[10px] uppercase tracking-widest font-medium">
                Cardinal Computer Systems | Builds Project Portal | © 2026
                <br />
                <span className="opacity-50 mt-1 block tracking-normal">Proprietary Management System</span>
            </footer>

            {taskToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold text-cardinal-black mb-2">Delete Task?</h3>
                        <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setTaskToDelete(null)} 
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmRemoveTask} 
                                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (IS_DEMO_MODE && isPreview) {
                 await signInAnonymously(auth);
            }
        };
        checkAuth();

        const unsub = onAuthStateChanged(auth, u => { 
            setUser(u); 
            setLoading(false); 
        });
        return () => unsub();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100">
            <img src="https://cardinalcomputersystems.com/cardinal-logo.png" className="w-16 h-16 animate-pulse opacity-50 mb-4" alt="Loading" />
            <div className="text-cardinal-red font-black text-xs uppercase tracking-widest">Initializing Secure Portal</div>
        </div>
    );

    return user ? <Dashboard user={user} onLogout={() => signOut(auth)} /> : <LoginScreen onLogin={setUser} />;
}

if (typeof __app_id === 'undefined' && typeof window !== 'undefined') {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
}