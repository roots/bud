import {env} from './env'
import type {
  BabelConfiguration,
  Copy,
  Dev,
  Externals,
  Flags,
  PostCssConfiguration,
  Target,
  Vendor,
  WordPressDependenciesOptions,
} from './types'
import {container} from '../container'

const auto: Object = {}

const babelFallback: BabelConfiguration = {
  presets: [],
  plugins: [],
}

const babel: (state) => BabelConfiguration = state =>
  state.configs.has('babel')
    ? state.configs.contents('babel')
    : babelFallback

const browserSync: (flags: Flags) => object = flags => ({
  host: flags.get('host'),
  port: flags.get('port'),
  proxy: flags.get('proxy'),
  online: false,
  open: false,
})

const copy: Copy = {patterns: []}

const dependencyManifest: WordPressDependenciesOptions = {
  combineAssets: false,
  combinedOutputFile: null,
  injectPolyfill: false,
  outputFormat: 'json',
  useDefaults: true,
}

const watch: string[] = []

const dev: Dev = {
  disableHostCheck: true,
  host: 'localhost',
  headers: {},
  proxy: {},
}

const externals: Externals = null

const postCssFallback: PostCssConfiguration = {
  plugins: [],
}

const postCss: (state) => PostCssConfiguration = state =>
  state.configs.has('postCss')
    ? state.configs.contents('postCss')
    : postCssFallback

const target: Target = 'web'

const typescript = state =>
  state.configs.has('typescript')
    ? state.configs.contents('typescript')
    : {}

const vendor: Vendor = {name: 'vendor'}

const uglify = {
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
}

const filenameTemplate = {
  hashed: `[name].[hash:8]`,
  default: '[name]',
}

/**
 * Options container.
 */
const options = state =>
  new container({
    babel: babel(state),
    postCss: postCss(state),
    typescript: typescript(state),
    auto,
    browserSync,
    copy,
    dev,
    dependencyManifest,
    devtool: 'source-map',
    env,
    extensions: ['.js', '.json'],
    externals,
    filenameTemplate,
    inlineManifest: {
      name: 'runtime',
    },
    splitting: {
      maxChunks: null,
    },
    target,
    uglify,
    vendor,
    watch,
  })

export {options}
