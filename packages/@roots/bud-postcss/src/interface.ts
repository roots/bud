import '@roots/bud-extensions'
import {Module} from '@roots/bud-framework'

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
     * ## PostCss.log
     */
    log: any

    /**
     * ## PostCss.plugins
     */
    plugins: PostCss.Registry

    /**
     * ## PostCss.setPlugin
     *
     * Add a PostCss plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.PostCss.setPlugin(MyPlugin, {plugin: 'options'})
     * ```
     */
    setPlugin: (
      plugin: PostCss.Plugin | PostCss.NormalizedPlugin,
    ) => this

    /**
     * ## PostCss.setPlugins
     */
    setPlugins(
      plugins: Array<PostCss.Plugin | PostCss.NormalizedPlugin>,
    ): this

    /**
     * ## PostCss.setPluginOptions
     */
    setPluginOptions: (plugin: string, options: any) => this
  }

  namespace PostCss {
    type Options = {
      plugins?: Plugin[]
      config?: boolean | string
    }

    type NormalizedPlugin = [Plugin, any]

    type Plugin = string

    interface Registry {
      [key: string]: [string, any]
    }
  }
}
