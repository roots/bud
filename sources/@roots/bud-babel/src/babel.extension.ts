import {Extension, Framework} from '@roots/bud-framework'

import {Config} from './babel.config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './babel.constants'

/**
 * Adds Babel transpiler support to Framework projects
 *
 * @public
 */
export const name = '@roots/bud-babel'

/**
 * Exposes app.babel configuration utility
 *
 * @public
 */
export const mixin: Extension.Module['mixin'] = async app => ({
  babel: [Config, app],
})

export const options: Extension.Module['options'] = async (
  app: Framework,
) => ({
  cacheDirectory: app.path(`@storage/cache/babel`),
  env: {
    development: {
      compact: false,
    },
  },
  root: app.path(),
})

/**
 * Extension register event
 *
 * @public
 */
export const register: Extension.Module['register'] = async (
  app: Framework,
) => {
  app.build
    .setLoader('babel', require.resolve('babel-loader'))
    .setItem('babel', babel =>
      babel.setLoader(`babel`).setOptions(app => {
        const options = app.extensions.get('@roots/bud-babel').options

        app.babel?.presets &&
          options.set('presets', Object.values(app.babel.presets))

        app.babel?.plugins &&
          options.set('plugins', Object.values(app.babel.plugins))

        return options.all()
      }),
    )
    .rules.js.setUse(items => [`babel`, ...items])

  app.babel.setPresets(DEFAULT_PRESETS).setPlugins(DEFAULT_PLUGINS)
}
