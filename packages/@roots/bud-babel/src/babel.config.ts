import {bind} from './babel.dependencies'
import {Registry} from './babel.interface'

export class Config {
  public plugins: Registry = {}
  public presets: Registry = {}

  @bind
  public setPreset(
    name: string,
    preset: [string, any] | string,
  ): this {
    if (Array.isArray(preset)) {
      this.presets[name] = preset
      return this
    }

    this.presets[name] = [preset, undefined]

    return this
  }

  @bind
  public setPresets(presets: {
    [key: string]: [string, any] | string
  }): this {
    this.presets = Object.entries(presets).reduce(
      (presets, [name, preset]) => {
        if (Array.isArray(preset)) {
          presets[name] = preset
          return presets
        }

        presets[name] = [preset, undefined]
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
