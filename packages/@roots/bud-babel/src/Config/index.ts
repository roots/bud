import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

export class Config implements Framework.Api.Babel {
  public name = '@roots/bud-babel'

  public _app: () => Framework

  public _plugins: Framework.Api.Babel.Registry = {}

  public _presets: Framework.Api.Babel.Registry = {}

  public get app() {
    return this._app()
  }

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }

  public get presets() {
    return this._presets
  }

  public set presets(presets) {
    this._presets = presets
  }

  @bind
  public init(app: Framework): this {
    this._app = () => app

    return this
  }

  @bind
  public normalizeEntry(
    c: Framework.Api.Babel.Registrable,
  ): Framework.Api.Babel.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as Framework.Api.Babel.NormalizedPlugin)
      : (c as Framework.Api.Babel.NormalizedPlugin)
  }

  @bind
  public setPlugin(
    plugin: Framework.Api.Babel.Registrable,
  ): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<
      Framework.Api.Babel.NormalizedPlugin | string
    >,
  ): this {
    plugins.map(this.setPlugin)
    return this
  }

  @bind
  public setPreset(
    preset: Framework.Api.Babel.Registrable,
  ): this {
    preset = this.normalizeEntry(preset)

    this.presets = {
      ...this.presets,
      [preset[0]]: preset,
    }

    return this
  }

  @bind
  public setPresets(
    presets: Array<
      Framework.Api.Babel.NormalizedPlugin | string
    >,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.app.error(`${preset} not found`)
      : delete this.presets[preset]

    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.app.error(`${plugin} not found`)
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
