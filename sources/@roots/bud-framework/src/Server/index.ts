import {Server as HttpServer} from 'http'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Options as WebpackDevMiddlewareOptions} from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import {Framework, Loose, Service} from '../'
import {DevConfiguration} from './Config'

/**
 * Server interface
 *
 * @public
 */
export interface Server extends Service {
  /**
   * Server application
   *
   * @public
   */
  application: Application

  /**
   * Server instance
   *
   * @public
   */
  instance: Instance

  /**
   * Server middleware
   *
   * @public
   */
  middleware: MiddlewareMap

  /**
   * Server port
   */
  port: string

  /**
   * Watcher instance
   *
   * @public
   */
  watcher: {
    getWatchedFiles(): Promise<Array<string>>
    watch(): Promise<void>
  }

  /**
   * Run server
   *
   * @public
   */
  run: () => Promise<Server>
}

export interface MiddlewareRecord<Opts> {
  factory: (app: Framework) => any
  options: Opts
}

export interface MiddlewareMap {
  dev?: MiddlewareRecord<WebpackDevMiddlewareOptions<any, any>>
  hot?: MiddlewareRecord<WebpackHotMiddleware.MiddlewareOptions>
  proxy?: MiddlewareRecord<ProxyOptions>
}

export type Middlewares<V extends 'options' | 'factory'> = {
  [K in keyof MiddlewareMap as `middleware.${K &
    string}.${V}`]: MiddlewareMap[K][V]
}

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
 * Proxy Options
 *
 * @public
 */
export {ProxyOptions}

export {DevConfiguration}
