import {Framework, Server} from '@roots/bud-framework'
import {URL as nodeUrl} from 'url'

export class URL {
  public get app() {
    return this._app()
  }

  public get config(): Server.Configuration {
    return this.app.store.get('server')
  }

  public get dev(): nodeUrl {
    return new nodeUrl(this.config.dev.url)
  }

  public get proxy(): nodeUrl {
    return new nodeUrl(this.config.proxy.url)
  }

  public constructor(public _app: () => Framework) {}

  public get publicPath(): string {
    return this.app.maybeCall(
      this.app.hooks.filter<'build.output.publicPath'>(
        'build.output.publicPath',
      ),
    )
  }

  public hasPublicPath(): boolean {
    return (
      this.publicPath &&
      ![undefined, null, '', 'auto'].includes(this.publicPath)
    )
  }
}
