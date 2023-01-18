import type {HttpProxy} from '@roots/bud-support/http-proxy-middleware'

import type {Bud} from '../../../bud.js'

export interface ProxyOptions extends HttpProxy.Options {
  logger: any
  ejectPlugins: any
  on: any
  pathFilter: any
  plugins: any
}

export interface DevOptions {
  /**
   * Allows to pass custom HTTP headers on each request.
   */
  headers?: Array<{key: string; value: string}>
  /**
   * If false (but not undefined), the server will not respond to requests to the root URL.
   */
  index?: string | boolean
  /**
   * This is Array<string> (mistyped upstream)
   */
  methods?: any
  mimeTypes?: {[key: string]: string}
  publicPath?: string
  writeToDisk?: boolean | ((targetPath: string) => boolean)
}

/**
 * Middleware
 */
export type Middleware<V extends 'options' | 'factory'> = {
  [K in keyof Available as `middleware.${K &
    string}.${V}`]: Available[K][V]
}

/**
 * Key mapped middleware
 */
export interface Available {
  dev?: Definition<DevOptions>
  hot?: Definition<null>
  cookie?: Definition<null>
  proxy?: Definition<ProxyOptions>
}

/**
 * Middleware options keys
 */
export type OptionsKey = `middleware.${keyof Available}.options.${string}`

/**
 * Middleware records
 */
export interface Definition<Opts> {
  factory: (app: Bud) => any
  options: Opts
}
