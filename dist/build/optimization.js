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
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ({

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.optimization = void 0;
var uglifyjs_webpack_plugin_1 = __importDefault(__webpack_require__(139));
/**
 * Webpack optimization
 * @type {function} optimization
 */
var optimization = function (bud) { return ({
    bud: bud,
    supports: {
        minify: bud.state.features.minify,
        runtimeChunk: bud.state.features.inlineManifest,
        vendor: bud.state.features.vendor,
    },
    options: {
        optimization: {
            minimize: bud.state.features.minify,
            removeAvailableModules: false,
            removeEmptyChunks: false,
            moduleIds: 'hashed',
        },
    },
    splitChunksOptions: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: bud.state.options.vendor.name,
                chunks: 'all',
                priority: -20,
            },
        },
    },
    runtimeChunkOptions: {
        name: function (entrypoint) { return "runtime/" + entrypoint.name; },
    },
    uglifyOptions: bud.state.options.uglify,
    make: function () {
        this.whenSupported('runtimeChunk', this.setRuntimeChunk);
        this.whenSupported('vendor', this.setSplitChunks);
        this.whenSupported('minify', this.setMinimizer);
        return this.options;
    },
    whenSupported: function (feature, callback) {
        this.currentCallback = callback;
        this.supports[feature] && this.currentCallback();
    },
    setRuntimeChunk: function () {
        this.doHook('pre_runtimechunk');
        this.options.optimization.runtimeChunk = this.runtimeChunkOptions;
        this.doHook('post_runtimechunk');
    },
    setSplitChunks: function () {
        this.doHook('pre_splitchunks');
        this.options.optimization.splitChunks = this.splitChunksOptions;
        this.doHook('post_splitchunks');
    },
    setMinimizer: function () {
        this.doHook('pre_minimizer', this);
        if (!this.bud.featureEnabled('terser')) {
            this.options.optimization.minimizer = [this.uglify()];
        }
        this.doHook('post_minimizer', this);
    },
    uglify: function () {
        this.doHook('pre_uglify', this);
        var uglify = new uglifyjs_webpack_plugin_1["default"](this.uglifyOptions);
        this.doHook('post_uglify', this);
        return uglify;
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("webpack_optimization_" + name, this, params);
    },
}); };
exports.optimization = optimization;


/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports = require("uglifyjs-webpack-plugin");

/***/ })

/******/ });