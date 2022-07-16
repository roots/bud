import type {Bud} from '@roots/bud-framework'

/**
 * URL helpers for proxy middleware
 *
 * @public
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
    return this.app.server.connection.url
  }

  /**
   * Node URL for proxy
   *
   * @public
   */
  public get proxy(): URL {
    return this.app.hooks.filter(`dev.middleware.proxy.target`)
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Bud) {}
}
