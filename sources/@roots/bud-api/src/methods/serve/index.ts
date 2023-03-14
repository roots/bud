import type {Bud} from '@roots/bud-framework'
import getPort from '@roots/bud-support/get-port'
import isArray from '@roots/bud-support/lodash/isArray'
import isEqual from '@roots/bud-support/lodash/isEqual'
import isNumber from '@roots/bud-support/lodash/isNumber'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import {checkChildInstanceError} from './childError.js'
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
  if (!this.isDevelopment) return this

  checkChildInstanceError(this, input)

  let resolvedUrl = input instanceof URL ? input : this.server.url
  let resolvedOptions = options ?? this.hooks.filter(`dev.options`, {})

  if (isString(input)) resolvedUrl = new URL(input)

  if (isArray(input) || isNumber(input)) {
    resolvedUrl.port = await requestPorts(
      this,
      portOrPortsToNumbers(input),
    )
  }

  if (
    !(input instanceof URL) &&
    !isArray(input) &&
    typeof input === `object`
  ) {
    resolvedUrl = await makeURLFromObject(this, input, resolvedUrl)
    resolvedOptions = await makeHttpOptions(this, input, resolvedOptions)
  }

  this.hooks.on(`dev.url`, resolvedUrl)
  this.hooks.on(`dev.options`, resolvedOptions)

  return this
}

/**
 * Process specification object
 */
const makeURLFromObject = async function (
  bud: Bud,
  options: Options,
  url: URL,
): Promise<URL> {
  if (options.url) {
    return options.url instanceof URL ? options.url : new URL(options.url)
  }

  if (options.host) url.hostname = options.host
  if (options.port) url.port = `${options.port}`
  if (
    [
      !isUndefined(options.ssl),
      !isUndefined(options.cert),
      !isUndefined(options.key),
      !isUndefined(options?.options?.cert),
      !isUndefined(options?.options?.key),
      isEqual(options.port, 443),
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

/**
 * Get a free port
 */
const requestPorts = async (
  bud: Bud,
  include: Array<number>,
  exclude: Array<number> = [],
) => {
  const request = {port: include, exclude}

  const port = await getPort(request)

  if (!request.port?.includes(port)) {
    bud.warn(`None of the requested ports could be resolved.`)
    bud.warn(`A port was automatically selected: ${port}`)
  }

  return `${port}`
}

/**
 * Convert a string, number, or array of strings/numbers
 * to an array of numbers
 */
const portOrPortsToNumbers = (
  port: number | string | Array<number | string>,
): Array<number> =>
  Array.isArray(port)
    ? port.map(port => (isString(port) ? parseInt(port) : port))
    : [isString(port) ? parseInt(port) : port]
