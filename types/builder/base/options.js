"use strict";
exports.__esModule = true;
exports.options = void 0;
var env_1 = require("./env");
var configs_1 = require("./configs");
var babelFallback = {
    presets: [],
    plugins: []
};
var postCssFallback = {
    plugins: []
};
/**
 * Options container.
 */
var options = {
    babel: configs_1.configs.babel
        ? require(configs_1.configs.babel)
        : babelFallback,
    postCss: configs_1.configs.postCss
        ? require(configs_1.configs.postCss)
        : postCssFallback,
    typescript: configs_1.configs.typescript
        ? require(configs_1.configs.typescript)
        : {},
    svg: {
        use: [
            require.resolve('@svgr/webpack'),
            require.resolve('url-loader'),
        ]
    },
    auto: {},
    browserSync: {
        host: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
            : 'localhost',
        port: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT
            : 3000,
        proxy: (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
            : null
    },
    copy: {
        patterns: []
    },
    dev: {
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
    },
    devtool: 'cheap-module-source-map',
    entry: {},
    env: env_1.env,
    externals: {
        jquery: 'jQuery',
        lodash: 'lodash',
        moment: 'moment',
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    inlineManifest: {
        name: 'runtime'
    },
    splitting: {
        maxChunks: null
    },
    target: 'web',
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
    vendor: {
        name: 'vendor',
        vendors: []
    },
    dependencyManifest: {
        combineAssets: false,
        injectPolyfill: false,
        outputFormat: 'json'
    }
};
exports.options = options;
