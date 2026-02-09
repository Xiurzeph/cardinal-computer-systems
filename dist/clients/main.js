"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

// ==========================================
//  LIVE FIREBASE CONFIGURATION 2026-2-8
// ==========================================
var firebaseConfig = {
  apiKey: "AIzaSyC3T-SIQxCSZPd9Vbg7ixDy3hhwfJ5t7rc",
  authDomain: "cardinal-computer-center.firebaseapp.com",
  projectId: "cardinal-computer-center",
  storageBucket: "cardinal-computer-center.firebasestorage.app",
  messagingSenderId: "606626380669",
  appId: "1:606626380669:web:ff374410281763905d6a14",
  measurementId: "G-5SGWF0RT8C"
};

// --- MULTI-CLIENT CONFIGURATION ---
var CLIENT_PROJECTS = {
  "director@lsfdc.org": "BLDS-WEB-001-REV5"
};
var ADMIN_EMAIL = "xiurzeph112112@gmail.com";

// Check for Demo Mode
var IS_DEMO_MODE = firebaseConfig.apiKey.includes("REPLACE");

// Initialize Firebase
var db, auth;
if (!IS_DEMO_MODE) {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    auth = firebase.auth();
  } catch (error) {
    console.error("Firebase Init Error:", error);
  }
}
var STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  BLOCKED: 'blocked',
  SKIPPED: 'skipped'
};
var STATUS_ORDER = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.COMPLETED, STATUS.BLOCKED, STATUS.SKIPPED];
var generateId = function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
var initialProjectData = [{
  id: "sprint1",
  title: "Sprint 1: Foundation & Identity",
  dates: "Jan 28 - Feb 11",
  goal: "Store infrastructure, security, and visual branding.",
  weeks: [{
    id: "w1",
    title: "Week 1: Security & Setup",
    checkIn: "Wed, Feb 4",
    tasks: [{
      id: "t_dns",
      title: "Connect Custom Domain (DNS)",
      note: ""
    }, {
      id: "t_pay",
      title: "Configure Shopify Payments & Shipping",
      note: ""
    }, {
      id: "t_seo",
      title: "Technical SEO Basics",
      note: ""
    }, {
      id: "t_theme",
      title: "Initial Theme Installation",
      note: ""
    }]
  }, {
    id: "w2",
    title: "Week 2: Brand Identity",
    checkIn: "Wed, Feb 11",
    tasks: [{
      id: "t_color",
      title: "Color Palette Implementation",
      note: ""
    }, {
      id: "t_logo",
      title: "Logo & Sticker Assets Upload",
      note: ""
    }, {
      id: "t_media",
      title: "Homepage Media Sourcing",
      note: ""
    }, {
      id: "t_nav",
      title: "Navigation Menu Structure",
      note: ""
    }]
  }]
}, {
  id: "sprint2",
  title: "Sprint 2: Integration & Strategy",
  dates: "Feb 11 - Feb 25",
  goal: "Connecting dropshipping engines and applying Kollab strategy.",
  weeks: [{
    id: "w3",
    title: "Week 3: AutoDS Integration",
    checkIn: "Wed, Feb 18",
    tasks: [{
      id: "t_autods",
      title: "Connect AutoDS Agent",
      note: ""
    }, {
      id: "t_fulfill",
      title: "Configure Order Fulfillment Automation",
      note: ""
    }, {
      id: "t_sync",
      title: "Inventory Sync Rules Setup",
      note: ""
    }, {
      id: "t_price",
      title: "Pricing Automation Rules",
      note: ""
    }]
  }, {
    id: "w4",
    title: "Week 4: Kollab Strategy",
    checkIn: "Wed, Feb 25",
    tasks: [{
      id: "t_collec",
      title: "Collection Page Layouts",
      note: ""
    }, {
      id: "t_legal",
      title: "Legal & Store Policies Setup",
      note: ""
    }, {
      id: "t_trust",
      title: "Trust Badge Implementation",
      note: ""
    }, {
      id: "t_cro",
      title: "Conversion Rate Optimization (Basic)",
      note: ""
    }]
  }]
}, {
  id: "sprint3",
  title: "Sprint 3: Products & Launch",
  dates: "Feb 25 - Mar 11",
  goal: "Populating the store and preparing for public traffic.",
  weeks: [{
    id: "w5",
    title: "Week 5: Product Import (Phase 2)",
    checkIn: "Wed, Mar 4",
    tasks: [{
      id: "t_res",
      title: "Niche Product Research",
      note: ""
    }, {
      id: "t_imp",
      title: "AutoDS Product Imports",
      note: ""
    }, {
      id: "t_desc",
      title: "Description Formatting (Kollab Style)",
      note: ""
    }, {
      id: "t_img",
      title: "Image Optimization",
      note: ""
    }]
  }, {
    id: "w6",
    title: "Week 6: QA & Launch",
    checkIn: "Wed, Mar 11",
    tasks: [{
      id: "t_mob",
      title: "Mobile Responsiveness Check",
      note: ""
    }, {
      id: "t_test",
      title: "Test Orders (End-to-End)",
      note: ""
    }, {
      id: "t_pg",
      title: "Payment Gateway Verification",
      note: ""
    }, {
      id: "t_live",
      title: "GO LIVE 🚀",
      note: ""
    }]
  }]
}];
var LoginScreen = function LoginScreen(_ref) {
  var onLogin = _ref.onLogin;
  var _useState = useState('client'),
    _useState2 = _slicedToArray(_useState, 2),
    mode = _useState2[0],
    setMode = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    password = _useState4[0],
    setPassword = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useState9 = useState(0),
    _useState0 = _slicedToArray(_useState9, 2),
    lockoutTime = _useState0[0],
    setLockoutTime = _useState0[1];
  var isFileProtocol = window.location.protocol === 'file:';
  useEffect(function () {
    var storedLockout = parseInt(localStorage.getItem('auth_lockout_until') || '0');
    if (storedLockout > Date.now()) {
      setLockoutTime(storedLockout);
    }
  }, []);
  useEffect(function () {
    if (lockoutTime > 0) {
      var timer = setInterval(function () {
        if (Date.now() > lockoutTime) {
          setLockoutTime(0);
          localStorage.removeItem('auth_lockout_until');
          localStorage.removeItem('auth_attempts');
          setError(null);
        }
      }, 1000);
      return function () {
        return clearInterval(timer);
      };
    }
  }, [lockoutTime]);
  var switchMode = function switchMode(newMode) {
    setMode(newMode);
    setError(null);
    setPassword("");
  };
  var handleGoogleLogin = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var provider, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setLoading(true);
            setError(null);
            if (!IS_DEMO_MODE) {
              _context.n = 1;
              break;
            }
            setTimeout(function () {
              return onLogin({
                email: ADMIN_EMAIL
              });
            }, 800);
            return _context.a(2);
          case 1:
            _context.p = 1;
            provider = new firebase.auth.GoogleAuthProvider();
            _context.n = 2;
            return auth.signInWithPopup(provider);
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error("Google Login Error:", _t);
            if (_t.code === 'auth/popup-closed-by-user') {
              setError("Login cancelled.");
            } else if (_t.code === 'auth/unauthorized-domain' || _t.message.includes('unauthorized domain')) {
              setError("Domain not authorized. Please add this domain to Firebase Console > Auth > Settings > Authorized Domains.");
            } else {
              setError("Google Sign-In failed: " + _t.message);
            }
            setLoading(false);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleGoogleLogin() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var remaining, loginEmail, currentAttempts, newLockout, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            if (!(mode === 'client' && lockoutTime > Date.now())) {
              _context2.n = 1;
              break;
            }
            remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
            setError("Too many attempts. Please wait ".concat(remaining, "s."));
            return _context2.a(2);
          case 1:
            setLoading(true);
            setError(null);
            loginEmail = "director@lsfdc.org";
            if (!IS_DEMO_MODE) {
              _context2.n = 2;
              break;
            }
            setTimeout(function () {
              return onLogin({
                email: loginEmail || "demo@user.com"
              });
            }, 800);
            return _context2.a(2);
          case 2:
            _context2.p = 2;
            _context2.n = 3;
            return auth.signInWithEmailAndPassword(loginEmail, password);
          case 3:
            localStorage.removeItem('auth_attempts');
            localStorage.removeItem('auth_lockout_until');
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error("Login Error:", _t2);
            setLoading(false);
            currentAttempts = parseInt(localStorage.getItem('auth_attempts') || '0') + 1;
            localStorage.setItem('auth_attempts', currentAttempts);
            if (currentAttempts >= 5) {
              newLockout = Date.now() + 300000;
              setLockoutTime(newLockout);
              localStorage.setItem('auth_lockout_until', newLockout);
              setError("Too many failed attempts. Locked for 5 minutes.");
            } else {
              setError("Access Denied. Check credentials. (".concat(5 - currentAttempts, " attempts remaining)"));
            }
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return function handleSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var isLocked = mode === 'client' && lockoutTime > Date.now();
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex items-center justify-center px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md w-full bg-white shadow-xl rounded-lg p-8 border-t-8 border-cardinal-red"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-8"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cardinalcomputersystems.com/cardinal-logo.png",
    alt: "Logo",
    className: "w-20 h-20 mx-auto mb-4 object-contain"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-cardinal-black"
  }, "Cardinal CS"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm mt-1"
  }, mode === 'client' ? "Client Access Portal" : "Admin Login")), isFileProtocol && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-xs text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold"
  }, "\u26A0\uFE0F Local File Detected"), /*#__PURE__*/React.createElement("p", null, "Firebase Authentication will NOT work when opening the file directly (file://). Please upload this file to a web host (like GitHub Pages) or run a local server.")), mode === 'admin' ? /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleGoogleLogin,
    type: "button",
    disabled: loading,
    className: "w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-lg transition-all shadow-sm hover:shadow-md"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  })), "Sign in with Google"), error && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-50 border border-red-200 text-cardinal-red text-xs mt-4 p-3 rounded text-center"
  }, error), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center mt-4"
  }, "Restricted to authorized administrators."), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-gray-300 text-center mt-2"
  }, "Note: Disable AdBlockers if login fails.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "Project Access Code"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    className: "w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-cardinal-red focus:outline-none",
    required: true,
    disabled: isLocked || loading,
    placeholder: "Enter your access code..."
  }), error && /*#__PURE__*/React.createElement("p", {
    className: "text-cardinal-red text-sm mt-2 font-bold"
  }, error)), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading || isLocked,
    className: "w-full text-white font-bold py-3 rounded transition-colors disabled:opacity-50 ".concat(isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-cardinal-black hover:bg-gray-800')
  }, loading ? "Verifying..." : isLocked ? "Locked" : "View Dashboard")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 text-center border-t pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return switchMode(mode === 'client' ? 'admin' : 'client');
    },
    className: "text-xs text-gray-400 hover:text-cardinal-red underline"
  }, mode === 'client' ? "Admin Login" : "Back to Client Access"))));
};
var ProgressBar = function ProgressBar(_ref4) {
  var progress = _ref4.progress;
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-cardinal-red h-4 rounded-full transition-all duration-1000 ease-out",
    style: {
      width: "".concat(progress, "%")
    }
  }));
};
var StatusCheckbox = function StatusCheckbox(_ref5) {
  var status = _ref5.status,
    onClick = _ref5.onClick,
    disabled = _ref5.disabled;
  var base = "w-6 h-6 min-w-[24px] rounded border-2 flex items-center justify-center mt-0.5 select-none transition-all duration-200 ease-out flex-shrink-0 ".concat(disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer');
  var clickHandler = disabled ? undefined : onClick;
  switch (status) {
    case STATUS.COMPLETED:
      return /*#__PURE__*/React.createElement("div", {
        onClick: clickHandler,
        className: "".concat(base, " border-cardinal-red bg-cardinal-red")
      }, /*#__PURE__*/React.createElement("svg", {
        className: "w-4 h-4 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "3",
        d: "M5 13l4 4L19 7"
      })));
    case STATUS.IN_PROGRESS:
      return /*#__PURE__*/React.createElement("div", {
        onClick: clickHandler,
        className: "".concat(base, " border-cardinal-black bg-cardinal-black")
      }, /*#__PURE__*/React.createElement("svg", {
        className: "w-4 h-4 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2.5",
        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      })));
    case STATUS.BLOCKED:
      return /*#__PURE__*/React.createElement("div", {
        onClick: clickHandler,
        className: "".concat(base, " border-amber-500 bg-amber-500")
      }, /*#__PURE__*/React.createElement("svg", {
        className: "w-4 h-4 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "3",
        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      })));
    case STATUS.SKIPPED:
      return /*#__PURE__*/React.createElement("div", {
        onClick: clickHandler,
        className: "".concat(base, " border-gray-400 bg-gray-400")
      }, /*#__PURE__*/React.createElement("svg", {
        className: "w-4 h-4 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "3",
        d: "M5 12h14"
      })));
    default:
      return /*#__PURE__*/React.createElement("div", {
        onClick: clickHandler,
        className: "".concat(base, " border-gray-300 bg-white hover:border-cardinal-red")
      });
  }
};
var Dashboard = function Dashboard(_ref6) {
  var _user$email;
  var user = _ref6.user,
    onLogout = _ref6.onLogout;
  var _useState1 = useState(initialProjectData),
    _useState10 = _slicedToArray(_useState1, 2),
    plan = _useState10[0],
    setPlan = _useState10[1];
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    taskStates = _useState12[0],
    setTaskStates = _useState12[1];
  var _useState13 = useState({}),
    _useState14 = _slicedToArray(_useState13, 2),
    expandedNotes = _useState14[0],
    setExpandedNotes = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    balanceText = _useState16[0],
    setBalanceText = _useState16[1];
  var _useState17 = useState("loading"),
    _useState18 = _slicedToArray(_useState17, 2),
    syncStatus = _useState18[0],
    setSyncStatus = _useState18[1];
  var _useState19 = useState("BLDS-WEB-001-REV5"),
    _useState20 = _slicedToArray(_useState19, 2),
    activeProjectId = _useState20[0],
    setActiveProjectId = _useState20[1];
  var isAdmin = ((_user$email = user.email) === null || _user$email === void 0 ? void 0 : _user$email.toLowerCase()) === ADMIN_EMAIL.toLowerCase();
  useEffect(function () {
    if (IS_DEMO_MODE) {
      setSyncStatus("demo");
      return;
    }
    var targetId = "BLDS-WEB-001-REV5";
    if (isAdmin) {
      targetId = activeProjectId;
    } else {
      var _user$email2;
      var clientEmail = (_user$email2 = user.email) === null || _user$email2 === void 0 ? void 0 : _user$email2.toLowerCase();
      if (CLIENT_PROJECTS[clientEmail]) {
        targetId = CLIENT_PROJECTS[clientEmail];
      }
      if (activeProjectId !== targetId) setActiveProjectId(targetId);
    }
    var docRef = db.collection('projects').doc(targetId);
    var unsubscribe = docRef.onSnapshot(function (doc) {
      if (doc.exists) {
        var data = doc.data();
        setPlan(data.projectPlan || initialProjectData);
        setTaskStates(data.taskStates || {});
        setBalanceText(data.balanceText || "");
        setSyncStatus("synced");
      } else {
        if (isAdmin) {
          docRef.set({
            projectPlan: initialProjectData,
            taskStates: {},
            balanceText: "",
            createdAt: new Date()
          });
          setPlan(initialProjectData);
          setSyncStatus("synced");
        } else {
          setSyncStatus("synced");
        }
      }
    }, function (err) {
      console.error("Sync Error:", err);
      setSyncStatus("error");
    });
    return function () {
      return unsubscribe();
    };
  }, [activeProjectId]);
  var saveData = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(newPlan, newStates, newBalance) {
      var p, s, b, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(!isAdmin && !IS_DEMO_MODE)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            p = newPlan || plan;
            s = newStates || taskStates;
            b = typeof newBalance === 'string' ? newBalance : balanceText;
            if (newPlan) setPlan(newPlan);
            if (newStates) setTaskStates(newStates);
            if (typeof newBalance === 'string') setBalanceText(newBalance);
            if (!IS_DEMO_MODE) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            setSyncStatus("saving");
            _context3.p = 3;
            _context3.n = 4;
            return db.collection('projects').doc(activeProjectId).update({
              projectPlan: p,
              taskStates: s,
              balanceText: b
            });
          case 4:
            setSyncStatus("synced");
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            console.error("Save Error:", _t3);
            setSyncStatus("error");
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[3, 5]]);
    }));
    return function saveData(_x2, _x3, _x4) {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleStatusChange = function handleStatusChange(taskId) {
    if (!isAdmin) return;
    var curr = taskStates[taskId] || STATUS.TODO;
    var next = STATUS_ORDER[(STATUS_ORDER.indexOf(curr) + 1) % STATUS_ORDER.length];
    saveData(null, _objectSpread(_objectSpread({}, taskStates), {}, _defineProperty({}, taskId, next)));
  };
  var handleTitleChange = function handleTitleChange(sI, wI, tI, val) {
    if (!isAdmin) return;
    var np = _toConsumableArray(plan);
    np[sI].weeks[wI].tasks[tI].title = val;
    setPlan(np);
  };
  var handleNoteChange = function handleNoteChange(sI, wI, tI, val) {
    if (!isAdmin) return;
    var np = _toConsumableArray(plan);
    np[sI].weeks[wI].tasks[tI].note = val;
    setPlan(np);
  };
  var handleTitleBlur = function handleTitleBlur() {
    return saveData(plan, null);
  };
  var handleNoteBlur = function handleNoteBlur() {
    return saveData(plan, null);
  };
  var addTask = function addTask(sI, wI) {
    if (!isAdmin) return;
    var np = _toConsumableArray(plan);
    np[sI].weeks[wI].tasks.push({
      id: generateId(),
      title: "New Task",
      note: ""
    });
    saveData(np, null);
  };
  var removeTask = function removeTask(sI, wI, tI) {
    if (!isAdmin || !confirm("Delete task?")) return;
    var np = _toConsumableArray(plan);
    np[sI].weeks[wI].tasks.splice(tI, 1);
    saveData(np, null);
  };
  var total = plan === null || plan === void 0 ? void 0 : plan.reduce(function (a, s) {
    return a + (s === null || s === void 0 ? void 0 : s.weeks.reduce(function (wa, w) {
      return wa + w.tasks.length;
    }, 0));
  }, 0);
  var done = Object.values(taskStates).filter(function (s) {
    return s === STATUS.COMPLETED || s === STATUS.SKIPPED;
  }).length;
  var progress = total > 0 ? Math.round(done / total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-zinc-50 font-sans text-cardinal-black pb-20"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white shadow-sm border-b sticky top-0 z-10 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cardinalcomputersystems.com/cardinal-logo.png",
    className: "w-10 h-10 object-contain"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "font-bold leading-tight text-sm sm:text-base"
  }, "Builds Setup Tracker"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-[10px] sm:text-xs"
  }, syncStatus === 'saving' ? /*#__PURE__*/React.createElement("span", {
    className: "text-red-600 animate-pulse"
  }, "Saving...") : /*#__PURE__*/React.createElement("span", {
    className: "text-green-600"
  }, "\u2713 Connected"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold uppercase text-gray-400"
  }, isAdmin ? "Admin Mode" : "View Only")))), isAdmin && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-[9px] uppercase text-gray-400 font-bold"
  }, "Project ID"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: activeProjectId,
    onChange: function onChange(e) {
      return setActiveProjectId(e.target.value);
    },
    className: "text-xs border p-1 rounded bg-zinc-50 font-mono w-32 focus:border-cardinal-red outline-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 ml-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-end"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase text-gray-400 font-bold"
  }, "Account Balance"), isAdmin ? /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Remaining: $311.67",
    value: balanceText,
    onChange: function onChange(e) {
      return setBalanceText(e.target.value);
    },
    onBlur: function onBlur() {
      return saveData(null, null, balanceText);
    },
    className: "text-xs border-b border-gray-200 outline-none focus:border-cardinal-red p-1 text-right bg-transparent w-40 font-semibold text-gray-700"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-gray-700 p-1"
  }, balanceText || "No outstanding balance")), !isAdmin && /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/ncp/payment/EPJHVX6XAGW8C",
    target: "_blank",
    className: "bg-cardinal-red text-white px-4 py-2 rounded text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm"
  }, "Pay Invoice"), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "text-sm text-cardinal-red hover:underline ml-2 font-medium"
  }, "Exit")))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-5xl mx-auto px-4 py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-lg shadow p-6 mb-8 border-l-4 border-cardinal-red"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-end mb-2 font-bold"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-500 uppercase text-xs tracking-wider"
  }, "Overall Project Progress"), /*#__PURE__*/React.createElement("span", {
    className: "text-3xl text-cardinal-red"
  }, progress, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: progress
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-12"
  }, plan.map(function (sprint, sI) {
    return /*#__PURE__*/React.createElement("div", {
      key: sprint.id,
      className: "bg-white rounded-lg shadow overflow-hidden border border-gray-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-cardinal-black text-white p-5 flex justify-between items-center flex-wrap gap-2"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold uppercase tracking-wide text-sm sm:text-base"
    }, sprint.title), /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] text-gray-400"
    }, sprint.goal)), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-zinc-300 font-medium tracking-wide"
    }, sprint.dates)), /*#__PURE__*/React.createElement("div", {
      className: "p-5 grid md:grid-cols-2 gap-8"
    }, sprint.weeks.map(function (week, wI) {
      return /*#__PURE__*/React.createElement("div", {
        key: week.id,
        className: "bg-zinc-50 rounded-xl p-5 border border-zinc-100 flex flex-col"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "font-bold border-b border-zinc-200 pb-3 mb-5 text-gray-800 flex justify-between items-center"
      }, week.title, /*#__PURE__*/React.createElement("span", {
        className: "text-[9px] bg-red-50 text-cardinal-red px-2 py-1 rounded font-bold uppercase tracking-tighter"
      }, "Check-in: ", week.checkIn)), /*#__PURE__*/React.createElement("div", {
        className: "space-y-5 flex-grow"
      }, week.tasks.map(function (task, tI) {
        var status = taskStates[task.id] || STATUS.TODO;
        var isDone = status === STATUS.COMPLETED || status === STATUS.SKIPPED;
        return /*#__PURE__*/React.createElement("div", {
          key: task.id,
          className: "flex flex-col gap-1"
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex items-start gap-3"
        }, /*#__PURE__*/React.createElement(StatusCheckbox, {
          status: status,
          onClick: function onClick() {
            return handleStatusChange(task.id);
          },
          disabled: !isAdmin
        }), /*#__PURE__*/React.createElement("div", {
          className: "flex-grow min-w-0"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          value: task.title,
          readOnly: !isAdmin,
          onChange: function onChange(e) {
            return handleTitleChange(sI, wI, tI, e.target.value);
          },
          onBlur: handleTitleBlur,
          className: "w-full text-sm bg-transparent border-none focus:ring-0 p-0 transition-all ".concat(isDone ? 'text-gray-400 line-through' : 'text-gray-700 font-semibold')
        })), /*#__PURE__*/React.createElement("div", {
          className: "flex items-center gap-1"
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setExpandedNotes(function (p) {
              return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, task.id, !p[task.id]));
            });
          },
          className: "p-1 rounded hover:bg-zinc-200 transition-colors ".concat(task.note ? 'text-cardinal-red bg-red-50' : 'text-gray-400'),
          title: "Notes"
        }, /*#__PURE__*/React.createElement("svg", {
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5"
        }, /*#__PURE__*/React.createElement("path", {
          d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        }), /*#__PURE__*/React.createElement("polyline", {
          points: "14 2 14 8 20 8"
        }), /*#__PURE__*/React.createElement("line", {
          x1: "16",
          y1: "13",
          x2: "8",
          y2: "13"
        }), /*#__PURE__*/React.createElement("line", {
          x1: "16",
          y1: "17",
          x2: "8",
          y2: "17"
        }))), isAdmin && /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return removeTask(sI, wI, tI);
          },
          className: "text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors",
          title: "Delete"
        }, /*#__PURE__*/React.createElement("svg", {
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5"
        }, /*#__PURE__*/React.createElement("polyline", {
          points: "3 6 5 6 21 6"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        }))))), expandedNotes[task.id] && /*#__PURE__*/React.createElement("textarea", {
          className: "ml-9 mt-2 text-[11px] p-3 bg-white border border-zinc-200 rounded-lg outline-none h-24 shadow-inner text-gray-600 leading-relaxed ring-1 ring-zinc-100",
          placeholder: "Project notes, links, or technical details...",
          value: task.note,
          readOnly: !isAdmin,
          onChange: function onChange(e) {
            return handleNoteChange(sI, wI, tI, e.target.value);
          },
          onBlur: function onBlur() {
            return saveData(plan, null);
          }
        }));
      })), isAdmin && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return addTask(sI, wI);
        },
        className: "mt-6 py-2 text-[10px] font-black text-gray-400 hover:text-cardinal-red hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 flex items-center justify-center gap-2 transition-all uppercase tracking-widest"
      }, /*#__PURE__*/React.createElement("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "3"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "5",
        x2: "12",
        y2: "19"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "5",
        y1: "12",
        x2: "19",
        y2: "12"
      })), " Add Milestone Task"));
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-16 bg-zinc-200 h-[1px] w-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-wrap gap-8 justify-center text-[10px] uppercase font-bold tracking-tighter text-gray-400"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-white border border-gray-300 rounded"
  }), " Needs Action"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-zinc-900 rounded"
  }), " In Progress"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-cardinal-red rounded"
  }), " Completed"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-amber-500 rounded"
  }), " Blocked"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-gray-400 rounded"
  }), " Skipped"))), /*#__PURE__*/React.createElement("footer", {
    className: "text-center p-12 text-gray-400 text-[10px] uppercase tracking-widest font-medium"
  }, "Cardinal Computer Systems | Builds Project Portal | \xA9 2026", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "opacity-50 mt-1 block tracking-normal"
  }, "Proprietary Management System")));
};
var App = function App() {
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    user = _useState22[0],
    setUser = _useState22[1];
  var _useState23 = useState(true),
    _useState24 = _slicedToArray(_useState23, 2),
    loading = _useState24[0],
    setLoading = _useState24[1];
  useEffect(function () {
    if (IS_DEMO_MODE) {
      setLoading(false);
      return;
    }
    var unsub = auth.onAuthStateChanged(function (u) {
      setUser(u);
      setLoading(false);
    });
    return function () {
      return unsub();
    };
  }, []);
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col items-center justify-center bg-zinc-100"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cardinalcomputersystems.com/cardinal-logo.png",
    className: "w-16 h-16 animate-pulse opacity-50 mb-4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-cardinal-red font-black text-xs uppercase tracking-widest"
  }, "Initializing Secure Portal"));
  return user ? /*#__PURE__*/React.createElement(Dashboard, {
    user: user,
    onLogout: function onLogout() {
      return auth.signOut();
    }
  }) : /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: setUser
  });
};
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
