/**
 * @module Framework.Extensions.Babel
 */

import type {Build, Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * babel
     *
     * Configure babel.
     *
     * @usage
     *
     * ```js
     * app.use([babel])
     * ```
     */
    babel: BabelConfig
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': Module
    }

    interface Loaders {
      babel: Build.Loader
    }

    interface Items {
      babel: Build.Item
    }
  }
}

/**
 * @interface BabelExtension
 */
interface BabelExtension {
  name: Module.Name & '@roots/bud-babel'
  register: Module.Register
  boot: Module.Boot
}

/**
 * @interface BabelConfig
 */
interface BabelConfig {
  /**
   * babel.plugins
   */
  plugins: BabelConfig.Registry

  /**
   * babel.presets
   */
  presets: BabelConfig.Registry

  /**
   * babel.setPlugin
   *
   * Add a babel plugin.
   *
   * @usage
   *
   * ```js
   * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPlugin(plugin: BabelConfig.Registrable): BabelConfig

  /**
   * babel.setPlugins
   */
  setPlugins(
    plugins: Array<BabelConfig.Registrable>,
  ): BabelConfig

  /**
   * babel.setPluginOptions
   */
  setPluginOptions(plugin: string, options: any): BabelConfig

  /**
   * babel.setPlugin
   *
   * Add a babel plugin.
   *
   * @usage
   *
   * ```js
   * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPreset(preset: BabelConfig.Registrable): BabelConfig

  /**
   * babel.setPresets
   */
  setPresets(
    presets: Array<BabelConfig.NormalizedPlugin | string>,
  ): BabelConfig

  /**
   * babel.setPresetOptions
   */
  setPresetOptions(preset: string, options: any): BabelConfig
}

namespace BabelConfig {
  export type Options = {
    plugins?: Plugin[]
    config?: boolean | string
  }

  export type NormalizedPlugin = [string, {[key: string]: any}]

  export type Plugin =
    | string
    | NormalizedPlugin
    | CallableFunction

  export type Registrable = string | NormalizedPlugin

  export interface Registry {
    [key: string]: [string, any]
  }
}

export {BabelExtension, BabelConfig}
