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
/******/ 	return __webpack_require__(__webpack_require__.s = 162);
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

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(145);

const {
  useEffect
} = React;

const {
  Box,
  Spacer,
  Text,
  useFocus
} = __webpack_require__(146);

const PropTypes = __webpack_require__(147);
/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */


const Indicator = ({
  emitted
}) => /*#__PURE__*/React.createElement(Text, {
  color: emitted ? '#545DD7' : '#6C758F'
}, "\u29BF ");

Indicator.propTypes = {
  emitted: PropTypes.bool
};
/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */

const Asset = ({
  asset
}) => {
  const display = asset.name.split('.').pop() == 'css' || asset.name.split('.').pop() == 'js';
  return !display ? [] : /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Indicator, {
    emitted: asset.emitted
  }), /*#__PURE__*/React.createElement(Text, {
    color: asset.emitted ? 'white' : 'gray'
  }, asset.name)), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    dimColor: "white"
  }, asset.size / 1000, "kb")));
};

Asset.propTypes = {
  asset: PropTypes.object
};
/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */

const Assets = ({
  build,
  actions
}) => {
  var _build$assets, _build$assets2;

  const {
    isFocused
  } = useFocus({
    autoFocus: true
  });
  useEffect(() => {
    actions.setFocus({
      assets: isFocused
    });
  }, [isFocused]);
  return /*#__PURE__*/React.createElement(Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, build === null || build === void 0 ? void 0 : (_build$assets = build.assets) === null || _build$assets === void 0 ? void 0 : _build$assets.map((asset, id) => /*#__PURE__*/React.createElement(Asset, {
    key: id,
    asset: asset
  })), (build === null || build === void 0 ? void 0 : (_build$assets2 = build.assets) === null || _build$assets2 === void 0 ? void 0 : _build$assets2.length) == 0 && /*#__PURE__*/React.createElement(Text, null, "Loading"));
};

Assets.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
  width: PropTypes.number
};
module.exports = {
  Assets
};

/***/ })

/******/ });