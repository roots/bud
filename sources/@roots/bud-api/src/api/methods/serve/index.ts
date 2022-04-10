import type {Bud} from '@roots/bud-framework'
import {fs, getPort} from '@roots/bud-support'
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
   * OS network interface
   *
   * @remarks
   * The host on which port resolution should be performed. Can be either an IPv4 or IPv6 address.
   * By default, it checks availability on all local addresses defined in [OS network interfaces](https://nodejs.org/api/os.html#os_os_networkinterfaces).
   * If this option is set, it will only check the given host.
   *
   * @public
   */
  interface?: string

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
  options: Options,
): Promise<Bud> {
  const app = this as Bud

  if (!app.isDevelopment) return app

  if (Array.isArray(options) || typeof options === 'number') {
    const port = await processPort(
      app,
      options,
      [],
    )
    app.hooks.on('dev.port', port)
    return app
  }

  if (options instanceof URL || typeof options === 'string') {
    assignURL(app, options)
  } else {
    await assignSpec(app, options)
  }

  const requestPort = (options as Specification)?.port ?? app.hooks.filter('dev.port') ?? 3000
  const requestExclude = (options as Specification)?.exclude ?? []
  const port = await processPort(
    app,
    requestPort,
    requestExclude
  )

  app.hooks.on('dev.port', port)

  return app
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async (app: Bud, spec: Specification) => {
  const isSSL =
    [
      spec.ssl === true,
      spec.cert,
      spec.key,
      spec.options?.cert,
      spec.options?.key,
      spec.host?.startsWith('https'),
    ].filter(Boolean).length > 0

  if (isSSL) {
    if (!spec.options) spec.options = {}

    if (!spec.options.cert && spec.cert)
      spec.options.cert = await fs.readFile(spec.cert)

    if (!spec.options.key && spec.key)
      spec.options.key = await fs.readFile(spec.key)

    app.hooks.on('dev.ssl', true)
  }

  spec.options && app.hooks.on('dev.options', spec.options)
  spec.interface && app.hooks.on('dev.interface', spec.interface)
  spec.host && assignHostname(app, spec.host)
}

/**
 * Process Node URL
 * @public
 */
const assignURL = async (app: Bud, url: URL | string) => {
  url = url instanceof URL ? url : new URL(url)

  if (url.port) {
    const port = await processPort(app, Number(url.port), [])
    url.port = `${port}`
    app.hooks.on('dev.port', port)
  }

  app.hooks.on('dev.hostname', url.hostname)
  app.hooks.on('dev.ssl', url.protocol === 'https:')
}

/**
 * Assign hostname from string
 *
 * @param app - Bud
 * @param hostname - string hostname
 * @public
 */
const assignHostname = (app: Bud, hostname: string) => {
  app.hooks.on(
    'dev.hostname',
    hostname.replace('http://', '//').replace('https://', '//'),
  )
}

const processPort = async (app: Bud, port: number | Array<number>, exclude: number | Array<number>) => {
  const portRequest = Array.isArray(port) ? port : [port]
  const excludeRequest = Array.isArray(exclude)
    ? exclude
    : [exclude]

  port = await getPort({
    port: portRequest,
    exclude: excludeRequest,
  })

  if (!portRequest.includes(port)) {
    app.warn(
      `\n`,
      `None of the requested ports could be resolved.`,
      `A port was automatically selected: ${port}`,
      `\n`,
    )
  }

  return port
}
