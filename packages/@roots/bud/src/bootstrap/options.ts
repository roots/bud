import {config} from './config'

/**
 * Parsed options
 */
export const options = {
  ci: config(['ci', 'APP_CI']),
  bail: config(['bail', 'APP_BAIL']),
  cache: config(['cache', 'APP_CACHE']),
  clean: config(['clean', 'APP_CLEAN']),
  context: config(['location.project', 'APP_PATH']),
  debug: config(['debug', 'APP_DEBUG']),
  define: config(['define']),
  devtool: config(['devtool', 'APP_DEVTOOL']),
  discover: config(['discover', 'APP_DISCOVER']),
  externals: config(['externals']),
  fileFormat: config(['fileFormat', 'APP_FILE_FORMAT']),
  hash: config(['hash', 'APP_HASH']),
  hashFormat: config(['hashFormat', 'APP_HASH_FORMAT']),
  hot: config(['server.middleware.hot', 'APP_HOT']),
  html: {
    enabled: config(['html.enable', 'APP_HTML']),
    template: config(['html.template', 'APP_HTML_TEMPLATE']),
    replacements: config(['html.replace']),
  },
  entry: config(['entry']),
  install: config(['install', 'APP_INSTALL']),
  log: config(['log', 'APP_LOG']),
  manifest: config(['manifest', 'APP_MANIFEST']),
  minimize: config(['minify', 'APP_MINIFY']),
  mode: config(['mode', 'APP_MODE']),
  name: config(['name', 'APP_NAME']),
  namedModules: config(['namedModules', 'APP_NAMED_MODULES']),
  noEmitOnErrors: config(['noEmit', 'APP_NO_EMIT_ON_ERRORS']),
  node: config(['node']),
  parallelism: config(['parallelism', 'APP_PARALLELISM']),
  profile: config(['profile', 'APP_PROFILE']),
  runtimeChunkEnabled: config([
    'runtimeChunk',
    'APP_RUNTIME_CHUNK',
  ]),
  runtimeChunk: {
    name: entrypoint => `runtime/${entrypoint.name}`,
  },
  resolve: {
    alias: config(['alias']),
    extensions: config(['resolve.extensions']),
    modules: [...config(['resolve.modules'])],
  },
  splitChunksEnabled: config([
    'splitChunksEnabled',
    'APP_SPLITCHUNKS',
  ]),
  splitChunks: {
    chunks: config(['splitChunks.chunks']),
    minSize: config(['splitChunks.minSize']),
    maxSize: config(['splitChunks.maxSize']),
    minChunks: config(['splitChunks.minChunks']),
    maxAsyncRequests: config(['splitChunks.maxAsyncRequests']),
    maxInitialRequests: config([
      'splitChunks.maxInitialRequests',
    ]),
  },
  stats: config(['stats', 'APP_STATS']),
  target: config(['target', 'APP_TARGET']),
  use: config(['use']),
}
