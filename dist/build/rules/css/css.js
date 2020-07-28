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
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
/******/ })
/************************************************************************/
/******/ ({

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loaders = void 0;
var mini_css_extract_plugin_1 = __importDefault(__webpack_require__(91));
/**
 * Style loaders
 *
 * @type {object} loaders
 */
var loaders = {
    babel: /*require.resolve*/(111),
    css: /*require.resolve*/(112),
    file: /*require.resolve*/(113),
    eslint: /*require.resolve*/(114),
    miniCss: function (hot) { return ({
        loader: mini_css_extract_plugin_1["default"].loader,
    }); },
    node: /*require.resolve*/(115),
    postCss: /*require.resolve*/(116),
    resolveUrl: /*require.resolve*/(117),
    scss: /*require.resolve*/(118),
    style: /*require.resolve*/(119),
    svgr: /*require.resolve*/(120),
    url: /*require.resolve*/(121),
    ts: /*require.resolve*/(122),
    shebang: /*require.resolve*/(123),
};
exports.loaders = loaders;


/***/ }),

/***/ 111:
/***/ (function(module, exports) {

module.exports = require("babel-loader");

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports = require("css-loader");

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

module.exports = require("file-loader");

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

module.exports = require("eslint-loader");

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

module.exports = require("node-loader");

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

module.exports = require("postcss-loader");

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

module.exports = require("resolve-url-loader");

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

module.exports = require("sass-loader");

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

module.exports = require("style-loader");

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

module.exports = require("@svgr/webpack");

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = require("url-loader");

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

module.exports = require("ts-loader");

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

module.exports = require("shebang-loader");

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.patterns = void 0;
/**
 * loader test regex patterns
 *
 * @typedef {object} pattern
 * @prop {RegExp} sass
 * @prop {RegExp} sassModule
 * @prop {RegExp} css
 * @prop {cssModule} cssModule
 */
var patterns = {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    scss: /\.scss$/,
    scssModule: /\.module\.(scss|sass)$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    svg: /\.svg$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    vendor: /node_modules/,
    image: /\.(png|svg|jpg|gif)$/,
};
exports.patterns = patterns;


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.css = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var postCss_1 = __webpack_require__(128);
var resolveUrl_1 = __webpack_require__(129);
/**
 * Css
 * @return {object}
 */
var css = function (bud) { return ({
    bud: bud,
    test: patterns_1.patterns.css,
    sourceMap: bud.featureEnabled('map'),
    make: function () {
        this.use = [
            loaders_1.loaders.miniCss(this.bud.featureEnabled('hot')),
            loaders_1.loaders.css,
            resolveUrl_1.resolveUrl(this.bud).make(),
        ];
        if (this.bud.featureEnabled('postCss')) {
            this.use.push(__assign({}, postCss_1.postCss(this.bud).make()));
        }
        this.bud.hooks.call('pre_css', this);
        this.output = {
            test: this.test,
            use: this.use,
        };
        this.bud.hooks.call('post_css', {
            output: this.output,
        });
        return this.output;
    },
}); };
exports.css = css;


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.postCss = void 0;
var loaders_1 = __webpack_require__(110);
/**
 * PostCSS
 * @typedef {function} postCss
 * @return {object}
 */
var postCss = function (bud) { return ({
    bud: bud,
    config: {
        loader: loaders_1.loaders.postCss,
        options: __assign({ ident: 'postcss', parser: 'postcss-scss' }, bud.state.options.postCss),
    },
    output: {},
    make: function () {
        this.bud.hooks.call('pre_postcss', this);
        this.output = this.bud.state.features.postCss ? this.config : {};
        this.bud.hooks.call('post_postcss', this.output);
        return this.output;
    },
}); };
exports.postCss = postCss;


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.resolveUrl = void 0;
var loaders_1 = __webpack_require__(110);
var resolveUrl = function (bud) { return ({
    bud: bud,
    loader: loaders_1.loaders.resolveUrl,
    options: {
        engine: 'postcss',
        sourceMap: bud.state.features.map,
        debug: true,
    },
    make: function () {
        this.bud.hooks.call('pre_resolveurl', this);
        this.output = {
            loader: this.loader,
            options: this.options,
        };
        this.bud.hooks.call('post_resolveurl', this.output);
        return this.output;
    },
}); };
exports.resolveUrl = resolveUrl;


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

module.exports = require("mini-css-extract-plugin");

/***/ })

/******/ });