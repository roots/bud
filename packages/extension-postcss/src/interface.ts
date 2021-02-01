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
      addPlugin: PostCss.AddPlugin

      /**
       * ## postcss.config
       */
      getConfig: PostCss.GetConfig

      /**
       * ## postcss.setConfig
       */
      setConfig: PostCss.SetConfig

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
      plugins: PostCss.Plugins
    }

    namespace PostCss {
      type AddPlugin = (
        plugin: any,
        options?: {[key: string]: unknown},
      ) => Bud

      type GetConfig = () => any

      type SetConfig = (options: {[key: string]: any}) => Bud

      type Options = any

      type Plugins = any
    }
  }
}
