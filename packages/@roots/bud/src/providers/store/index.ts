import * as webpack from './webpack'
import * as patterns from './patterns'
import * as server from './server'
import {args, env, init} from './source'
import {resolve} from 'path'

export const repositories = {
  args,
  env,
  webpack,
  patterns,
  server,
  locations: {
    project: init(['location.project', 'APP_PATH']),
    src: init(['location.src', 'APP_SRC']),
    dist: init(['location.dist', 'APP_DIST']),
    storage: init(['location.storage', 'APP_STORAGE']),
    modules: resolve(
      init(['location.project', 'APP_PATH']),
      init(['location.modules', 'APP_MODULES']),
    ),
    publicPath: init(['location.publicPath', 'APP_PUBLIC_PATH']),
    records: init(['location.records', 'APP_RECORDS']),
  },
  options: {
    bail: init(['bail', 'APP_BAIL']),
    cache: init(['cache', 'APP_CACHE']),
    ci: init(['ci', 'APP_CI']),
    clean: init(['clean', 'APP_CLEAN']),
    debug: init(['debug', 'APP_DEBUG']),
    define: init(['define']),
    devtool: init(['devtool', 'APP_DEVTOOL']),
    discover: init(['discover', 'APP_DISCOVER']),
    externals: init(['externals']),
    hash: init(['hash', 'APP_HASH']),
    hashFormat: init(['hashFormat', 'APP_HASH_FORMAT']),
    hot: init(['server.middleware.hot', 'APP_HOT']),
    html: {
      enabled: init(['html.enable', 'APP_HTML']),
      template: init(['html.template', 'APP_HTML_TEMPLATE']),
      replacements: init(['html.replace']),
    },
    entry: init(['entry']),
    install: init(['install', 'APP_INSTALL']),
    log: {
      enabled: init(['log.enable', 'APP_LOG']),
      file: init(['log.file', 'APP_LOG_FILE']),
    },
    manifest: init(['manifest', 'APP_MANIFEST']),
    minify: init(['minify', 'APP_MINIFY']),
    mode: init(['mode', 'APP_MODE']),
    name: init(['name', 'APP_NAME']),
    namedModules: init(['namedModules', 'APP_NAMED_MODULES']),
    noEmitOnErrors: init(['noEmit', 'APP_NO_EMIT_ON_ERRORS']),
    parallelism: init(['parallelism', 'APP_PARALLELISM']),
    profile: init(['profile', 'APP_PROFILE']),
    runtimeChunk: {
      enabled: init(['runtimeChunk', 'APP_RUNTIME_CHUNK']),
      name: entrypoint => `runtime/${entrypoint.name}`,
    },
    resolve: {
      alias: init(['alias']),
      extensions: init(['resolve.extensions']),
      modules: init(['resolve.modules']),
    },
    splitChunks: {
      enabled: init(['splitChunks.enable']),
      chunks: init(['splitChunks.chunks']),
      minSize: init(['splitChunks.minSize']),
      maxSize: init(['splitChunks.maxSize']),
      minChunks: init(['splitChunks.minChunks']),
      maxAsyncRequests: init(['splitChunks.maxAsyncRequests']),
      maxInitialRequests: init([
        'splitChunks.maxInitialRequests',
      ]),
    },
    stats: init(['stats', 'APP_STATS']),
    target: init(['target', 'APP_TARGET']),
    use: init(['use', 'APP_USE']),
  },
  theme: {
    spacing: init(['theme.spacing', 'APP_THEME_SPACING']),
    colors: {
      foreground: init([
        'theme.colors.foreground',
        'APP_THEME_FOREGROUND',
      ]),
      faded: init(['theme.colors.faded', 'APP_THEME_FADED']),
      primary: init([
        'theme.colors.primary',
        'APP_THEME_PRIMARY',
      ]),
      primaryAlt: init([
        'theme.colors.primaryAlt',
        'APP_THEME_PRIMARY_ALT',
      ]),
      error: init(['theme.colors.error', 'APP_THEME_ERROR']),
      errorAlt: init([
        'theme.colors.errorAlt',
        'APP_THEME_ERROR_ALT',
      ]),
      warning: init([
        'theme.colors.warning',
        'APP_THEME_WARNING',
      ]),
      success: init([
        'theme.colors.success',
        'APP_THEME_SUCCESS',
      ]),
      accent: init(['theme.colors.accent', 'APP_THEME_ACCENT']),
      flavor: init(['theme.colors.flavor', 'APP_THEME_FLAVOR']),
    },
    screens: [
      [
        init(['theme.screens[0][0]', 'APP_THEME_SM_LOWER']),
        init(['theme.screens[0][1]', 'APP_THEME_SM_LOWER']),
      ],
      [
        init(['theme.screens[1][0]', 'APP_THEME_MD_LOWER']),
        init(['theme.screens[1][1]', 'APP_THEME_MD_LOWER']),
      ],
      [
        init(['theme.screens[2][0]', 'APP_THEME_LG_LOWER']),
        init(['theme.screens[2][1]', 'APP_THEME_LG_UPPER']),
      ],
      [
        init(['theme.screens[3][0]', 'APP_THEME_XL_LOWER']),
        init(['theme.screens[3][1]', 'APP_THEME_XL_UPPER']),
      ],
    ],
    columns: 12,
  },
}
