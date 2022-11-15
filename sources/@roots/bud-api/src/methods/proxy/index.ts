import type {Bud} from '@roots/bud-framework/bud'
import type * as Server from '@roots/bud-framework/services/server'
import {
  isBoolean,
  isNumber,
  isString,
  isUndefined,
} from '@roots/bud-support/lodash-es'

export type Parameters = [
  (URL | string | boolean | number)?,
  ((
    input: Array<[string | RegExp, string]>,
  ) => Array<[string | RegExp, string]>)?,
]

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
  middleware: Array<keyof Server.Middleware.Available> | undefined,
): Array<keyof Server.Middleware.Available> => {
  if (middleware === undefined) middleware = []

  return [
    ...(disableMiddlewareHookCallback(middleware) ?? []),
    `cookie`,
    `proxy`,
  ]
}

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
  middleware: Array<keyof Server.Middleware.Available> | undefined,
): Array<keyof Server.Middleware.Available> => {
  if (middleware === undefined) middleware = []
  return middleware?.filter(
    middleware => middleware !== `proxy` && middleware !== `cookie`,
  )
}

/**
 * bud.proxy interface
 *
 * @public
 */
export interface proxy {
  (...params: Parameters): Promise<Bud>
}

/**
 * bud.proxy method
 *
 * @public
 */
export const proxy: proxy = async function (
  this: Bud,
  input,
  replacements,
) {
  /**
   * Bail early in production
   */
  if (!this.isDevelopment) return this

  /**
   * User proxy request from a port #
   */
  isNumber(input) &&
    this.hooks.on(`dev.middleware.proxy.target`, url => {
      if (isUndefined(url)) url = new URL(`http://0.0.0.0`)
      url.port = `${input}`
      return url
    })

  /**
   * User proxy request from a string
   */
  isString(input) &&
    this.hooks.on(`dev.middleware.proxy.target`, new URL(input))

  /**
   * User proxy request from a URL
   */
  input instanceof URL &&
    this.hooks.on(`dev.middleware.proxy.target`, input)

  /**
   * User proxy request as a boolean
   */
  isBoolean(input)
    ? this.hooks.on(
        `dev.middleware.enabled`,
        input
          ? enableMiddlewareHookCallback
          : disableMiddlewareHookCallback,
      )
    : this.hooks.on(`dev.middleware.enabled`, enableMiddlewareHookCallback)

  /**
   * Handle URL replacements
   */
  if (replacements === undefined) return this

  this.hooks.on(`dev.middleware.proxy.replacements`, hookValue => {
    if (hookValue === undefined)
      return [[this.hooks.filter(`dev.middleware.proxy.target`).href, `/`]]
    return [
      ...hookValue,
      [this.hooks.filter(`dev.middleware.proxy.target`).href, `/`],
    ]
  })

  return this
}
