import type {Bud} from '@roots/bud-framework'
import fs from 'fs-extra'
import getPort from 'get-port'
import Https from 'https'
import Http from 'https'

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

  const current = app.hooks.filter('dev.url')

  if (Array.isArray(input) || typeof input === 'number') {
    current.port = await requestPort(app, current, input)

    return app.hooks.on('dev.url', current)
  }

  if (input instanceof URL || typeof input === 'string') {
    const url = input instanceof URL ? input : new URL(input)

    url.port = await requestPort(
      app,
      url,
      Number(url.port ?? current.port),
    )

    return app.hooks.on('dev.url', url)
  }

  await assignSpec(app, current, input)

  return app
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async (app: Bud, url: URL, spec: Specification) => {
  if (!spec.options) spec.options = {}

  if ([spec.ssl, spec.cert, spec.key].filter(Boolean).length > 0) {
    url.protocol = 'https:'
  }

  if (spec.cert) spec.options.cert = await fs.readFile(spec.cert)

  if (spec.key) spec.options.key = await fs.readFile(spec.key)

  if (spec.port) {
    url.port = await requestPort(app, url, Number(url.port))
  }

  if (spec.host) url.hostname = spec.host

  spec.options && app.hooks.on('dev.options', spec.options)
  app.hooks.on('dev.url', url)
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
  const opts = {
    port: Array.isArray(request) ? request : [Number(request)],
    exclude: Array.isArray(exclude) ? exclude : [exclude],
  }

  url.port = await getPort(opts).then(p => `${p}`)

  if (!opts.port.includes(Number(url.port))) {
    app.warn(
      `None of the requested ports could be resolved.`,
      `\n`,
      `A port was automatically selected: ${url.port}`,
      `\n`,
    )
  }

  return url.port
}
