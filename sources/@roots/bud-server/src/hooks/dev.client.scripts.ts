import {Bud} from '@roots/bud-framework'

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
    ? `@roots/bud-client/lib/proxy-click-interceptor.cjs`
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
  `@roots/bud-client/lib/hmr/index.cjs?name=${app.name}&bud.overlay=${
    app.context.args.overlay
  }&bud.indicator=${app.context.args.indicator}&path=${app.hooks.filter(
    'dev.middleware.hot.options.path',
  )}`

/**
 * Overlay
 *
 * @param app - Bud instance
 * @returns set of client scripts
 *
 * @public
 */
export const callback = () => new Set([overlay, proxyClickInterceptor])
