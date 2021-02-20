import {Framework, Service, Express, Webpack} from './'
import webpackDevMiddleware from 'webpack-dev-middleware'
import ProxyMiddleware from 'http-proxy-middleware'

/**
 * ## bud.server
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Server extends Service {
  /**
   * Server application instance.
   */
  instance: Server.Instance

  /**
   * Client bundle assets (for injection)
   */
  assets: string[]

  /**
   * Inject HMR service into individual bundles.
   */
  inject(): void

  /**
   * Make middleware
   */
  makeMiddleware(compiler: Webpack.Compiler): void

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
  run(compiler: any): this
}

export namespace Server {
  export type Instance = Express.Application

  export type Config = Framework.Container<Options>

  /**
   * Options
   */
  export interface Options {
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
     * Set the default file system which will be used by webpack as primary destination of generated files
     */
    fs?: webpackDevMiddleware.Options['fs']

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
     * This property for  passing  custom
     * HTTP headers on each request.
     *
     * ### Example
     *
     * ```json
     * { "X-Custom-Header": "yes" }
     * ```
     */
    headers?: webpackDevMiddleware.Options['headers']

    /**
     * Defines the level of messages logged by Express/WDS middleware
     */
    logLevel?: webpackDevMiddleware.Options['logLevel']

    /**
     * This property for  passing  the
     * list of HTTP request methods accepted
     *
     * ### Example
     *
     * ```json
     * ['GET', 'HEAD']
     * ```
     */
    methods?: webpackDevMiddleware.Options['methods']

    /**
     * This property for  to register custom
     * mime types or extension mappings
     */
    mimeTypes?:
      | webpackDevMiddleware.MimeTypeMap
      | webpackDevMiddleware.OverrideMimeTypeMap
      | null

    /**
     * Instructs the module to enable or disable the s
     * erver-side rendering mode
     */
    serverSideRender?: webpackDevMiddleware.Options['serverSideRender']

    /**
     * Specify polling, etc.
     */
    watchOptions?: Webpack.Configuration['watchOptions']

    /**
     * If true, the option will instruct the module
     * to write files to the configured location on disk
     * as specified in your webpack config file.
     *
     * This option also accepts a Function value, which can be used to
     * filter which files are written to disk
     */
    writeToDisk?: webpackDevMiddleware.Options['writeToDisk']
  }
}
