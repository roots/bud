import {cpus} from 'os'
import {Configuration} from '@roots/bud-framework'

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
  clean: false,
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
      keepCircularReferences: true,
    },
    webpackDefinePlugin: {},
    webpackManifestPlugin: {
      fileName: 'manifest.json',
      writeToFileEmit: true,
      assets: Object.create(null),
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
