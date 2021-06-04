import {Hooks, Server} from '@roots/bud-framework'
import {Theme} from '@roots/ink-use-style'
import Webpack from 'webpack/types'
import {cpus} from 'os'

interface Configuration {
  /**
   * Regular expressions for convenience when doing pattern matching.
   *
   * @example
   *
   * ```js
   * app.patterns.get('js')
   * ```
   */
  patterns: {[key: string]: RegExp}

  /**
   * Location
   */
  location: Hooks.Locale.Definitions

  /**
   * Feature: CI mode
   *
   * @default false
   */
  ci: boolean

  /**
   * Feature: Clean dist before compilation
   *
   * When enabled stale assets will be removed from
   * the `location/dist` directory prior to the next
   * compilation.
   *
   * @default true
   */
  clean: boolean

  /**
   * Feature: produce webpack.debug.js artifact
   *
   * When enabled a `webpack.debug.js` artifact will be
   * emitted to the `location/storage` directory.
   *
   * @default false
   */
  debug: boolean

  /**
   * Discover: automatically register locatable extensions
   *
   * When enabled, any discovered extensions will be automatically
   * initialized.
   *
   * @default false
   */
  discover: boolean

  /**
   * Feature: enable filename hashing
   * @default false
   */
  hash: boolean

  /**
   * Feature: emit html template
   * @default true
   */
  html: boolean

  /**
   * Feature: automatically install extension dependencies
   * @default false
   */
  install: boolean

  /**
   * Feature: log to console
   * @default false
   */
  log: boolean

  /**
   * Feature: produce asset manifest
   * @default true
   */
  manifest: boolean

  /**
   * File format
   *
   * @note do not include extension
   * @default '[name]'
   */
  fileFormat: string

  /**
   * File format (when hashing is enabled)
   *
   * @note do not include extension
   * @default '[name].[contenthash]'
   */
  hashFormat: string

  /**
   * Seed values for webpack config
   */
  build: Webpack.Configuration

  /**
   * Seed values for extension options
   */
  extension: {
    [key: string]: any
  }

  /**
   * Server config
   */
  server: Server['config']['repository']

  /**
   * Theme configuration
   */
  theme: Theme
}

export const config: Configuration = {
  patterns: {
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    font: /\.(ttf|otf|eot|woff2?|ico)$/,
    html: /\.(html?)$/,
    image: /\.(png|jpe?g|gif)$/,
    js: /\.(js|jsx)$/,
    modules: /(node_modules|bower_components)/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
    svg: /\.svg$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
    md: /\.md$/,
  },
  location: {
    project: process.cwd(),
    src: 'src',
    dist: 'dist',
    modules: 'node_modules',
    publicPath: '/',
    records: 'records.json',
    storage: '.budfiles',
  },
  ci: false,
  clean: true,
  debug: false,
  discover: false,
  hash: false,
  html: false,
  install: false,
  log: false,
  manifest: true,
  fileFormat: '[name]',
  hashFormat: '[name].[contenthash:6]',
  build: {
    optimization: {
      emitOnErrors: false,
    },
    parallelism: cpus().length - 1,
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    },
  },
  extension: {
    cleanWebpackPlugin: {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
    },
    cssMinimizerWebpackPlugin: {
      minimizerOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    },
    htmlWebpackPlugin: {
      alwaysWriteToDisk: true,
      inject: true,
      minify: {
        collapseWhitespace: false,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    },
    interpolateHtmlPlugin: {
      replace: {},
    },
    miniCssExtractPlugin: {},
    webpackConfigDumpPlugin: {
      name: 'webpack.debug.js',
      keepCircularReferences: true,
    },
    webpackDefinePlugin: {},
    webpackManifestPlugin: {
      fileName: 'manifest.json',
      writeToFileEmit: true,
    },
    webpackProvidePlugin: {},
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
        persistant: false,
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
    maxWidth: 80,
    maxHeight: 999,
  },
}
