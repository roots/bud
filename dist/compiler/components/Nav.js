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
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
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

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(145);

const {
  Box,
  Spacer,
  Text
} = __webpack_require__(146);

const PropTypes = __webpack_require__(147);
/**
 * List item indicator
 * @prop {boolean} active
 */


const Bullet = ({
  active
}) => /*#__PURE__*/React.createElement(Text, null, active ? '◉' : ' ');

Bullet.propTypes = {
  active: PropTypes.bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} bud
 */

const Nav = ({
  build,
  focused,
  bud
}) => {
  var _build$errors, _build$errors2, _build$warnings, _build$warnings2;

  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: '#545DD7'
  }, "@roots/bud")), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.assets
  }), " Assets")), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 ? '#dc3545' : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.errors) || false
  }), " Errors", (build === null || build === void 0 ? void 0 : (_build$errors2 = build.errors) === null || _build$errors2 === void 0 ? void 0 : _build$errors2.length) > 0 && build.errors[0] ? ` [${build === null || build === void 0 ? void 0 : build.errors.length}]` : `  `)), /*#__PURE__*/React.createElement(Text, null, build.errors[0]), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 ? '#fd7e14' : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.warnings) || false
  }), " Warnings", (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.length) > 0 ? ` [${build === null || build === void 0 ? void 0 : build.warnings.length}]` : `  `)), bud.featureEnabled('hot') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.devServer) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.devServer
  }), " Dev server"))), bud.featureEnabled('browserSync') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.browserSync
  }), " BrowserSync"))), bud.featureEnabled('debug') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.debug) || false
  }), " Debug"))));
};

Nav.propTypes = {
  build: PropTypes.object,
  focused: PropTypes.object,
  bud: PropTypes.object
};
module.exports = {
  Nav
};

/***/ })

/******/ });