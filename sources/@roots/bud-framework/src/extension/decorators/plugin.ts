/**
 * Webpack plugin.
 */
export interface ApplyPlugin {
  /**
   * Loose defined
   */
  [key: string]: any

  /**
   * Apply callback
   *
   * @see {@link https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture}
   */
  apply: (...args: Array<any>) => unknown
}

/**
 * Newable function or class that returns
 * an {@link ApplyPlugin} instance.
 */
export interface ApplyPluginConstructor {
  new (...args: any[]): ApplyPlugin
}
/**
 * A decorator that adds a plugin property to the class.
 *
 * @param plugin - {@link ApplyPlugin}
 */
export const plugin =
  (plugin: new (...args: any[]) => {apply: CallableFunction}) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public plugin = plugin
    }
