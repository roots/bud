import {Babel, Framework} from '@roots/bud-framework'
import {isString} from 'lodash'

/**
 * Babel API
 */
export class BabelConfig implements Babel {
  public _app: Framework['get']

  public log: any

  public _plugins: Babel.Registry = {}
  public _presets: Babel.Registry = {}
  public _enabledPlugins: string[] = []
  public _enabledPresets: string[] = []

  /**
   * Constructor
   */
  public constructor(app: Framework) {
    this.app = app
    this.log = app.logger.framework.scope('@roots/bud-babel')

    this.setPlugin = this.setPlugin.bind(this)
    this.unsetPlugin = this.unsetPlugin.bind(this)
    this.setPluginOptions = this.setPluginOptions.bind(this)
  }

  public get app(): Framework {
    return this._app()
  }

  public set app(app: Framework) {
    this._app = app.get
  }

  public get hasProjectConfig(): boolean {
    const project = this.app.disk.get('project')

    return (
      project.has('babel.config.js') || project.has('.babelrc')
    )
  }

  public setPlugin(plugin: Babel.Registrable): this {
    console.log(`Setting babel plugin: ${plugin}`)
    plugin = isString(plugin) ? [plugin, {}] : plugin

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  public setPlugins(
    plugins: Array<[string, any?] | string>,
  ): this {
    this.plugins = plugins.reduce((a, c) => {
      const [plugin, options] = isString(c) ? [c, {}] : c

      return {
        ...a,
        [plugin]: [plugin, options],
      }
    }, {})

    return this
  }

  public setPreset(preset: Babel.Registrable): this {
    preset = isString(preset) ? [preset, {}] : preset

    this.presets = {...this.presets, [preset[0]]: preset}

    return this
  }

  public setPresets(
    presets: Array<[string, any?] | string>,
  ): this {
    this.presets = presets.reduce((a, c) => {
      const [preset, options] = isString(c) ? [c, {}] : c

      return {
        ...a,
        [preset]: [preset, options],
      }
    }, {})

    return this
  }

  public unsetPreset(preset: string) {
    if (!this.presets[preset]) {
      this.log.error(`${preset} not found`, this.presets)
    }

    delete this.presets[preset]
  }

  public unsetPlugin(plugin: string) {
    delete this.plugins[plugin]

    return this
  }

  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset][0], options]

    return this
  }

  public get plugins() {
    this.log.info('Getting babel plugins')
    this.log.debug(this._plugins)

    return this._plugins
  }

  public set plugins(plugins) {
    this.log.info('Setting babel plugins')
    this.log.debug(plugins)

    this._plugins = plugins
  }

  public get presets() {
    this.log.info('Getting babel presets')
    this.log.debug(this._presets)

    return this._presets
  }

  public set presets(presets) {
    this.log.info('Setting babel presets')
    this.log.debug(presets)

    this._presets = presets
  }
}
