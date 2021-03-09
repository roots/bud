import dotenv from 'dotenv'
import yargs from 'yargs'
import {get, has, merge} from 'lodash'
import {join} from 'path'
import {readJsonSync, existsSync} from 'fs-extra'
import {Theme} from '@roots/ink-use-style'

export const projectPath = () => {
  const pathIndex = process.argv.findIndex(v => v == '--project')

  return pathIndex !== -1
    ? process.argv[pathIndex]
    : process.cwd()
}

const DEFAULT_CFG: {
  name: string
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
  devtool: {
    enable: false
    type: 'nosources-source-map'
  }
  discover: boolean
  hash: boolean
  hashFormat: string
  html: {
    enable: true
    template: string
  }
  install: boolean
  log: {
    enable: boolean
    file: string
  }
  noEmit: boolean
  manifest: boolean
  minify: boolean
  mode: 'production' | 'development'
  namedModules: boolean
  parallelism: number
  profile: boolean
  runtimeChunk: boolean
  splitChunks: {
    enable: boolean
    chunks: string
    minSize: number
    maxSize: number
    minChunks: number
    maxAsyncRequests: number
    maxInitialRequests: number
  }
  stats: boolean
  target: string
  use: string[]
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
    [key: string]: string
  }
  theme: Theme
} = {
  name: '@roots/bud',
  entry: {},
  alias: {},
  bail: true,
  cache: true,
  clean: true,
  ci: false,
  define: {},
  devtool: {
    enable: false,
    type: 'nosources-source-map',
  },
  discover: false,
  externals: {},
  hash: false,
  hashFormat: `[name].[hash].js`,
  html: {
    enable: true,
    template: null,
  },
  install: false,
  log: {
    enable: false,
    file: null,
  },
  namedModules: true,
  noEmit: true,
  stats: false,
  target: 'web',
  location: {
    project: process.cwd(),
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    public: '/',
    records: 'records.json',
    storage: '.bud',
  },
  manifest: true,
  minify: true,
  mode: 'production',
  profile: false,
  runtimeChunk: false,
  splitChunks: {
    enable: false,
    chunks: 'async',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
  },
  parallelism: 1,
  use: [],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    modules: [],
  },
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
}

/**
 * Env
 */
export const makeEnv = projectDir => {
  return dotenv.config({
    path: join(projectDir, '.env'),
  }).parsed
}

export const cfg = projectDir => {
  const projectFile = join(projectDir, 'package.json')
  const projectData = existsSync(projectFile)
    ? readJsonSync(projectFile)
    : null

  const cfgFile = join(projectDir, 'bud.project.json')
  const cfgExists = existsSync(cfgFile)

  return cfgExists
    ? readJsonSync(cfgFile)
    : merge(DEFAULT_CFG, projectData?.bud) ?? DEFAULT_CFG
}

/**
 * Process args
 */
export const makeArgs = projectDir => {
  let raw: any = yargs
    .parserConfiguration({
      'camel-case-expansion': false,
    })
    .config(cfg(projectDir))
    .options({
      name: {
        type: 'string',
        default: '@roots/bud',
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
      'devtool.enable': {
        type: 'boolean',
        default: false,
      },
      'devtool.type': {
        type: 'string',
        default: 'nosources-source-map',
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
      hash: {
        type: 'boolean',
        default: false,
      },
      hashFormat: {
        type: 'string',
        default: `[name].[hash].js`,
      },
      'html.enable': {
        type: 'boolean',
        default: true,
      },
      'html.template': {
        type: 'string',
        default: null,
      },
      install: {
        type: 'boolean',
        default: false,
      },
      log: {
        default: {
          enable: false,
          file: 'bud.log',
        },
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
      'splitChunks.enable': {
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
        default: projectDir,
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
    .parse(process.argv.slice(2))

  raw = {
    ...raw._.reduce(
      (a, v, i) => ({
        ...a,
        [v]: true,
      }),
      raw,
    ),
  }

  raw = {
    ...Object.entries(raw).reduce(
      (a, [k, v]) => ({
        ...a,
        [k]: v == 'true' ? true : v == 'false' ? false : v,
      }),
      raw,
    ),
  }

  raw.mode = raw.development ? 'development' : 'production'

  return raw
}

export const args = makeArgs(projectPath())

export const env = makeEnv(projectPath())

export const init = (
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
