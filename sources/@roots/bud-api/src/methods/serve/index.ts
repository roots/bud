import type Https from 'node:https'
import type Http from 'node:https'

import type {Bud} from '@roots/bud-framework'
import {isEmpty, isNumber, isString} from '@roots/bud-support/lodash-es'
import {externalNetworkInterface} from '@roots/bud-support/os'
import getPort from 'get-port'

/**
 * Specification object
 *
 * @public
 */
export interface Specification {
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
   * Server URL
   * @public
   */
  url?: string | URL

  /**
   * Hostname
   * @public
   */
  host?: string

  /**
   * port
   * @public
   */
  port?: number | Array<number>

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
  input: Specification | URL | string | number | Array<number>,
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
    const port = await requestPorts(
      app,
      current,
      portOrPortsToNumbers(input),
    )

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

    const requestedPort = url.port ?? current.port ?? `3000`

    url.port = await requestPorts(
      app,
      url,
      portOrPortsToNumbers(requestedPort),
    )
    app.log(`port`, url.port, `is available. assigning.`)

    app.hooks.on(`dev.url`, url)
    app.log(`dev url set to`, url)

    return app
  }

  await assignSpec.bind(app)(input, current)

  return app
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async function (spec: Specification, url: URL) {
  const options: Partial<Specification> = {}

  if (spec.url)
    url = spec.url instanceof URL ? spec.url : new URL(spec.url)

  if ([spec.ssl, spec.cert, spec.key].some(Boolean)) {
    url.protocol = `https:`
  }

  if (spec.host) url.hostname = spec.host
  if (spec.port)
    url.port = await requestPorts(
      this,
      url,
      portOrPortsToNumbers(spec.port),
    )

  this.hooks.on(`dev.url`, url)

  if (spec.cert) options.cert = await this.fs.read(spec.cert)
  if (spec.key) options.key = await this.fs.read(spec.key)
  if (!isEmpty(options)) this.hooks.on(`dev.options`, options)
}

/**
 * Process Node URL
 * @public
 */
const requestPorts = async (
  app: Bud,
  url: URL,
  port: Array<number>,
  exclude: Array<number> = [],
) => {
  const request = {port, exclude}

  url.port = await getPort(request).then(p => `${p}`)

  if (!request.port?.includes(Number(url.port))) {
    app.warn(`None of the requested ports could be resolved.`)
    app.warn(`A port was automatically selected: ${url.port}`)
  }

  return url.port
}

const portOrPortsToNumbers = (
  port: number | string | Array<number | string>,
): Array<number> => {
  if (Array.isArray(port)) return port.map(port => Number(port))
  return [Number(port)]
}
