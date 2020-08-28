"use strict";
exports.__esModule = true;
exports.options = void 0;
var target = 'web';
var babelFallback = {
    presets: [
        [
            require.resolve('@babel/preset-env'),
            {
                modules: false,
                forceAllTransforms: true
            },
        ],
    ],
    plugins: [
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        [
            require.resolve('@babel/plugin-transform-runtime'),
            {
                helpers: false
            },
        ],
    ]
};
var browsersync = function (flags) { return ({
    host: flags.has('host') ? flags.get('host') : 'localhost',
    port: flags.get('port') ? flags.get('port') : 3000,
    proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
    online: false,
    open: false
}); };
var copy = { patterns: [] };
var babel = function (configs) {
    return configs.get('babel')
        ? configs.require('babel')
        : babelFallback;
};
var postcss = function (configs) {
    var fallback = {
        plugins: [require('postcss-import'), require('autoprefixer')]
    };
    return configs.has('postcss')
        ? configs.require('postcss')
        : fallback;
};
/** Options container. */
var options = {
    name: 'options',
    register: {
        babel: babel,
        postcss: postcss,
        patterns: [],
        webpack: {
            devServer: {
                host: 'localhost',
                port: 3000,
                disableHostCheck: true,
                watchOptions: {
                    poll: true
                },
                writeToDisk: true,
                inline: true,
                overlay: {
                    errors: true,
                    warnings: false
                },
                hotOnly: true,
                publicPath: '/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
                }
            },
            entry: {},
            externals: {},
            resolve: {
                alias: false,
                extensions: ['.css', '.js', '.json', '.svg']
            },
            devtool: 'source-map',
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
            optimization: {
                runtimeChunk: {
                    name: function (entrypoint) { return "runtime/" + entrypoint.name; }
                },
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: function (module, chunks, cacheGroupKey) {
                                var moduleFileName = module
                                    .identifier()
                                    .split('/')
                                    .reduceRight(function (item) { return item; });
                                var allChunksNames = chunks
                                    .map(function (item) { return item.name; })
                                    .join('~');
                                return cacheGroupKey + "---" + allChunksNames + "---" + moduleFileName;
                            },
                            chunks: 'all',
                            automaticNamePrefix: 'vendor'
                        }
                    }
                }
            },
            plugins: {
                browsersync: browsersync,
                clean: {},
                copy: copy,
                fixStyleOnlyEntries: {
                    silent: true
                },
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
                    parallel: true
                }
            },
            stats: {
                version: true,
                hash: true,
                assets: true,
                errors: true,
                warnings: true
            },
            target: target
        },
        splitting: {
            maxChunks: 9999
        },
        filenameTemplate: {
            hashed: '[name].[hash:8]',
            "default": '[name]'
        },
        manifest: {
            name: 'manifest'
        }
    }
};
exports.options = options;
//# sourceMappingURL=options.js.map