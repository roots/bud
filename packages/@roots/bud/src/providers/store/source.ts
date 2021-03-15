import dotenv from 'dotenv'
import yargs from 'yargs'
import {get, has, merge} from 'lodash'
import {join} from 'path'
import {readJsonSync, existsSync} from 'fs-extra'
import {Theme} from '@roots/ink-use-style'
import {Webpack} from '@roots/bud-support'

declare interface Config {
  name: string
  install: boolean
  use: string[]
  entry: {
    [key: string]: any
  }
  alias: {
    [key: string]: any
  }
  externals: {
    [key: string]: any
  }
  bail: boolean
  cache: boolean
  clean: boolean
  ci: boolean
  define: {
    [key: string]: any
  }
  devtool: any
  discover: boolean
  fileFormat: string
  hash: boolean
  hashFormat: string
  html: boolean
  template: string
  log: boolean
  noEmit: boolean
  manifest: boolean
  minify: boolean
  mode: 'production' | 'development'
  namedModules: boolean
  node: Webpack.Configuration['node']
  parallelism: number
  profile: boolean
  runtimeChunk: boolean
  splitChunksEnabled: boolean
  splitChunks: {
    chunks: string
    minSize: number
    maxSize: number
    minChunks: number
    maxAsyncRequests: number
    maxInitialRequests: number
  }
  stats: boolean
  target: string
  resolve: {
    extensions: string[]
    modules: string[]
  }
  server: {
    middleware: {
      [key: string]: boolean
    }
    watch: {
      files: string[]
      options: {
        persistant: boolean
      }
    }
  }
  location: {
    project: string
    src: string
    dist: string
    modules: string
    publicPath: string
    records: string
    storage: string
  }
  theme: Theme
}

/**
 * Project path
 */
const pathIndex = process.argv.findIndex(v => v == '--project')
const projectPath =
  pathIndex !== -1 ? process.argv[pathIndex] : process.cwd()

/**
 * Env
 */
export const env = dotenv.config({
  path: join(projectPath, '.env'),
}).parsed

const DEFAULT_CFG: Config = {
  name: '@roots/bud',
  bail: true,
  ci: false,
  use: [],
  server: {
    watch: {
      files: [
        '**/*.html',
        '**/*.php',
        '**/*.ejs',
        '!node_modules',
        '!vendor',
      ],
      options: {
        persistant: true,
      },
    },
    middleware: {
      dev: true,
      hot: true,
      proxy: false,
    },
  },
  theme: {
    spacing: 1,
    colors: {
      foreground: '#FFFFFF',
      faded: '#6C758F',
      primary: '#545DD7',
      primaryAlt: '#663399',
      error: '#dc3545',
      errorAlt: '#b22222',
      warning: '#FF611A',
      success: '#46D46A',
      accent: '#ff69b4',
      flavor: '#78C5D7',
    },
    screens: [
      [0, 40],
      [41, 60],
      [61, 80],
      [81, Infinity],
    ],
    columns: 12,
  },
  entry: {},
  alias: {},
  cache: true,
  clean: true,
  define: {},
  devtool: false,
  discover: false,
  externals: {},
  fileFormat: '[name]',
  hash: false,
  hashFormat: `[name].[hash]`,
  html: true,
  template: null,
  install: false,
  log: false,
  namedModules: true,
  noEmit: true,
  node: {
    module: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  stats: false,
  target: 'web',
  location: {
    project: projectPath,
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    publicPath: '/',
    records: 'records.json',
    storage: '.bud',
  },
  manifest: true,
  minify: true,
  mode: 'production',
  profile: false,
  runtimeChunk: false,
  splitChunksEnabled: false,
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
  },
  parallelism: 1,
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    modules: [],
  },
}

export const args: any = Object.entries(
  yargs(process.argv.slice(2))
    .parserConfiguration({'camel-case-expansion': false})
    .config(configuration())
    .options({
      name: {
        type: 'string',
        default: 'bud',
      },
      bail: {
        type: 'boolean',
        default: true,
      },
      cache: {
        type: 'boolean',
        default: true,
      },
      clean: {
        type: 'boolean',
        default: true,
      },
      ci: {
        type: 'boolean',
        default: false,
      },
      debug: {
        type: 'boolean',
        default: false,
      },
      define: {
        default: {},
      },
      devtool: {
        default: {},
      },
      discover: {
        type: 'boolean',
        default: false,
      },
      entry: {
        default: {},
      },
      externals: {
        default: {},
      },
      fileFormat: {
        type: 'string',
        default: '[name].js',
      },
      hash: {
        type: 'boolean',
        default: false,
      },
      hashFormat: {
        type: 'string',
        default: `[name].[hash]`,
      },
      html: {
        type: 'boolean',
        default: true,
      },
      template: {
        type: 'string',
        default: null,
      },
      install: {
        type: 'boolean',
        default: false,
      },
      log: {
        type: 'boolean',
        default: false,
      },
      manifest: {
        type: 'boolean',
        require: true,
        default: true,
      },
      minify: {
        type: 'boolean',
        default: false,
      },
      mode: {
        type: 'string',
        default: 'production',
      },
      namedModules: {
        type: 'boolean',
        default: true,
      },
      node: {
        default: {
          module: 'empty',
          dns: 'mock',
          fs: 'empty',
          http2: 'empty',
          net: 'empty',
          tls: 'empty',
          child_process: 'empty',
        },
      },
      noEmit: {
        type: 'boolean',
        default: true,
      },
      parallelism: {
        type: 'number',
        default: 1,
      },
      profile: {
        type: 'boolean',
        default: false,
      },
      runtimeChunk: {
        type: 'boolean',
        default: false,
      },
      use: {
        type: 'array',
        default: [],
      },
      splitChunksEnabled: {
        type: 'boolean',
        default: false,
      },
      'splitChunks.chunks': {
        type: 'string',
        default: 'async',
      },
      'splitChunks.minSize': {
        type: 'number',
        default: 20000,
      },
      'splitChunks.maxSize': {
        type: 'number',
        default: 0,
      },
      'splitChunks.minChunks': {
        type: 'number',
        default: 1,
      },
      'splitChunks.maxAsyncRequests': {
        type: 'number',
        default: 30,
      },
      'splitChunks.maxInitialRequests': {
        type: 'number',
        default: 30,
      },
      alias: {
        module: {
          type: 'array',
        },
        default: {},
      },
      stats: {
        type: 'boolean',
        default: false,
      },
      target: {
        type: 'string',
        default: 'web',
      },
      'resolve.extensions': {
        type: 'array',
        default: ['.wasm', '.mjs', '.js', '.css', '.json'],
      },
      'resolve.modules': {
        type: 'array',
        default: [],
      },
      'location.project': {
        type: 'string',
        default: projectPath,
      },
      'location.src': {
        type: 'string',
        default: 'src',
      },
      'location.dist': {
        type: 'string',
        default: 'dist',
      },
      'location.storage': {
        type: 'string',
        default: '.bud',
      },
      'location.modules': {
        type: 'string',
        default: 'node_modules',
      },
      'location.publicPath': {
        type: 'string',
        default: '/',
      },
      'location.records': {
        type: 'string',
        default: 'records.json',
      },
      'server.host': {
        type: 'string',
        default: 'localhost',
      },
      'server.port': {
        type: 'number',
        default: 3000,
      },
      'server.proxy.host': {
        type: 'string',
        default: 'localhost',
      },
      'server.proxy.port': {
        type: 'number',
        default: 8000,
      },
      'server.loglevel': {
        type: 'string',
        default: 'silent',
      },
      'server.methods': {
        type: 'array',
        default: ['GET', 'HEAD'],
      },
      'server.middleware.proxy': {
        type: 'boolean',
        default: false,
      },
      'server.middleware.hot': {
        type: 'boolean',
        default: true,
      },
      'server.middleware.dev': {
        type: 'boolean',
        default: true,
      },
      'server.watch.files': {
        type: 'array',
        default: [
          '**/*.html',
          '**/*.php',
          '**/*.ejs',
          '!node_modules',
          '!vendor',
        ],
      },
      'server.watch.options.persistent': {
        type: 'boolean',
        default: true,
      },
      'theme.spacing': {
        type: 'string',
      },
      'theme.color.foreground': {
        type: 'string',
      },
      'theme.color.faded': {
        type: 'string',
      },
      'theme.color.primary': {
        type: 'string',
      },
      'theme.color.primary.alt': {
        type: 'string',
      },
      'theme.color.error': {
        type: 'string',
      },
      'theme.color.error.alt': {
        type: 'string',
      },
      'theme.color.warning': {
        type: 'string',
      },
      'theme.color.success': {
        type: 'string',
      },
      'theme.color.accent': {
        type: 'string',
      },
      'theme.color.flavor': {
        type: 'string',
      },
    })
    .parse(),
).reduce(
  (a, [k, v]) => ({
    ...a,
    [k]: v == 'true' ? true : v == 'false' ? false : v,
  }),
  {},
)

/**
 * Configuration
 */
export function configuration() {
  const projectFile = join(projectPath, 'package.json')
  const projectData = existsSync(projectFile)
    ? readJsonSync(projectFile)
    : null

  const cfgFile = join(projectPath, 'bud.project.json')
  const cfgExists = existsSync(cfgFile)

  return cfgExists
    ? readJsonSync(cfgFile)
    : merge(DEFAULT_CFG, projectData?.bud) ?? DEFAULT_CFG
}

/**
 * Source from args => env => null
 */
export const source = (
  key: [string, string?],
  transform?: (value: any) => any,
) => {
  const [argKey, envKey] = key

  const val = has(args, argKey)
    ? get(args, argKey)
    : envKey
    ? get(env, envKey)
    : null

  return transform ? transform(val) : val
}
