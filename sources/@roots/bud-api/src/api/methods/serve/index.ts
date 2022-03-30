import type {Framework} from '@roots/bud-framework'
import {fs, lodash} from '@roots/bud-support'
import Https from 'https'
import Http from 'https'

const {isUndefined} = lodash

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
export interface Serve<ReturnType = Promise<Framework>> {
  (options: Specification): ReturnType
}
export interface Serve<ReturnType = Promise<Framework>> {
  (options: URL): ReturnType
}
export interface Serve<ReturnType = Promise<Framework>> {
  (options: string): ReturnType
}
export interface Serve<ReturnType = Promise<Framework>> {
  (options: number): ReturnType
}
export interface Serve<ReturnType = Promise<Framework>> {
  (options: Array<number>): ReturnType
}

/**
 * bud.serve sync facade
 * @public
 */
export type facade = Serve<Framework>

/**
 * bud.serve
 * @public
 */
export const method: Serve = async function (
  options: Options,
): Promise<Framework> {
  const app = this as Framework

  if (!app.isDevelopment) return app

  if (Array.isArray(options) || typeof options === 'number') {
    assignNumberArr(app, 'dev.port', options)
    return app
  }

  if (options instanceof URL || typeof options === 'string') {
    assignURL(app, options)
    return app
  }

  await assignSpec(app, options)
  return app
}

/**
 * Process specification object
 * @public
 */
const assignSpec = async (app: Framework, spec: Specification) => {
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

  if (!isUndefined(spec.ssl)) app.hooks.on('dev.ssl', spec.ssl)

  spec.options && app.hooks.on('dev.options', spec.options)
  spec.interface && app.hooks.on('dev.interface', spec.interface)

  spec.port && assignNumberArr(app, 'dev.port', spec.port)
  spec.exclude && assignNumberArr(app, 'dev.exclude', spec.exclude)
  spec.host && assignHostname(app, spec.host)
}

/**
 * Process Node URL
 * @public
 */
const assignURL = (app: Framework, url: URL | string) => {
  url = url instanceof URL ? url : new URL(url)

  app.hooks.on('dev.hostname', url.hostname)
  url.port && app.hooks.on('dev.port', [Number(url.port)])
  app.hooks.on('dev.ssl', url.protocol === 'https:')
}

/**
 * Assign nummber or array of numbers to either dev.exclude or dev.port
 *
 * @remarks
 * normalized to array
 *
 * @public
 */
const assignNumberArr = (
  app: Framework,
  key: 'dev.exclude' | 'dev.port',
  maybeNumber: Array<number> | number,
) => {
  app.hooks.on(
    key,
    Array.isArray(maybeNumber) ? maybeNumber : [maybeNumber],
  )
}

/**
 * Assign hostname from string
 *
 * @param app - Framework
 * @param hostname - string hostname
 * @public
 */
const assignHostname = (app: Framework, hostname: string) => {
  app.hooks.on(
    'dev.hostname',
    hostname.replace('http:', '').replace('https:', '').replace('/', ''),
  )
}
