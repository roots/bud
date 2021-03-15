import * as patterns from './patterns'
import {server} from './server'
import {args, env, source} from './source'
import {resolve} from 'path'

export const repositories = {
  args,
  env,
  patterns,
  server,
  locations: {
    project: source(['location.project', 'APP_PATH']),
    src: source(['location.src', 'APP_SRC']),
    dist: source(['location.dist', 'APP_DIST']),
    storage: source(['location.storage', 'APP_STORAGE']),
    modules: resolve(
      source(['location.project', 'APP_PATH']),
      source(['location.modules', 'APP_MODULES']),
    ),
    publicPath: source([
      'location.publicPath',
      'APP_PUBLIC_PATH',
    ]),
    records: source(['location.records', 'APP_RECORDS']),
  },
  options: {
    ci: source(['ci', 'APP_CI']),
    bail: source(['bail', 'APP_BAIL']),
    cache: source(['cache', 'APP_CACHE']),
    clean: source(['clean', 'APP_CLEAN']),
    context: source(['locations.project', 'APP_PATH']),
    debug: source(['debug', 'APP_DEBUG']),
    define: source(['define']),
    devtool: source(['devtool', 'APP_DEVTOOL']),
    discover: source(['discover', 'APP_DISCOVER']),
    externals: source(['externals']),
    fileFormat: source(['fileFormat', 'APP_FILE_FORMAT']),
    hash: source(['hash', 'APP_HASH']),
    hashFormat: source(['hashFormat', 'APP_HASH_FORMAT']),
    hot: source(['server.middleware.hot', 'APP_HOT']),
    html: {
      enabled: source(['html.enable', 'APP_HTML']),
      template: source(['html.template', 'APP_HTML_TEMPLATE']),
      replacements: source(['html.replace']),
    },
    entry: source(['entry']),
    install: source(['install', 'APP_INSTALL']),
    log: source(['log', 'APP_LOG']),
    manifest: source(['manifest', 'APP_MANIFEST']),
    minimize: source(['minify', 'APP_MINIFY']),
    mode: source(['mode', 'APP_MODE']),
    name: source(['name', 'APP_NAME']),
    namedModules: source(['namedModules', 'APP_NAMED_MODULES']),
    noEmitOnErrors: source(['noEmit', 'APP_NO_EMIT_ON_ERRORS']),
    node: source(['node']),
    parallelism: source(['parallelism', 'APP_PARALLELISM']),
    profile: source(['profile', 'APP_PROFILE']),
    runtimeChunkEnabled: source([
      'runtimeChunk',
      'APP_RUNTIME_CHUNK',
    ]),
    runtimeChunk: {
      name: entrypoint => `runtime/${entrypoint.name}`,
    },
    resolve: {
      alias: source(['alias']),
      extensions: source(['resolve.extensions']),
      modules: [...source(['resolve.modules'])],
    },
    splitChunksEnabled: source([
      'splitChunksEnabled',
      'APP_SPLITCHUNKS_ENABLED',
    ]),
    splitChunks: {
      chunks: source(['splitChunks.chunks']),
      minSize: source(['splitChunks.minSize']),
      maxSize: source(['splitChunks.maxSize']),
      minChunks: source(['splitChunks.minChunks']),
      maxAsyncRequests: source(['splitChunks.maxAsyncRequests']),
      maxInitialRequests: source([
        'splitChunks.maxInitialRequests',
      ]),
    },
    stats: source(['stats', 'APP_STATS']),
    target: source(['target', 'APP_TARGET']),
    use: source(['use', 'APP_USE']),
  },
  theme: {
    spacing: source(['theme.spacing', 'APP_THEME_SPACING']),
    colors: {
      foreground: source([
        'theme.colors.foreground',
        'APP_THEME_FOREGROUND',
      ]),
      faded: source(['theme.colors.faded', 'APP_THEME_FADED']),
      primary: source([
        'theme.colors.primary',
        'APP_THEME_PRIMARY',
      ]),
      primaryAlt: source([
        'theme.colors.primaryAlt',
        'APP_THEME_PRIMARY_ALT',
      ]),
      error: source(['theme.colors.error', 'APP_THEME_ERROR']),
      errorAlt: source([
        'theme.colors.errorAlt',
        'APP_THEME_ERROR_ALT',
      ]),
      warning: source([
        'theme.colors.warning',
        'APP_THEME_WARNING',
      ]),
      success: source([
        'theme.colors.success',
        'APP_THEME_SUCCESS',
      ]),
      accent: source([
        'theme.colors.accent',
        'APP_THEME_ACCENT',
      ]),
      flavor: source([
        'theme.colors.flavor',
        'APP_THEME_FLAVOR',
      ]),
    },
    screens: [
      [
        source(['theme.screens[0][0]', 'APP_THEME_SM_LOWER']),
        source(['theme.screens[0][1]', 'APP_THEME_SM_LOWER']),
      ],
      [
        source(['theme.screens[1][0]', 'APP_THEME_MD_LOWER']),
        source(['theme.screens[1][1]', 'APP_THEME_MD_LOWER']),
      ],
      [
        source(['theme.screens[2][0]', 'APP_THEME_LG_LOWER']),
        source(['theme.screens[2][1]', 'APP_THEME_LG_UPPER']),
      ],
      [
        source(['theme.screens[3][0]', 'APP_THEME_XL_LOWER']),
        source(['theme.screens[3][1]', 'APP_THEME_XL_UPPER']),
      ],
    ],
    columns: 12,
  },
}
