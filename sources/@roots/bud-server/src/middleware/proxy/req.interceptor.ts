import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {ClientRequest, IncomingMessage, ServerResponse} from 'http'
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

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Framework, public url: URL) {}

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
    res: ServerResponse,
  ) {
    try {
      proxyReq.setHeader('x-bud-dev-origin', this.url.dev.origin)
      proxyReq.setHeader(
        'x-bud-dev-pathname',
        new nodeUrl(req.url).pathname,
      )
    } catch (err) {
      process.stderr.write(`${err}\n`)
    }
  }

  /**
   * Returns the onProxyReq callback
   */
  @bind
  public make() {
    return this._interceptor
  }
}
