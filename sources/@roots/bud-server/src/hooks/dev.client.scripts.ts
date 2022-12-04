import type {Bud} from '@roots/bud-framework'
import {isNull, isUndefined} from '@roots/bud-support/lodash-es'

/**
 * Overlay
 *
 * @returns Set of client script callbacks
 *
 * @public
 */
export const callback = () => new Set([hmrClient])

/**
 * Proxy click interceptor
 *
 * @param app - Bud instance
 * @returns string
 *
 * @public
 */
export const proxyClickInterceptor = (app: Bud) => {
  if (!app.hooks.filter(`dev.middleware.enabled`, []).includes(`proxy`))
    return

  const params = new URLSearchParams({
    search: app.hooks.filter(
      `dev.middleware.proxy.options.target`,
      new URL(`http://0.0.0.0`),
    )?.href,
    replace: `/`,
  })

  return `@roots/bud-client/lib/intercept/proxy-click-interceptor.js?${params.toString()}`
}

/**
 * Client
 *
 * @param app - Bud instance
 * @returns string
 *
 * @public
 */
export const hmrClient = (app: Bud) => {
  const params = new URLSearchParams({
    name: app.label,

    indicator:
      isUndefined(app.context.args.indicator) ||
      isNull(app.context.args.indicator)
        ? `true`
        : app.context.args.indicator.toString(),

    overlay:
      isUndefined(app.context.args.overlay) ||
      isNull(app.context.args.overlay)
        ? `true`
        : app.context.args.overlay.toString(),

    reload:
      isUndefined(app.context.args.reload) ||
      isNull(app.context.args.reload)
        ? `true`
        : app.context.args.reload.toString(),
  })

  return `@roots/bud-client/lib/hot/index.mjs?${params.toString()}`
}
