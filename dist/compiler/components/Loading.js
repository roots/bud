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
/******/ 	return __webpack_require__(__webpack_require__.s = 159);
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

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(145);

const {
  Box,
  Text
} = __webpack_require__(146);

const {
  Bar
} = __webpack_require__(160);

const PropTypes = __webpack_require__(147);
/**
 * Loading (Progress Plugin)
 */


const Loading = ({
  build,
  width
}) => {
  var _build$percentage;

  return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? /*#__PURE__*/React.createElement(Box, {
    maxWidth: width,
    textWrap: "truncate",
    flexDirection: "row"
  }, /*#__PURE__*/React.createElement(Text, {
    bgcolor: '#171c56'
  }, /*#__PURE__*/React.createElement(Text, {
    width: 6
  }, Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100), "%", (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' ')), /*#__PURE__*/React.createElement(Text, {
    color: '#545DD7'
  }, /*#__PURE__*/React.createElement(Bar, {
    character: "\u2588",
    percent: (_build$percentage = build === null || build === void 0 ? void 0 : build.percentage) !== null && _build$percentage !== void 0 ? _build$percentage : 0.01
  }))) : [];
};

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number
};
module.exports = {
  Loading
};

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

const React = __webpack_require__(145);

const {
  Text
} = __webpack_require__(146);

const PropTypes = __webpack_require__(147);

const blacklist = __webpack_require__(161);

const BLACKLIST_PROPS = ['percent', 'left', 'right', 'columns', 'character', 'rightPad'];

class Bar extends React.Component {
  getString() {
    const {
      percent,
      columns,
      left,
      right,
      character,
      rightPad
    } = this.props;
    const screen = columns || process.stdout.columns || 80;
    const space = screen - right - left;
    const max = Math.min(Math.floor(space * percent), space);
    const chars = character.repeat(max);

    if (!rightPad) {
      return chars;
    }

    return chars + ' '.repeat(space - max);
  }

  render() {
    const props = blacklist(this.props, BLACKLIST_PROPS);
    return /*#__PURE__*/React.createElement(Text, props, this.getString());
  }

}

Bar.defaultProps = {
  columns: 0,
  percent: 1,
  left: 0,
  right: 0,
  character: '█',
  rightPad: false
};
Bar.propTypes = {
  columns: PropTypes.number,
  percent: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  character: PropTypes.string,
  rightPad: PropTypes.bool
};
module.exports = {
  Bar
};

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

module.exports = require("blacklist");

/***/ })

/******/ });