import type {Bud} from '@roots/bud-framework/bud'
import type * as Server from '@roots/bud-framework/services/server'
import {
  isBoolean,
  isNumber,
  isString,
  isUndefined,
} from '@roots/bud-support/lodash-es'

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
  const app = this as Bud

  /**
   * Bail early in production
   */
  if (!app.isDevelopment) return app

  /**
   * User proxy request from a port #
   */
  isNumber(input) &&
    app.hooks.on(`dev.middleware.proxy.target`, url => {
      if (isUndefined(url)) url = new URL(`http://0.0.0.0`)
      url.port = `${input}`
      return url
    })

  /**
   * User proxy request from a string
   */
  isString(input) &&
    app.hooks.on(`dev.middleware.proxy.target`, new URL(input))

  /**
   * User proxy request from a URL
   */
  input instanceof URL &&
    app.hooks.on(`dev.middleware.proxy.target`, input)

  /**
   * User proxy request as a boolean
   */
  isBoolean(input)
    ? app.hooks.on(
        `dev.middleware.enabled`,
        input
          ? enableMiddlewareHookCallback
          : disableMiddlewareHookCallback,
      )
    : app.hooks.on(`dev.middleware.enabled`, enableMiddlewareHookCallback)

  /**
   * Handle URL replacements
   */
  replacements = isUndefined(replacements)
    ? (hookValue): Array<[string | RegExp, string]> => [
        ...(hookValue ?? []),
        [app.hooks.filter(`dev.middleware.proxy.target`).href, `/`],
      ]
    : replacements

  app.hooks.on(`dev.middleware.proxy.replacements`, replacements)

  /**
   * Return bud interface
   */
  return app
}
