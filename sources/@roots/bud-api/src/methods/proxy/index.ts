import type {Bud} from '@roots/bud-framework/bud'
import type * as Server from '@roots/bud-framework/services/server'
import {isNumber} from '@roots/bud-support/lodash-es'

type ReplacementTuples = Array<[string, string]>
type ReplacementCallback = (
  replacements: ReplacementTuples | undefined,
) => ReplacementTuples

export type Parameters = [
  (URL | string | boolean | number)?,
  (ReplacementCallback | ReplacementTuples)?,
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
  middleware: Array<keyof Server.Middleware.Available> | undefined = [],
): Array<keyof Server.Middleware.Available> => {
  return [...disableMiddlewareHookCallback(middleware), `cookie`, `proxy`]
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
  middleware: Array<keyof Server.Middleware.Available> | undefined = [],
): Array<keyof Server.Middleware.Available> => {
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
  if (isNumber(input)) {
    this.hooks.on(
      `dev.middleware.proxy.target`,
      (url = new URL(`http://0.0.0.0`)) => {
        url.port = `${input}`
        return url
      },
    )
  }

  /**
   * User proxy request from a URL
   */
  if (input instanceof URL || typeof input === `string`) {
    this.hooks.on(
      `dev.middleware.proxy.target`,
      input instanceof URL ? input : new URL(input),
    )
  }

  /**
   * Enable or disable middleware (implicitly enabled unless supplied value is `false`)
   */
  this.hooks.on(
    `dev.middleware.enabled`,
    input === false
      ? disableMiddlewareHookCallback
      : enableMiddlewareHookCallback,
  )

  /**
   * Handle URL replacements
   */
  if (replacements === undefined) return this

  this.hooks.on(`dev.middleware.proxy.replacements`, replacements)
  return this
}
