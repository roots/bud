import type {Framework} from '@roots/bud-framework'
import {createProxyMiddleware} from 'http-proxy-middleware'
import {Signale} from 'signale'

import {RequestInterceptorFactory} from './req.interceptor'
import {ResponseInterceptorFactory} from './res.interceptor'
import {ApplicationURL} from './url'

const enum log_level {
  info = 'info',
  silent = 'silent',
}

/**
 * Proxy middleware factory
 *
 * @public
 */
export const middleware = (app: Framework) => {
  const url = new ApplicationURL(() => app)
  const interceptor = new ResponseInterceptorFactory(() => app, url)
  const request = new RequestInterceptorFactory(() => app, url)

  return createProxyMiddleware(
    app.hooks.filter('middleware.proxy.options', () => ({
      changeOrigin: true,
      cookieDomainRewrite: {
        [url.proxy.host]: url.dev.host,
      },
      headers: {
        'X-Proxy-By': '@roots/bud',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Allow-Methods': '*',
      },
      hostRewrite: url.dev.host,
      logLevel: app.store.is('features.log', true)
        ? log_level['info']
        : log_level['silent'],
      logProvider: () => {
        let logger = new Signale()
        return logger.scope('server', 'proxy')
      },
      onProxyReq: request.make(),
      onProxyRes: interceptor.make(),
      secure: false,
      selfHandleResponse: true,
      target: url.proxy.href,
    })),
  )
}

export {middleware as default}
