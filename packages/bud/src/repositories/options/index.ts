import type {
  WebpackEntry,
  WebpackTarget,
  RepositoryDefinition,
} from '@roots/bud-typings'

import babel from './babel'
import postcss from './postcss'

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
          name: (entrypoint: any): string =>
            `runtime/${entrypoint.name}`,
        },
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '~',
          enforceSizeThreshold: 50000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: function (
                module: any,
                chunks: any,
                cacheGroupKey: string,
              ): string {
                const fileName = module
                  .identifier()
                  .split('/')
                  .reduceRight(item => item)
                  .replace('.js', '')
                const chunkNames = chunks
                  .map(item => item.name)
                  .join('~')
                return `${cacheGroupKey}/${chunkNames}`
              },
              chunks: 'all',
            },
          },
        },
      },
      plugins: {
        clean: {},
        copy,
        ignoreEmit: [/\.*\.css.?\.js/],
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
      stats: 'none',
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
