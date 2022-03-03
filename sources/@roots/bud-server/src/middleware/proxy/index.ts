import type {Framework} from '@roots/bud-framework'
import {createProxyMiddleware} from 'http-proxy-middleware'

import {RequestInterceptorFactory} from './req.interceptor'
import {ResponseInterceptorFactory} from './res.interceptor'
import {ApplicationURL} from './url'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const proxy = (app: Framework) => {
  const url = new ApplicationURL(() => app)
  const interceptor = new ResponseInterceptorFactory(() => app, url)
  const request = new RequestInterceptorFactory(() => app, url)

  return createProxyMiddleware(
    app.hooks.filter(`middleware.proxy.options`, {
      /**
       * Change origin
       */
      changeOrigin: app.hooks.filter(
        `middleware.proxy.options.changeOrigin`,
        true,
      ),

      /**
       * Cookie domain rewrite
       */
      cookieDomainRewrite: app.hooks.filter(
        `middleware.proxy.options.cookieDomainRewrite`,
        {
          [url.proxy.host]: url.dev.host,
        },
      ),

      /**
       * Headers
       */
      headers: app.hooks.filter(`middleware.proxy.options.headers`, {
        [`X-Proxy-By`]: `@roots/bud`,
        [`Connection`]: `keep-alive`,
        [`Access-Control-Allow-Origin`]: `*`,
        [`Access-Control-Allow-Credentials`]: `*`,
        [`Access-Control-Allow-Methods`]: `*`,
      }),

      /**
       * Host rewrite
       */
      hostRewrite: app.hooks.filter(
        `middleware.proxy.options.hostRewrite`,
        app.hooks.filter('dev.url').host,
      ),

      /**
       * Log level
       */
      logLevel: app.hooks.filter(
        `middleware.proxy.options.logLevel`,
        `info`,
      ),

      /**
       * Log provider
       */
      logProvider: () => app.server.serverLogger.scope('proxy'),

      /**
       * Proxy request handler
       */
      onProxyReq: app.hooks.filter(
        `middleware.proxy.options.onProxyReq`,
        request.make,
      ),

      /**
       * Proxy response handler
       */
      onProxyRes: app.hooks.filter(
        `middleware.proxy.options.onProxyReq`,
        interceptor.make,
      ),

      /**
       * Protocol rewrite
       */
      protocolRewrite: app.hooks.filter(
        `middleware.proxy.options.protocolRewrite`,
        app.hooks.filter('dev.url').protocol.startsWith('https')
          ? 'https'
          : undefined,
      ),

      /**
       * Secure
       */
      secure: app.hooks.filter(`middleware.proxy.options.secure`, false),

      /**
       * Self handle response
       */
      selfHandleResponse: app.hooks.filter(
        `middleware.proxy.options.selfHandleResponse`,
        true,
      ),

      /**
       * Target
       */
      target: app.hooks.filter('middleware.proxy.target'),
    }),
  )
}
