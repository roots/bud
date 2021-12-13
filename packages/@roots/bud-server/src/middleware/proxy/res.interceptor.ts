import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {IncomingMessage, ServerResponse} from 'http'
import {responseInterceptor} from 'http-proxy-middleware'
import {URL as NodeURL} from 'url'

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
   * Provided by the proxy server to be used
   * in place of the publicPath in the response
   *
   * @public
   */
  public proxyPath: NodeURL

  /**
   * Boolean indicating if the proxied server
   * is handling the response body
   *
   * @public
   */
  public exitEarly: boolean

  /**
   * Asset base path (for dev server hosted assets)
   *
   * @public
   */
  public get assetBase() {
    return `${this.url.dev.origin}${this.app.hooks.filter(
      'build.output.publicPath',
    )}`
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
    proxyRes: IncomingMessage,
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<Buffer | string> {
    try {
      res.setHeader('x-proxy-by', '@roots/bud')
      res.setHeader('x-bud-proxy-origin', this.url.proxy.origin)
      res.setHeader('x-bud-dev-origin', this.url.dev.origin)

      /**
       * css is not handled by the proxy
       */
      if (req.headers['accept'].startsWith('text/css')) {
        return `// this is a proxied connection for development. css is served from the js bundle.`
      }

      /**
       * If this header is set the proxy is indicating
       * that this should be used in lieue of the
       * publicPath.
       */
      if (proxyRes.headers['x-bud-proxy-path']) {
        res.setHeader(
          'x-bud-proxy-path',
          proxyRes.headers['x-bud-proxy-path'],
        )

        this.proxyPath = new NodeURL(
          proxyRes.headers['x-bud-proxy-path'] as string,
        )
      }

      /**
       * If this header is set the proxy is indicating
       * that no further replacements should be made
       * to the body (it will handle modifying page links, etc.)
       */
      if (proxyRes.headers['x-bud-proxy-no-process']) {
        res.setHeader('x-bud-proxy-path-no-process', 'true')
        this.exitEarly = true
      }

      /**
       * Attempt to convert the body to a string
       * If it fails, just return the buffer to http-proxy-middleware
       */
      let body = buffer?.toString()
      if (!body) return buffer

      /**
       * If proxy is overriding the publicPath...
       */
      if (this.proxyPath) {
        res.setHeader(
          'x-bud-proxy-origin',
          this.proxyPath.origin,
        )
        res.setHeader(
          'x-bud-proxy-path',
          this.proxyPath.pathname,
        )

        /**
         * ...make the replacements as requested by proxy
         */
        if (typeof body === 'string') {
          body = body.replaceAll(
            new RegExp(this.proxyPath.href, 'g'),
            `${this.assetBase}`,
          )
        }

        /**
         * ...and return early (if requested)
         */
        if (this.exitEarly) return body

        /**
         * Otherwise, proceedwith the default asset replacement strategy
         */
      }

      /**
       * Process replacements
       */
      body = this.replacements?.reduce(
        (html, [from, to]: [string | RegExp, string]) =>
          html.replaceAll(from, to),
        body,
      )

      /**
       * Send string body back to http-proxy-middleware
       * it will be converted to Buffer on our behalf
       */
      return body
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
        'proxy.interceptor',
        () => this._interceptor,
      ),
    )
  }

  /**
   * Replacements to make on the response body
   *
   * @public
   * @decorator `@bind`
   */
  public get replacements() {
    const replacements = []

    if (
      this.app.store.is('server.proxy.replace.publicPath', true)
    ) {
      replacements.push(this.replaceAssetPath())
    }

    if (this.app.store.is('server.proxy.replace.href', true)) {
      replacements.push(this.replaceHref())
    }

    if (this.app.store.is('server.proxy.replace.window', true)) {
      replacements.push(this.replaceWindow())
    }

    return this.app.hooks.filter('proxy.replace', replacements)
  }

  /**
   * Replaces asset path in response body
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public replaceAssetPath(): [string | RegExp, string] {
    const search = `${this.url.proxy.origin}${this.url.publicPath}(.*)?`
    const replacement = `${this.assetBase}$1`

    this.app.log(`Replacing '${search}' with '${replacement}'`)
    return [new RegExp(search, 'g'), replacement]
  }

  /**
   * Replace window.location.href and the like in response body
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public replaceWindow(): [string | RegExp, string] {
    return [
      new RegExp(
        `window\\.location([\\[|\\.]['|"]?.*['|"]?\\]?)\\s*?=\\s*?['|"]${this.url.proxy.origin}(.*)['|"]`,
        'g',
      ),
      `window.location$1 = "${this.url.dev.origin}$2"`,
    ]
  }

  /**
   * Replace anchor link href attributes in response body
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public replaceHref(): [string | RegExp, string] {
    return [
      new RegExp(
        `<a(.*)?href=['|"]${this.url.proxy.origin}(.*)?['|"]`,
        'g',
      ),
      `<a$1href="${this.url.dev.origin}$2"`,
    ]
  }
}
