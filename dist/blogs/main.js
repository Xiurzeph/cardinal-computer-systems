"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;
var ADMIN_EMAIL = "xiurzeph112112@gmail.com";

// Firebase Init
var firebaseConfig = {
  apiKey: "AIzaSyC3T-SIQxCSZPd9Vbg7ixDy3hhwfJ5t7rc",
  authDomain: "cardinal-computer-center.firebaseapp.com",
  projectId: "cardinal-computer-center",
  storageBucket: "cardinal-computer-center.firebasestorage.app",
  messagingSenderId: "606626380669",
  appId: "1:606626380669:web:ff374410281763905d6a14",
  measurementId: "G-5SGWF0RT8C"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();
var auth = firebase.auth();
var BlogApp = function BlogApp() {
  var _user$email;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    posts = _useState2[0],
    setPosts = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    user = _useState4[0],
    setUser = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    editingPost = _useState6[0],
    setEditingPost = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isMenuOpen = _useState8[0],
    setIsMenuOpen = _useState8[1];
  useEffect(function () {
    var unsubscribe = db.collection('blogs').orderBy('date', 'desc').onSnapshot(function (snapshot) {
      var data = snapshot.docs.map(function (doc) {
        return _objectSpread({
          id: doc.id
        }, doc.data());
      });
      setPosts(data);
    });
    var authUnsub = auth.onAuthStateChanged(function (u) {
      return setUser(u);
    });
    return function () {
      unsubscribe();
      authUnsub();
    };
  }, []);
  var isAdmin = (user === null || user === void 0 || (_user$email = user.email) === null || _user$email === void 0 ? void 0 : _user$email.toLowerCase()) === ADMIN_EMAIL.toLowerCase();
  var handleSave = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var postData;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            postData = {
              title: e.target.title.value,
              content: e.target.content.value,
              date: new Date().toISOString()
            };
            if (!(editingPost !== null && editingPost !== void 0 && editingPost.id)) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return db.collection('blogs').doc(editingPost.id).update(postData);
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.n = 3;
            return db.collection('blogs').add(postData);
          case 3:
            setEditingPost(null);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSave(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDelete = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!window.confirm("Are you sure you want to delete this post forever?")) {
              _context2.n = 1;
              break;
            }
            _context2.n = 1;
            return db.collection('blogs').doc(id)["delete"]();
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handleDelete(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleShare = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(post) {
      var _t;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!navigator.share) {
              _context3.n = 5;
              break;
            }
            _context3.p = 1;
            _context3.n = 2;
            return navigator.share({
              title: post.title,
              text: "Check out this post from Cardinal Computer Systems: ".concat(post.title),
              url: window.location.href
            });
          case 2:
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t = _context3.v;
            console.log("Share failed", _t);
          case 4:
            _context3.n = 6;
            break;
          case 5:
            alert("Copy this link to share: " + window.location.href);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return function handleShare(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  var NavItem = function NavItem(_ref4) {
    var href = _ref4.href,
      text = _ref4.text,
      _ref4$active = _ref4.active,
      active = _ref4$active === void 0 ? false : _ref4$active;
    return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: href,
      className: "text-white font-medium hover:text-brand-yellow transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-brand-yellow after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ".concat(active ? 'text-brand-yellow after:w-full' : '')
    }, text));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col pt-20"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-brand-red text-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://cardinalcomputersystems.com/",
    className: "flex items-center gap-3 group"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../cardinal-logo.png",
    alt: "Logo",
    className: "h-10 w-auto transition-transform group-hover:scale-105"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xl md:text-2xl font-bold text-white tracking-tight"
  }, "Cardinal Computer Systems")), /*#__PURE__*/React.createElement("ul", {
    className: "hidden md:flex list-none gap-8 items-center mb-0"
  }, /*#__PURE__*/React.createElement(NavItem, {
    href: "https://cardinalcomputersystems.com/",
    text: "Home"
  }), user ? /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return auth.signOut();
    },
    className: "text-white font-bold hover:text-brand-yellow text-sm underline"
  }, "Sign Out")) : /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(function (result) {
        console.log("Logged in as:", result.user.email);
      })["catch"](function (error) {
        console.error("Auth Error:", error.code, error.message);
      });
    },
    className: "bg-white/20 text-white px-3 py-1 rounded text-xs font-bold hover:bg-white/30"
  }, "Admin"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow max-w-4xl mx-auto w-full px-6 pt-32 pb-12"
  }, isAdmin && /*#__PURE__*/React.createElement("div", {
    className: "mb-8 flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setEditingPost({});
    },
    className: "bg-brand-red text-white px-6 py-2 rounded shadow-lg font-bold hover:bg-brand-dark"
  }, "+ Create New Post")), isAdmin && editingPost && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    className: "bg-white p-8 rounded shadow-xl mb-12 border-t-4 border-brand-red animate-modalSlideIn"
  }, /*#__PURE__*/React.createElement("input", {
    name: "title",
    defaultValue: editingPost.title,
    placeholder: "Post Title",
    className: "w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-brand-red outline-none font-bold",
    required: true
  }), /*#__PURE__*/React.createElement("textarea", {
    name: "content",
    defaultValue: editingPost.content,
    placeholder: "Post Body (Markdown supported: # Header, **Bold**, - List)",
    className: "w-full h-80 p-3 border rounded font-mono text-sm focus:ring-2 focus:ring-brand-red outline-none mb-4",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-brand-red text-white px-6 py-2 rounded font-bold"
  }, "Publish Post"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setEditingPost(null);
    },
    className: "text-gray-500"
  }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-12"
  }, posts.map(function (post) {
    return /*#__PURE__*/React.createElement("article", {
      key: post.id,
      className: "bg-white p-8 rounded shadow-sm border-l-4 border-brand-red group relative"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl font-bold text-gray-900 mb-2"
    }, post.title), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-center mb-6"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-400 font-bold uppercase tracking-widest"
    }, new Date(post.date).toLocaleDateString(undefined, {
      dateStyle: 'long'
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleShare(post);
      },
      className: "text-gray-400 hover:text-brand-red transition-colors flex items-center gap-1 text-xs font-bold uppercase"
    }, "Share ", /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "prose max-w-none text-gray-700 leading-relaxed",
      dangerouslySetInnerHTML: {
        __html: marked.parse(post.content || '')
      }
    }), isAdmin && /*#__PURE__*/React.createElement("div", {
      className: "mt-8 pt-4 border-t flex gap-6"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setEditingPost(post);
      },
      className: "text-brand-red font-bold text-sm underline uppercase"
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleDelete(post.id);
      },
      className: "text-red-800 font-bold text-sm underline uppercase"
    }, "Delete Post")));
  }))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-brand-red text-white py-12 text-center text-sm uppercase tracking-widest font-bold"
  }, "\xA9 2026 Cardinal Computer Systems | All Rights Reserved"));
};
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(BlogApp, null));
