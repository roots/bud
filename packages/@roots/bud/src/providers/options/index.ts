export const options: {
  [prop: string]: {argument?: string; fallback?: any}
} = {
  /**
   * Directories
   */
  project: {fallback: process.cwd()},
  src: {fallback: 'src'},
  dist: {fallback: 'dist'},
  storage: {fallback: '.bud'},
  publicPath: {fallback: '/'},
  records: {fallback: 'records'},
  modules: {fallback: 'node_modules'},

  /**
   * Default enabled
   */
  clean: {argument: 'clean', fallback: true},
  manifest: {fallback: true},
  autodiscover: {fallback: false},

  /**
   * Mode
   */
  mode: {fallback: 'production'},
  development: {},
  production: {},

  /**
   * Options
   */
  ci: {},
  debug: {},
  brotli: {},
  cache: {fallback: true},
  devtool: {},
  hash: {},
  minify: {},
  log: {},
  html: {},
  runtime: {},
  sass: {},
  vendor: {},
  watch: {},

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
