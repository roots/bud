import type {PostCss, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'
import {BaseConfig} from './BaseConfig'

/**
 * PostCss API
 */
export class Config extends BaseConfig implements PostCss {
  /**
   * Initialize
   */
  public constructor(app: Framework) {
    super()

    this.app = app
    this.log = app.logger.instance.scope(this.name)
  }

  /**
   * Normalize entry
   */
  @bind
  public normalizeEntry(
    c: PostCss.Registrable,
  ): PostCss.NormalizedPlugin {
    return isString(c)
      ? ([c, {}] as PostCss.NormalizedPlugin)
      : (c as PostCss.NormalizedPlugin)
  }

  /**
   * Set a PostCss plugin
   */
  @bind
  public setPlugin(plugin: PostCss.Registrable): this {
    this.app.log(`Setting PostCss plugin: ${plugin}`)

    plugin = this.normalizeEntry(plugin)

    this.plugins = {...this.plugins, [plugin[0]]: plugin}

    return this
  }

  /**
   * Set PostCss plugins
   */
  @bind
  public setPlugins(
    plugins: Array<PostCss.NormalizedPlugin | string>,
  ): this {
    this.plugins = plugins.reduce((a, plugin) => {
      plugin = this.normalizeEntry(plugin)
      return {
        ...a,
        [plugin[0]]: plugin,
      }
    }, {})

    return this
  }

  /**
   * Unset a PostCss plugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    !this.plugins[plugin]
      ? this.log.error(`${plugin} not found`, this.plugins)
      : delete this.plugins[plugin]

    return this
  }

  /**
   * Set a PostCss plugin's options
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }
}
