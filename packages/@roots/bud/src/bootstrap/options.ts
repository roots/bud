import {config} from './config'
import {readConfig} from './readConfig'

const WIRED = {
  name: 'bud',
}

const base = readConfig()

/**
 * Parsed options
 */
export const options = {
  ...WIRED,

  /**
   * Locations
   */
  context: config(
    ['project', 'APP_PATH'],
    base.location.project,
  ),
  src: config(['src', 'APP_SRC'], base.location.src),
  dist: config(['dist', 'APP_DIST'], base.location.dist),
  storage: config(
    ['storage', 'APP_STORAGE'],
    base.location.storage,
  ),
  publicPath: config(
    ['publicPath', 'APP_PUBLIC_PATH'],
    base.location.publicPath,
  ),
  modules: config(
    ['modules', 'APP_MODULES'],
    base.location.modules,
  ),

  /**
   * General packery
   */
  bail: config(['bail', 'APP_BAIL'], base.bail),
  cache: config(['cache', 'APP_CACHE'], base.cache),
  ci: config(['ci', 'APP_CI'], base.ci),
  clean: config(['clean', 'APP_CLEAN'], base.clean),
  debug: config(['debug', 'APP_DEBUG'], base.debug),
  define: config(['define'], base.define),
  devtool: config(['devtool', 'APP_DEVTOOL'], base.devtool),
  discover: config(['discover', 'APP_DISCOVER'], base.discover),
  externals: config(['externals'], base.externals),

  /**
   * File formatting
   */
  hash: config(['hash', 'APP_HASH'], base.hash),
  hashFormat: config(
    ['hashFormat', 'APP_HASH_FORMAT'],
    base.hashFormat,
  ),
  fileFormat: config(
    ['fileFormat', 'APP_FILE_FORMAT'],
    base.fileFormat,
  ),

  /**
   * Hot
   */
  hot: config(
    ['server.middleware.hot', 'APP_HOT'],
    base.server.middleware.hot,
  ),
  html: {
    enabled: config(['html', 'APP_HTML'], base.html),
    template: config(
      ['template', 'APP_HTML_TEMPLATE'],
      base.template,
    ),
    replacements: config(['html.replace'], base.html.replace),
  },
  entry: config(['entry'], base.entry),
  install: config(['install', 'APP_INSTALL'], base.install),
  log: config(['log', 'APP_LOG'], base.log),
  manifest: config(['manifest', 'APP_MANIFEST'], base.manifest),
  minimize: config(['minify', 'APP_MINIFY'], base.minify),
  mode: config(['mode', 'APP_MODE'], base.mode),
  namedModules: config(
    ['namedModules', 'APP_NAMED_MODULES'],
    base.namedModules,
  ),
  noEmitOnErrors: config(
    ['noEmitOnErrors', 'APP_NO_EMIT_ON_ERRORS'],
    base.noEmitOnErrors,
  ),
  parallelism: config(
    ['parallelism', 'APP_PARALLELISM'],
    base.parallelism,
  ),
  profile: config(['profile', 'APP_PROFILE'], base.profile),
  runtimeChunk: config(['runtimeChunk'], base.runtimeChunk),
  runtimeChunkEnabled: config(
    ['runtimeChunkEnabled', 'APP_RUNTIME_CHUNK'],
    base.runtimeChunkEnabled,
  ),
  resolve: {
    alias: config(['alias'], base.resolve.alias),
    extensions: config(
      ['resolve.extensions'],
      base.resolve.extensions,
    ),
    modules: config(['resolve.modules'], base.resolve.modules),
  },
  splitChunksEnabled: config(
    ['splitChunksEnabled', 'APP_SPLITCHUNKS'],
    base.splitChunksEnabled,
  ),
  splitChunks: {
    chunks: config(
      ['splitChunks.chunks'],
      base.splitChunks.chunks,
    ),
    minSize: config(
      ['splitChunks.minSize'],
      base.splitChunks.minSize,
    ),
    maxSize: config(
      ['splitChunks.maxSize'],
      base.splitChunks.maxSize,
    ),
    minChunks: config(
      ['splitChunks.minChunks'],
      base.splitChunks.minChunks,
    ),
    maxAsyncRequests: config(
      ['splitChunks.maxAsyncRequests'],
      base.splitChunks.maxAsyncRequests,
    ),
    maxInitialRequests: config(
      ['splitChunks.maxInitialRequests'],
      base.splitChunks.maxInitialRequests,
    ),
  },
  stats: config(['stats', 'APP_STATS'], base.stats),
  target: config(['target', 'APP_TARGET'], base.target),

  /**
   * Server
   */
  server: {
    host: config(['server.host', 'APP_HOST'], base.server.host),
    port: config(['server.port', 'APP_PORT'], base.server.port),
    /**
     * Proxy settings
     */
    proxy: {
      host: config(
        ['server.proxy.host', 'APP_HOST'],
        base.server.proxy.host,
      ),
      port: config(
        ['server.proxy.port', 'APP_PORT'],
        base.server.proxy.port,
      ),
    },
    watch: {
      files: config(
        ['server.watch.files'],
        base.server.watch.files,
      ),
      options: {
        persistant: config(
          ['server.watch.persistant'],
          base.server.watch.options.persistant,
        ),
      },
    },

    /**
     * Client settings
     */
    browser: {
      overlay: config(
        ['browser.overlay', 'APP_BROWSER_OVERLAY'],
        base.server.browser.overlay,
      ),
      indicator: config(
        ['browser.indicator', 'APP_BROWSER_INDICATOR'],
        base.server.browser.indicator,
      ),
      log: config(
        ['browser.log', 'APP_BROWSER_LOG'],
        base.server.browser.log,
      ),
    },

    /**
     * Middlewares
     */
    middleware: {
      dev: config(
        ['server.middleware.dev'],
        base.server.middleware.dev,
      ),
      hot: config(
        ['server.middleware.hot'],
        base.server.middleware.hot,
      ),
      proxy: config(
        ['server.middleware.proxy'],
        base.server.middleware.proxy,
      ),
    },
    methods: config(['server.methods'], base.server.methods),
  },

  /**
   * Theme
   */
  theme: {
    spacing: config(
      ['theme.spacing', 'APP_THEME_SPACING'],
      base.theme.spacing,
    ),
    colors: {
      foreground: config(
        ['theme.colors.foreground', 'APP_THEME_FOREGROUND'],
        base.theme.colors.foreground,
      ),
      faded: config(
        ['theme.colors.faded', 'APP_THEME_FADED'],
        base.theme.colors.faded,
      ),
      primary: config(
        ['theme.colors.primary', 'APP_THEME_PRIMARY'],
        base.theme.colors.primary,
      ),
      primaryAlt: config(
        ['theme.colors.primaryAlt', 'APP_THEME_PRIMARY_ALT'],
        base.theme.colors.primaryAlt,
      ),
      error: config(
        ['theme.colors.error', 'APP_THEME_ERROR'],
        base.theme.colors.error,
      ),
      errorAlt: config(
        ['theme.colors.errorAlt', 'APP_THEME_ERROR_ALT'],
        base.theme.colors.errorAlt,
      ),
      warning: config(
        ['theme.colors.warning', 'APP_THEME_WARNING'],
        base.theme.colors.warning,
      ),
      success: config(
        ['theme.colors.success', 'APP_THEME_SUCCESS'],
        base.theme.colors.success,
      ),
      accent: config(
        ['theme.colors.accent', 'APP_THEME_ACCENT'],
        base.theme.colors.accent,
      ),
      flavor: config(
        ['theme.colors.flavor', 'APP_THEME_FLAVOR'],
        base.theme.colors.flavor,
      ),
    },
    screens: [
      [
        config(
          ['theme.screens[0][0]', 'APP_THEME_SM_LOWER'],
          base.theme.screens[0][0],
        ),
        config(
          ['theme.screens[0][1]', 'APP_THEME_SM_LOWER'],
          base.theme.screens[0][1],
        ),
      ],
      [
        config(
          ['theme.screens[1][0]', 'APP_THEME_MD_LOWER'],
          base.theme.screens[1][0],
        ),
        config(
          ['theme.screens[1][1]', 'APP_THEME_MD_LOWER'],
          base.theme.screens[1][1],
        ),
      ],
      [
        config(
          ['theme.screens[2][0]', 'APP_THEME_LG_LOWER'],
          base.theme.screens[2][0],
        ),
        config(
          ['theme.screens[2][1]', 'APP_THEME_LG_LOWER'],
          base.theme.screens[2][1],
        ),
      ],
      [
        config(
          ['theme.screens[3][0]', 'APP_THEME_XL_LOWER'],
          base.theme.screens[3][0],
        ),
        config(
          ['theme.screens[3][1]', 'APP_THEME_XL_LOWER'],
          base.theme.screens[3][1],
        ),
      ],
    ],
    columns: 12,
  },
}
