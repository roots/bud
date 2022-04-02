import {bind} from '@roots/bud-support'
import {Container} from '@roots/container'

interface Registry {
  [key: string]: [any, any?] | any
}

/**
 * Bud PostCSS Extension
 *
 * @public
 */
export class PostCssConfig extends Container<Registry> {
  /**
   * Set a plugin
   *
   * @param name - plugin handle
   * @param plugin - the plugin object or a tuple of plugin and options
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public setPlugin(name: string, plugin: [any, any?] | any): this {
    this.set(name, Array.isArray(plugin) ? plugin : [plugin])

    return this
  }

  /**
   * Sets all plugins
   *
   * @param plugins - plugins object
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public setPlugins(plugins: Registry): this {
    this.setStore(plugins)

    return this
  }

  /**
   * Remove a plugin
   *
   * @param plugins - handle of plugin to remove
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public unsetPlugin(plugin: string) {
    this.has(plugin) && this.remove(plugin)

    return this
  }

  /**
   * Override options on a plugin
   *
   * @param plugins - handle of plugin to modify options of
   * @param options - the options to set
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.set(plugin, [
      this.isArray(plugin) ? this.get(plugin).shift() : this.get(plugin),
      options,
    ])

    return this
  }
}
