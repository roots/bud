import type {
  PluginTarget,
  PluginOptions,
  TransformOptions,
} from '@babel/core'

interface LoaderOptions extends TransformOptions {
  cacheDirectory: string
}

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.babel
     *
     * Configure babel.
     */
    babel: Babel
  }

  interface Babel {
    /**
     * ## bud.babel.addPlugin
     *
     * Add a babel plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.babel.addPlugin(
     *   '@babel/plugin-transform-runtime',
     *   {helpers: false,}
     * )
     * ```
     */
    addPlugin: Bud.Babel.AddPlugin

    /**
     * ## bud.babel.addPlugin
     *
     * Add a babel plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.babel.addPreset(
     *   '@babel/react-preset',
     *   {loose: true}
     * )
     * ```
     */
    addPreset: Bud.Babel.AddPreset

    /**
     * ## bud.babel.setOptions
     *
     * Configure babel transform options
     *
     * ### Usage
     *
     * ```js
     * bud.babel.setOptions({
     *  configFile: 'babel.config.js',
     * })
     * ```
     */
    setOptions: Bud.Babel.SetOptions

    /**
     * ## bud.babel.setPlugins
     *
     * Set babel plugins (will override existing values)
     *
     * ### Usage
     *
     * ```js
     * bud.babel.setPlugins([
     *  ['@babel/react-preset', {loose: true}],
     * ])
     * ```
     */
    setPlugins: Bud.Babel.SetPlugins
  }

  namespace Bud.Babel {
    type AddPlugin = (
      name: PluginTarget,
      opts?: PluginOptions,
    ) => Bud

    type AddPreset = (
      name: PluginTarget,
      opts?: PluginOptions,
    ) => Bud

    type SetPlugins = (
      this: Bud,
      plugins: Array<[PluginTarget, PluginOptions]>,
    ) => Bud

    type SetOptions = (opts?: LoaderOptions) => Bud
  }
}
