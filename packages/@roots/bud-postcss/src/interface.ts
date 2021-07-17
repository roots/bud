import '@roots/bud-extensions'
import type {Module} from '@roots/bud-framework'
import type {PluginCreator} from 'postcss'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: Framework.Api.PostCss
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-postcss': Module
    }

    namespace Hooks {
      namespace Loader {
        interface Definitions {
          postcss: string
        }
      }

      namespace Item {
        interface Definitions {
          postcss: any
        }
      }
    }

    namespace Api {
      interface PostCss {
        /**
         * Registered plugins
         */
        plugins: PostCss.Registry

        /**
         * Set a plugin
         */
        setPlugin(
          plugin: string | PostCss.NormalizedPlugin,
        ): this

        /**
         * Set plugins
         */
        setPlugins(
          plugins: Array<PostCss.NormalizedPlugin | string>,
        ): this

        /**
         * Set plugin options
         */
        setPluginOptions(plugin: string, options: any): this

        /**
         * Remove a plugin
         */
        unsetPlugin(plugin: string): this
      }

      namespace PostCss {
        type NormalizedPlugin = [string, any]

        interface Registry {
          [key: string]: [PluginCreator<any>, any]
        }
      }
    }
  }
}
