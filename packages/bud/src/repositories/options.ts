import chokidar from 'chokidar'
import {resolve} from 'path'

import type {
  BabelTransformOptions,
  BrowserSyncOptions,
  WebpackTarget,
} from '@roots/bud-typings'
import type {RepositoryDefinition} from '@roots/bud-framework'

import type {PostCssConfiguration} from './types'
export type BrowserSync = BrowserSyncOptions
export type Copy = {patterns: any[]}

const target: WebpackTarget = 'web'

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

const browsersync: (flags) => any = flags => ({
  host: flags.has('host') ? flags.get('host') : 'localhost',
  port: flags.get('port') ? flags.get('port') : 3000,
  proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
  online: false,
  open: false,
})

const copy: Copy = {patterns: []}

const babel: (configs) => BabelTransformOptions = function (configs) {
  return configs.get('babel')
    ? configs.require('babel')
    : babelFallback
}

const postcss: (configs) => PostCssConfiguration = function (
  configs,
) {
  const fallback = {
    plugins: [require('postcss-import'), require('autoprefixer')],
  }

  return configs.has('postcss')
    ? configs.require('postcss')
    : fallback
}

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
        watchOptions: {
          poll: true,
        },
        writeToDisk: true,
        inline: true,
        overlay: {
          errors: true,
          warnings: false,
        },
        useLocalIp: false,
        hotOnly: true,
        disableHostCheck: true,
        publicPath: '/',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization',
        },
        before: function (app, server) {
          chokidar.watch(options?.watch ?? []).on('all', function () {
            server.sockWrite(server.sockets, 'content-changed')
          })
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
                const allChunksNames = chunks
                  .map(item => item.name)
                  .join('~')
                return `${cacheGroupKey}---${allChunksNames}---${moduleFileName}`
              },
              chunks: 'all',
              automaticNamePrefix: 'vendor',
            },
          },
        },
      },
      plugins: {
        browsersync,
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
      stats: {
        version: true,
        hash: true,
        assets: true,
        errors: true,
        warnings: true,
      },
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

export {options}
