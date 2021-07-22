import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'
import {PluginCreator} from 'postcss'

export class Config implements Framework.Api.PostCss {
  public plugins: Framework.Api.PostCss.Registry = {}

  @bind
  public normalizeEntry(
    c: string | Framework.Api.PostCss.NormalizedPlugin,
  ): Framework.Api.PostCss.NormalizedPlugin {
    return isString(c) ? [c, {}] : c
  }

  @bind
  public setPlugin(
    plugin: string | Framework.Api.PostCss.NormalizedPlugin,
  ): this {
    const [
      name,
      config,
    ]: Framework.Api.PostCss.NormalizedPlugin =
      this.normalizeEntry(plugin)

    const pluginCreator: PluginCreator<any> = require(name)

    this.plugins = {
      ...this.plugins,
      [`${name}`]: [pluginCreator, config ?? undefined],
    }

    return this
  }

  @bind
  public setPlugins(
    plugins: Array<
      string | Framework.Api.PostCss.NormalizedPlugin
    >,
  ): this {
    plugins.map(this.setPlugin)
    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    this.plugins[plugin] && delete this.plugins[plugin]
    return this
  }

  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [
      this.plugins[plugin].shift(),
      options,
    ]

    return this
  }
}
