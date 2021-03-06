import {Framework} from '@roots/bud-framework'
import {isString} from 'lodash'

/**
 * PostCSSConfig API
 */
export class PostCssConfig implements Framework.PostCss {
  public app: Framework

  public _plugins: Framework.PostCss.Registry = {}

  public _enabled: string[] = []

  public constructor({app}: {app: Framework}) {
    this.app = app
    this.setPlugin = this.setPlugin.bind(this)
    this.unsetPlugin = this.unsetPlugin.bind(this)
    this.setPluginOptions = this.setPluginOptions.bind(this)
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

  public enable(plugins: string[]) {
    this.enabled = plugins

    return this
  }

  public get options() {
    return {
      plugins: this.enabled.map(plugin => this.plugins[plugin]),
    }
  }
}
