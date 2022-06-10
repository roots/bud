import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Options as WebpackDevMiddlewareOptions} from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import {Bud} from '../../index.js'

export {ProxyOptions}

export {WebpackDevMiddlewareOptions}

/**
 * Middleware
 *
 * @public
 */
export type Middleware<V extends 'options' | 'factory'> = {
  [K in keyof Available as `middleware.${K &
    string}.${V}`]: Available[K][V]
}

/**
 * Key mapped middleware
 *
 * @public
 */
export interface Available {
  dev?: Definition<WebpackDevMiddlewareOptions<any, any>>
  hot?: Definition<WebpackHotMiddleware.MiddlewareOptions>
  cookie?: Definition<null>
  proxy?: Definition<ProxyOptions>
}

/**
 * Middleware options keys
 *
 * @public
 */
export type OptionsKey = `middleware.${keyof Available}.options.${string}`

/**
 * Middleware records
 *
 * @public
 */
export interface Definition<Opts> {
  factory: (app: Bud) => any
  options: Opts
}
