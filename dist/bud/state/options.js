"use strict";
exports.__esModule = true;
exports.options = void 0;
var env_1 = require("./env");
var configs_1 = require("./configs");
var auto = {};
var babelFallback = {
    presets: [],
    plugins: []
};
var babel = configs_1.configs.babel
    ? require(configs_1.configs.babel)
    : babelFallback;
var browserSync = {
    host: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST : 'localhost',
    port: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000,
    proxy: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY : null,
    online: false,
    open: false
};
var copy = { patterns: [] };
var dependencyManifest = {
    combineAssets: undefined,
    combinedOutputFile: undefined,
    injectPolyfill: false,
    outputFormat: 'json',
    useDefaults: true
};
var watchList = [
    './resources/views/**/*.blade.php'
];
var dev = {
    disableHostCheck: true,
    host: 'localhost',
    headers: {},
    proxy: {},
    stats: {
        colors: true
    }
};
var externals = {};
var postCssFallback = {
    plugins: []
};
var postCss = configs_1.configs.postCss
    ? require(configs_1.configs.postCss)
    : postCssFallback;
var target = 'web';
var typescript = configs_1.configs.typescript
    ? require(configs_1.configs.typescript)
    : {};
var vendor = { name: 'vendor' };
/**
 * Options container.
 */
var options = {
    alias: {},
    babel: babel,
    postCss: postCss,
    typescript: typescript,
    auto: auto,
    browserSync: browserSync,
    copy: copy,
    devWatch: [],
    dev: dev,
    dependencyManifest: dependencyManifest,
    devtool: 'source-map',
    entry: {},
    env: env_1.env,
    externals: externals,
    inlineManifest: {
        name: 'runtime'
    },
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    splitting: {
        maxChunks: null
    },
    target: target,
    terser: {
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
        parallel: true,
        sourceMap: true
    },
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
    vendor: vendor
};
exports.options = options;
//# sourceMappingURL=options.js.map