import type {Bud} from '@roots/bud-framework'

import isNull from '@roots/bud-support/lodash/isNull'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Overlay
 *
 * @returns Set of client script callbacks
 */
export const callback = () => new Set([hmrClient])

/**
 * Proxy click interceptor
 *
 * @param app - Bud instance
 * @returns string
 */
export const proxyClickInterceptor = (app: Bud) => {
  if (!app.hooks.filter(`dev.middleware.enabled`, []).includes(`proxy`))
    return

  const params = new URLSearchParams({
    replace: `/`,
    search: app.hooks.filter(
      `dev.middleware.proxy.options.target`,
      new URL(`http://0.0.0.0`),
    )?.href,
  })

  return `@roots/bud-client/lib/intercept/proxy-click-interceptor.js?${params.toString()}`
}

/**
 * Client
 *
 * @param app - Bud instance
 * @returns string
 */
export const hmrClient = (app: Bud) => {
  if (app.context.hot === false) return

  const params = new URLSearchParams({
    indicator:
      isUndefined(app.context.indicator) || isNull(app.context.indicator)
        ? `true`
        : app.context.indicator.toString(),

    name: app.label,

    overlay:
      isUndefined(app.context.overlay) || isNull(app.context.overlay)
        ? `true`
        : app.context.overlay.toString(),

    reload:
      isUndefined(app.context.reload) || isNull(app.context.reload)
        ? `true`
        : app.context.reload.toString(),
  })

  return `@roots/bud-client/lib/hot/index.js?${params.toString()}`
}
