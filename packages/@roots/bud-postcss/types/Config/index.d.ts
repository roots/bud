import {PluginCreator} from 'postcss'
interface Registry {
  [key: string]: [PluginCreator<any>, any]
}
interface PostCssConfig {
  /**
   * Registered plugins
   */
  plugins: Registry
  /**
   * Set a plugin
   */
  setPlugin(plugin: string | [string, any]): this
  /**
   * Set plugins
   */
  setPlugins(plugins: Array<[string, any] | string>): this
  /**
   * Set plugin options
   */
  setPluginOptions(plugin: string, options: any): this
  /**
   * Remove a plugin
   */
  unsetPlugin(plugin: string): this
}
declare class PostCssConfig {
  plugins: Registry
  normalizeEntry(c: string | [string, any]): [string, any]
}
export {PostCssConfig}
//# sourceMappingURL=index.d.ts.map
