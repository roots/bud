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

const auto: Object = {}

const babelFallback: BabelConfiguration = {
  presets: [],
  plugins: [],
}

const babel: BabelConfiguration = configs.babel
  ? require(configs.babel)
  : babelFallback

const browserSync: Object = {
  host: env?.BROWSERSYNC_HOST
    ? env.BROWSERSYNC_HOST
    : 'localhost',
  port: env?.BROWSERSYNC_PORT ? env.BROWSERSYNC_PORT : 3000,
  proxy: env?.BROWSERSYNC_PROXY
    ? env.BROWSERSYNC_PROXY
    : null,
}

const copy: Copy = {patterns: []}

const dependencyManifest: WordPressDependenciesOptions = {
  combineAssets: undefined,
  combinedOutputFile: undefined,
  injectPolyfill: false,
  outputFormat: 'json',
  useDefaults: true,
}

const dev: Dev = {
  clientLogLevel: 'none',
  compress: true,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: true,
  hotOnly: true,
  injectHot: true,
  open: false,
  overlay: true,
  watchOptions: {
    aggregateTimeout: 300,
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
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },
  auto,
  browserSync,
  copy,
  dev,
  dependencyManifest,
  devtool: 'cheap-module-source-map',
  entry: {},
  env: env,
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
