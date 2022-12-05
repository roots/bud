import type Https from 'node:https'
import type Http from 'node:https'

export type ServerOptions = Https.ServerOptions | Http.ServerOptions

/**
 * Options object
 *
 * @public
 */
export interface Options {
  /**
   * Use ssl connection
   *
   * @public
   */
  ssl?: boolean

  /**
   * Ports that should not be returned
   *
   * @public
   */
  exclude?: number | Array<number>

  /**
   * Server URL
   *
   * @public
   */
  url?: string | URL

  /**
   * Hostname
   *
   * @public
   */
  host?: string

  /**
   * Port
   *
   * @public
   */
  port?: number

  /**
   * SSL certificate (path)
   *
   * @public
   */
  cert?: string

  /**
   * SSL key (path)
   *
   * @public
   */
  key?: string

  /**
   * http & https server options
   *
   * @public
   */
  options?: Https.ServerOptions | Http.ServerOptions
}

export type Parameters = [
  Options | URL | string | number | Array<number>,
  Options?,
]
