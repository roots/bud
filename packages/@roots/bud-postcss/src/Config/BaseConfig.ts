import {PostCss, Framework} from '@roots/bud-framework'

export abstract class BaseConfig {
  public _app: Framework['get']
  public get app(): Framework {
    return this._app()
  }
  public set app(app: Framework) {
    this._app = app.get
  }

  public log: any

  public _plugins: PostCss.Registry = {}

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }

  public get hasProjectConfig(): boolean {
    const project = this.app.disk.get('project')
    return project.has('postcss.config.js')
  }
}
