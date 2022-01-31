import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {IncomingMessage, ServerResponse} from 'http'
import {responseInterceptor} from 'http-proxy-middleware'

import {ApplicationURL} from './url'

/**
 * Proxy response interceptor
 *
 * @public
 */
export class ResponseInterceptorFactory {
  /**
   * The bud instance
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
    public _app: () => Framework,
    public url: ApplicationURL,
  ) {}

  /**
   * Response interceptor
   *
   * @remarks
   * This is the callback for `http-proxy-middleware`s `responseInterceptor`.
   * It is called after the response has been received from the target server.
   * It is passed the response body, the response object, and the request object.
   * It can be used to modify the response body or the response object.
   *
   * @param buffer - Buffered response body
   * @param proxyRes - Response from the proxy
   * @param req - Request from the client
   * @param res - Response from the server
   * @returns client response body
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _interceptor(
    buffer: Buffer,
    _proxyRes: IncomingMessage,
    _req: IncomingMessage,
    res: ServerResponse,
  ): Promise<Buffer | string> {
    res.setHeader('x-proxy-by', '@roots/bud')
    res.setHeader('x-bud-proxy-origin', this.url.proxy.origin)
    res.setHeader('x-bud-dev-origin', this.url.dev.origin)

    return buffer
  }

  /**
   * Returns the `onProxyRes` callback for `http-proxy-middleware`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make() {
    return responseInterceptor(this._interceptor)
  }
}
