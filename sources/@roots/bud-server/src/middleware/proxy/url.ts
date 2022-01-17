import {Framework, Server} from '@roots/bud-framework'
import {URL as nodeUrl} from 'url'

/**
 * URL helpers for proxy middleware
 *
 * @public
 */
export class URL {
  /**
   * Application instance
   *
   * @public
   */
  public get app() {
    return this._app()
  }

  /**
   * Server config
   *
   * @public
   */
  public get config(): Server.Configuration {
    return this.app.store.get('server')
  }

  /**
   * Node URL for dev
   *
   * @public
   */
  public get dev(): nodeUrl {
    return this.config.dev.url
  }

  /**
   * Node URL for proxy
   *
   * @public
   */
  public get proxy(): nodeUrl {
    return this.config.proxy.url
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Framework) {}

  /**
   * Asset public path
   *
   * @public
   */
  public get publicPath() {
    const publicPath = this.app.hooks.filter('build.output.publicPath')
    return publicPath !== 'auto' ? publicPath : '/'
  }

  /**
   * Asset base path for dev
   *
   * @public
   */
  public get devAssetUrlBase() {
    return `${this.dev.origin}${this.publicPath}`
  }

  /**
   * Asset base path for proxy
   *
   * @public
   */
  public get proxyAssetUrlBase() {
    return `${this.proxy.origin}${this.publicPath}`
  }
}
