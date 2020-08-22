/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
var babelFallback = {
    presets: [require.resolve('@babel/preset-env')],
    plugins: [],
};
var babel = function (configs) {
    return configs.get('babel')
        ? configs.require('babel')
        : babelFallback;
};
var browsersync = function (flags) { return ({
    host: flags.has('host') ? flags.get('host') : 'localhost',
    port: flags.get('port') ? flags.get('port') : 3000,
    proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
    online: false,
    open: false,
}); };
var copy = { patterns: [] };
var postcss = function (configs) {
    var fallback = {
        plugins: [require('postcss-import'), require('autoprefixer')],
    };
    return configs.has('postcss')
        ? configs.require('postcss')
        : fallback;
};
var target = 'web';
/**
 * Options container.
 */
var options = {
    repository: 'options',
    contents: {
        resolve: {
            alias: false,
            extensions: ['.css', '.js', '.json', '.svg'],
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
        devtool: 'source-map',
        optimization: {
            runtimeChunk: {
                name: function (entrypoint) { return "runtime/" + entrypoint.name; },
            },
            splitChunks: {
                cacheGroup: {
                    vendor: {
                        test: /node_modules/,
                        name: 'vendor.js',
                        chunks: 'all',
                        priority: -20,
                    },
                },
            },
        },
        stats: {
            version: true,
            hash: true,
            assets: true,
            errors: true,
            warnings: true,
        },
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        adapters: {
            browsersync: browsersync,
            clean: {},
            fixStyleOnlyEntries: {
                silent: true,
            },
            hotModuleReplacement: {},
            terser: {
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                cache: true,
                parallel: true,
            },
        },
        patterns: [],
        postcss: postcss,
        babel: babel,
        splitting: {
            maxChunks: null,
        },
        target: target,
        copy: copy,
        filenameTemplate: {
            hashed: '[name].[hash:8]',
            "default": '[name]',
        },
        manifest: {
            name: 'manifest.json',
        },
    },
};

export { options };
