var babelFallback = {
    presets: [],
    plugins: []
};
var babel = function (configs) {
    return configs.has('babel') ? configs.require('babel') : babelFallback;
};
var browserSync = function (flags) { return ({
    host: flags.has('host') ? flags.get('host') : 'localhost',
    port: flags.get('port') ? flags.get('port') : 3000,
    proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
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
var postCss = function (configs) {
    var fallback = { plugins: [] };
    return configs.has('postCss') ? configs.require('postCss') : fallback;
};
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
    postCss: {},
    scss: {},
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
export { options, babel, browserSync, postCss };
//# sourceMappingURL=options.js.map