import type {Babel, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'
import {BaseConfig} from './BaseConfig'

export class Config extends BaseConfig implements Babel {
  @bind
  public init(app: Framework): this {
    this.app = app
    this.log = app.logger.instance.scope(this.name)

    return this
  }

  @bind
  public normalizeEntry(
    c: Babel.Registrable,
  ): Babel.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as Babel.NormalizedPlugin)
      : (c as Babel.NormalizedPlugin)
  }

  @bind
  public setPlugin(plugin: Babel.Registrable): this {
    this.app.log(`Setting babel plugin: ${plugin}`)

    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<Babel.NormalizedPlugin | string>,
  ): this {
    plugins.map(this.setPlugin)

    return this
  }

  @bind
  public setPreset(preset: Babel.Registrable): this {
    this.app.log(`Setting babel preset: ${preset}`)

    preset = this.normalizeEntry(preset)

    this.presets = {...this.presets, [preset[0]]: preset}

    return this
  }

  @bind
  public setPresets(
    presets: Array<Babel.NormalizedPlugin | string>,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.log.error(`${preset} not found`, this.presets)
      : delete this.presets[preset]

    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.log.error(`${plugin} not found`, this.plugins)
      : delete this.plugins[plugin]

    return this
  }

  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }
}
