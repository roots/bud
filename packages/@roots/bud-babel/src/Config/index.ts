/**
 * @module @roots/bud-babel
 */

import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

import type {Babel} from '..'

/**
 * @class Config
 */
class Config implements Babel {
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
   * @property {Babel.Registry} _plugins
   * @hidden
   */
  public _plugins: Babel.Registry = {}

  /**
   * @property {Babel.Registry} _presets
   * @hidden
   */
  public _presets: Babel.Registry = {}

  /**
   * @property {Framework} app
   * @readonly
   */
  public get app() {
    return this._app()
  }

  /**
   * @property {Babel.Registry} plugins
   */
  public get plugins() {
    return this._plugins
  }
  public set plugins(plugins) {
    this._plugins = plugins
  }

  /**
   * @property {Babel.Registry} presets
   */
  public get presets() {
    return this._presets
  }
  public set presets(presets) {
    this._presets = presets
  }

  /**
   * @method init
   */
  @bind
  public init(app: Framework): this {
    this._app = () => app

    return this
  }

  /**
   * @method normalizeEntry
   */
  @bind
  public normalizeEntry(
    c: Babel.Registrable,
  ): Babel.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as Babel.NormalizedPlugin)
      : (c as Babel.NormalizedPlugin)
  }

  /**
   * @method setPlugin
   */
  @bind
  public setPlugin(plugin: Babel.Registrable): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  /**
   * @method setPlugins
   */
  @bind
  public setPlugins(
    plugins: Array<Babel.NormalizedPlugin | string>,
  ): this {
    plugins.map(this.setPlugin)
    return this
  }

  /**
   * @method SetPreset
   */
  @bind
  public setPreset(preset: Babel.Registrable): this {
    preset = this.normalizeEntry(preset)

    this.presets = {
      ...this.presets,
      [preset[0]]: preset,
    }

    return this
  }

  /**
   * @method setPresets
   */
  @bind
  public setPresets(
    presets: Array<Babel.NormalizedPlugin | string>,
  ): this {
    presets.map(this.setPreset)

    return this
  }

  /**
   * @method unsetPreset
   */
  @bind
  public unsetPreset(preset: string) {
    !this.presets[preset]
      ? this.app.error(`${preset} not found`)
      : delete this.presets[preset]

    return this
  }

  /**
   * @method unsetPlugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.app.error(`${plugin} not found`)
      : delete this.plugins[plugin]

    return this
  }

  /**
   * @method setPluginOptions
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  /**
   * @method setPresetOptions
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }
}

/**
 * @exports Config
 */
export {Config}
