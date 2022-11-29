import type {Bud} from '@roots/bud-framework'
import {createProxyMiddleware, Options} from 'http-proxy-middleware'

import {RequestInterceptorFactory} from './req.interceptor.js'
import {ResponseInterceptorFactory} from './res.interceptor.js'
import {ApplicationURL} from './url.js'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const proxy = (app: Bud) => {
  const url = new ApplicationURL(() => app)
  const response = new ResponseInterceptorFactory(() => app, url)
  const request = new RequestInterceptorFactory(() => app, url)

  const options: Options = {
    autoRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.autoRewrite`,
      true,
    ),
    changeOrigin: app.hooks.filter(
      `dev.middleware.proxy.options.changeOrigin`,
      true,
    ),
    cookieDomainRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.cookieDomainRewrite`,
      url.dev.host,
    ),
    followRedirects: app.hooks.filter(
      `dev.middleware.proxy.options.followRedirects`,
      false,
    ),
    hostRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.hostRewrite`,
      url.dev.host,
    ),
    forward: app.hooks.filter(
      `dev.middleware.proxy.options.forward`,
      undefined,
    ),
    headers: app.hooks.filter(
      `dev.middleware.proxy.options.headers`,
      undefined,
    ),
    on: {
      proxyReq: app.hooks.filter(
        `dev.middleware.proxy.options.onProxyReq`,
        request.make,
      ),
      proxyRes: app.hooks.filter(
        `dev.middleware.proxy.options.onProxyRes`,
        response.make,
      ),
    },
    protocolRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.protocolRewrite`,
      url.dev.protocol === `https:` ? `https` : null,
    ),
    secure: app.hooks.filter(`dev.middleware.proxy.options.secure`, false),
    selfHandleResponse: app.hooks.filter(
      `dev.middleware.proxy.options.selfHandleResponse`,
      true,
    ),
    target: app.hooks.filter(`dev.middleware.proxy.target`, url.proxy),
  }

  return createProxyMiddleware(
    app.hooks.filter(`dev.middleware.proxy.options`, options),
  )
}
