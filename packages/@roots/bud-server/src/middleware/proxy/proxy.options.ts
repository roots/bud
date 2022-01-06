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
    followRedirects: true,
    selfHandleResponse: true,
    secure: false,
    xfwd: true,
    logLevel: 'info',
    headers: {
      'X-Proxy-By': '@roots/bud',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Methods': '*',
    },
  }

  /**
   * Logger instance
   *
   * @public
   */
  public logger: Signale

  /**
   * URL instance
   *
   * @public
   */
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
    this.logger = app.logger.scoped(app.name, 'proxy')

    this.url = url

    this.options.cookieDomainRewrite = {
      [url.proxy.host]: url.dev.host,
    }

    this.options.onProxyReq = request
    this.options.onProxyRes = interceptor

    this.options.hostRewrite = url.dev.host
    this.options.target = url.proxy.href
    this.options.logLevel = app.store.is('features.log', true)
      ? 'debug'
      : 'silent'

    this.options.logProvider = () => this.logger
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
