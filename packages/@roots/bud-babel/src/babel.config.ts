import {bind} from './babel.dependencies'
import {Registry, UserInput} from './babel.interface'

export class Config {
  public plugins: Registry = {}

  public presets: Registry = {}

  @bind
  public setPreset(
    name: string,
    preset: [string, any?] | string | any | [any, any?],
  ): this {
    if (Array.isArray(preset)) {
      this.presets[name] = preset
      return this
    }

    this.presets[name] = [preset]
    return this
  }

  @bind
  public setPresets(presets: UserInput): this {
    this.presets = Object.entries(presets).reduce(
      (presets, [name, preset]) => {
        if (Array.isArray(preset)) {
          presets[name] = preset
          return presets
        }

        presets[name] = [preset]
        return presets
      },
      {},
    )

    return this
  }

  @bind
  public unsetPreset(preset: string) {
    this.presets[preset] && delete this.presets[preset]
    return this
  }

  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [
      this.presets[preset].shift(),
      options,
    ]

    return this
  }

  @bind
  public setPlugin(
    name: string,
    plugin: string | any | [string, any?] | [any, any?],
  ): this {
    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin]
    return this
  }

  @bind
  public setPlugins(plugins: UserInput): this {
    this.plugins = Object.entries(plugins).reduce(
      (plugins, [name, plugin]) => {
        if (Array.isArray(plugin)) {
          plugins[name] = plugin
          return plugins
        }

        plugins[name] = [plugin]
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
