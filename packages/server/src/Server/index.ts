import dev from '../middleware/dev'
import hot from '../middleware/hot'
import proxy from '../middleware/proxy'
import express, {Handler} from 'express'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Compiler, Options as WebpackOptions} from 'webpack'
import {
  Application as Express,
  Handler as ExpressHandler,
} from 'express'

class Server implements Server.Interface {
  public instance: Server.Interface['instance']
  public config: Server.Interface['config']
  public compiler: Server.Interface['compiler']

  public constructor(
    compiler?: Server.Interface['compiler'],
    config?: Server.Interface['config'],
  ) {
    this.instance = express()
    this.instance.set('x-powered-by', false)

    if (compiler) {
      this.compiler = compiler
    }

    if (config) {
      this.config = config
    }

    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.setConfig = this.setConfig.bind(this)
    this.setCompiler = this.setCompiler.bind(this)
    this.setServer = this.setServer.bind(this)
  }

  public getServer(): this['instance'] {
    return this.instance
  }

  public setServer(instance: Server.Interface): this {
    this.instance = instance

    return this
  }

  public getConfig(): this['config'] {
    return this.config
  }

  public setConfig(config: Server.Interface['config']): this {
    this.config = config

    return this
  }

  public getCompiler(): this['compiler'] {
    return this.compiler
  }

  public setCompiler(
    compiler: Server.Interface['compiler'],
  ): this {
    this.compiler = compiler

    return this
  }

  public addMiddleware(middleware: Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.addMiddleware(
      dev({
        compiler: this.compiler,
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.addMiddleware(hot(this.compiler))

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(proxy(this.config))

    return this
  }

  public listen(): void {
    this.instance.listen(
      this.config?.port ?? 3000,
      this.config?.host ?? 'localhost',
    )
  }
}

declare namespace Server {
  /**
   * Bud development server.
   */
  export interface Interface {
    /**
     * Express instance.
     */
    instance: Express

    /**
     * Get Express instance.
     */
    getServer: () => Express

    /**
     * Set Express instance.
     */
    setServer: (server: Express) => this

    /**
     * Server configuration.
     */
    config: Config

    /**
     * Get Express instance.
     */
    getConfig: () => Config

    /**
     * Set Express instance.
     */
    setConfig: (config: Config) => this

    /**
     * Webpack compiler.
     */
    compiler: Compiler

    /**
     * Get compiler.
     */
    getCompiler: () => Compiler

    /**
     * Set compiler.
     */
    setCompiler: (compiler: Compiler) => this

    /**
     * Add middleware to Express instance.
     */
    addMiddleware: (middleware: ExpressHandler) => this

    /**
     * Add dev middleware
     */
    addDevMiddleware: () => this

    /**
     * Add hot middleware
     */
    addHotMiddleware: () => this

    /**
     * Add dev middleware
     */
    addProxyMiddleware: () => this

    /**
     * Binds and listens for connections on the host and port specified in the config.
     */
    listen: () => void
  }

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
     * Proxy origin
     */
    from?: {
      /**
       * Proxy origin host
       * @example example.test
       */
      host?: string

      /**
       * Proxy origin port
       * @example 8080
       */
      port?: number
    }

    /**
     * Proxy destination
     */
    to?: {
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
     * Should hotOnly middleware be used?
     */
    hotOnly?: boolean

    /**
     * The public path that the middleware is bound to.
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
     * This option instructs the module to operate in 'lazy' mode,
     * meaning that it won't recompile when files change, but rather on each request.
     */
    lazy?: WebpackDevMiddleware.Options['lazy']

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
    watchOptions?: WebpackOptions.WatchOptions

    /**
     * If true, the option will instruct the module to write files to the configured location on disk as specified in your webpack config file
     * This option also accepts a Function value, which can be used to filter which files are written to disk
     */
    writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
  }

  export interface Options {
    /**
     * Server configuration.
     */
    config: Config

    /**
     * Webpack compiler.
     */
    compiler: Compiler
  }
}

export default Server
