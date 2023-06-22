import type {Bud} from '@roots/bud-framework'
import type {HttpProxy} from '@roots/bud-support/http-proxy-middleware'

export interface ProxyOptions extends HttpProxy.Options {
  ejectPlugins: any
  logger: any
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
  index?: boolean | string
  /**
   * This is Array<string> (mistyped upstream)
   */
  methods?: any
  mimeTypes?: {[key: string]: string}
  publicPath?: string
  writeToDisk?: ((targetPath: string) => boolean) | boolean
}

/**
 * Middleware
 */
export type Middleware<V extends 'factory' | 'options'> = {
  [K in keyof Available as `middleware.${K &
    string}.${V}`]: Available[K][V]
}

/**
 * Key mapped middleware
 */
export interface Available {
  cookie?: Definition<null>
  dev?: Definition<DevOptions>
  hot?: Definition<null>
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
