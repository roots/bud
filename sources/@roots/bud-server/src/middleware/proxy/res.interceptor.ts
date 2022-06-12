import type {Bud} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import * as http from 'http'
import {responseInterceptor} from 'http-proxy-middleware'
import {isString, isUndefined} from 'lodash-es'

import {ApplicationURL} from './url.js'

interface IncomingMessage extends http.IncomingMessage {
  cookies: any
}
interface ServerResponse extends http.ServerResponse {
  cookie: any
}

export interface ResponseInterceptorFactory {
  interceptor(
    buffer: Buffer,
    proxyResponse: IncomingMessage,
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
   * @param proxyResponse - Response from the proxy
   * @param request - Request from the client
   * @param response - Response from the server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async interceptor(
    buffer: Buffer,
    proxyResponse: IncomingMessage,
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

    Object.entries(
      this.app.hooks.filter(`dev.middleware.proxy.options.headers`, {
        ...response.getHeaders(),

        'x-proxy-by': '@roots/bud',
        'x-bud-dev-origin': this.url.dev.origin,
        'x-bud-dev-protocol': this.url.dev.protocol,
        'x-bud-dev-hostname': this.url.dev.hostname,
        'x-bud-proxy-origin': this.url.proxy.origin,

        'content-security-policy': undefined,
        'x-http-method-override': undefined,
      }),
    ).map(([k, v]) => {
      if (isString(k) && isUndefined(v)) {
        this.app.log('removing header', k)
        response.removeHeader(k)
      } else if (isString(k) && !isUndefined(v)) {
        this.app.log('setting header', k, '=>', v)
        response.setHeader(k, v)
      }
    })

    Object.entries(request.cookies).map(([k, v]) => {
      this.app.info('setting cookie', k, '=>', v)
      response.cookie(k, v, {domain: undefined})
    })

    return this.app.hooks
      .filter('dev.middleware.proxy.replacements', [])
      .reduce(
        (buffer, [find, replace]: [string | RegExp, string]) =>
          buffer
            .split('\n')
            .map(ln => ln.replaceAll(find, replace))
            .join('\n'),
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
