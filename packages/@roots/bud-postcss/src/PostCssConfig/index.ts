import {boundMethod as bind} from 'autobind-decorator'

interface Registry {
  [key: string]: [string, any]
}

interface PostCssConfig {
  /**
   * Registered plugins
   */
  plugins: Registry

  /**
   * Set a plugin
   */
  setPlugin(name: string, plugin: [string, any] | string): this

  /**
   * Set plugins
   */
  setPlugins(plugins: {
    [key: string]: [string, any] | string
  }): this

  /**
   * Set plugin options
   */
  setPluginOptions(plugin: string, options: any): this

  /**
   * Remove a plugin
   */
  unsetPlugin(plugin: string): this
}

class PostCssConfig {
  public plugins: Registry = {}

  @bind
  public setPlugin(
    name: string,
    plugin: [string, any] | string,
  ): this {
    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin, undefined]

    return this
  }

  @bind
  public setPlugins(plugins: {
    [key: string]: [string, any] | string
  }): this {
    this.plugins = Object.entries(plugins).reduce(
      (plugins, [name, plugin]) => {
        if (Array.isArray(plugin)) {
          plugins[name] = plugin
          return plugins
        }

        plugins[name] = [plugin, undefined]
        return plugins
      },
      {},
    )

    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    this.plugins[plugin] && delete this.plugins[plugin]
    return this
  }

  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [
      this.plugins[plugin].shift(),
      options,
    ]

    return this
  }
}

export {PostCssConfig}
