import type {Bud} from '@roots/bud-framework'
// import signale from '@roots/bud-support/signale'
import {createProxyMiddleware, Options} from 'http-proxy-middleware'

// import * as error from './handler/error.js'
// import * as open from './handler/open.js'
// import * as pathRewrite from './handler/pathRewrite.js'
import * as requestInterceptor from './handler/requestInterceptor.js'
import * as responseInterceptor from './handler/responseInterceptor.js'
import {ApplicationURL} from './url.js'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const proxy = (app: Bud) => {
  const url = new ApplicationURL(() => app)

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
    headers: app.hooks.filter(
      `dev.middleware.proxy.options.headers`,
      undefined,
    ),
    hostRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.hostRewrite`,
      url.dev.host,
    ),
    logger: undefined,
    on: {
      proxyReq: app.hooks.filter(
        `dev.middleware.proxy.options.onProxyReq`,
        requestInterceptor.factory(app, url),
      ),
      proxyRes: app.hooks.filter(
        `dev.middleware.proxy.options.onProxyRes`,
        responseInterceptor.factory(app, url),
      ),
    },
    pathFilter: app.hooks.filter(
      `dev.middleware.proxy.options.pathFilter`,
      [`!/bud/hot/**`],
    ),
    protocolRewrite: app.hooks.filter(
      `dev.middleware.proxy.options.protocolRewrite`,
      url.dev.protocol.startsWith(`https`) ? `https` : null,
    ),
    secure: app.hooks.filter(`dev.middleware.proxy.options.secure`, false),
    selfHandleResponse: app.hooks.filter(
      `dev.middleware.proxy.options.selfHandleResponse`,
      true,
    ),
    target: url.proxy,
  }

  return createProxyMiddleware(
    app.hooks.filter(`dev.middleware.proxy.options`, options),
  )
}
