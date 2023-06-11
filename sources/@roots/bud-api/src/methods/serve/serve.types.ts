import type Https from 'node:https'
import type Http from 'node:https'

export type ServerOptions = Http.ServerOptions | Https.ServerOptions

/**
 * Options object
 */
export interface Options {
  /**
   * SSL certificate (path)
   */
  cert?: string

  /**
   * Hostname
   */
  host?: string

  /**
   * SSL key (path)
   */
  key?: string

  /**
   * http & https server options
   */
  options?: Http.ServerOptions | Https.ServerOptions

  /**
   * Port
   */
  port?: number

  /**
   * Use ssl connection
   */
  ssl?: boolean

  /**
   * Server URL
   */
  url?: string | URL
}

export type Parameters = [
  Array<number> | number | Options | string | URL,
  Options?,
]
