import type {Framework, Server} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isBoolean, isString, isUndefined, isNumber} = lodash

export type UserInput = URL | string | boolean | number

export interface method {
  (input?: UserInput): Framework
}

export type facade = method

export const enableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> => [
  ...disableMiddleware(middleware),
  'proxy',
]

export const disableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> =>
  middleware.filter(middleware => middleware !== 'proxy')

export const method: method = function (input) {
  const ctx = this as Framework

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
    return ctx.hooks.on('middleware.proxy.target', () => new URL(input))
  }

  if (input instanceof URL) {
    return ctx.hooks.on('middleware.proxy.target', () => input)
  }
}
