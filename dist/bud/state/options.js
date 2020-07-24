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
    host: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
        : 'localhost',
    port: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000,
    proxy: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
        : null
};
var copy = { patterns: [] };
var dependencyManifest = {
    combineAssets: undefined,
    combinedOutputFile: undefined,
    injectPolyfill: false,
    outputFormat: 'json',
    useDefaults: true
};
var dev = {
    clientLogLevel: 'none',
    compress: true,
    disableHostCheck: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hotOnly: true,
    injectHot: true,
    open: false,
    overlay: true,
    watchOptions: {
        aggregateTimeout: 300
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
    svg: {
        use: [
            require.resolve('@svgr/webpack'),
            require.resolve('url-loader'),
        ]
    },
    auto: auto,
    browserSync: browserSync,
    copy: copy,
    dev: dev,
    dependencyManifest: dependencyManifest,
    devtool: 'cheap-module-source-map',
    entry: {},
    env: env_1.env,
    externals: externals,
    inlineManifest: {
        name: 'runtime'
    },
    splitting: {
        maxChunks: null
    },
    target: target,
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