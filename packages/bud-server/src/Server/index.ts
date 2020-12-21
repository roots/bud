import * as middleware from '../middleware'
import {injectClient} from './injectClient'
import {
  Express,
  Container,
  Framework,
  Webpack,
} from '@roots/bud-typings'
import {
  express,
  webpackDevMiddleware,
  ProxyMiddleware,
} from '@roots/bud-support'
import Contract from './Contract'

/**
 * ## bud.server
 *
 * Development server for the @roots/bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
class Server implements Contract {
  /**
   * Bud instance ref
   */
  public bud: Framework.Ref

  /**
   * Express application instance.
   */
  public instance: Server.Instance

  /**
   * Server config
   */
  public config: Container

  /**
   * Is server running
   */
  public running = false

  /**
   * Constructor
   */
  public constructor(bud: Framework) {
    this.bud = bud.get

    this.instance = express()
    this.instance.set('x-powered-by', false)

    this.config = bud.makeContainer({})
  }

  public init(): void {
    return
  }

  /**
   * ## bud.server.getConfig [🏠 Internal]
   *
   * Get the server config.
   *
   * ### Usage
   *
   * ```js
   * bud.server.getConfig()
   * ```
   */
  public getConfig(): Container['repository'] {
    return this.config.getStore()
  }

  /**
   * ## bud.server.setConfig [🏠 Internal]
   *
   * Set the server config.
   *
   * ### Usage
   *
   * ```js
   * bud.server.setConfig(config)
   * ```
   */
  public setConfig(config: Container['repository']): void {
    this.config.setStore(config)
  }

  /**
   * ## bud.server.run [🏠 Internal]
   *
   * Run the development server.
   *
   * Projects should use `bud.run` unless they want
   * to supply their own Webpack stats handler.
   *
   * ### Usage
   *
   * ```js
   * bud.server.run((err, stats) => {
   *  // ...
   * })
   * ```
   */
  public run(): this {
    this.running = true

    const bud = this.bud()
    const config = this.config.all()

    bud.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )

    this.instance.use(
      middleware.dev({
        config,
        compiler: bud.compiler.instance,
      }),
    )

    this.instance.use(middleware.hot(bud.compiler.instance))

    bud.features.enabled('proxy') &&
      this.instance.use(middleware.proxy(config))

    this.listen()

    return this
  }

  /**
   * ## bud.server.listen [🏠 Internal]
   *
   * Listen for connections.
   */
  public listen(): void {
    this.instance.listen(
      this.config.get('port'),
      this.config.get('host'),
    )
  }
}

namespace Server {
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
    index?: webpackDevMiddleware.Options['index']

    /**
     * The path that the middleware is bound to.
     */
    publicPath?: webpackDevMiddleware.Options['publicPath']

    /**
     * Proxy setting: object passed to  https.createServer
     */
    ssl?: ProxyMiddleware.Options['ssl']

    /**
     * Proxy setting: set to true to verify SSL certificates
     */
    secure?: ProxyMiddleware.Options['secure']

    /**
     * Proxy setting: proxy websockets.
     */
    ws?: ProxyMiddleware.Options['ws']

    /**
     * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
     */
    autoRewrite?: ProxyMiddleware.Options['autoRewrite']

    /**
     * Proxy setting: change the origin of the host header to the target URL
     */
    changeOrigin?: ProxyMiddleware.Options['changeOrigin']

    /**
     * Escape hatch for Webpack's host check security feature.
     */
    disableHostCheck?: webpackDevMiddleware.Options[]

    /**
     * Proxy setting: specify whether you want to follow redirects
     */
    followRedirects?: ProxyMiddleware.Options['followRedirects']

    /**
     * Filename to serve as index.
     */
    filename?: webpackDevMiddleware.Options['filename']

    /**
     * This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
     */
    headers?: webpackDevMiddleware.Options['headers']

    /**
     * This property allows a user to pass the list of HTTP request methods accepted by the
     * @default [ 'GET', 'HEAD' ]
     */
    methods?: webpackDevMiddleware.Options['methods']

    /**
     * This property allows a user to register custom mime types or extension mappings
     * @default null
     */
    mimeTypes?:
      | webpackDevMiddleware.MimeTypeMap
      | webpackDevMiddleware.OverrideMimeTypeMap
      | null

    /**
     * Instructs the module to enable or disable the server-side rendering mode
     */
    serverSideRender?: webpackDevMiddleware.Options['serverSideRender']

    /**
     * Specify polling, etc.
     */
    watchOptions?: Webpack.Options.WatchOptions

    /**
     * If true, the option will instruct the module to write files to
     * the configured location on disk as specified in your webpack config file
     * This option also accepts a Function value, which can be used to
     * filter which files are written to disk
     */
    writeToDisk?: webpackDevMiddleware.Options['writeToDisk']
  }
}

export default Server
