import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Signale} from 'signale'

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
    followRedirects: false,
    selfHandleResponse: true,
    logLevel: 'debug',
    headers: {
      'X-Proxy-By': '@roots/bud',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Methods': '*',
    },
  }

  public url: URL

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    app: Framework,
    url: URL,
    interceptor: ProxyOptions['onProxyRes'],
    request: ProxyOptions['onProxyReq'],
  ) {
    this.url = url

    this.options.cookieDomainRewrite = {
      [url.proxy.host]: url.dev.host,
    }

    this.options.onProxyReq = request
    this.options.onProxyRes = interceptor
    this.options.target = url.proxy.href
    this.options.logLevel = app.store.is('features.log', true)
      ? 'debug'
      : 'silent'

    this.options.logProvider = () => {
      let logger = new Signale()
      return logger.scope('server', 'proxy')
    }
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
