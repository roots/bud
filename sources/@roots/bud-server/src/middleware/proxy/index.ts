import type {Framework} from '@roots/bud-framework'
import {createProxyMiddleware, Options} from 'http-proxy-middleware'

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
  const response = new ResponseInterceptorFactory(() => app, url)
  const request = new RequestInterceptorFactory(() => app, url)

  const options: Options = {
    autoRewrite: app.hooks.filter(
      'middleware.proxy.options.autoRewrite',
      false,
    ),

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
      url.dev.host,
    ),

    followRedirects: app.hooks.filter(
      `middleware.proxy.options.followRedirects`,
      false,
    ),

    /**
     * Headers
     */
    headers: {
      ...app.hooks.filter(`middleware.proxy.options.headers`, {
        connection: 'keep-alive',
        'access-control-allow-origin': `*`,
        'access-control-allow-credentials': `*`,
        'access-control-allow-methods': `*`,
      }),
      'x-proxy-by': '@roots/bud',
      'x-bud-dev-origin': url.dev.origin,
      'x-bud-dev-protocol': url.dev.protocol,
      'x-bud-dev-hostname': url.dev.hostname,
      'x-bud-proxy-origin': url.proxy.origin,
    },

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
      `middleware.proxy.options.onProxyReq`,
      request.make,
    ),

    /**
     * Proxy response handler
     */
    onProxyRes: app.hooks.filter(
      `middleware.proxy.options.onProxyRes`,
      response.make,
    ),

    /**
     * Protocol rewrite
     */
    protocolRewrite: app.hooks.filter(
      `middleware.proxy.options.protocolRewrite`,
      url.dev.protocol?.startsWith('https') ? 'https' : undefined,
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
    target: app.hooks.filter('middleware.proxy.target', url.proxy),
  }

  const {log} = app.logger.instance.scope('proxy')
  Object.entries(options).map(v => log(...v))

  return createProxyMiddleware(options)
}
