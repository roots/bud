import type {Bud} from '@roots/bud-framework'
import {isNull, isUndefined} from 'lodash-es'

/**
 * Overlay
 *
 * @returns Set of client script callbacks
 *
 * @public
 */
export const callback = () => new Set([overlay, proxyClickInterceptor])

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
    return null

  const target = app.hooks.filter(`dev.middleware.proxy.target`)
  if (!target?.href) return null

  const params = new URLSearchParams({
    search: target.href,
    replace: `/`,
  })

  return `@roots/bud-client/lib/proxy-click-interceptor.js?${params.toString()}`
}

/**
 * Overlay
 *
 * @param app - Bud instance
 * @returns string
 *
 * @public
 */
export const overlay = (app: Bud) => {
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

  return `@roots/bud-client/lib/index.js?${params.toString()}`
}
