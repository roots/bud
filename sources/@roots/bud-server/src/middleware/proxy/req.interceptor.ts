import {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {ClientRequest, IncomingMessage, ServerResponse} from 'http'

import {ApplicationURL} from './url'

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
  public constructor(
    public _app: () => Bud,
    public url: ApplicationURL,
  ) {}

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
      /**
       * Acorn compat
       * Ideally, we use the headers included after this
       */
      proxyRequest.setHeader(
        'x-bud-dev-pathname',
        new URL(request.url, `http://${request.headers.host}`).pathname,
      )

      /**
       * Headers
       */
      proxyRequest.setHeader('x-bud-dev-origin', this.url.dev.origin)
      proxyRequest.setHeader('x-bud-dev-protocol', this.url.dev.protocol)
      proxyRequest.setHeader('x-bud-dev-hostname', this.url.dev.hostname)
      proxyRequest.setHeader(
        'x-bud-request',
        new URL(
          request.url,
          `${this.url.dev.protocol ?? 'http:'}//${request.headers.host}`,
        ).toJSON(),
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
