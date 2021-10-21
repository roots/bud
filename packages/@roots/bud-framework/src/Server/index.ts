import {Server as HttpServer} from 'http'

import {Loose} from '../'
import {Configuration} from './Config'
import Interface from './Interface'

/**
 * Application interface
 *
 * @defaultValue express
 *
 * @public
 */
export interface Application extends Loose {
  listen(on: string | number, cb: CallableFunction): Instance
}

/**
 * Server instance
 *
 * @defaultValue express instance
 *
 * @public
 */
export interface Instance extends HttpServer {}

/**
 * Map of middleware which are to be enabled
 *
 * @public
 */
export interface Middleware {
  [key: string]: any
}

/**
 * Proxy target
 *
 * @public
 */
export type Target =
  | string
  | {
      host: string
      port: number
      protocol?: string
      hostname?: string
      socketPath?: string
      key?: string
      passphrase?: string
      pfx?: Buffer | string
      cert?: string
      ca?: string
      ciphers?: string
      secureProtocol?: string
    }

export {Interface}

export {Configuration}
