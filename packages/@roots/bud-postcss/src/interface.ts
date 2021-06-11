import '@roots/bud-extensions'
import {Module} from '@roots/bud-framework'
import {PluginCreator} from 'postcss'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: PostCss
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
  }

  interface PostCss {
    /**
     * Registered plugins
     */
    plugins: PostCss.Registry

    /**
     * Set a plugin
     */
    setPlugin(
      name: string,
      plugin: PostCss.Plugin | PostCss.NormalizedPlugin,
    ): this

    /**
     * Set plugins
     */
    setPlugins(plugins: {
      [key: string]: PostCss.Plugin | PostCss.NormalizedPlugin
    }): this

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
    type NormalizedPlugin = [Plugin, any]

    type Plugin = string | PluginCreator<any>

    interface Registry {
      [key: string]: NormalizedPlugin
    }
  }
}
