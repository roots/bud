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
   * @param proxyRequest - proxy client request
   * @param request - incoming message
   * @param response - server response
   * @returns void
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _interceptor(
    proxyRequest: ClientRequest,
    request: IncomingMessage,
    _response: ServerResponse,
  ) {
    try {
      proxyRequest.setHeader('x-bud-dev-origin', this.url.dev.origin)
      proxyRequest.setHeader(
        'x-bud-dev-pathname',
        new nodeUrl(request.url, `http://${request.headers.host}`)
          .pathname,
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
