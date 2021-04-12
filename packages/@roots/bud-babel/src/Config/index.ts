import type {Babel, Framework} from '@roots/bud-framework'
import {BaseConfig} from './BaseConfig'
import {bind} from '@roots/bud-support'

/**
 * Babel API
 */
export class Config extends BaseConfig implements Babel {
  /**
   * Initialize
   */
  @bind
  public init(app: Framework): this {
    this.app = app
    this.log = app.logger.instance.scope(this.name)

    return this
  }

  /**
   * Normalize entry
   */
  @bind
  public normalizeEntry(
    c: Babel.Registrable,
  ): Babel.NormalizedPlugin {
    return this.app.util._.isString(c)
      ? ([c, {}] as Babel.NormalizedPlugin)
      : (c as Babel.NormalizedPlugin)
  }

  /**
   * Set a babel plugin
   */
  @bind
  public setPlugin(plugin: Babel.Registrable): this {
    this.app.log(`Setting babel plugin: ${plugin}`)

    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  /**
   * Set babel plugins
   */
  @bind
  public setPlugins(
    plugins: Array<Babel.NormalizedPlugin | string>,
  ): this {
    plugins.map(this.setPlugin)

    return this
  }

  /**
   * Set a babel preset
   */
  @bind
  public setPreset(preset: Babel.Registrable): this {
    this.app.log(`Setting babel preset: ${preset}`)

    preset = this.normalizeEntry(preset)

    this.presets = {...this.presets, [preset[0]]: preset}

    return this
  }

  /**
   * Set babel presets
   */
  @bind
  public setPresets(
    presets: Array<Babel.NormalizedPlugin | string>,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  /**
   * Unset a babel preset
   */
  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.log.error(`${preset} not found`, this.presets)
      : delete this.presets[preset]

    return this
  }

  /**
   * Unset a babel plugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.log.error(`${plugin} not found`, this.plugins)
      : delete this.plugins[plugin]

    return this
  }

  /**
   * Set a babel plugin's options
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  /**
   * Set a babel preset's options
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }
}
