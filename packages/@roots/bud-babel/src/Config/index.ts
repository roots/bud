import type {Babel, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

export class Config implements Babel {
  public name = '@roots/bud-babel'

  public log: any

  public app: Framework

  public _plugins: Babel.Registry = {}

  public _presets: Babel.Registry = {}

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

  /**
   * Accessor: enabledPlugins
   */
  public _enabledPlugins: string[] = []

  public get enabledPlugins() {
    return this._enabledPlugins
  }

  public set enabledPlugins(plugins: string[]) {
    this._enabledPlugins = plugins
  }

  /**
   * Accessor: enabledPresets
   */
  public _enabledPresets: string[] = []

  public get enabledPresets() {
    return this._enabledPresets
  }

  public set enabledPresets(presets: string[]) {
    this._enabledPresets = presets
  }

  @bind
  public init(app: Framework): this {
    this.app = app
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
