import '@roots/bud-extensions'
import {Module} from '@roots/bud-framework'

export declare const name: Module['name']
export declare const devDependencies: Module['devDependencies']
export declare const api: Module['api']
export declare const publish: Module['publish']
export declare const boot: Module['boot']

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: PostCss
  }

  namespace Hooks {
    namespace Extension {
      interface Definitions {
        '@roots/bud-postcss': Module
      }
    }

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

  interface PostCss {
    /**
     * ## PostCss.log
     */
    log: any

    /**
     * ## PostCss.hasProjectConfig
     */
    hasProjectConfig: boolean

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
    setPlugin: (plugin: PostCss.Registrable) => this

    /**
     * ## PostCss.setPlugins
     */
    setPlugins(
      plugins: Array<PostCss.NormalizedPlugin | string>,
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

    type NormalizedPlugin = [string, any]

    type Plugin = string | NormalizedPlugin | CallableFunction

    type Registrable = string | NormalizedPlugin

    interface Registry {
      [key: string]: [string, any]
    }
  }
}
