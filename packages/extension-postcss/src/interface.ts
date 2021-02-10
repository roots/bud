import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: Bud.PostCss
  }

  namespace Bud {
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
    }

    namespace PostCss {
      type SetPlugin = (
        plugin: Bud.PostCss.Registrable,
      ) => PostCss

      type Options = {
        plugins: Plugin[]
      }

      type Plugin = string | [string, any] | CallableFunction

      type Registrable = string | [string, any]

      interface Registry {
        [key: string]: Plugin
      }
    }
  }
}
