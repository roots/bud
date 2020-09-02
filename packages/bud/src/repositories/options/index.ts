import type {
  BabelTransformOptions,
  WebpackTarget,
  RepositoryDefinition,
} from '@roots/bud-typings'

const babelFallback: BabelTransformOptions = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        forceAllTransforms: true,
      },
    ],
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
  ],
}

const babel: (configs) => BabelTransformOptions = function (configs) {
  return configs.get('babel')
    ? configs.require('babel')
    : babelFallback
}

const postcssFallback = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: {
    import: require('postcss-import'),
    autoprefixer: require('autoprefixer'),
  },
}

const postcss: (configs) => any = function (configs) {
  return configs.get('postcss')
    ? configs.require('postcss')
    : postcssFallback
}

export type Copy = {patterns: any[]}
const copy: Copy = {patterns: []}

const target: WebpackTarget = 'web'

/** Options container. */
const options: RepositoryDefinition = {
  name: 'options',
  register: {
    babel,
    postcss,
    patterns: [],
    webpack: {
      devServer: {
        host: 'localhost',
        port: 3000,
        disableHostCheck: true,
        inline: true,
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization',
        },
      },
      entry: {},
      externals: {},
      resolve: {
        alias: false,
        extensions: ['.css', '.js', '.json', '.svg'],
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
        child_process: 'empty',
      },
      optimization: {
        runtimeChunk: {
          name: entrypoint => `runtime/${entrypoint.name}`,
        },
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: function (module, chunks, cacheGroupKey) {
                const moduleFileName = module
                  .identifier()
                  .split('/')
                  .reduceRight(item => item)
                  .replace('.js', '')
                const allChunksNames = chunks
                  .map(item => item.name)
                  .join('~')
                return `${cacheGroupKey}/${allChunksNames}~${moduleFileName}`
              },
              chunks: 'all',
              automaticNamePrefix: 'vendor',
            },
          },
        },
      },
      plugins: {
        clean: {},
        copy,
        fixStyleOnlyEntries: {
          silent: true,
        },
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
      stats: 'detailed',
      target,
    },
    splitting: {
      maxChunks: 9999,
    },
    filenameTemplate: {
      hashed: '[name].[hash:8]',
      default: '[name]',
    },
    manifest: {
      name: 'manifest',
    },
  },
}

export {options as default}
