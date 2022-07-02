import {bind} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from 'lodash-es'

/**
 * Babel transpiler options
 *
 * @public
 */
export type Options = {
  plugins?: Plugin[]
  config?: boolean | string
}

/**
 * Normalized babel plugin
 *
 * @remarks
 * Expressed as a tuple of `[name, options]`
 *
 * @public
 */
export type NormalizedPlugin = [any, Record<string, any>]

/**
 * Babel plugin value
 *
 * @see https://babeljs.io/docs/en/plugins
 *
 * @public
 */
export type Plugin = string | NormalizedPlugin | CallableFunction

/**
 * Registrable plugin value
 *
 * @see https://babeljs.io/docs/en/plugins#using-a-plugin
 *
 * @public
 */
export type Registrable = string | NormalizedPlugin

/**
 * Plugins and presets registry interface
 *
 * @public
 */
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
 *   (await bud.babel.resolve('@babel/preset-env')),
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
   * @decorator `@bind`
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

  /**
   * Set babel presets
   *
   * @remarks
   * Completely overrides existing registry
   *
   * @public
   * @decorator `@bind`
   */
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

  /**
   * Remove a babel preset
   *
   * @param preset - preset name
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPreset(preset: string) {
    if (!isUndefined(this.presets[preset]))
      this.presets[preset] = undefined

    return this
  }

  /**
   * Set options on a babel preset
   *
   * @param preset - preset name
   * @param options - preset options
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset].shift(), options]
    return this
  }

  /**
   * Set a babel plugin
   *
   * @param name - babel plugin name
   * @param plugin - path to the babel plugin or the plugin itself
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPlugin(name: string, plugin: [any, any] | string): this {
    if (Array.isArray(plugin)) {
      this.plugins[name] = plugin
      return this
    }

    this.plugins[name] = [plugin]
    return this
  }

  /**
   * Set babel presets
   *
   * @remarks
   * Completely overrides existingplugins  registry
   *
   * @public
   * @decorator `@bind`
   */
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

  /**
   * Remove a babel plugin
   *
   * @param plugin - plugin name
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPlugin(plugin: string) {
    if (!isUndefined(this.plugins[plugin]))
      this.plugins[plugin] = undefined

    return this
  }

  /**
   * Set options on a babel plugin
   *
   * @param plugin - plugin name
   * @param options - plugin options
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin].shift(), options]
    return this
  }
}
