import {Module} from '@roots/bud-framework'
import {Signale} from '@roots/bud-support'

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
    postcss: Framework.PostCss
  }

  namespace Framework.Hooks {
    namespace Loader {
      interface Definitions {
        postcss: Subject
      }
    }

    namespace Item {
      interface Definitions {
        postcss: Subject
      }
    }
  }

  namespace Framework {
    interface PostCss {
      /**
       * ## postcss.log
       */
      logger: Signale

      /**
       * ## postcss.hasProjectConfig
       */
      hasProjectConfig: boolean

      /**
       * ## postcss.plugins
       *
       * Get the postcss plugins as set.
       */
      plugins: PostCss.Registry

      /**
       * ## postcss.ordered
       *
       * Specific order of plugins
       */
      order: string[]

      /**
       * ## postcss.addPlugin
       *
       * Add a postcss plugin.
       *
       * ### Usage
       *
       * ```js
       * bud.postcss.addPlugin(MyPlugin, {plugin: 'options'})
       * ```
       */
      set: (plugin: Framework.PostCss.Registrable) => this

      /**
       * ## postcss.setPluginOptions
       */
      setOptions: (plugin: string, options: any) => this

      /**
       * ## postcss.order
       *
       * Provide a specific order to load plugins
       */
      setOrder: (order: string[]) => this

      /**
       * ## postcss.makePluginsConfig
       *
       * Output final plugins config for postcss
       */
      makeConfig: () => any
    }

    namespace PostCss {
      type SetPlugin = (
        plugin: Framework.PostCss.Registrable,
      ) => unknown

      type Options = {
        plugins?: Plugin[]
        config?: boolean | string
      }

      type Plugin = CallableFunction

      type Registrable = [string, any] | string
      type Registry = {[key: string]: any}
      type RegistryMutagen = (
        plugins: Registrable,
      ) => Registrable
    }
  }
}
