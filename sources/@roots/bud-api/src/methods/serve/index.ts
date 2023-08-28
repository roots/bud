import type {Bud, Server} from '@roots/bud-framework'

import {
  portOrPortsToNumbers,
  requestPorts,
} from '@roots/bud-support/get-port'
import isArray from '@roots/bud-support/lodash/isArray'
import isEqual from '@roots/bud-support/lodash/isEqual'
import isNumber from '@roots/bud-support/lodash/isNumber'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Options, Parameters, ServerOptions} from './serve.types.js'

/**
 * bud.serve
 */
export interface serve {
  (...parameters: Parameters): Promise<Bud>
}
export type {Options, Parameters, ServerOptions}

/**
 * bud.serve
 */
export const serve: serve = async function (this: Bud, input, options) {
  const bud = this.root
  if (!bud.isDevelopment) return bud
  if (!bud?.server) return bud

  let normalizedUrl = input instanceof URL ? input : bud.server.url
  let normalizedOptions = options ?? bud.hooks.filter(`dev.options`, {})

  /**
   * If input is a string, convert it to a {@link URL}
   */
  if (isString(input)) normalizedUrl = new URL(input)

  /**
   * If input is a number or array of numbers,
   * try to resolve the requested port(s) and
   * assign to the {@link URL}
   */
  if (isArray(input) || isNumber(input)) {
    normalizedUrl.port = await requestPorts(
      portOrPortsToNumbers(bud.context.port ?? input),
    )
  }

  /**
   * If input is an object, convert it to a {@link URL}
   * and {@link ServerOptions}
   */
  if (
    !(input instanceof URL) &&
    !isArray(input) &&
    typeof input === `object`
  ) {
    normalizedUrl = await makeURLFromObject(bud, input, normalizedUrl)
    normalizedOptions = await makeHttpOptions(
      bud,
      input,
      normalizedOptions,
    )
  }

  bud.hooks.on(`dev.url`, normalizedUrl)
  bud.hooks.on(`dev.options`, normalizedOptions)

  return bud
}

/**
 * Process specification object
 */
const makeURLFromObject = async function (
  bud: Bud,
  options: Options,
  url: Server[`url`],
): Promise<Server[`url`]> {
  if (options.url) {
    return options.url instanceof URL ? options.url : new URL(options.url)
  }

  if (options.host) url.hostname = options.host
  if (options.port)
    url.port = await requestPorts(portOrPortsToNumbers(options.port))

  if (
    url.protocol !== `https:` &&
    [
      !isUndefined(options.ssl),
      !isUndefined(options.cert),
      !isUndefined(options.key),
      !isUndefined(options?.options?.cert),
      !isUndefined(options?.options?.key),
      isEqual(url.port, 443),
    ].some(Boolean)
  )
    url.protocol = `https:`

  return url
}

/**
 * Make ServerOptions from object
 *
 * @param bud - {@link Bud}
 * @param input - {@link Options}
 * @param resolvedOptions - {@link Options}
 * @returns promise - {@link ServerOptions}
 */
const makeHttpOptions = async function (
  bud: Bud,
  input: Options,
  resolvedOptions: ServerOptions = {},
): Promise<ServerOptions> {
  if (input.options) resolvedOptions = input.options
  if (input.cert) resolvedOptions.cert = await bud.fs.read(input.cert)
  if (input.key) resolvedOptions.key = await bud.fs.read(input.key)

  return resolvedOptions
}
