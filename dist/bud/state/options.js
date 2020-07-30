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
exports.options = void 0;
var env_1 = require("./env");
var flags_1 = require("./flags");
var configs_1 = require("./configs");
var auto = {};
var babelFallback = {
    presets: [],
    plugins: []
};
var babel = configs_1.configs.has('babel')
    ? configs_1.configs.contents('babel')
    : babelFallback;
var browserSync = {
    host: flags_1.flags.get('host'),
    port: flags_1.flags.get('port'),
    proxy: flags_1.flags.get('proxy'),
    online: false,
    open: false
};
var copy = { patterns: [] };
var dependencyManifest = {
    combineAssets: false,
    combinedOutputFile: null,
    injectPolyfill: false,
    outputFormat: 'json',
    useDefaults: true
};
var watch = [];
var dev = {
    disableHostCheck: true,
    host: 'localhost',
    headers: {},
    proxy: {}
};
var externals = null;
var postCssFallback = {
    plugins: []
};
var postCss = configs_1.configs.has('postCss')
    ? configs_1.configs.contents('postCss')
    : postCssFallback;
var target = 'web';
var typescript = configs_1.configs.has('typescript')
    ? configs_1.configs.contents('typescript')
    : {};
var vendor = { name: 'vendor' };
var vue = {};
var uglify = {
    cache: true,
    chunkFilter: function (_a) {
        var name = _a.name;
        return name === 'vendor';
    },
    extractComments: false,
    parallel: true,
    uglifyOptions: {
        output: {
            beautify: false
        },
        compress: false,
        mangle: {
            toplevel: true
        }
    }
};
/**
 * Options container.
 */
var options = {
    repository: {
        alias: null,
        babel: babel,
        postCss: postCss,
        typescript: typescript,
        auto: auto,
        browserSync: browserSync,
        copy: copy,
        dev: dev,
        dependencyManifest: dependencyManifest,
        devtool: 'source-map',
        entry: {},
        env: env_1.env,
        extensions: ['.js', '.json'],
        externals: externals,
        inlineManifest: {
            name: 'runtime'
        },
        node: {},
        splitting: {
            maxChunks: null
        },
        target: target,
        terser: {},
        uglify: uglify,
        vue: vue,
        vendor: vendor,
        watch: watch
    },
    get: function (option) {
        return this.repository[option];
    },
    set: function (option, value) {
        var _a;
        this.repository = __assign(__assign({}, this.repository), (_a = {}, _a[option] = value, _a));
    },
    merge: function (option, value) {
        var _a;
        this.repository = __assign(__assign({}, this.repository), (_a = {}, _a[option] = __assign(__assign({}, this.repository[option]), value), _a));
    },
    has: function (option) {
        return this.repository.hasOwnProperty(option);
    },
    is: function (option, value) {
        return this.get(option) === value;
    }
};
exports.options = options;
//# sourceMappingURL=options.js.map