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
    return this.app.hooks.filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
  }

  /**
   * Node URL for proxy
   *
   * @public
   */
  public get proxy(): URL {
    return this.app.hooks.filter(
      `dev.middleware.proxy.options.target`,
      new URL(`http://0.0.0.0`),
    )
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Bud) {}
}
