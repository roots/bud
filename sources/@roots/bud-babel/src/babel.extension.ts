import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'

import {Config} from './babel.config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './babel.constants'

/**
 * Babel options
 *
 * @public
 */
export interface Options {
  cacheDirectory: string
  env: any
  root: string
  presets?: any
  plugins?: any
}

/**
 * Adds Babel transpiler support
 *
 * @public
 */
export interface BabelExtension extends Extension.Module<Options> {
  name: '@roots/bud-babel'
  mixin: (app: Framework) => Promise<{babel: [typeof Config, Framework]}>
  options: (app: Framework) => Options
  register: (app: Framework) => Promise<void>
}

/**
 * Extension name
 *
 * @public
 */
export const name: BabelExtension['name'] = '@roots/bud-babel'

/**
 * Bud mixins
 *
 * @remarks
 * Registers `bud.babel` configuration class
 *
 * @public
 */
export const mixin: BabelExtension['mixin'] = async app => ({
  babel: [Config, app],
})

/**
 * Extension options
 *
 * @public
 */
export const options: BabelExtension['options'] = app => ({
  cacheDirectory: app.path('storage', 'cache', 'babel'),
  env: {
    development: {
      compact: false,
    },
  },
  root: app.path('src'),
  ...(app.babel.presets
    ? {presets: Object.values(app.babel.presets)}
    : {}),
  ...(app.babel.plugins
    ? {plugins: Object.values(app.babel.plugins)}
    : {}),
})

/**
 * Extension registration
 *
 * @public
 */
export const register: BabelExtension['register'] = async app => {
  /**
   * Babel loader
   */
  app.build.loaders.babel = new Loader(require.resolve('babel-loader'))

  /**
   * Babel ruleset item
   */
  app.build.items.babel = new Item({
    loader: app => app.build.loaders.babel,
    options: app => app.extensions.get('@roots/bud-babel').options.all(),
  })

  /**
   * Babel ruleset rule
   */
  app.build.rules.js.setUse(app => [app.build.items.babel])

  /**
   * Default babel presets and plugins
   */
  app.babel.setPresets(DEFAULT_PRESETS).setPlugins(DEFAULT_PLUGINS)
}
