import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

interface Registry {
  [key: string]: [any, any?]
}

export class PostCssConfig {
  public plugins: Registry = {}

  public constructor(public app: Framework) {}

  @bind
  public setPlugin(
    name: string,
    plugin: [any, any?] | [any],
  ): this {
    this.app.success(`postcss plugin set: ${name}`)

    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin]

    return this
  }

  @bind
  public setPlugins(plugins: {
    [key: string]: [any, any?]
  }): this {
    this.plugins = plugins

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
