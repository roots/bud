import type {Framework} from '@roots/bud-framework'
import {chokidar} from '@roots/bud-support'

/**
 * Input object
 *
 * @public
 */
export interface UserRecordInput {
  /**
   * URL object or url string
   *
   * @defaultValue URL('http://localhost:3000')
   */
  url?: URL | string
  /**
   * Hostname
   *
   * @defaultValue `localhost`
   */
  hostname?: string

  /**
   * Protocol
   *
   * @defaultValue `http`
   */
  protocol?: 'http:' | 'https:' | 'http' | 'https'
  /**
   * Port
   *
   * @defaultValue 3000
   */
  port?: number
  /**
   * Path to ssl certificate
   *
   * @defaultValue undefined
   */
  cert?: string
  /**
   * Path to ssl key
   *
   * @defaultValue undefined
   */
  key?: string
  /**
   * Client options
   */
  client?: {
    /**
     * Scripts to be injected before application scripts
     */
    scripts: Set<(app: Framework) => string>
  }

  /**
   * FSWatcher
   */
  watch?: {
    /**
     * Watched files
     */
    files: Array<string>
    /**
     * Watcher options
     */
    options?: chokidar.WatchOptions
  }
}

export type UserInput = URL | string | number | UserRecordInput

export interface method {
  (input?: UserInput): Framework
}

export type facade = method

export const method: method = function (input) {
  const ctx = this as Framework

  if (!ctx.isDevelopment) return ctx

  if (typeof input === 'number') {
    return ctx.hooks.on('dev.url', url => {
      url.port = `${input}`
      return url
    })
  }

  if (typeof input === 'string') {
    return ctx.hooks.on('dev.url', new URL(input))
  }

  if (input instanceof URL) {
    return ctx.hooks.on('dev.url', input)
  }

  input.url &&
    ctx.hooks.on(
      'dev.url',
      input.url instanceof URL ? input.url : new URL(input.url),
    )

  input.hostname &&
    ctx.hooks.on('dev.url', url => {
      url.host = input.hostname
      return url
    })

  input.port &&
    ctx.hooks.on('dev.url', url => {
      url.port = `${input.port}`
      return url
    })

  input.protocol &&
    ctx.hooks.on('dev.url', url => {
      url.protocol = input.protocol.endsWith(':')
        ? input.protocol
        : input.protocol.concat(':')
      return url
    })

  input.key && ctx.hooks.on('dev.ssl.key', input.key)
  input.cert && ctx.hooks.on('dev.ssl.cert', input.cert)

  ctx.hooks.filter('dev.ssl.key') &&
    ctx.hooks.filter('dev.ssl.cert') &&
    ctx.hooks.on('dev.url', url => {
      url.protocol = 'https:'
      return url
    })

  input.watch?.files &&
    ctx.hooks.on('dev.watch.files', files => {
      input.watch.files.forEach(file => files.add(file))
      return files
    })

  input.watch?.options &&
    ctx.hooks.on('dev.watch.options', options => ({
      ...options,
      ...input.watch.options,
    }))

  input.client?.scripts &&
    ctx.hooks.on('dev.client.scripts', scripts => {
      input.client.scripts.forEach(script => scripts.add(script))
      return scripts
    })

  return ctx
}
