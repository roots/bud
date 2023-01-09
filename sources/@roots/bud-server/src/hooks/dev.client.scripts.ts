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
 */
export const hmrClient = (app: Bud) => {
  if (app.isCLI() && app.context.args.hot === false) return

  const params = new URLSearchParams({
    name: app.label,

    indicator:
      !app.isCLI() ||
      isUndefined(app.context.args.indicator) ||
      isNull(app.context.args.indicator)
        ? `true`
        : app.context.args.indicator.toString(),

    overlay:
      !app.isCLI() ||
      isUndefined(app.context.args.overlay) ||
      isNull(app.context.args.overlay)
        ? `true`
        : app.context.args.overlay.toString(),

    reload:
      !app.isCLI() ||
      isUndefined(app.context.args.reload) ||
      isNull(app.context.args.reload)
        ? `true`
        : app.context.args.reload.toString(),
  })

  return `@roots/bud-client/lib/hot/index.mjs?${params.toString()}`
}
