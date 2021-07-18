import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## babel
     *
     * Configure babel.
     */
    babel: Framework.Api.Babel
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': Module
    }

    namespace Hooks.Loader {
      interface Definitions {
        babel: string
      }
    }

    namespace Hooks.Item {
      interface Definitions {
        babel: any
      }
    }

    namespace Api {
      interface Babel {
        /**
         * ## babel.plugins
         */
        plugins: Babel.Registry

        /**
         * ## babel.presets
         */
        presets: Babel.Registry

        /**
         * ## babel.init
         *
         * Initialize class.
         */
        init(app: Framework): Babel

        /**
         * ## babel.setPlugin
         *
         * Add a babel plugin.
         *
         * ### Usage
         *
         * ```js
         * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
         * ```
         */
        setPlugin(plugin: Babel.Registrable): Babel

        /**
         * ## babel.setPlugins
         */
        setPlugins(
          plugins: Array<Babel.NormalizedPlugin | string>,
        ): Babel

        /**
         * ## babel.setPluginOptions
         */
        setPluginOptions: (plugin: string, options: any) => this

        /**
         * ## babel.setPlugin
         *
         * Add a babel plugin.
         *
         * ### Usage
         *
         * ```js
         * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
         * ```
         */
        setPreset(preset: Babel.Registrable): Babel

        /**
         * ## babel.setPresets
         */
        setPresets(
          presets: Array<Babel.NormalizedPlugin | string>,
        ): Babel

        /**
         * ## babel.setPresetOptions
         */
        setPresetOptions(preset: string, options: any): Babel
      }

      namespace Babel {
        type Options = {
          plugins?: Plugin[]
          config?: boolean | string
        }

        type NormalizedPlugin = [string, any]

        type Plugin =
          | string
          | NormalizedPlugin
          | CallableFunction

        type Registrable = string | NormalizedPlugin

        interface Registry {
          [key: string]: [string, any]
        }
      }
    }
  }
}
