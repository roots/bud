import {env} from './env'
import {configs} from './configs'

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

const copy: Copy = {
  patterns: [],
}

const auto: Object = {}

const dependencyExtraction: DependencyExtractionOptions = {
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
  dependencyExtraction,
  devtool: 'cheap-module-source-map',
  entry: {},
  env: env,
  externals,
  inlineManifest: {
    name: 'runtime',
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

import type {Configuration as WebpackConfiguration} from 'webpack'
import type {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin/build-types'
import type {Options as BrowserSyncOptions} from 'browser-sync-webpack-plugin'

export type Options = {
  auto: any
  babel: BabelConfiguration
  copy: Copy
  dev: any
  devtool: any
  entry: any
  env: any
  inlineManifest: Object
  splitting: Object
  uglify: Object
  browserSync: Object
  externals: Externals
  postCss: PostCssConfiguration
  svg: Svg
  target: WebpackConfiguration['target']
  typescript: Typescript
  dependencyExtraction: DependencyExtraction
  vendor: Vendor
}

export type BabelConfiguration = {
  plugins: []
  presets: []
}
export type BrowserSync = BrowserSyncOptions
export type Copy = {
  patterns: []
}
export type DependencyExtraction = DependencyExtractionOptions
export type Dev = any
export type Externals = WebpackConfiguration['externals']
export type PostCssConfiguration = {
  plugins: []
}
export type Svg = any
export type Target = WebpackConfiguration['target']
export type Typescript = Object
export type Vendor = {
  name: String
}
