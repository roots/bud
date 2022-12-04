import type {Bud} from '@roots/bud-framework/bud'
import type * as Server from '@roots/bud-framework/services/server'
import {
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '@roots/bud-support/lodash-es'
import type * as HttpProxy from 'http-proxy-middleware'

export interface Options {
  agent: HttpProxy.Options['agent']
  auth: HttpProxy.Options['auth']
  autoRewrite: HttpProxy.Options['autoRewrite']
  buffer: HttpProxy.Options['buffer']
  changeOrigin: HttpProxy.Options['changeOrigin']
  cookieDomainRewrite: HttpProxy.Options['cookieDomainRewrite']
  cookiePathRewrite: HttpProxy.Options['cookiePathRewrite']
  ejectPlugins: HttpProxy.Options['ejectPlugins']
  followRedirects: HttpProxy.Options['followRedirects']
  forward: HttpProxy.Options['forward']
  headers: Record<string, string>
  hostRewrite: HttpProxy.Options['hostRewrite']
  ignorePath: HttpProxy.Options['ignorePath']
  localAddress: HttpProxy.Options['localAddress']
  logger: HttpProxy.Options['logger']
  on: HttpProxy.Options['on']
  onProxyReq: HttpProxy.RequestHandler
  onProxyRes: HttpProxy.RequestHandler
  pathFilter: HttpProxy.Options['pathFilter']
  pathRewrite: HttpProxy.Options['pathRewrite']
  plugins: HttpProxy.Options['plugins']
  prependPath: HttpProxy.Options['prependPath']
  preserveHeaderKeyCase: HttpProxy.Options['preserveHeaderKeyCase']
  protocolRewrite: HttpProxy.Options['protocolRewrite']
  proxyTimeout: HttpProxy.Options['proxyTimeout']
  router: HttpProxy.Options['router']
  secure: HttpProxy.Options['secure']
  selfHandleResponse: HttpProxy.Options['selfHandleResponse']
  ssl: HttpProxy.Options['ssl']
  target: HttpProxy.Options['target'] & URL
  timeout: HttpProxy.Options['timeout']
  toProxy: HttpProxy.Options['toProxy']
  ws: HttpProxy.Options['ws']
  xfwd: HttpProxy.Options['xfwd']

  /**
   * Not a proxy-party option
   *
   * Used by default `onProxyRes` handler to rewrite the page body
   */
  replacements: ReplacementTuples | ReplacementCallback
}

type ReplacementTuples = Array<[string, string]>
type ReplacementCallback = (
  replacements: ReplacementTuples | undefined,
) => ReplacementTuples
type OptionsCallback = (options: Options | undefined) => Options
export type Parameters = [
  (URL | string | boolean | number | Options | OptionsCallback)?,
  (Options | ReplacementCallback | ReplacementTuples)?,
]

/**
 * bud.proxy interface
 *
 * @public
 */
export interface proxy {
  (...params: Parameters): Promise<Bud>
}

const fallbackUrl = new URL(`http://0.0.0.0/`)

/**
 * bud.proxy method
 *
 * @public
 */
export const proxy: proxy = async function (this: Bud, input, options) {
  // Bail early in production
  if (!this.isDevelopment) return this

  maybeEnable(this, input)

  if (isFalse(input) || isUndefined(input)) return this

  if (isString(input) || isUrl(input)) assignUrl(this, input)
  if (isNumber(input)) assignPort(this, input)
  if (isFunction(input)) assignOptionsFunction(this, input)
  if (isOptionsObject(input)) assignOptions(this, input)

  if (isArray(options) || isFunction(options))
    assignReplacements(this, options)
  if (isOptionsObject(options)) assignOptions(this, options)

  return this
}

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
 *
 * @public
 */
export const assignPort = (bud: Bud, port: number) => {
  bud.hooks.on(
    `dev.middleware.proxy.options.target`,
    (url = fallbackUrl) => {
      url.port = `${port}`
      return url
    },
  )
}

/**
 * Assign a URL or a string to `proxy.options.target`
 *
 * @param bud
 * @param maybeURL
 *
 * @public
 */
export const assignUrl = (bud: Bud, maybeURL: string | URL) => {
  bud.hooks.on(
    `dev.middleware.proxy.options.target`,
    maybeURL instanceof URL ? maybeURL : new URL(maybeURL),
  )
}

/**
 * Assign a callback function `proxy.options`
 *
 * @param bud - bud instance
 * @param optionsFn - options callback
 */
export const assignOptionsFunction = (
  bud: Bud,
  optionsFn: (options?: Options) => Options,
) => {
  bud.hooks.on(`dev.middleware.proxy.options`, optionsFn)
}

/**
 * Assign replacements
 *
 * @param bud - bud instance
 * @param replacements - replacement tuples
 *
 * @public
 */
export const assignReplacements = (
  bud: Bud,
  replacements: ReplacementTuples | ReplacementCallback,
) => {
  bud.hooks.on(`dev.middleware.proxy.replacements`, replacements)
}

/**
 * Enables proxy middleware
 *
 * @remarks
 * Callback for the `dev.middleware.enabled` hook
 * If proxy middleware is already enabled it will be removed before it is re-added
 *
 * @public
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
 *
 * @public
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
 *
 * @public
 */
export const assignOptions = (
  bud: Bud,
  options: Partial<Options>,
): void => {
  Object.entries(options).map(([key, value]): unknown => {
    if (key === `replacements`)
      return bud.hooks.on(`dev.middleware.proxy.replacements`, value)

    bud.hooks.on(
      `dev.middleware.proxy.options.${
        key as keyof Omit<Options, `replacements`>
      }`,
      value,
    )
  })
}
