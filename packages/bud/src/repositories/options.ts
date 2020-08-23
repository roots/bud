import type {PostCssConfiguration} from './types'
import type {
  BabelTransformOptions,
  BrowserSyncOptions,
  WebpackTarget,
} from '@roots/bud-typings'
import type {RepositoryDefinition} from '../container'

export type BrowserSync = BrowserSyncOptions
export type Copy = {patterns: any[]}

const target: WebpackTarget = 'web'

const babelFallback: BabelTransformOptions = {
  presets: [require.resolve('@babel/preset-env')],
  plugins: [],
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
      entry: {},
      externals: false,
      resolve: {
        alias: false,
        extensions: ['.css', '.js', '.json', '.svg'],
      },
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization',
        },
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
      plugins: {
        browsersync,
        clean: {},
        copy,
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
      maxChunks: null,
    },
    filenameTemplate: {
      hashed: '[name].[hash:8]',
      default: '[name]',
    },
    manifest: {
      name: 'manifest.json',
    },
  },
}

export {options}
