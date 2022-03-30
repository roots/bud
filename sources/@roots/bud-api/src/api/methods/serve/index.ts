import type {Framework} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

interface Specification {
  /**
   * A preferred port or an iterable of preferred ports to use.
   */
  port: number | Iterable<number>

  /**
   * Use ssl connection
   */
  ssl?: boolean

  /**
   * Ports that should not be returned.
   */
  exclude?: Iterable<number>

  /**
   * The host on which port resolution should be performed. Can be either an IPv4 or IPv6 address.
   * By default, it checks availability on all local addresses defined in [OS network interfaces](https://nodejs.org/api/os.html#os_os_networkinterfaces). If this option is set, it will only check the given host.
   */
  host?: string

  /**
   * SSL certificate (path)
   */
  cert?: string

  /**
   * SSL key (path)
   */
  key?: string

  /**
   * Connection options or a callback handling the merging options onto
   * ones which have already been set
   */
  options?:
    | Connection.Options
    | ((options: Connection.Options) => Connection.Options)
}

export interface method {
  (
    url?: URL | string,
    options?:
      | Connection.Options
      | ((options: Connection.Options) => Connection.Options),
  ): Framework
  (specification: Specification): Framework
  (port: number): Framework
  (url: string | URL): Framework
}

export type facade = method

const processOptions = (
  app: Framework,
  options:
    | Connection.Options
    | ((options: Connection.Options) => Connection.Options),
) => {
  if (options) {
    const unwrapped = isFunction(options)
      ? options(app.hooks.filter('dev.options') ?? {})
      : options

    app.hooks.on('dev.options', value =>
      value ? {...value, ...unwrapped} : unwrapped,
    )

    unwrapped.cert && app.hooks.on('dev.cert', unwrapped.cert as string)
    unwrapped.key && app.hooks.on('dev.key', unwrapped.key as string)
  }
}

const processURL = (app: Framework, url: URL) => {
  app.hooks.on('dev.host', url.hostname)
  url.port && app.hooks.on('dev.port', [Number(url.port)])
  app.hooks.on('dev.ssl', url.protocol === 'https:')
}

export const method: method = function (...input) {
  const app = this as Framework
  if (!app.isDevelopment) return app

  if (input.length > 1) {
    const [url, options] = input

    if (url instanceof URL) {
      processURL(app, url)
    }

    if (typeof url === 'string') {
      processURL(app, new URL(url))
    }

    if (typeof url === 'number') {
      app.hooks.on('dev.port', [url])
    }

    if (Array.isArray(url)) {
      app.hooks.on('dev.port', url)
      return app
    }

    processOptions(app, options)

    return app
  }

  const specification: Specification = input.pop()

  if (Array.isArray(specification)) {
    app.hooks.on('dev.port', specification)
    return app
  }

  if (typeof specification === 'string') {
    processURL(app, new URL(specification))
    return app
  }

  if (typeof specification === 'number') {
    app.hooks.on('dev.port', [specification])
    return app
  }

  specification.host && app.hooks.on('dev.host', specification.host)
  specification.ssl && app.hooks.on('dev.ssl', specification.ssl)
  specification.cert && app.hooks.on('dev.cert', specification.cert)
  specification.key && app.hooks.on('dev.key', specification.key)
  specification.port &&
    app.hooks.on(
      'dev.port',
      Array.isArray(specification.port)
        ? specification.port
        : [specification.port],
    )
  specification.exclude &&
    app.hooks.on(
      'dev.exclude',
      Array.isArray(specification.exclude)
        ? specification.exclude
        : [specification.exclude],
    )
  specification.options && processOptions(app, specification.options)

  return app
}
