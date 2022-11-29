import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
import type {ClientRequest, IncomingMessage, ServerResponse} from 'http'

import type {ApplicationURL} from './url.js'

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
  public constructor(public _app: () => Bud, public url: ApplicationURL) {}

  /**
   * Callback for `http-proxy-middleware` `onProxyReq`
   *
   * @param proxy - proxy client request
   * @param request - incoming message
   * @param response - server response
   * @returns void
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public interceptor(
    proxy: ClientRequest,
    request: IncomingMessage,
    _response: ServerResponse,
  ) {
    try {
      proxy
        .setHeader(
          `x-bud-request`,
          new URL(
            request.url,
            `${this.url.dev.protocol}//${request.headers.host}`,
          ).toJSON(),
        )
        .setHeader(
          `x-bud-dev-pathname`,
          new URL(request.url, `http://${request.headers.host}`).pathname,
        )
        .setHeader(`x-bud-origin`, this.url.dev.origin)
        .setHeader(`x-bud-protocol`, this.url.dev.protocol)
        .setHeader(`x-bud-hostname`, this.url.dev.hostname)

      if (proxy.hasHeader(`location`)) {
        proxy.setHeader(
          `location`,
          (proxy.getHeader(`location`) as string).replace(
            this.url.proxy.origin,
            this.url.dev.origin,
          ),
        )
      }
    } catch (error) {}
  }

  /**
   * Returns the onProxyReq callback
   */
  @bind
  public make() {
    return this.interceptor
  }
}
