export const options: {
  [prop: string]: {argument?: string; fallback?: any}
} = {
  /**
   * Directories
   */
  project: {fallback: process.cwd()},
  src: {fallback: 'src'},
  dist: {fallback: 'dist'},
  storage: {fallback: '.bud/'},
  publicPath: {fallback: '/'},
  records: {fallback: 'records'},
  modules: {fallback: 'node_modules'},

  /**
   * Default enabled
   */
  clean: {fallback: true},
  manifest: {fallback: true},
  autodiscover: {fallback: true},

  /**
   * Options
   */
  ci: {},
  debug: {},
  brotli: {},
  hash: {},
  gzip: {},
  log: {},
  minify: {},
  html: {},

  /**
   * Webpack features
   */
  mode: {fallback: 'production'},
  'webpack.devool': {argument: 'devtool'},
  'webpack.optimization.splitChunks': {argument: 'vendor'},
  'webpack.optimization.runtimeChunk': {argument: 'runtime'},
  'webpack.optimization.minify': {argument: 'minify'},

  /**
   * Server features
   */
  'server.host': {argument: 'host', fallback: 'localhost'},
  'server.port': {argument: 'port', fallback: 8000},
  'server.proxy.host': {
    argument: 'proxyHost',
    fallback: 'localhost',
  },
  'server.proxy.port': {argument: 'proxyPort', fallback: 3000},
}
