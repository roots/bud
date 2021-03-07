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
      setPlugin: PostCss.SetPlugin

      /**
       * ## postcss.enable
       */
      enable: PostCss.Enable

      /**
       * ## postcss.options
       *
       * Get the postcss options as set
       */
      options: PostCss.Options

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
    }

    namespace PostCss {
      type SetPlugin = (
        plugin: Framework.PostCss.Registrable,
      ) => PostCss

      type Options = {
        plugins: Plugin[]
      }

      type Plugin = string | [string, any] | CallableFunction

      type Enable = (enable: string[]) => Framework

      type Registrable = string | [string, any]

      type RegistryMutagen = (plugins: Registry) => Registry

      interface Registry {
        [key: string]: Plugin
      }
    }
  }
}
