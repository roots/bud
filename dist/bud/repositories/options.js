"use strict";
exports.__esModule = true;
exports.typescript = exports.postCss = exports.browserSync = exports.babel = exports.options = void 0;
var babelFallback = {
    presets: [],
    plugins: []
};
var babel = function (configs) {
    return configs.has('babel') ? configs.require('babel') : babelFallback;
};
exports.babel = babel;
var browserSync = function (flags) { return ({
    host: flags.has('host') ? flags.get('host') : 'localhost',
    port: flags.get('port') ? flags.get('port') : 3000,
    proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
    online: false,
    open: false
}); };
exports.browserSync = browserSync;
var copy = { patterns: [] };
var dependencyManifest = {
    combineAssets: false,
    combinedOutputFile: null,
    injectPolyfill: false,
    outputFormat: 'json',
    useDefaults: true
};
var postCss = function (configs) {
    var fallback = { plugins: [] };
    return configs.has('postCss') ? configs.require('postCss') : fallback;
};
exports.postCss = postCss;
var target = 'web';
var terser = {
    terserOptions: {
        parse: {
            ecma: 8
        },
        compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
        },
        mangle: {
            safari10: true
        },
        output: {
            ecma: 5,
            comments: false,
            ascii_only: true
        }
    },
    cache: true,
    parallel: true
};
var typescript = function (configs) { return configs.has('typescript') ? configs.require('typescript') : null; };
exports.typescript = typescript;
/**
 * Options container.
 */
var options = {
    copy: copy,
    dependencyManifest: dependencyManifest,
    dev: {},
    devtool: 'source-map',
    extensions: ['.js', '.json'],
    filenameTemplate: {
        hashed: '[name].[hash:8]',
        "default": '[name]'
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    inlineManifest: {
        name: 'runtime'
    },
    splitting: {
        maxChunks: null
    },
    target: target,
    terser: terser,
    uglify: {
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
    },
    vendor: { name: 'vendor' }
};
exports.options = options;
//# sourceMappingURL=options.js.map