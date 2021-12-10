import {Options as ProxyOptions} from 'http-proxy-middleware'
import {bind} from '@roots/bud-support'
import {URL} from './url'

export class OptionsFactory {
  public options: Partial<ProxyOptions> = {
    autoRewrite: true,
    changeOrigin: true,
    followRedirects: true,
    headers: {
      'X-Proxy-By': '@roots/bud',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Methods': '*',
    },
    logLevel: 'info',
    selfHandleResponse: true,
    ws: true,
  }

  public constructor(
    url: URL,
    interceptor: ProxyOptions['onProxyRes'],
  ) {
    this.options.cookieDomainRewrite = {
      [url.proxy.origin]: url.dev.origin,
    }

    this.options.logProvider = () => url.app.server.logger

    this.options.onProxyRes = interceptor

    this.options.router = url.hasPublicPath
      ? {[`${url.publicPath}`]: '/'}
      : {}

    this.options.target = url.proxy.origin
  }

  @bind
  public make(): ProxyOptions {
    return this.options
  }
}
