export const config = {
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
