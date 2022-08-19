import type {Bud, Server} from '@roots/bud-framework'
import {isBoolean, isNumber, isString, isUndefined} from 'lodash-es'

/**
 * Enables proxy middleware
 *
 * @remarks
 * Callback for the `dev.middleware.enabled` hook
 * If proxy middleware is already enabled it will be removed before it is re-added
 *
 * @public
 */
export const enableMiddlewareHookCallback = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> => [
  ...(disableMiddlewareHookCallback(middleware) ?? []),
  `cookie`,
  `proxy`,
]
/**
 * Disable proxy middleware
 *
 * @remarks
 * Callback for the `dev.middleware.enabled` hook
 * If proxy middleware is already enabled it will be removed before it is re-added
 *
 * @public
 */
export const disableMiddlewareHookCallback = (
  middleware: Array<keyof Server.Middleware.Available>,
): Array<keyof Server.Middleware.Available> =>
  middleware?.filter(
    middleware => middleware !== `proxy` && middleware !== `cookie`,
  ) ?? []

/**
 * bud.proxy interface
 *
 * @public
 */
export interface method {
  (
    input?: URL | string | boolean | number,
    replacements?: (
      input: Array<[string | RegExp, string]>,
    ) => Array<[string | RegExp, string]>,
  ): Bud
}

/**
 * bud.proxy sync facade interface
 *
 * @public
 */
export type facade = method

/**
 * bud.proxy method
 *
 * @public
 */
export const method: method = function (input, replacements) {
  const ctx = this as Bud

  /**
   * Bail early in production
   */
  if (!ctx.isDevelopment) return ctx

  /**
   * User proxy request from a port #
   */
  isNumber(input) &&
    ctx.hooks.on(`dev.middleware.proxy.target`, url => {
      url.port = `${input}`
      return url
    })

  /**
   * User proxy request from a string
   */
  isString(input) &&
    ctx.hooks.on(`dev.middleware.proxy.target`, new URL(input))

  /**
   * User proxy request from a URL
   */
  input instanceof URL &&
    ctx.hooks.on(`dev.middleware.proxy.target`, input)

  /**
   * User proxy request as a boolean
   */
  isBoolean(input)
    ? ctx.hooks.on(
        `dev.middleware.enabled`,
        input
          ? enableMiddlewareHookCallback
          : disableMiddlewareHookCallback,
      )
    : ctx.hooks.on(`dev.middleware.enabled`, enableMiddlewareHookCallback)

  /**
   * Handle URL replacements
   */
  replacements = isUndefined(replacements)
    ? (hookValue): Array<[string | RegExp, string]> => [
        ...(hookValue ?? []),
        [ctx.hooks.filter(`dev.middleware.proxy.target`).href, `/`],
      ]
    : replacements

  ctx.hooks.on(`dev.middleware.proxy.replacements`, replacements)

  /**
   * Return bud interface
   */
  return ctx
}
