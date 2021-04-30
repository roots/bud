import {Config} from '@roots/bud-framework'
import {Server} from '@roots/bud-server'
import {Index} from '@roots/bud-typings'
import {Theme} from '@roots/ink-use-style'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import Webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {cpus} from 'os'

declare module '@roots/bud-framework' {
  interface Config {
    /**
     * RegExp
     */
    patterns: Index<RegExp>

    /**
     * Location
     */
    location: Hooks.Locale.Definitions

    /**
     * Features
     */
    ci: boolean
    clean: boolean
    debug: boolean
    discover: boolean
    hash: boolean
    html: boolean
    install: boolean
    log: boolean
    manifest: boolean

    /**
     * Derived values
     */
    fileFormat: string
    hashFormat: string

    /**
     * Build
     */
    build: Webpack.Configuration

    /**
     * Extensions
     */
    extension: {
      cleanWebpackPlugin: CleanWebpackPlugin.Options
      cssMinimizerWebpackPlugin: {
        minimizerOptions: {
          preset: ['default']
        }
      }
      htmlWebpackPlugin: HtmlWebpackPlugin.Options
      interpolateHtmlPlugin: {
        replace: Index<{[key: string]: string}>
      }
      miniCssExtractPlugin: MiniCssExtractPlugin.PluginOptions
      webpackConfigDumpPlugin: {
        name: 'webpack.debug.js'
        keepCircularReferences: boolean
      }
      webpackDefinePlugin: {[key: string]: any}
      webpackManifestPlugin: {
        fileName: 'manifest.json'
        writeToFileEmit: boolean
      }
    }

    /**
     * Server config
     */
    server: Server['config']['repository']

    /**
     * Theme config
     */
    theme: Theme
  }
}

export const config: Config = {
  /**
   * RegExp
   */
  patterns: {
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    html: /\.(html?)$/,
    image: /\.(png|jpg|jpeg|gif)$/,
    js: /\.(js|jsx)$/,
    modules: /(node_modules|bower_components)/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
    svg: /\.svg$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
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
    storage: '.budfiles',
  },

  /**
   * Features
   */
  ci: false,
  clean: true,
  debug: false,
  discover: false,
  hash: false,
  html: false,
  install: false,
  log: false,
  manifest: true,

  /**
   * Derived values
   */
  fileFormat: '[name]',
  hashFormat: '[name].[contenthash]',

  build: {
    optimization: {
      emitOnErrors: false,
    },
    parallelism: cpus().length - 1,
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    },
  },

  /**
   * Extensions
   */
  extension: {
    cleanWebpackPlugin: {
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
    },
    cssMinimizerWebpackPlugin: {
      minimizerOptions: {
        preset: ['default'],
      },
    },
    htmlWebpackPlugin: {
      alwaysWriteToDisk: true,
      inject: true,
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
    maxWidth: 80,
    maxHeight: 999,
  },
}
