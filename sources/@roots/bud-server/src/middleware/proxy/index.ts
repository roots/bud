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
      'dev.middleware.proxy.options.autoRewrite',
      true,
    ),

    /**
     * Change origin
     */
    changeOrigin: app.hooks.filter(
      `dev.middleware.proxy.options.changeOrigin`,
      true,
    ),

    /**
     * Cookie domain rewrite
     */
    cookieDomainRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.cookieDomainRewrite`,
      url.dev.host,
    ),

    /**
     * Follow redirects
     */
    followRedirects: app.hooks.filter(
      `dev.middleware.proxy.options.followRedirects`,
      false,
    ),

    /**
     * Host rewrite
     */
    hostRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.hostRewrite`,
      url.dev.host,
    ),

    /**
     * Log level
     */
    logLevel: app.hooks.filter(
      `dev.middleware.proxy.options.logLevel`,
      `info`,
    ),

    /**
     * Log provider
     */
    logProvider: () => app.logger.instance.scope('proxy'),

    /**
     * Proxy request handler
     */
    onProxyReq: app.hooks.filter(
      `dev.middleware.proxy.options.onProxyReq`,
      request.make,
    ),

    /**
     * Proxy response handler
     */
    onProxyRes: app.hooks.filter(
      `dev.middleware.proxy.options.onProxyRes`,
      response.make,
    ),

    /**
     * Protocol rewrite
     */
    protocolRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.protocolRewrite`,
      url.dev.protocol === 'https:' ? 'https' : null,
    ),

    /**
     * Secure
     */
    secure: app.hooks.filter(`dev.middleware.proxy.options.secure`, false),

    /**
     * Self handle response
     */
    selfHandleResponse: app.hooks.filter(
      `dev.middleware.proxy.options.selfHandleResponse`,
      true,
    ),

    /**
     * Target
     */
    target: app.hooks.filter('dev.middleware.proxy.target', url.proxy),
  }

  return createProxyMiddleware(
    app.hooks.filter('dev.middleware.proxy.paths', ['**', '!/__bud/**']),
    app.hooks.filter('dev.middleware.proxy.options', options),
  )
}
