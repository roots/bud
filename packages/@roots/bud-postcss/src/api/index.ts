import {Framework} from '@roots/bud-framework'
import {isString} from 'lodash'

/**
 * PostCSSConfig API
 */
export class PostCssConfig implements Framework.PostCss {
  public _app: Framework['get']

  public _plugins: Framework.PostCss.Registry = {}

  public _enabled: string[] = []

  public log

  public get hasProjectConfig(): boolean {
    const project = this.app.disk.get('project')

    return (
      project.has('postcss.config.js') ||
      project
        .readJson('package.json')
        .hasOwnProperty('postcss') ||
      project.has('postcssrc')
    )
  }

  public constructor({app}: {app: Framework}) {
    this.app = app
    this.log = app.logger.framework.scope('@roots/bud-postcss')

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

  public setPlugin(plugin: Framework.PostCss.Registrable): this {
    plugin = isString(plugin) ? [plugin, plugin] : plugin

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  public unsetPlugin(plugin: string) {
    delete this.plugins[plugin]

    return this
  }

  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }

  public get enabled() {
    return this._enabled
  }

  public set enabled(enabled) {
    this._enabled = enabled
  }

  public enable(plugins: string[]): Framework {
    this.app.extensions.logger.info(`enabling postcss plugins`)

    this.enabled = plugins

    return this.app
  }

  public disable(plugins: string[]): Framework {
    this.log.info(`disabling postcss plugins`)

    this.enabled = this.enabled.filter(
      plugin => !plugins.includes(plugin),
    )

    return this.app
  }
}
