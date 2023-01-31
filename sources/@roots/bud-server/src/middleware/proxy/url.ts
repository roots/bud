import type {Bud} from '@roots/bud-framework'

/**
 * URL helpers for proxy middleware
 */
export class ApplicationURL {
  /**
   * Application instance
   *
   * @public
   */
  public get app() {
    return this._app()
  }

  /**
   * Node URL for dev
   *
   * @public
   */
  public get dev(): URL {
    return this.app.server.publicUrl
  }

  /**
   * Node URL for proxy
   *
   * @public
   */
  public get proxy(): URL {
    return this.app.hooks.filter(`dev.proxyUrl`, new URL(`http://0.0.0.0`))
  }

  public get publicProxy(): URL {
    return this.app.hooks.filter(`dev.publicProxyUrl`, this.proxy)
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Bud) {}
}
