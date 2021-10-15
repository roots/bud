import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'
import {existsSync} from 'fs-extra'

import {Config, DEFAULT_PLUGINS, DEFAULT_PRESETS} from '.'

/**
 * Adds Babel transpiler support to Framework projects
 *
 * @public @config
 */
export const BudBabelExtension: Extension.Module = {
  /**
   * Extension name
   *
   * @public
   */
  name: '@roots/bud-babel',

  /**
   * Extension register event
   *
   * @public
   */
  register(app: Framework): void {
    app.extensions.bindClass({
      babel: [Config, app],
    })

    app.build.loaders.babel = new Loader(
      require.resolve('babel-loader'),
    )

    app.build.items.babel = new Item({
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

    app.build.rules.js.setUse(({build}) => [build.items.babel])
  },

  /**
   * Extension boot event
   *
   * @public
   */
  boot(app: Framework): void {
    !existsSync(app.path('project', 'babel.config.js')) &&
      app.babel
        .setPresets(DEFAULT_PRESETS)
        .setPlugins(DEFAULT_PLUGINS)
  },
}
