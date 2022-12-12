import type {Bud} from '@roots/bud-framework'
import signale from '@roots/bud-support/signale'
import {createProxyMiddleware, Options} from 'http-proxy-middleware'

import * as requestInterceptor from './handler/requestInterceptor.js'
import * as responseInterceptor from './handler/responseInterceptor.js'
import {ApplicationURL} from './url.js'

/**
 * Proxy middleware factory
 *
 * @public
 */
export const proxy = (app: Bud) => createProxyMiddleware(makeOptions(app))

export const makeOptions = (app: Bud): Options => {
  const url = new ApplicationURL(() => app)

  return filterUndefined(
    app.hooks.filter(`dev.middleware.proxy.options`, {
      agent: app.hooks.filter(
        `dev.middleware.proxy.options.agent`,
        undefined,
      ),
      autoRewrite: app.hooks.filter(
        `dev.middleware.proxy.options.autoRewrite`,
        true,
      ),
      buffer: app.hooks.filter(
        `dev.middleware.proxy.options.buffer`,
        undefined,
      ),
      changeOrigin: app.hooks.filter(
        `dev.middleware.proxy.options.changeOrigin`,
        true,
      ),
      cookieDomainRewrite: app.hooks.filter(
        `dev.middleware.proxy.options.cookieDomainRewrite`,
        url.dev.host,
      ),
      cookiePathRewrite: app.hooks.filter(
        `dev.middleware.proxy.options.cookiePathRewrite`,
        undefined,
      ),
      ejectPlugins: app.hooks.filter(
        `dev.middleware.proxy.options.ejectPlugins`,
        undefined,
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
      ignorePath: app.hooks.filter(
        `dev.middleware.proxy.options.ignorePath`,
        undefined,
      ),
      localAddress: app.hooks.filter(
        `dev.middleware.proxy.options.localAddress`,
        undefined,
      ),
      logger: app.hooks.filter(
        `dev.middleware.proxy.options.logger`,
        app.context.args.log
          ? new signale().scope(...app.logger.scope, `proxy`)
          : undefined,
      ),
      on: filterUndefined(
        app.hooks.filter(`dev.middleware.proxy.options.on`, {
          proxyReq: app.hooks.filter(
            `dev.middleware.proxy.options.onProxyReq`,
            requestInterceptor.factory(app, url),
          ),
          proxyRes: app.hooks.filter(
            `dev.middleware.proxy.options.onProxyRes`,
            responseInterceptor.factory(app, url),
          ),
        }),
      ),
      pathFilter: app.hooks.filter(
        `dev.middleware.proxy.options.pathFilter`,
        [`!/bud/hot/**`],
      ),
      pathRewrite: app.hooks.filter(
        `dev.middleware.proxy.options.pathRewrite`,
        undefined,
      ),
      plugins: app.hooks.filter(
        `dev.middleware.proxy.options.plugins`,
        undefined,
      ),
      prependPath: app.hooks.filter(
        `dev.middleware.proxy.options.prependPath`,
        undefined,
      ),
      preserveHeaderKeyCase: app.hooks.filter(
        `dev.middleware.proxy.options.preserveHeaderKeyCase`,
        undefined,
      ),
      protocolRewrite: app.hooks.filter(
        `dev.middleware.proxy.options.protocolRewrite`,
        url.proxy.protocol.startsWith(`https`) ? `https` : undefined,
      ),
      proxyTimeout: app.hooks.filter(
        `dev.middleware.proxy.options.proxyTimeout`,
        undefined,
      ),
      router: app.hooks.filter(
        `dev.middleware.proxy.options.router`,
        undefined,
      ),
      secure: app.hooks.filter(
        `dev.middleware.proxy.options.secure`,
        false,
      ),
      selfHandleResponse: app.hooks.filter(
        `dev.middleware.proxy.options.selfHandleResponse`,
        true,
      ),
      ssl: app.hooks.filter(`dev.middleware.proxy.options.ssl`, undefined),
      target: url.proxy,
      timeout: app.hooks.filter(
        `dev.middleware.proxy.options.timeout`,
        undefined,
      ),
      toProxy: app.hooks.filter(
        `dev.middleware.proxy.options.toProxy`,
        undefined,
      ),
      ws: app.hooks.filter(`dev.middleware.proxy.options.ws`, undefined),
      xfwd: app.hooks.filter(
        `dev.middleware.proxy.options.xfwd`,
        undefined,
      ),
    }),
  )
}

export const filterUndefined = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((a, [k, v]) => {
    if (v === undefined) return a
    return {...a, [k]: v}
  }, {})
}
