import type {Bud, Server} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isBoolean, isString, isUndefined, isNumber} = lodash

export type UserInput = URL | string | boolean | number

export interface method {
  (input?: UserInput): Bud
}

export type facade = method

/**
 * Enables proxy middleware
 *
 * @remarks
 * If proxy middleware is already enabled it will be removed before it is re-added
 *
 * @public
 */
export const enableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> => [
  ...(disableMiddleware(middleware) ?? []),
  'cookie',
  'proxy',
]

export const disableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> =>
  middleware?.filter(
    middleware => middleware !== 'proxy' && middleware !== 'cookie',
  ) ?? []

export const method: method = function (input) {
  const ctx = this as Bud

  if (!ctx.isDevelopment) return ctx

  if (isUndefined(input)) {
    return ctx.hooks.on('middleware.enabled', enableMiddleware)
  }

  if (isBoolean(input)) {
    return ctx.hooks.on(
      'middleware.enabled',
      input ? enableMiddleware : disableMiddleware,
    )
  }

  ctx.hooks.on('middleware.enabled', enableMiddleware)

  if (isNumber(input)) {
    return ctx.hooks.on('middleware.proxy.target', url => {
      url.port = `${input}`
      return url
    })
  }

  if (isString(input)) {
    return ctx.hooks.on('middleware.proxy.target', new URL(input))
  }

  if (input instanceof URL) {
    return ctx.hooks.on('middleware.proxy.target', input)
  }
}
