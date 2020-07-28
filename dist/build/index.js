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
/******/ 	return __webpack_require__(__webpack_require__.s = 107);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, exports) {

module.exports = require("mini-css-extract-plugin");

/***/ }),
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.devServer = void 0;
/**
 * Dev server
 */
var devServer = function (bud) { return ({
    bud: bud,
    options: {
        devServer: bud.state.options.dev,
    },
    make: function () {
        return this.options;
    },
}); };
exports.devServer = devServer;


/***/ }),
/* 103 */
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
exports.entry = void 0;
/**
 * Entrypoints
 */
var entry = function (bud) { return ({
    bud: bud,
    options: {
        entry: __assign({}, bud.state.options.entry),
    },
    make: function () {
        return this.options;
    },
}); };
exports.entry = entry;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.externals = void 0;
var webpack_node_externals_1 = __importDefault(__webpack_require__(105));
var externals = function (bud) { return ({
    bud: bud,
    options: {},
    make: function () {
        if (this.bud.state.options.externals) {
            this.options.externals = this.bud.state.options.externals;
        }
        if (this.bud.state.options.node) {
            this.options.externals = [webpack_node_externals_1["default"]()];
        }
        return this.options;
    },
}); };
exports.externals = externals;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.general = void 0;
/**
 * General webpack options
 *
 * @this {bud}
 */
var general = function (bud) { return ({
    bud: bud,
    options: {
        context: bud.state.paths.project,
        devtool: bud.state.features.sourceMap
            ? bud.state.options.devtool
            : false,
        mode: bud.mode,
        target: bud.state.options.target,
        watch: bud.state.features.watch,
    },
    make: function () {
        if (this.options.target == 'web') {
            this.options.node = {
                module: 'empty',
                dgram: 'empty',
                dns: 'mock',
                fs: 'empty',
                http2: 'empty',
                net: 'empty',
                tls: 'empty',
                child_process: 'empty',
            };
        }
        return this.options;
    },
}); };
exports.general = general;


/***/ }),
/* 107 */
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
exports.build = void 0;
var entry_1 = __webpack_require__(103);
var devServer_1 = __webpack_require__(102);
var externals_1 = __webpack_require__(104);
var general_1 = __webpack_require__(106);
var index_1 = __webpack_require__(108);
var optimization_1 = __webpack_require__(138);
var output_1 = __webpack_require__(140);
var webpackResolve_1 = __webpack_require__(141);
var plugins_1 = __webpack_require__(142);
var build = function (bud) { return ({
    bud: bud,
    config: {},
    builders: [
        ['entry', entry_1.entry],
        ['output', output_1.output],
        ['rules', index_1.rules],
        ['devServer', devServer_1.devServer],
        ['plugins', plugins_1.plugins],
        ['resolve', webpackResolve_1.webpackResolve],
        ['externals', externals_1.externals],
        ['general', general_1.general],
    ],
    mergeConfig: function (configValues) {
        this.config = __assign(__assign({}, this.config), configValues);
    },
    makeConfig: function () {
        var _this = this;
        this.bud.featureEnabled('optimize')
            && this.builders.push(['optimization', optimization_1.optimization]);
        this.doHook('pre', this.bud.state.options);
        this.builders.map(function (_a) {
            var name = _a[0], builder = _a[1];
            var builderInstance = builder(_this.bud);
            _this.preBuilderHook(name, _this);
            _this.builderOut = builderInstance.make();
            _this.postBuilderHook(name, _this.builderOut);
            _this.mergeConfig(_this.builderOut);
            delete _this.builderOut;
        });
        this.doHook('post', this.config);
        return this.config;
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_webpack", this, params);
    },
    preBuilderHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("pre_" + name, params);
    },
    postBuilderHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call("post_" + name, params);
    },
}); };
exports.build = build;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.rules = void 0;
var eslint_1 = __webpack_require__(109);
var babel_1 = __webpack_require__(125);
var typescript_1 = __webpack_require__(126);
var css_1 = __webpack_require__(127);
var module_1 = __webpack_require__(130);
var scss_1 = __webpack_require__(131);
var module_2 = __webpack_require__(134);
var font_1 = __webpack_require__(135);
var image_1 = __webpack_require__(136);
var svg_1 = __webpack_require__(137);
/**
 * Webpack loaders
 * @type {function} rules
 */
var rules = function (bud) { return ({
    bud: bud,
    options: {},
    /**
     * Make webpack rules
     */
    make: function () {
        this.options = {
            module: {
                rules: [],
            },
        };
        /*     this.bud.state.options.target == 'node' &&
              this.options.module.rules.push({test: patterns.js, loader: loaders.shebang})
         */
        this.bud.featureEnabled('typescript') &&
            this.options.module.rules.push(typescript_1.typescript(this.bud).make());
        this.bud.featureEnabled('eslint')
            && !this.bud.featureEnabled('typescript')
            && this.options.module.rules.push(eslint_1.eslint(this.bud).make());
        this.bud.featureEnabled('babel') &&
            this.options.module.rules.push(babel_1.babel(this.bud).make());
        this.bud.featureEnabled('css') &&
            this.options.module.rules.push(css_1.css(this.bud).make());
        this.bud.featureEnabled('cssModules') &&
            this.options.module.rules.push(module_1.module(this.bud).make());
        this.bud.featureEnabled('scss') &&
            this.options.module.rules.push(scss_1.scss(this.bud).make());
        this.bud.featureEnabled('scssModules') &&
            this.options.module.rules.push(module_2.module(this.bud).make());
        this.bud.featureEnabled('font') &&
            this.options.module.rules.push(font_1.font(this.bud).make());
        this.bud.featureEnabled('image') &&
            this.options.module.rules.push(image_1.image(this.bud).make());
        this.bud.featureEnabled('svg') &&
            this.options.module.rules.push(svg_1.svg(this.bud).make());
        return this.options;
    },
}); };
exports.rules = rules;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.eslint = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var eslint = function (bud) { return ({
    bud: bud,
    rule: {},
    make: function () {
        this.pre();
        this.rule = {
            enforce: 'pre',
            test: patterns_1.patterns.js,
            exclude: patterns_1.patterns.vendor,
            use: [
                {
                    loader: loaders_1.loaders.eslint,
                    options: {
                        configFile: bud.state.configs.eslint,
                        formatter: 'codeframe',
                        failOnError: true,
                    },
                },
            ],
        };
        this.post();
        return this.rule;
    },
    pre: function () {
        this.bud.hooks.call('pre_eslint', this);
    },
    post: function () {
        this.bud.hooks.call('post_eslint', this.rule);
    },
}); };
exports.eslint = eslint;


/***/ }),
/* 110 */
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
/* 111 */
/***/ (function(module, exports) {

module.exports = require("babel-loader");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("css-loader");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("file-loader");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = require("eslint-loader");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("node-loader");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("postcss-loader");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("resolve-url-loader");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("sass-loader");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("style-loader");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("@svgr/webpack");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("url-loader");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("ts-loader");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("shebang-loader");

/***/ }),
/* 124 */
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
/* 125 */
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
exports.babel = void 0;
var loaders_1 = __webpack_require__(110);
/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
var babel = function (bud) { return ({
    bud: bud,
    rule: {},
    /**
     * Make babel rules
     */
    make: function () {
        this.pre();
        this.rule = {
            include: /\.jsx?|\.tsx?/,
            use: [
                {
                    loader: loaders_1.loaders.babel,
                    options: __assign(__assign({}, this.bud.state.options.babel), { rootMode: 'upward' }),
                },
            ],
        };
        this.rule.test = /\.(js|jsx)$/;
        this.post();
        return this.rule;
    },
    /**
     * Hook: pre_babel
     */
    pre: function () {
        this.bud.hooks.call('pre_babel', this);
    },
    /**
     * Hook: post_babel
     */
    post: function () {
        this.bud.hooks.call('post_babel', this.rule);
    },
}); };
exports.babel = babel;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.typescript = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var typescript = function (bud) { return ({
    bud: bud,
    rule: {},
    make: function () {
        this.pre();
        this.rule = {
            test: /\.tsx?$/,
            exclude: patterns_1.patterns.vendor,
            use: [
                {
                    loader: loaders_1.loaders.ts,
                    options: {
                        configFile: bud.state.configs.typescript,
                    },
                },
            ],
        };
        this.post();
        return this.rule;
    },
    /**
     * Hook: pre_typescript
     */
    pre: function () {
        this.bud.hooks.call('pre_typescript', this);
    },
    /**
     * Hook: post_typescript
     */
    post: function () {
        this.bud.hooks.call('post_typescript', this.rule);
    },
}); };
exports.typescript = typescript;


/***/ }),
/* 127 */
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
/* 128 */
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
/* 129 */
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.module = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var postCss_1 = __webpack_require__(128);
var resolveUrl_1 = __webpack_require__(129);
/**
 * CSS modules
 *
 * @return {object}
 */
var module = function (bud) { return ({
    bud: bud,
    rule: {
        test: patterns_1.patterns.cssModule,
        use: [
            loaders_1.loaders.miniCss(bud.featureEnabled('hot')),
            {
                loader: loaders_1.loaders.css,
                options: {
                    modules: true,
                    onlyLocals: false,
                },
            },
            resolveUrl_1.resolveUrl(bud).make(),
        ],
    },
    /**
     * Make CSS Modules object
     */
    make: function () {
        this.pre();
        if (this.bud.featureEnabled('postCss')) {
            this.use.push(postCss_1.postCss(this.bud).make());
        }
        this.post();
        return this.rule;
    },
    /**
     * hook: pre_css_module
     */
    pre: function () {
        this.bud.hooks.call('pre_css_module', this);
    },
    /**
     * hook: post_css_module
     */
    post: function () {
        this.bud.hooks.call('pre_css_module', this.output);
    },
}); };
exports.module = module;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.scss = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var postCss_1 = __webpack_require__(128);
var resolveUrl_1 = __webpack_require__(129);
var implementation_1 = __webpack_require__(132);
/**
 * scss
 */
var scss = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.scss,
    resolveUrl: resolveUrl_1.resolveUrl(bud).make(),
    postCss: postCss_1.postCss(bud).make(),
    scss: {
        loader: loaders_1.loaders.scss,
        options: {
            sourceMap: true,
            implementation: implementation_1.implementation(),
        },
    },
    /**
     * Make SCSS loaders object.
     */
    make: function () {
        this.pre();
        this.output = {
            test: this.test,
            use: Object.values([
                loaders_1.loaders.miniCss(this.bud.featureEnabled('hot')),
                loaders_1.loaders.css,
                this.resolveUrl,
                this.postCss,
                this.scss,
            ]),
        };
        this.post();
        return this.output;
    },
    /**
     * hook: pre_scss
     */
    pre: function () {
        this.bud.hooks.call('pre_scss', this);
    },
    /**
     * hook: post_scss
     */
    post: function () {
        this.bud.hooks.call('post_scss', this.output);
    },
}); };
exports.scss = scss;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.implementation = void 0;
/**
 * resolve whether to use dart-sass or node-sass
 */
var implementation = function () {
    try {
        return /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module 'sass'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'sass'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            : __webpack_require__(133);
    }
    catch (_a) {
        return __webpack_require__(133);
    }
};
exports.implementation = implementation;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = require("node-sass");

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.module = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
var postCss_1 = __webpack_require__(128);
var resolveUrl_1 = __webpack_require__(129);
var implementation_1 = __webpack_require__(132);
/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
var module = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.scssModule,
    css: {
        loader: loaders_1.loaders.css,
        options: {
            modules: true,
            onlyLocals: false,
        },
    },
    resolveUrl: resolveUrl_1.resolveUrl(bud).make(),
    postCss: postCss_1.postCss(bud).make(),
    scss: {
        loader: loaders_1.loaders.scss,
        options: {
            sourceMap: true,
            implementation: implementation_1.implementation(),
        },
    },
    /**
     * Make SCSS loaders object.
     */
    make: function () {
        this.pre();
        this.output = {
            test: this.test,
            use: Object.values([
                loaders_1.loaders.miniCss(this.bud.featureEnabled('hot')),
                ,
                this.css,
                this.resolveUrl,
                this.postCss,
                this.scss,
            ]),
        };
        this.post();
        return this.output;
    },
    /**
     * hook: pre_scss_module
     */
    pre: function () {
        this.bud.hooks.call('pre_scss_module', this);
    },
    /**
     * hook: post_scss_module
     */
    post: function () {
        this.bud.hooks.call('post_scss_module', this.output);
    },
}); };
exports.module = module;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.font = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
/**
 * Font module rules
 *
 * @typedef {function} font
 * @return {object}
 */
var font = function (builder) { return ({
    builder: builder,
    make: function () {
        return {
            test: patterns_1.patterns.font,
            use: [
                {
                    loader: loaders_1.loaders.url,
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        };
    },
}); };
exports.font = font;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.image = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
/**
 * Image module rules
 *
 * @type     {Function} image
 * @property {imageLoaderOptions} options
 * @return {object}
 */
var image = function (bud) { return ({
    bud: bud,
    options: {
        test: patterns_1.patterns.image,
        use: [
            {
                loader: loaders_1.loaders.file,
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    make: function () {
        this.doHook('pre');
        this.doHook('post');
        return this.options;
    },
    doHook: function (name) {
        this.bud.hooks.call(name + "_webpack_rules_image", this.options, this.bud);
    },
}); };
exports.image = image;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.svg = void 0;
var loaders_1 = __webpack_require__(110);
var patterns_1 = __webpack_require__(124);
/**
 * SVG module rules
 * @return {object}
 */
var svg = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.svg,
    loaders: [loaders_1.loaders.svgr, loaders_1.loaders.url],
    /**
     * Make svg rules
     */
    make: function () {
        this.pre();
        this.output = {
            test: this.test,
            use: this.loaders,
        };
        this.post();
        return this.output;
    },
    /**
     * Hook: pre_svg
     */
    pre: function () {
        this.bud.hooks.call('pre_svg', this);
    },
    /**
     * Hook: post_svg
     */
    post: function () {
        this.bud.hooks.call('post_svg', this.output);
    },
}); };
exports.svg = svg;


/***/ }),
/* 138 */
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
/* 139 */
/***/ (function(module, exports) {

module.exports = require("uglifyjs-webpack-plugin");

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.output = void 0;
var output = function (bud) { return ({
    bud: bud,
    options: {
        output: {
            path: bud.state.paths.dist,
            publicPath: bud.state.paths.public,
            filename: bud.state.features.hash
                ? '[name].[hash:8].js'
                : '[name].js',
        },
    },
    make: function () {
        return this.options;
    },
}); };
exports.output = output;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.webpackResolve = void 0;
var path_1 = __webpack_require__(9);
/**
 * Webpack resolvers.
 *
 * @param {object}
 */
var webpackResolve = function (bud) { return ({
    bud: bud,
    options: {
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                bud.project('node_modules'),
                bud.state.paths.src,
            ],
        },
    },
    make: function () {
        /**
         * Resolve modules from framework
         */
        if (this.bud.state.paths.project !== this.bud.state.paths.framework) {
            this.options.resolve.modules.push(path_1.join(this.bud.state.paths.framework, 'node_modules'));
        }
        /**
         * JSX support
         */
        if (this.bud.state.features.jsx) {
            this.options.resolve.extensions.push('.jsx');
        }
        /**
         * TS support
         */
        if (this.bud.state.features.typescript) {
            this.options.resolve.extensions.push('.ts');
            this.options.resolve.extensions.push('.tsx');
        }
        /**
         * Alias resolution
         */
        if (this.bud.state.options.alias) {
            this.options.resolve.alias = this.bud.state.options.alias;
        }
        return this.options;
    },
}); };
exports.webpackResolve = webpackResolve;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.plugins = void 0;
/**
 * Webpack plugins.
 */
var plugins = function (bud) { return ({
    bud: bud,
    pluginQueue: bud.state.plugins.adapters,
    make: function () {
        var _this = this;
        this.doHook('pre');
        this.plugins = this.pluginQueue
            .map(function (plugin) {
            return _this.bud.plugin.controller
                .initController(plugin)
                .buildPlugin();
        })
            .filter(function (plugin) { return plugin !== undefined; });
        this.doHook('post');
        return {
            plugins: this.plugins,
        };
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_plugins", this, params);
    },
}); };
exports.plugins = plugins;


/***/ })
/******/ ]);