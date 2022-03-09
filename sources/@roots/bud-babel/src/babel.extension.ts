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
    .setItem('babel', {
      loader: ({build}) => build.loaders.babel,
      options: app => {
        const options: {
          cacheDirectory: string
          env: any
          root: string
          presets?: any
          plugins?: any
        } = {
          cacheDirectory: app.path('storage', 'cache', 'babel'),
          env: {
            development: {
              compact: false,
            },
          },
          root: app.path('src'),
        }

        if (app.babel?.presets) {
          options.presets = Object.values(app.babel.presets)
        }

        if (app.babel?.plugins) {
          options.plugins = Object.values(app.babel.plugins)
        }

        return options
      },
    })

  app.build.rules.js.setUse(items => [`babel`, ...items])

  app.babel.setPresets(DEFAULT_PRESETS).setPlugins(DEFAULT_PLUGINS)
}
