import {bind} from '@roots/bud-support'

export type Options = {
  plugins?: Plugin[]
  config?: boolean | string
}

export type NormalizedPlugin = [any, Record<string, any>]

export type Plugin = string | NormalizedPlugin | CallableFunction

export type Registrable = string | NormalizedPlugin

export interface Registry {
  [key: string]: [string, any?]
}

/**
 * Babel configuration
 *
 * @remarks
 * Configures plugins and presets for the Babel transpiler.
 *
 * @example
 * ```ts
 * bud.babel.setPreset(
 *   '@babel/preset-env',
 *   require.resolve('@babel/preset-env'),
 * )
 * ```
 *
 * @public
 */
export class Config {
  /**
   * Plugins registry
   *
   * @public
   */
  public plugins: Registry = {}

  /**
   * Presets registry
   *
   * @public
   */
  public presets: Registry = {}

  /**
   * Set a babel preset
   *
   * @param name - babel preset name
   * @param preset - path to the babel preset or the preset itself
   * @returns The babel configuration class
   *
   * @public
   */
  @bind
  public setPreset(name: string, preset: [string, any] | string): this {
    if (Array.isArray(preset)) {
      this.presets[name] = preset
      return this
    }

    this.presets[name] = [preset]
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
    this.presets[preset] = [this.presets[preset].shift(), options]

    return this
  }

  @bind
  public setPlugin(name: string, plugin: [any, any] | string): this {
    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin]
    return this
  }

  @bind
  public setPlugins(plugins: {[key: string]: [any, any] | string}): this {
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
    this.plugins[plugin] = [this.plugins[plugin].shift(), options]

    return this
  }
}
