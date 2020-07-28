/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 163);
/******/ })
/************************************************************************/
/******/ ({

/***/ 145:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

module.exports = require("ink");

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(145);

const {
  useEffect,
  useState
} = React;

const {
  Box,
  Text,
  useFocus
} = __webpack_require__(146);

const PropTypes = __webpack_require__(147);

const patchConsole = __webpack_require__(164);
/**
 * BrowserSync info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */


const BrowserSync = ({
  actions
}) => {
  const {
    isFocused
  } = useFocus({
    autoFocus: false
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      browserSync: isFocused
    });
  }, [isFocused]);
  /**
   * Capture BrowserSync console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the BrowserSync watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */

  const [lastConsole, setLastConsole] = useState(null);
  const [consoleOut, setConsoleOut] = useState('');
  patchConsole((stream, data) => {
    setLastConsole(data);
    const frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
    setConsoleOut(frameOut);
  });
  return /*#__PURE__*/React.createElement(Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Text, null, consoleOut));
};

BrowserSync.propTypes = {
  actions: PropTypes.object
};
module.exports = {
  BrowserSync
};

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

module.exports = require("patch-console");

/***/ })

/******/ });