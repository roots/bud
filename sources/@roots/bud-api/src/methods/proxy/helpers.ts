import type {Bud} from '@roots/bud-framework/bud'
import type * as Server from '@roots/bud-framework/services/server'
import isArray from '@roots/bud-support/lodash/isArray'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isObject from '@roots/bud-support/lodash/isObject'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Options} from './proxy.types.js'

export const fallbackUrl = new URL(`http://0.0.0.0/`)

export const maybeEnable = (bud: Bud, input: unknown) => {
  bud.hooks.on(
    `dev.middleware.enabled`,
    input === false ? disableMiddleware : enableMiddleware,
  )
}

/**
 * Assign port
 *
 * @param bud
 * @param port
 */
export const assignPort = (bud: Bud, port: number) => {
  bud.hooks.on(`dev.proxyUrl`, (url = fallbackUrl) => {
    url.port = `${port}`
    return url
  })
}

/**
 * Assign a URL or a string to `proxy.options.target`
 *
 * @param bud
 * @param maybeURL
 */
export const assignUrl = (bud: Bud, maybeURL: string | URL) => {
  bud.hooks.on(
    `dev.proxyUrl`,
    maybeURL instanceof URL ? maybeURL : new URL(maybeURL),
  )
}

/**
 * Assign a callback function `proxy.options`
 *
 * @param bud - bud instance
 * @param optionsFn - options callback
 */
export const assignOptionsCallback = (
  bud: Bud,
  callback: (options?: Options) => Options,
) => {
  bud.hooks.on(`dev.middleware.proxy.options`, callback)
}

/**
 * Assign replacements
 *
 * @param bud - bud instance
 * @param replacements - replacement tuples
 */
export const assignReplacements = (
  bud: Bud,
  replacements: Options['replacements'],
) => {
  bud.hooks.on(`dev.middleware.proxy.replacements`, replacements)
}

/**
 * Enables proxy middleware
 *
 * @remarks
 * Callback for the `dev.middleware.enabled` hook
 * If proxy middleware is already enabled it will be removed before it is re-added
 */
export const enableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available> | undefined = [],
): Array<keyof Server.Middleware.Available> => {
  return [...disableMiddleware(middleware), `cookie`, `proxy`]
}

/**
 * Disable proxy middleware
 *
 * @remarks
 * Callback for the `dev.middleware.enabled` hook
 * If proxy middleware is already enabled it will be removed before it is re-added
 */
export const disableMiddleware = (
  middleware: Array<keyof Server.Middleware.Available> | undefined = [],
): Array<keyof Server.Middleware.Available> => {
  return middleware?.filter(
    middleware => middleware !== `proxy` && middleware !== `cookie`,
  )
}

export const isUrl = (obj: unknown): obj is URL => obj instanceof URL
export const isFalse = (obj: unknown): obj is false => obj === false
export const isOptionsObject = (
  obj:
    | Options
    | string
    | number
    | URL
    | Array<[string, string]>
    | CallableFunction
    | boolean
    | undefined,
): obj is Options =>
  isObject(obj) &&
  !(obj instanceof URL) &&
  !isArray(obj) &&
  !isFunction(obj) &&
  !isUndefined(obj)

/**
 * Map options object
 *
 * @param bud
 * @param options
 */
export const assignOptions = (bud: Bud, options: Options): void => {
  Object.entries(options).map(([key, value]) => {
    if (key === `replacements`)
      return bud.hooks.on(
        `dev.middleware.proxy.replacements`,
        options[key],
      )

    bud.hooks.on(
      `dev.middleware.proxy.options.${
        key as keyof Omit<Options, `replacements`>
      }`,
      value,
    )
  })
}
