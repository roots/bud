import type Https from 'node:https'
import type Http from 'node:https'

import type {Bud} from '@roots/bud-framework'
import {highlight} from '@roots/bud-support/highlight'
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

export type Parameters = [
  Specification | URL | string | number | Array<number>,
]

/**
 * bud.serve
 * @public
 */
export interface serve {
  (...input: Parameters): Promise<Bud>
}

/**
 * bud.serve
 * @public
 */
export const serve: serve = async function (this: Bud, input) {
  if (!this.isDevelopment) return this

  if (this.isChild) {
    this.api.logger.warn(
      `server configuration is being moved to the root instance of bud: ${this.label}`,
    )
    this.api.logger.warn(
      `\
to silence this warning move the \`bud.serve\` call from ${
        this.label
      } to ${this.label}:

${highlight(`export default async bud => {
  await bud.make(\`${this.label}\`, async bud => {
    bud.serve(${JSON.stringify(input)})
  })
}`)}

should become:

${highlight(`export default async bud => {
  bud.serve(${JSON.stringify(input)})

  await bud.make(\`${this.label}\`, async bud => {
    // ...config
  })
}`)}`,
    )
  }

  const current = this.hooks.filter(
    `dev.url`,
    new URL(`http://${externalNetworkInterface.ipv4}:3000`),
  )

  this.log(`current dev url:`, current)

  if (Array.isArray(input) || isNumber(input)) {
    this.log(`serve input is an array or number`, input)

    const port = await requestPorts(this, portOrPortsToNumbers(input))
    this.log(`port`, port, `is available. assigning.`)

    current.port = port

    this.log(`dev url set to:`, current)
    this.hooks.on(`dev.url`, current)

    return this
  }

  if (input instanceof URL || isString(input)) {
    this.log(`input is a URL or a string`, input)

    const url = input instanceof URL ? input : new URL(input)
    this.log(`parsed as url:`, url)

    const requestedPort = url.port ?? current.port ?? `3000`

    url.port = await requestPorts(
      this,
      portOrPortsToNumbers(requestedPort),
    )
    this.log(`port`, url.port, `is available. assigning.`)

    this.hooks.on(`dev.url`, url)
    this.log(`dev url set to`, url)

    return this
  }

  await assignSpec.bind(this)(input, current)

  return this
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async function (
  this: Bud,
  spec: Specification,
  url: URL,
) {
  const options: Partial<Specification> = {}

  if (spec.url)
    url = spec.url instanceof URL ? spec.url : new URL(spec.url)

  if ([spec.ssl, spec.cert, spec.key].some(Boolean)) {
    url.protocol = `https:`
  }

  if (spec.host) {
    if (
      [spec.host.startsWith(`http:`), spec.host.startsWith(`https:`)].some(
        Boolean,
      )
    )
      url = new URL(spec.host)
    else url.hostname = spec.host
  }

  if (spec.port)
    url.port = await requestPorts(this, portOrPortsToNumbers(spec.port))

  this.hooks.on(`dev.url`, url)

  if (spec.cert) options.cert = await this.fs.read(spec.cert)
  if (spec.key) options.key = await this.fs.read(spec.key)
  if (!isEmpty(options)) this.hooks.on(`dev.options`, options)
}

/**
 * Get a free port
 *
 * @public
 */
const requestPorts = async (
  app: Bud,
  port: Array<number>,
  exclude: Array<number> = [],
) => {
  const request = {port, exclude}

  const freePort = await getPort(request).then(p => `${p}`)

  if (!request.port?.includes(Number(freePort))) {
    app.warn(`None of the requested ports could be resolved.`)
    app.warn(`A port was automatically selected: ${freePort}`)
  }

  return freePort
}

/**
 * Convert a string, number, or array of strings or numbers
 * to an array of portOrPortsToNumbers
 *
 * @public
 */
const portOrPortsToNumbers = (
  port: number | string | Array<number | string>,
): Array<number> => {
  if (Array.isArray(port)) return port.map(port => Number(port))
  return [Number(port)]
}
