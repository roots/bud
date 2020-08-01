"use strict";
exports.__esModule = true;
exports.typescript = exports.postCss = exports.browserSync = exports.babel = exports.options = void 0;
var babelFallback = {
    presets: [],
    plugins: []
};
var babel = function (configs) {
    return configs.has('babel') ? configs.contents('babel') : babelFallback;
};
exports.babel = babel;
var browserSync = function (flags) { return ({
    host: flags.get('host'),
    port: flags.get('port'),
    proxy: flags.get('proxy'),
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
var watch = [];
var dev = {
    disableHostCheck: true,
    host: 'localhost',
    headers: {},
    proxy: {}
};
var postCss = function (configs) {
    var fallback = { plugins: [] };
    return configs.has('postCss') ? configs.contents('postCss') : fallback;
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
var typescript = function (configs) {
    return configs.has('typescript') ? configs.contents('typescript') : {};
};
exports.typescript = typescript;
/**
 * Options container.
 */
var options = {
    copy: copy,
    dev: dev,
    dependencyManifest: dependencyManifest,
    devtool: 'source-map',
    extensions: ['.js', '.json'],
    filenameTemplate: {
        hashed: "[name].[hash:8]",
        "default": '[name]'
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
    vendor: { name: 'vendor' },
    watch: watch
};
exports.options = options;
//# sourceMappingURL=options.js.map