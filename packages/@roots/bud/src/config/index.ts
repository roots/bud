import {Framework} from '@roots/bud-framework'
import os from 'os'

/**
 * Base config
 */
export const config: Framework.Config = {
  bail: true,
  ci: false,
  entry: {},
  cache: true,
  clean: true,
  debug: false,
  define: {},
  devtool: false,
  discover: false,
  externals: {},
  fileFormat: '[name]',
  hash: false,
  hashFormat: `[name].[hash]`,
  html: {
    enabled: true,
    template: null,
    replace: {},
  },
  template: null,
  install: false,
  log: false,
  namedModules: true,
  node: {
    __dirname: false,
    __filename: false,
    global: false,
  },
  noEmit: true,
  removeEmptyChunks: true,
  stats: false,
  target: 'web',
  manifest: true,
  minify: true,
  mode: 'production',
  profile: false,
  runtimeChunk: false,
  splitChunks: false,
  parallelism: os.cpus().length - 1,
  resolve: {
    alias: {},
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    modules: [],
  },

  /**
   * Server
   */
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
    browser: {
      indicator: true,
      log: true,
      overlay: true,
    },
    proxy: {
      host: 'localhost',
      port: 8000,
    },
    host: 'localhost',
    port: 3000,
    methods: ['GET', 'HEAD'],
  },

  /**
   * Location
   */
  location: {
    project: process.cwd(),
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    publicPath: '/',
    records: 'records.json',
    storage: '.bud',
  },

  /**
   * Theme
   */
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
