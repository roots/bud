import type Https from 'node:https'
import type Http from 'node:https'

export type ServerOptions = Https.ServerOptions | Http.ServerOptions

/**
 * Options object
 */
export interface Options {
  /**
   * Use ssl connection
   */
  ssl?: boolean

  /**
   * Port
   */
  port?: number

  /**
   * SSL certificate (path)
   */
  cert?: string

  /**
   * SSL key (path)
   */
  key?: string

  /**
   * Server URL
   */
  url?: string | URL

  /**
   * Hostname
   */
  host?: string

  /**
   * http & https server options
   */
  options?: Https.ServerOptions | Http.ServerOptions
}

export type Parameters = [
  Options | URL | string | number | Array<number>,
  Options?,
]
