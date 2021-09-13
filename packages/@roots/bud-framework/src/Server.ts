import {Container} from '@roots/container'
import {WatchOptions} from 'chokidar'
import {
  Application as ExpressApplication,
  Handler,
} from 'express'
import {Server as HttpServer} from 'http'
import * as Proxy from 'http-proxy-middleware'
import * as Webpack from 'webpack'
import * as DevMiddleware from 'webpack-dev-middleware'

import {Service} from './'

/**
 * Server service interface
 *
 * @public @core @container
 */
interface Server extends Service {
  /**
   * Server middleware
   *
   * @public
   */
  middleware: Server.Middleware.Inventory

  /**
   * Assets
   *
   * @public
   */
  assets: string[]

  /**
   * Server instance
   *
   * @public
   */
  application: Server.Application

  /**
   * Server instance
   *
   * @public
   */
  instance: Server.Instance

  /**
   * Server configuration
   *
   * @public
   */
  config: Server.Config

  /**
   * Has files to watch and watch is enabled
   *
   * @public
   */
  isWatchable: boolean

  /**
   * Watcher instance
   *
   * @public
   */
  watcher: {
    [key: string]: any
    close: CallableFunction
    on: CallableFunction
  }

  /**
   * Retrieve an array of watched files.
   *
   * @public
   */
  getWatchedFilesArray(): string[]

  /**
   * Run the server instance
   *
   * @public
   */
  run(): this

  /**
   * Inject client scripts into compilation
   *
   * @public
   */
  inject(): void

  /**
   * Close the server connection
   *
   * @public
   */
  close(): void
}

/**
 * @internal
 */
namespace Server {
  /**
   * Server application
   */
  export type Application = ExpressApplication

  /**
   * Server instance
   */
  export type Instance = HttpServer

  /**
   * Webpack compiler
   */
  export type Compiler = Webpack.Compiler | Webpack.MultiCompiler

  /**
   * Middleware
   */
  export type Middleware = any

  export namespace Middleware {
    export interface Inventory {
      [key: string]: Middleware
    }

    export interface Options {
      config: Config
      compiler: Compiler
    }

    export type Init = (options: Options) => Middleware

    export type Proxy = Proxy.RequestHandler & Handler

    export interface Target {
      host: string
      port: number
    }
  }

  /**
   * Configuration container
   */
  export type Config = Container<Configuration>

  /**
   * Server configuration
   */
  export interface Configuration {
    /**
     * Enabled middlewares
     */
    middleware?: {
      [key: string]: boolean
    }

    /**
     * The development server host
     *
     * @defaultValue localhost
     */
    host?: string

    /**
     * The development server port
     * @defaultValue 3000
     */
    port?: number

    /**
     * Proxy destination
     */
    proxy?: {
      /**
       * Proxy destination host
       *
       * @defaultValue localhost
       */
      host?: string

      /**
       * Proxy destination port
       *
       * @defaultValue 8000
       */
      port?: number
    }

    /**
     * Files which should reload the browser when changed.
     */
    watch?: {
      files: string[]
      options: WatchOptions
    }

    /**
     * Client features
     */
    browser?: {
      log?: boolean
      indicator?: boolean
      overlay?: boolean
    }

    /**
     * The index path for web server, defaults to "index.html".
     */
    index?: DevMiddleware.Options['index']

    /**
     * The path that the middleware is bound to.
     */
    publicPath?: DevMiddleware.Options['publicPath']

    /**
     * Filename to serve as index.
     */
    filename?: string

    /**
     * This property for  passing  custom
     * HTTP headers on each request.
     *
     * @example
     *
     * ```json
     * { "X-Custom-Header": "yes" }
     * ```
     */
    headers?: DevMiddleware.Options['headers']

    /**
     * This property for  passing  the
     * list of HTTP request methods accepted
     *
     *  @example
     *
     * ```json
     * ['GET', 'HEAD']
     * ```
     */
    methods?: DevMiddleware.Options['methods']

    /**
     * This property for  to register custom
     * mime types or extension mappings
     */
    mimeTypes?: DevMiddleware.MimeTypeMap

    /**
     * Escape hatch for Webpack's host check security feature.
     */
    disableHostCheck?: DevMiddleware.Options[]
  }
}

export {Server}
