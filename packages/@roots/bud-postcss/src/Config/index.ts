import type {PostCss, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

class Config implements PostCss {
  public _app: Framework['get']
  public log: any
  public plugins: PostCss.Registry = {}

  public constructor(app: Framework) {
    this._app = app.get
  }

  public get app() {
    return this._app
  }

  @bind
  public normalizeEntry(
    c: PostCss.Plugin | PostCss.NormalizedPlugin,
  ): PostCss.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as PostCss.NormalizedPlugin)
      : (c as PostCss.NormalizedPlugin)
  }

  @bind
  public setPlugin(
    plugin: PostCss.Plugin | PostCss.NormalizedPlugin,
  ): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<PostCss.Plugin | PostCss.NormalizedPlugin>,
  ): this {
    this.plugins = plugins.reduce((plugins, plugin) => {
      plugin = this.normalizeEntry(plugin)
      return {...plugins, [plugin[0]]: plugin}
    }, {})

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
}

export {Config}
