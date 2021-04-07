import {Babel, Framework} from '@roots/bud-framework'

/**
 * Babel API
 */
export abstract class BaseConfig {
  /**
   * Name
   */
  public name = '@roots/bud-babel'

  /**
   * App
   */
  public _app: Framework['get']

  public get app(): Framework {
    return this._app()
  }

  public set app(app: Framework) {
    this._app = app.get
  }

  /**
   * Log
   */
  public log: any

  /**
   * Accessor: plugins
   */
  public _plugins: Babel.Registry = {}

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

  /**
   * Accessor: presets
   */
  public _presets: Babel.Registry = {}

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

  /**
   * Accessor: hasProjectConfig
   */
  public get hasProjectConfig(): boolean {
    const project = this.app.disk.get('project')

    return (
      project.has('babel.config.js') || project.has('.babelrc')
    )
  }
}
