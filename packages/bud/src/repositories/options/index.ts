import type {
  WebpackTarget,
  RepositoryDefinition,
} from '@roots/bud-typings'

import babel from './babel'
import postcss from './postcss'
import server from './server'

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
    server,
    webpack: {
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
        compression: {
          brotli: {
            filename: '[path].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
              level: 11,
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
          },
          gzip: {
            filename: '[path].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
          },
        },
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
