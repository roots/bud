import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'
import {existsSync} from 'fs-extra'

import {Config, DEFAULT_PLUGINS, DEFAULT_PRESETS} from '.'

/**
 * Babel extension interface
 *
 * @public @config
 */
export interface BudBabelExtension extends Extension.Module {
  /**
   * {@inheritDoc @roots/bud-framework#Module.name}
   *
   * @public
   */
  name: Extension.Module['name'] & '@roots/bud-babel'
  /**
   * {@inheritDoc @roots/bud-framework#Module.register}
   *
   * @public
   */
  register: Extension.Module['register']
  /**
   * {@inheritDoc @roots/bud-framework#Module.boot}
   *
   * @public
   */
  boot: Extension.Module['boot']
}

/**
 * Adds Babel transpiler support to Bud projects
 *
 * @public @config
 */
export const BudBabelExtension: BudBabelExtension = {
  /**
   * {@inheritDoc @roots/bud-framework#Module.name}
   *
   * @public
   */
  name: '@roots/bud-babel',

  /**
   * {@inheritDoc @roots/bud-framework#Module.register}
   *
   * @public
   */
  register(app: Framework): void {
    /**
     * Binds the {@link @roots/bud-babel#Config | Babel configuration class} using
     * {@link @roots/bud-framework#Service.bindClass | the Service.bindClass method}
     */
    app.extensions.bindClass({
      babel: [Config, app],
    })

    /**
     * Register new {@link @roots/bud-build#Loader} for Babel
     */
    app.build.loaders.babel = new Loader(
      require.resolve('babel-loader'),
    )

    /**
     * Register new {@link @roots/bud-build#Item} for Babel
     */
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

    /**
     * @override {@link @roots/bud-build#Rule.use}
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
