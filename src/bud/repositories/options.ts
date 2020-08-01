import type {
  BabelConfiguration,
  Copy,
  Dev,
  PostCssConfiguration,
  Target,
  Vendor,
  WordPressDependenciesOptions,
} from './types'

const babelFallback: BabelConfiguration = {
  presets: [],
  plugins: [],
}

const babel: (configs) => BabelConfiguration = function (configs) {
  return configs.has('babel')
    ? configs.contents('babel')
    : babelFallback
}

const browserSync: (flags) => object = flags => ({
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

const postCss: (configs) => PostCssConfiguration = function (
  configs,
) {
  const fallback: PostCssConfiguration = {plugins: []}
  return configs.has('postCss')
    ? configs.contents('postCss')
    : fallback
}

const target: Target = 'web'

const typescript = configs =>
  configs.has('typescript') ? configs.contents('typescript') : {}

/**
 * Options container.
 */
const options = {
  copy,
  dev,
  dependencyManifest,
  devtool: 'source-map',
  extensions: ['.js', '.json'],
  filenameTemplate: {
    hashed: `[name].[hash:8]`,
    default: '[name]',
  },
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
  vendor: {name: 'vendor'},
  watch,
}

export {options, babel, browserSync, postCss, typescript}
