import type Https from 'node:https'
import type Http from 'node:https'

import type {Bud} from '@roots/bud-framework'
import {isEmpty, isNumber, isString} from '@roots/bud-support/lodash-es'
import {externalNetworkInterface} from '@roots/bud-support/os'
import getPort, {Options as GetPortOptions} from 'get-port'

/**
 * Specification object
 *
 * @public
 */
export interface Specification {
  /**
   * A preferred port or anArray of preferred ports to use.
   * @public
   */
  port?: number | Array<number>

  /**
   * Use ssl connection
   * @public
   */
  ssl?: boolean

  /**
   * Ports that should not be returned.
   * @public
   */
  exclude?: number | Array<number>

  /**
   * Hostname
   * @public
   */
  host?: string

  /**
   * SSL certificate (path)
   * @public
   */
  cert?: string

  /**
   * SSL key (path)
   * @public
   */
  key?: string

  /**
   * http & https server options
   * @public
   */
  options?: Https.ServerOptions | Http.ServerOptions
}

/**
 * Permissable options
 * @public
 */
export type Options = Specification | number | Array<number> | URL | string

/**
 * bud.serve
 * @public
 */
export interface Serve<ReturnType = Promise<Bud>> {
  (options: Specification): ReturnType
}
export interface Serve<ReturnType = Promise<Bud>> {
  (options: URL): ReturnType
}
export interface Serve<ReturnType = Promise<Bud>> {
  (options: string): ReturnType
}
export interface Serve<ReturnType = Promise<Bud>> {
  (options: number): ReturnType
}
export interface Serve<ReturnType = Promise<Bud>> {
  (options: Array<number>): ReturnType
}

/**
 * bud.serve sync facade
 * @public
 */
export type facade = Serve<Bud>

/**
 * bud.serve
 * @public
 */
export const method: Serve = async function (
  input: Options,
): Promise<Bud> {
  const app = this as Bud

  if (!app.isDevelopment) return app

  const current = app.hooks.filter(
    `dev.url`,
    new URL(`http://${externalNetworkInterface.ipv4}:3000`),
  )

  app.log(`current dev url`, current)

  if (Array.isArray(input) || isNumber(input)) {
    app.log(`serve input is an array or number`, input)
    const port = await requestPort(app, current, input)

    app.log(`port`, port, `is available. assigning.`)
    current.port = port

    app.log(`dev url set to`, current)
    app.hooks.on(`dev.url`, current)

    return app
  }

  if (input instanceof URL || isString(input)) {
    app.log(`input is a URL or a string`, input)
    const url = input instanceof URL ? input : new URL(input)

    app.log(`parsed as url:`, url)

    const requestedPort = (url.port ?? current.port ?? `:3000`).replace(
      `:`,
      ``,
    )

    url.port = await requestPort(app, url, Number(requestedPort))
    app.log(`port`, url.port, `is available. assigning.`)

    app.hooks.on(`dev.url`, url)
    app.log(`dev url set to`, url)

    return app
  }

  await assignSpec(app, current, input)

  return app
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async (app: Bud, url: URL, spec: Specification) => {
  const options: Partial<Specification> = {}

  if ([spec.ssl, spec.cert, spec.key].filter(Boolean).length > 0) {
    url.protocol = `https:`
  }

  if (spec.cert) options.cert = await app.fs.read(spec.cert)
  if (spec.key) options.key = await app.fs.read(spec.key)

  if (spec.port) {
    url.port = await requestPort(app, url, Number(spec.port))
  }

  if (spec.host) url.hostname = spec.host

  !isEmpty(options) && app.hooks.on(`dev.options`, options)
  app.hooks.on(`dev.url`, url)
}

/**
 * Process Node URL
 * @public
 */
const requestPort = async (
  app: Bud,
  url: URL,
  request: number | Array<number>,
  exclude: number | Array<number> = [],
) => {
  const opts: GetPortOptions & {
    port: Array<number>
    exclude: Array<number>
  } = {
    port: Array.isArray(request) ? request : [request],
    exclude: Array.isArray(exclude) ? exclude : [exclude],
  }

  url.port = await getPort(opts).then(p => `${p}`)

  if (!opts.port?.includes(Number(url.port))) {
    app.warn(`None of the requested ports could be resolved.`)
    app.warn(`A port was automatically selected: ${url.port}`)
  }

  return url.port
}
