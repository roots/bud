/**
 * @module Framework.Extensions.Babel
 */

import {Item, Loader} from '@roots/bud-build'
import type {Framework} from '@roots/bud-framework'
import {existsSync} from 'fs-extra'

import type {BabelExtension} from '..'
import {Config, DEFAULT_PLUGINS, DEFAULT_PRESETS} from '..'

/**
 * Extension: Babel
 *
 * @implements {BabelExtension}
 * @implements {Framework.Module}
 */
const Babel: BabelExtension = {
  /**
   * @property {string} name
   * @see {BabelExtension.name}
   */
  name: '@roots/bud-babel',

  /**
   * Extension register event
   */
  register(app: Framework): void {
    /**
     * Bind app.babel
     */
    app.extensions.bindClass({
      babel: [Config, app],
    })

    /**
     * Register Build Loader
     */
    app.build.loaders.babel = new Loader(
      require.resolve('babel-loader'),
    )

    /**
     * Register Build Item
     */
    app.build.items.babel = new Item({
      loader: ({build}) => build.loaders.babel,
      options: app => {
        const options: {
          cacheDirectory: string
          root: string
          presets?: any
          plugins?: any
        } = {
          cacheDirectory: app.path('storage', 'cache', 'babel'),
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

    /**
     * Override Build JS Rule
     */
    app.build.rules.js.setUse(({build}) => [build.items.babel])
  },

  /**
   * Extension boot event
   */
  boot(app: Framework): void {
    !existsSync(app.path('project', 'babel.config.js')) &&
      app.babel
        .setPresets(DEFAULT_PRESETS)
        .setPlugins(DEFAULT_PLUGINS)
  },
}

export {Babel}
