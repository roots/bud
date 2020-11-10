import * as middleware from '../middleware'
import * as config from './config'
import {injectClient} from './injectClient'
import {lodash as _} from '@roots/bud-support'
import express, {Handler, Express} from 'express'
import type Webpack from 'webpack'
import type {Bud} from '@roots/bud-typings'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import {Options as ProxyOptions} from 'http-proxy-middleware'

class Server implements Server.Interface {
  public bud: Bud

  public instance: Server.Instance = express()

  public config: Server.Config = config

  public constructor(bud: Bud) {
    this.setConfig = this.setConfig.bind(this)
    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.bud = bud
    this.instance = express()
    this.instance.set('x-powered-by', false)
  }

  public getInstance(): Server.Instance {
    return this.instance
  }

  public getConfig(): Server.Config {
    return this.config
  }

  public getConfigItem(key: string): Partial<Server.Config> {
    return this.config[key]
  }

  public setConfig(config: Server.Config): this {
    this.config = config

    return this
  }

  public mergeConfigItem(
    key: string,
    value: Partial<Server.Config>,
  ): void {
    this.config[key] = {
      ...this.getConfigItem(key),
      ...value,
    }
  }

  public addMiddleware(middleware: Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.get(),
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.bud.build.config.mutate(
      'entry',
      (entry: Webpack.Entry) => injectClient(entry),
    )
    this.bud.compiler.compile()

    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.get(),
        config: this.config,
      }),
    )

    this.instance.use(middleware.hot(this.bud.compiler.get()))

    this.bud.features.enabled('proxy') &&
      this.instance.use(middleware.proxy(this.config))

    this.listen()

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(middleware.proxy(this.config))

    return this
  }

  public listen(): void {
    this.instance.listen(
      this.config?.port ?? 3000,
      this.config?.host ?? 'localhost',
    )
  }
}

/**
 * Framework.Server
 *
 * Express instance configured with WDS middleware
 * for local development.
 */
declare namespace Server {
  interface Interface {
    /**
     * Express instance.
     */
    instance: Express.Application

    /**
     * Server configuration.
     */
    config: Server.Config

    getInstance(): Server.Instance

    getConfig(): Server.Config

    getConfigItem(key: string): Partial<Server.Config>

    setConfig(config: Server.Config): this

    mergeConfigItem: (
      key: string,
      value: Partial<Server.Config>,
    ) => void

    addMiddleware: (middleware: Handler) => this

    addDevMiddleware: () => this

    addHotMiddleware: () => this

    addProxyMiddleware: () => this

    listen: () => void
  }

  /**
   * Express application.
   */
  export type Instance = Express.Application

  /**
   * Server configuration
   */
  export interface Config {
    /**
     * The development server host
     * @example example.test
     */
    host?: string

    /**
     * The development server port
     * @example 3000
     */
    port?: number

    /**
     * Proxy destination
     */
    proxy?: {
      /**
       * Proxy destination host
       * @example localhost
       */
      host?: string

      /**
       * Proxy destination port
       * @example 3000
       */
      port?: number
    }

    /**
     * The index path for web server, defaults to "index.html".
     */
    index?: WebpackDevMiddleware.Options['index']

    /**
     * Should hot middleware be used?
     */
    hot?: boolean

    /**
     * The path that the middleware is bound to.
     */
    publicPath?: WebpackDevMiddleware.Options['publicPath']

    /**
     * Proxy setting: object passed to  https.createServer
     */
    ssl?: ProxyOptions['ssl']

    /**
     * Proxy setting: set to true to verify SSL certificates
     */
    secure?: ProxyOptions['secure']

    /**
     * Proxy setting: proxy websockets.
     */
    ws?: ProxyOptions['ws']

    /**
     * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
     */
    autoRewrite?: ProxyOptions['autoRewrite']

    /**
     * Proxy setting: change the origin of the host header to the target URL
     */
    changeOrigin?: ProxyOptions['changeOrigin']

    /**
     * Escape hatch for Webpack's host check security feature.
     */
    disableHostCheck?: WebpackDevMiddleware.Options[]

    /**
     * Proxy setting: specify whether you want to follow redirects
     */
    followRedirects?: ProxyOptions['followRedirects']

    /**
     * Filename to serve as index.
     */
    filename?: WebpackDevMiddleware.Options['filename']

    /**
     * This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
     */
    headers?: WebpackDevMiddleware.Options['headers']

    /**
     * This property allows a user to pass the list of HTTP request methods accepted by the server.
     * @default [ 'GET', 'HEAD' ]
     */
    methods?: WebpackDevMiddleware.Options['methods']

    /**
     * This property allows a user to register custom mime types or extension mappings
     * @default null
     */
    mimeTypes?:
      | WebpackDevMiddleware.MimeTypeMap
      | WebpackDevMiddleware.OverrideMimeTypeMap
      | null

    /**
     * Instructs the module to enable or disable the server-side rendering mode
     */
    serverSideRender?: WebpackDevMiddleware.Options['serverSideRender']

    /**
     * Specify polling, etc.
     */
    watchOptions?: Framework.Webpack.Options.WatchOptions

    /**
     * If true, the option will instruct the module to write files to
     * the configured location on disk as specified in your webpack config file
     * This option also accepts a Function value, which can be used to
     * filter which files are written to disk
     */
    writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
  }

  /**
   * Inject webpack entrypoints with client HMR handling script(s).
   */
  export type InjectClient = (
    entrypoints: Webpack.Entry,
  ) => Webpack.Entry
}

export {Server}
