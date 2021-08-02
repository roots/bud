/**
 * @module Framework.Extensions.Babel
 */

import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

import type {BabelConfig} from '..'

/**
 * Babel config utility
 *
 * @implements BabelConfig
 */
class Config implements BabelConfig {
  /**
   * @property {string} name
   */
  public name = '@roots/bud-babel'

  /**
   * @property {Framework} _app
   * @hidden
   */
  public _app: () => Framework

  /**
   * @property {BabelConfig.Registry} _plugins
   * @hidden
   */
  public _plugins: BabelConfig.Registry = {}

  /**
   * @property {BabelConfig.Registry} _presets
   * @hidden
   */
  public _presets: BabelConfig.Registry = {}

  /**
   * @property {Framework} app
   * @readonly
   */
  public get app() {
    return this._app()
  }

  /**
   * @property {BabelConfig.Registry} plugins
   */
  public get plugins() {
    return this._plugins
  }
  public set plugins(plugins) {
    this._plugins = plugins
  }

  /**
   * @property {BabelConfig.Registry} presets
   */
  public get presets() {
    return this._presets
  }
  public set presets(presets) {
    this._presets = presets
  }

  /**
   * @constructor
   */
  public constructor(app: Framework) {
    this._app = () => app
  }

  /**
   * BabelConfig.normalizeEntry
   */
  @bind
  public normalizeEntry(
    c: BabelConfig.Registrable,
  ): BabelConfig.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as BabelConfig.NormalizedPlugin)
      : (c as BabelConfig.NormalizedPlugin)
  }

  /**
   * BabelConfig.setPlugin
   */
  @bind
  public setPlugin(plugin: BabelConfig.Registrable): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  /**
   * BabelConfig.setPlugins
   */
  @bind
  public setPlugins(
    plugins: Array<BabelConfig.NormalizedPlugin | string>,
  ): this {
    plugins.map(this.setPlugin)

    return this
  }

  /**
   * BabelConfig.setPreset
   */
  @bind
  public setPreset(preset: BabelConfig.Registrable): this {
    preset = this.normalizeEntry(preset)

    this.presets = {
      ...this.presets,
      [preset[0]]: preset,
    }

    return this
  }

  /**
   * BabelConfig.setPresets
   */
  @bind
  public setPresets(
    presets: Array<BabelConfig.NormalizedPlugin | string>,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  /**
   * BabelConfig.unsetPreset
   */
  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.app.error(`${preset} not found`)
      : delete this.presets[preset]

    return this
  }

  /**
   * BabelConfig.unsetPlugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.app.error(`${plugin} not found`)
      : delete this.plugins[plugin]

    return this
  }

  /**
   * BabelConfig.setPluginOptions
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  /**
   * BabelConfig.setPresetOptions
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }
}

export {Config}
