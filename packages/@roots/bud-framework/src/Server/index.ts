import {Server as HttpServer} from 'http'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Server as HttpsServer} from 'https'

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
  listen(
    on: string | number,
    cb: CallableFunction,
  ): HttpInstance | HttpsInstance
}

/**
 * Server instance
 *
 * @defaultValue express instance
 *
 * @public
 */
export interface HttpInstance extends HttpServer {}

/**
 * Server instance
 *
 * @defaultValue express instance
 *
 * @public
 */
export interface HttpsInstance extends HttpsServer {}

/**
 * Map of middleware which are to be enabled
 *
 * @public
 */
export interface Middleware {
  [key: string]: any
}

/**
 * Proxy Options
 *
 * @public
 */
export {ProxyOptions}

export {Interface}

export {Configuration}
