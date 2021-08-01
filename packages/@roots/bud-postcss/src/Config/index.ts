/**
 * @module @roots/bud-api
 */

import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'
import {PluginCreator} from 'postcss'

/**
 * @class Config
 */
class Config implements Framework.Api.PostCss {
  public plugins: Framework.Api.PostCss.Registry = {}

  @bind
  public normalizeEntry(
    c: string | [string, any],
  ): [string, any] {
    return isString(c) ? [c, {}] : c
  }

  @bind
  public setPlugin(plugin: string | [string, any]): this {
    const [name, config]: [string, any] =
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
    plugins: Array<string | [string, any]>,
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

/**
 * @exports Config
 */
export {Config}
