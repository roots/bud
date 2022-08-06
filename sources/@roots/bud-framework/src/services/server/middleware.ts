import type HttpProxy from 'http-proxy-middleware'

import type {Bud} from '../../index.js'

export interface ProxyOptions extends HttpProxy.Options {}

export interface DevOptions {
  mimeTypes?: {
    [key: string]: string
  }
  writeToDisk?: boolean | ((targetPath: string) => boolean)
  methods?: string
  headers?: Record<string, string>
  publicPath?: string
  index?: string | boolean
}

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
  dev?: Definition<DevOptions>
  hot?: Definition<null>
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
