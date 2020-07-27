import {env} from './env'
import {configs} from './configs'
import type {
  BabelConfiguration,
  Copy,
  Dev,
  Externals,
  PostCssConfiguration,
  Target,
  Vendor,
  WordPressDependenciesOptions,
  Options,
} from './types'

import chokidar from 'chokidar'

const auto: Object = {}

const babelFallback: BabelConfiguration = {
  presets: [],
  plugins: [],
}

const babel: BabelConfiguration = configs.babel
  ? require(configs.babel)
  : babelFallback

const browserSync: Object = {
  host: env?.BROWSERSYNC_HOST ? env.BROWSERSYNC_HOST : 'localhost',
  port: env?.BROWSERSYNC_PORT ? env.BROWSERSYNC_PORT : 3000,
  proxy: env?.BROWSERSYNC_PROXY ? env.BROWSERSYNC_PROXY : null,
  online: false,
  open: false,
}

const copy: Copy = {patterns: []}

const dependencyManifest: WordPressDependenciesOptions = {
  combineAssets: undefined,
  combinedOutputFile: undefined,
  injectPolyfill: false,
  outputFormat: 'json',
  useDefaults: true,
}

const watchList: [string] = [
  './resources/views/**/*.blade.php'
]

const dev: Dev = {
  disableHostCheck: true,
  host: 'localhost',
  headers: {},
  proxy: {},
  stats: {
    colors: true,
  },
}

const externals: Externals = {}

const postCssFallback: PostCssConfiguration = {
  plugins: [],
}

const postCss: PostCssConfiguration = configs.postCss
  ? require(configs.postCss)
  : postCssFallback

const target: Target = 'web'

const typescript = configs.typescript
  ? require(configs.typescript)
  : {}

const vendor: Vendor = {name: 'vendor'}

/**
 * Options container.
 */
const options: Options = {
  alias: {},
  babel,
  postCss,
  typescript,
  auto,
  browserSync,
  copy,
  devWatch: [],
  dev,
  dependencyManifest,
  devtool: 'source-map',
  entry: {},
  env,
  externals,
  inlineManifest: {
    name: 'runtime',
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
  splitting: {
    maxChunks: null,
  },
  target,
  terser: {
    terserOptions: {
      parse: {
        ecma: 8
      },
      compress: {
        ecma       : 5,
        warnings   : false,
        comparisons: false,
        inline     : 2
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma      : 5,
        comments  : false,
        ascii_only: true
      }
    },
    cache: true,
    parallel: true,
    sourceMap: true, // Must be set to true if using source-maps in production
  },
  uglify: {
    cache: true,
    chunkFilter: ({name}) => name === 'vendor',
    extractComments: false,
    parallel: true,
    uglifyOptions: {
      output: {
        beautify: false,
      },
      compress: false,
      mangle: {
        toplevel: true,
      },
    },
  },
  vendor,
}

export {options}
