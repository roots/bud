import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {IncomingMessage, ServerResponse} from 'http'
import {responseInterceptor} from 'http-proxy-middleware'

import {URL} from './url'

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
    public url: URL,
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
    try {
      res.setHeader('x-proxy-by', '@roots/bud')
      res.setHeader('x-bud-proxy-origin', this.url.proxy.origin)
      res.setHeader('x-bud-dev-origin', this.url.dev.origin)

      /**
       * Attempt to convert the body to a string
       * If it fails, just return the buffer to http-proxy-middleware
       */
      let body = buffer?.toString()
      if (!body) return buffer

      /**
       * Process replacements and return body
       */
      return this.app.hooks
        .filter(
          'server.middleware.proxy.response.replacements',
          () => [this.replaceAssetPath()],
        )
        ?.reduce(
          (html, [from, to]) => html.replaceAll(from, to),
          body,
        )
    } catch (err) {
      this.app.error(err)
      return buffer
    }
  }

  /**
   * Returns the `onProxyRes` callback for `http-proxy-middleware`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make() {
    return responseInterceptor(
      this.app.hooks.filter(
        'server.middleware.proxy.response.interceptor',
        () => this._interceptor,
      ),
    )
  }

  /**
   * Replaces asset path in response body
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public replaceAssetPath(): [string | RegExp, string] {
    const search = `${this.url.proxyAssetUrlBase}(.*)?`
    const replacement = `${this.url.devAssetUrlBase}$1`

    this.app.log(`Replacing '${search}' with '${replacement}'`)
    return [new RegExp(search, 'g'), replacement]
  }
}
