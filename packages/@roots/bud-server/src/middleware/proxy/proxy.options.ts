import {bind} from '@roots/bud-support'
import {Options as ProxyOptions} from 'http-proxy-middleware'

import {URL} from './url'

export class OptionsFactory {
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

  public constructor(
    url: URL,
    interceptor: ProxyOptions['onProxyRes'],
  ) {
    this.options.cookieDomainRewrite = {
      [url.proxy.origin]: url.dev.origin,
    }

    this.options.logProvider = () => url.app.logger.instance

    this.options.onProxyRes = interceptor

    this.options.target = url.proxy.href
  }

  @bind
  public make(): ProxyOptions {
    return this.options
  }
}
