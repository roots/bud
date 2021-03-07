import {Framework} from '@roots/bud-framework'
import {isString} from 'lodash'

/**
 * PostCSSConfig API
 */
export class PostCssConfig implements Framework.PostCss {
  public _app: Framework['get']

  public _plugins: Framework.PostCss.Registry = {}

  public _enabled: string[] = []

  public constructor({app}: {app: Framework}) {
    this.app = app

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

  public setPlugin(plugin: Framework.PostCss.Registrable) {
    this.plugins = {
      ...this.plugins,
      ...(isString(plugin)
        ? {[plugin]: plugin}
        : {[plugin[0]]: plugin[1]}),
    }

    return this
  }

  public unsetPlugin(plugin: string) {
    delete this.plugins[plugin]

    return this
  }

  public setPluginOptions(plugin: string, options: any) {
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
    this.app.logger.info({
      msg: `enabling postcss plugins`,
      plugins,
    })

    this.enabled = plugins

    return this.app
  }

  public get options() {
    return {
      plugins: this.enabled.map(plugin => this.plugins[plugin]),
    }
  }
}
