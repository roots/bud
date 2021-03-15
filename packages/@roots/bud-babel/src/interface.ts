import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  abstract class Framework {
    /**
     * ## bud.Babel
     *
     * Configure babel.
     */
    babel: Babel
  }

  export interface Babel {
    /**
     * ## babel.log
     */
    log: any

    /**
     * ## babel.hasProjectConfig
     */
    hasProjectConfig: boolean

    /**
     * ## babel.plugins
     */
    plugins: Babel.Registry

    /**
     * ## babel.presets
     */
    presets: Babel.Registry

    /**
     * ## babel.setPlugin
     *
     * Add a babel plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
     * ```
     */
    setPlugin: (plugin: Babel.Registrable) => this

    /**
     * ## babel.setPlugins
     */
    setPlugins(plugins: Array<[string, any?] | string>): this

    /**
     * ## babel.setPluginOptions
     */
    setPluginOptions: (plugin: string, options: any) => this

    /**
     * ## babel.setPlugin
     *
     * Add a babel plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
     * ```
     */
    setPreset: (preset: Babel.Registrable) => this

    /**
     * ## babel.setPresets
     */
    setPresets(presets: Array<[string, any?] | string>): this

    /**
     * ## babel.setPresetOptions
     */
    setPresetOptions: (preset: string, options: any) => this
  }

  export namespace Babel {
    export type Options = {
      plugins?: Plugin[]
      config?: boolean | string
    }

    export type Plugin =
      | string
      | [string, any]
      | CallableFunction

    export type Registrable = string | [string, any]

    export interface Registry {
      [key: string]: [string, any]
    }
  }
}
