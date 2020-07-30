import {env} from './env'
import {flags} from './flags'
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
const babel: BabelConfiguration = configs.has('babel')
  ? configs.contents('babel')
  : babelFallback

const browserSync: Object = {
  host: flags.get('host'),
  port: flags.get('port'),
  proxy: flags.get('proxy'),
  online: false,
  open: false,
}

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
const postCss: PostCssConfiguration = configs.has('postCss')
  ? configs.contents('postCss')
  : postCssFallback

const target: Target = 'web'

const typescript = configs.has('typescript')
  ? configs.contents('typescript')
  : {}

const vendor: Vendor = {name: 'vendor'}

const vue = {}

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
  }
}

/**
 * Options container.
 */
const options: Options = {
  repository: {
    alias: null,
    babel,
    postCss,
    typescript,
    auto,
    browserSync,
    copy,
    dev,
    dependencyManifest,
    devtool: 'source-map',
    entry: {},
    env,
    extensions: ['.js', '.json'],
    externals,
    inlineManifest: {
      name: 'runtime',
    },
    node: {},
    splitting: {
      maxChunks: null,
    },
    target,
    terser: {},
    uglify,
    vue,
    vendor,
    watch,
  },
  get: function (this: Options, option: string): any {
    return this.repository[option]
  },
  set: function (option: string, value: any): void {
    this.repository = {
      ...this.repository,
      [option]: value,
    }
  },
  merge: function (option: string, value: any): void {
    this.repository = {
      ...this.repository,
      [option]: {
        ...this.repository[option],
        ...value,
      },
    }
  },
  has: function (this: Options, option: string): boolean {
    return this.repository.hasOwnProperty(option)
  },
  is: function (this: Options, option: string, value: any): boolean {
    return this.get(option) === value
  },
}

export {options}
