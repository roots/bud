import '@roots/bud'

import type {
  PluginTarget,
  PluginOptions,
  TransformOptions,
} from '@babel/core'

interface LoaderOptions extends TransformOptions {
  cacheDirectory: string
}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## app.babel
     *
     * Configure babel.
     */
    babel: Framework.Babel
  }

  namespace Framework {
    interface Babel {
      /**
       * ## app.babel.addPlugin
       *
       * Add a babel plugin.
       *
       * ### Usage
       *
       * ```js
       * app.babel.addPlugin(
       *   '@babel/plugin-transform-runtime',
       *   {helpers: false,}
       * )
       * ```
       */
      addPlugin: Framework.Babel.AddPlugin

      /**
       * ## app.babel.addPlugin
       *
       * Add a babel plugin.
       *
       * ### Usage
       *
       * ```js
       * app.babel.addPreset(
       *   '@babel/react-preset',
       *   {loose: true}
       * )
       * ```
       */
      addPreset: Framework.Babel.AddPreset

      /**
       * ## app.babel.setOptions
       *
       * Configure babel transform options
       *
       * ### Usage
       *
       * ```js
       * app.babel.setOptions({
       *  configFile: 'babel.config.js',
       * })
       * ```
       */
      setOptions: Framework.Babel.SetOptions

      /**
       * ## app.babel.setPlugins
       *
       * Set babel plugins (will override existing values)
       *
       * ### Usage
       *
       * ```js
       * app.babel.setPlugins([
       *  ['@babel/react-preset', {loose: true}],
       * ])
       * ```
       */
      setPlugins: Framework.Babel.SetPlugins

      /**
       * ## app.babel.setPresets
       *
       * Set babel presets (will override existing values)
       *
       * ### Usage
       *
       * ```js
       * app.babel.setPresets([
       *  ['@babel/react-preset', {loose: true}],
       * ])
       * ```
       */
      setPresets: Framework.Babel.SetPlugins
    }

    namespace Babel {
      type AddPlugin = (
        name: PluginTarget,
        opts?: PluginOptions,
      ) => Framework

      type AddPreset = (
        name: PluginTarget,
        opts?: PluginOptions,
      ) => Framework

      type SetPlugins = (
        plugins: Array<[PluginTarget, PluginOptions]>,
      ) => Framework

      type SetOptions = (opts?: LoaderOptions) => Framework
    }
  }
}
