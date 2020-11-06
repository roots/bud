import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import {Options as ProxyOptions} from 'http-proxy-middleware'

/**
 * Framework.Server
 *
 * Express instance configured with WDS middleware
 * for local development.
 *
 * @package @roots/bud-server
 */
export declare class Server {
  /**
   * Bud
   */
  bud: Framework.Bud

  /**
   * Express instance.
   */
  instance: Server.Instance

  /**
   * Server configuration.
   */
  config: Server.Config

  /**
   * Webpack compiler.
   */
  compiler: Framework.Webpack.Compiler

  /**
   * Class constructor.
   */
  constructor(bud: Framework.Bud)

  /**
   * Get Express instance.
   */
  getServer: () => Framework.Express.Application

  /**
   * Set Express instance.
   */
  setServer: (server: Framework.Express.Application) => this

  /**
   * Get server config.
   */
  getConfig: () => Server.Config

  /**
   * Get Express config item.
   */
  getConfigItem: (key: string) => Partial<Server.Config>

  /**
   * Set config.
   */
  setConfig: (config: Server.Config) => this

  /**
   * Set config item.
   */
  setConfigItem: (
    key: string,
    item: Partial<Server.Config>,
  ) => void
  /**
   * Get compiler.
   */
  getCompiler: () => Framework.Webpack.Compiler

  /**
   * Set compiler.
   */
  setCompiler: (compiler: Framework.Webpack.Compiler) => this

  /**
   * Add middleware to Express instance.
   */
  addMiddleware: (middleware: Framework.Express.Handler) => this

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

export namespace Server {
  /**
   * Express application.
   */
  export type Instance = Framework.Express.Application

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
    entrypoints: Framework.Webpack.Entry,
  ) => Framework.Webpack.Entry
}
