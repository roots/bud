import type {PostCss} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

class Config implements PostCss {
  public plugins: PostCss.Registry = {}

  @bind
  public normalize(
    c: PostCss.Plugin | PostCss.NormalizedPlugin,
  ): PostCss.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as PostCss.NormalizedPlugin)
      : (c as PostCss.NormalizedPlugin)
  }

  @bind
  public setPlugin(
    name: string,
    plugin: PostCss.Plugin | PostCss.NormalizedPlugin,
  ): this {
    this.plugins[name] = this.normalize(plugin)

    return this
  }

  @bind
  public setPlugins(plugins: {
    [key: string]: PostCss.Plugin | PostCss.NormalizedPlugin
  }): this {
    this.plugins = Object.entries(plugins).reduce(
      (
        plugins,
        [name, plugin]: [
          string,
          PostCss.Plugin | PostCss.NormalizedPlugin,
        ],
      ) => ({
        ...plugins,
        [name]: this.normalize(plugin),
      }),
      {},
    )

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

export {Config}
