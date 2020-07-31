"use strict";
exports.__esModule = true;
exports.options = void 0;
var env_1 = require("./env");
var container_1 = require("../container");
var auto = {};
var babelFallback = {
    presets: [],
    plugins: []
};
var babel = function (state) {
    return state.configs.has('babel')
        ? state.configs.contents('babel')
        : babelFallback;
};
var browserSync = function (flags) { return ({
    host: flags.get('host'),
    port: flags.get('port'),
    proxy: flags.get('proxy'),
    online: false,
    open: false
}); };
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
var postCss = function (state) {
    return state.configs.has('postCss')
        ? state.configs.contents('postCss')
        : postCssFallback;
};
var target = 'web';
var typescript = function (state) {
    return state.configs.has('typescript')
        ? state.configs.contents('typescript')
        : {};
};
var vendor = { name: 'vendor' };
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
var filenameTemplate = {
    hashed: "[name].[hash:8]",
    "default": '[name]'
};
/**
 * Options container.
 */
var options = function (state) {
    return new container_1.container({
        babel: babel(state),
        postCss: postCss(state),
        typescript: typescript(state),
        auto: auto,
        browserSync: browserSync,
        copy: copy,
        dev: dev,
        dependencyManifest: dependencyManifest,
        devtool: 'source-map',
        env: env_1.env,
        extensions: ['.js', '.json'],
        externals: externals,
        filenameTemplate: filenameTemplate,
        inlineManifest: {
            name: 'runtime'
        },
        splitting: {
            maxChunks: null
        },
        target: target,
        uglify: uglify,
        vendor: vendor,
        watch: watch
    });
};
exports.options = options;
//# sourceMappingURL=options.js.map