import {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import * as http from 'http'
import {responseInterceptor} from 'http-proxy-middleware'

import {ApplicationURL} from './url'

interface IncomingMessage extends http.IncomingMessage {
  cookies: any
}
interface ServerResponse extends http.ServerResponse {
  cookie: any
}

export interface ResponseInterceptorFactory {
  interceptor(
    buffer: Buffer,
    proxyRes: IncomingMessage,
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<Buffer | string>
}

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
  public constructor(public _app: () => Bud, public url: ApplicationURL) {}

  /**
   * Response interceptor
   *
   * @remarks
   * This is the callback for `http-proxy-middleware`s `responseInterceptor`.
   * It is called after the response has been received from the target server.
   * It is passed the response body, and the req and res objects.
   * It can be used to modify the response body or the response object.
   *
   * @param buffer - Buffered response
   * @param proxyRes - Response from the proxy
   * @param request - Request from the client
   * @param response - Response from the server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async interceptor(
    buffer: Buffer,
    proxyRes: IncomingMessage,
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<Buffer | String> {
    this.app.info(
      request.url,
      request.statusCode,
      response.getHeader('content-type'),
    )

    if (!`${response.getHeader('content-type')}`.startsWith('text/'))
      return buffer

    await this.app.hooks.fire('event.proxy.interceptor')

    response.setHeader('x-proxy-by', '@roots/bud')
    response.setHeader('x-bud-proxy-origin', this.url.proxy.origin)
    response.removeHeader('x-http-method-override')

    Object.entries(request.cookies).map(([k, v]) =>
      response.cookie(k, v, {domain: null}),
    )

    return this.app.hooks
      .filter('middleware.proxy.replacements', [])
      .reduce(
        (buffer, [find, replace]: [string | RegExp, string]) =>
          buffer.replaceAll(find, replace),
        buffer.toString(),
      )
  }

  /**
   * Returns the `onProxyRes` callback for `http-proxy-middleware`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make() {
    return responseInterceptor(this.interceptor)
  }
}
