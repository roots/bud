import type * as http from 'node:http'

import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
import {responseInterceptor} from 'http-proxy-middleware'

import type {ApplicationURL} from './url.js'

interface IncomingMessage extends http.IncomingMessage {
  cookies: any
}

interface ServerResponse extends http.ServerResponse {
  cookie: any
}

export interface InterceptorFactory {
  interceptor(
    buffer: Buffer,
    proxy: IncomingMessage,
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<Buffer | string>
}

/**
 * Proxy response interceptor
 *
 * @public
 */
export class ResponseInterceptorFactory implements InterceptorFactory {
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
   * Returns the `onProxyRes` callback for `http-proxy-middleware`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make() {
    return responseInterceptor(this.interceptor)
  }

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
   * @param proxy - Response from the proxy
   * @param request - Request from the client
   * @param response - Response from the server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async interceptor(
    buffer: Buffer,
    proxy: IncomingMessage,
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<Buffer | string> {
    this.mapProxyCookies(request, response)
    response.setHeader(`x-bud-origin`, this.url.dev.origin)
    return this.isTransformable(proxy) ? this.transform(buffer) : buffer
  }

  /**
   * Modify a target string with search/replace tuples
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public transform(buffer: Buffer): string {
    return this.app.hooks
      .filter(`dev.middleware.proxy.replacements`, [
        [this.url.proxy.toString(), `/`],
        [this.url.proxy.origin, this.url.dev.origin],
      ])
      .reduce(
        (value, [search, replace]) =>
          value.replaceAll(new RegExp(search, `g`), replace),
        buffer.toString(),
      )
  }

  /**
   * Is body transformable?
   *
   * @public
   */
  public isTransformable(message?: IncomingMessage) {
    if (typeof message?.headers?.[`content-type`] !== `string`)
      return false

    const type = message.headers[`content-type`]

    return (
      type.startsWith(`text/css`) ||
      type.startsWith(`text/html`) ||
      type.startsWith(`application/javascript`) ||
      type.startsWith(`application/json`)
    )
  }

  /**
   * Map proxy cookies
   *
   * Unset the domain attached to cookies and remove the `secure` flag.
   *
   * @remarks
   * For the cookie domain:
   * - `null` domain will work for any domain, but will not be sent for IPs.
   * - `undefined` will be sent for IPs.
   */
  @bind
  public mapProxyCookies(
    request: IncomingMessage,
    response: ServerResponse,
  ) {
    if (request.cookies) {
      Object.entries(request.cookies).map(([k, v]) => {
        response.cookie(k, v, {domain: undefined})
      })
    }

    const raw = response?.getHeaders()?.[`set-cookie`]
    if (!raw) return

    const cookies = Array.isArray(raw) ? raw : [raw]

    response.setHeader(
      `set-cookie`,
      cookies
        .map(String)
        .map(value => value.replace(`; secure`, ``).trim()),
    )
  }
}
