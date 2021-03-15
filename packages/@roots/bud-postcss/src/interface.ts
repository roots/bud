import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: Framework.PostCss
  }

  namespace Framework {
    interface PostCss {
      /**
       * ## postcss.enable
       */
      enable: PostCss.Enable

      /**
       * ## postcss.disable
       */
      disable: PostCss.Disable

      /**
       * ## postcss.plugins
       *
       * Get the postcss plugins as set.
       */
      plugins: PostCss.Registry

      /**
       * ## postcss.enabled
       *
       * Enabled plugins
       */
      enabled: string[]

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
      setPlugin: (plugin: Framework.PostCss.Registrable) => this

      /**
       * ## postcss.setPluginOptions
       */
      setPluginOptions: (plugin: string, options: any) => this

      /**
       * ## postcss.hasProjectConfig
       */
      hasProjectConfig: boolean

      /**
       * ## postcss.log
       */
      log: any
    }

    namespace PostCss {
      type SetPlugin = (
        plugin: Framework.PostCss.Registrable,
      ) => unknown

      type Options = {
        plugins?: Plugin[]
        config?: boolean | string
      }

      type Plugin = string | [string, any] | CallableFunction

      type Enable = (enable: string[]) => Framework
      type Disable = (plugins: string[]) => Framework

      type Registrable = string | [string, any]

      type RegistryMutagen = (plugins: Registry) => Registry

      interface Registry {
        [key: string]: [string, any]
      }
    }
  }
}
