import type {PostCss, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'
import {BaseConfig} from './BaseConfig'

class Config extends BaseConfig implements PostCss {
  public constructor(app: Framework) {
    super()
    this.app = app
  }

  @bind
  public normalizeEntry(
    c: PostCss.Registrable,
  ): PostCss.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as PostCss.NormalizedPlugin)
      : (c as PostCss.NormalizedPlugin)
  }

  @bind
  public setPlugin(plugin: PostCss.Registrable): this {
    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<PostCss.NormalizedPlugin | string>,
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
