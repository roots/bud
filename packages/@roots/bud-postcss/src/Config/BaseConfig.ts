import {Framework, PostCss} from '@roots/bud-framework'

export abstract class BaseConfig {
  public app: Framework

  public log: any

  public _plugins: PostCss.Registry = {}

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }
}
