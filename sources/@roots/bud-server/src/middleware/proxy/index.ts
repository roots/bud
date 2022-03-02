import type {Framework} from '@roots/bud-framework'
import {Signale} from '@roots/bud-support'
import {createProxyMiddleware} from 'http-proxy-middleware'

import {RequestInterceptorFactory} from './req.interceptor'
import {ResponseInterceptorFactory} from './res.interceptor'
import {ApplicationURL} from './url'

/**
 * Fallback proxy log provider
 *
 * @public
 */
const logProvider = () => {
  let logger = new Signale()
  return logger.scope(`server`, `proxy`)
}

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
        [`Access-Control-Allow-Origin`]: `*`,
        [`Access-Control-Allow-Credentials`]: `*`,
        [`Access-Control-Allow-Methods`]: `*`,
      }),

      /**
       * Host rewrite
       */
      hostRewrite: app.hooks.filter(
        `middleware.proxy.options.hostRewrite`,
        url.dev.host,
      ),

      /**
       * Log level
       */
      logLevel: app.hooks.filter(
        `middleware.proxy.options.logLevel`,
        app.store.is(`features.log`, true) ? `info` : `silent`,
      ),

      /**
       * Log provider
       */
      logProvider: app.hooks.filter(
        `middleware.proxy.options.logProvider`,
        () => logProvider,
      ),

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
        app.server.connection.https?.isEnabled() ? `https` : `http`,
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
      target: app.hooks.filter(
        `middleware.proxy.options.target`,
        url.proxy.href,
      ),
    }),
  )
}
