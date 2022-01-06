import {Framework} from '@roots/bud-framework'
import {bind, Signale} from '@roots/bud-support'
import {
  ClientRequest,
  IncomingMessage,
  ServerResponse,
} from 'http'
import {URL as nodeUrl} from 'url'

import {URL} from './url'

/**
 * Proxy request interceptor
 *
 * @public
 */
export class RequestInterceptorFactory {
  /**
   * Bud instance
   *
   * @public
   */
  public get app() {
    return this._app()
  }

  public get logger(): Signale {
    return this.app.logger.scoped(
      this.app.name,
      'proxy',
      'request',
    )
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    public _app: () => Framework,
    public url: URL,
  ) {}

  /**
   * Callback for `http-proxy-middleware` `onProxyReq`
   *
   * @param proxyReq - proxy request
   * @param req - request
   * @param res - response
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _interceptor(
    proxyReq: ClientRequest,
    req: IncomingMessage,
    _res: ServerResponse,
  ) {
    try {
      if (!req.url) return
      const requestedPath = new nodeUrl(req.url).pathname

      proxyReq.setHeader('x-bud-dev-origin', this.url.dev.origin)
      proxyReq.setHeader('x-bud-dev-pathname', requestedPath)
      this.logger.info(requestedPath)
    } catch (err) {
      this.logger.error(`${err}\n`)
    }
  }

  /**
   * Returns the onProxyReq callback
   */
  @bind
  public make() {
    return this.app.hooks.filter(
      'server.middleware.proxy.request.interceptor',
      () => this._interceptor,
    )
  }
}
