import type {Bud} from '@roots/bud-framework'
import {isUndefined} from 'lodash-es'

/**
 * Overlay
 *
 * @param app - Bud instance
 * @returns set of client scripts
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
export const proxyClickInterceptor = (app: Bud) =>
  app.hooks.filter('dev.middleware.enabled', []).includes('proxy')
    ? `@roots/bud-client/lib/proxy-click-interceptor.js`
    : null

/**
 * Overlay
 *
 * @param app - Bud instance
 * @returns string
 *
 * @public
 */
export const overlay = (app: Bud) =>
  `@roots/bud-client/lib/index.js?name=${app.name}&bud.overlay=${
    isUndefined(app.context.args.overlay)
      ? 'true'
      : app.context.args.overlay
  }&bud.indicator=${
    isUndefined(app.context.args.indicator)
      ? 'true'
      : app.context.args.indicator
  }`
