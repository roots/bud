import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.postcss
     *
     * Configure postcss.
     */
    postcss: PostCss
  }

  interface PostCss {
    /**
     * ## bud.postcss.addPlugin
     *
     * Add a postcss plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.postcss.addPlugin(MyPlugin, {plugin: 'options'})
     * ```
     */
    addPlugin: Bud.PostCss.AddPlugin

    /**
     * ## bud.presetEnv
     *
     * Configure postcss preset-env
     *
     * ### Usage
     *
     * ```js
     * bud.postcss.presetEnv({
     *  // custom preset-env configuration
     * })
     * ```
     */
    presetEnv: Bud.PostCss.PresetEnv
  }

  namespace Bud.PostCss {
    type AddPlugin = (
      name: string,
      opts?: {[key: string]: any},
    ) => Bud

    type PresetEnv = (options: {[key: string]: any}) => Bud
  }
}
