import {Bud} from '@roots/bud-framework'

export const src = (modulePath: string) =>
  `@roots/bud-server/client/${modulePath}`

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
    ? src(`proxy-click-interceptor.js`)
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
  src(
    `index.js?name=${app.name}&bud.overlay=${
      app.context.args.overlay
    }&bud.indicator=${app.context.args.indicator}&path=${app.hooks.filter(
      'dev.middleware.hot.options.path',
    )}`,
  )

/**
 * Overlay
 *
 * @param app - Bud instance
 * @returns set of client scripts
 *
 * @public
 */
export const callback = () => new Set([overlay, proxyClickInterceptor])
