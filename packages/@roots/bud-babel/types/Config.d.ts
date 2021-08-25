import type {Framework} from '@roots/bud-framework'
/**
 * Configure babel.
 *
 * @usage
 * ```js
 * app.babel.setPlugins([
 *  ['@babel/plugin-transform-runtime', {helpers: false}],
 *  '@babel/plugin-proposal-object-rest-spread',
 *  '@babel/plugin-syntax-dynamic-import',
 *  '@babel/plugin-proposal-class-properties',
 * ])
 * ```
 */
interface Config {
  /**
   * Registered babel plugins
   */
  plugins: Config.Registry
  /**
   * Registered babel presets
   */
  presets: Config.Registry
  /**
   * Add a babel plugin
   *
   * @usage
   * ```js
   * babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPlugin(plugin: Config.Registrable): Config
  /**
   * Add babel plugins
   */
  setPlugins(plugins: Array<Config.Registrable>): Config
  /**
   * Set the options for a plugin
   */
  setPluginOptions(plugin: string, options: any): Config
  /**
   * Add a babel preset
   *
   * @usage
   * ```js
   * babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPreset(preset: Config.Registrable): Config
  /**
   * Add babel presets
   */
  setPresets(
    presets: Array<Config.NormalizedPlugin | string>,
  ): Config
  /**
   * Set the options for a preset
   */
  setPresetOptions(preset: string, options: any): Config
}
declare namespace Config {
  type Options = {
    plugins?: Plugin[]
    config?: boolean | string
  }
  type NormalizedPlugin = [
    string,
    {
      [key: string]: any
    },
  ]
  type Plugin = string | NormalizedPlugin | CallableFunction
  type Registrable = string | NormalizedPlugin
  interface Registry {
    [key: string]: [string, any]
  }
}
declare class Config implements Config {
  name: string
  _app: () => Framework
  plugins: Config.Registry
  presets: Config.Registry
  get app(): Framework
  constructor(app: Framework)
  normalizeEntry(c: Config.Registrable): Config.NormalizedPlugin
  unsetPreset(preset: string): this
  unsetPlugin(plugin: string): this
}
export {Config}
//# sourceMappingURL=Config.d.ts.map
