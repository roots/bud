import {bind} from '@roots/bud-support'
import {Options as ProxyOptions} from 'http-proxy-middleware'

import {URL} from './url'

/**
 * Proxy options
 *
 * @public
 */
export class OptionsFactory {
  /**
   * Proxy options
   *
   * @public
   */
  public options: Partial<ProxyOptions> = {
    autoRewrite: true,
    changeOrigin: true,
    followRedirects: true,
    selfHandleResponse: true,
    ws: false,
    logLevel: 'debug',
    headers: {
      'X-Proxy-By': '@roots/bud',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Methods': '*',
    },
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    url: URL,
    interceptor: ProxyOptions['onProxyRes'],
    request: ProxyOptions['onProxyReq'],
  ) {
    this.options.cookieDomainRewrite = {
      [url.proxy.origin]: url.dev.origin,
    }

    this.options.onProxyReq = request
    this.options.onProxyRes = interceptor
    this.options.target = url.proxy.href

    this.options.logProvider = () => url.app.logger.instance
  }

  /**
   * Returns proxy options
   *
   * @returns ProxyOptions
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(): ProxyOptions {
    return this.options
  }
}
