import {Index} from '../'

/**
 * Server configuration
 *
 * @public
 */
export interface Configuration {
  /**
   * Enable middleware
   *
   * @public
   */
  middleware: Index<boolean>

  /**
   * The development server host
   *
   * @defaultValue localhost
   */
  host: string

  /**
   * The development server port
   *
   * @defaultValue 3000
   *
   * @public
   */
  port: number

  /**
   * Proxy destination
   *
   * @public
   */
  proxy: {
    /**
     * Proxy destination host
     *
     * @defaultValue localhost
     *
     * @public
     */
    host: string

    /**
     * Proxy destination port
     *
     * @defaultValue 8000
     *
     * @public
     */
    port: number
  }

  /**
   * Files which should reload the browser when changed.
   *
   * @public
   */
  watch: {
    /**
     * Files which should reload the browser when changed.
     *
     * @public
     */
    files: string[]
  }

  /**
   * Client features
   *
   * @remarks
   *
   * - `log` - Logs dev server activity to the browser console
   *
   * - `indicator` - Displays a small indicator in the browser
   *
   * - `overlay` - Displays a fullscreen overlay in the browser on errors
   *
   * @public
   */
  browser: {
    log: boolean
    indicator: boolean
    overlay: boolean
  }

  /**
   * The index path for web server, defaults to "index.html".
   *
   * @public
   */
  index?: string

  /**
   * The publicPath to serve from.
   *
   * @public
   */
  publicPath?: string

  /**
   * Filename to serve as index.
   *
   * @defaultValue 'index.html'
   *
   * @public
   */
  filename?: string

  /**
   * Include HTTP headers on each request.
   *
   * @example
   * ```json
   * { "X-Custom-Header": "yes" }
   * ```
   *
   * @public
   */
  headers?: Index<string>

  /**
   * Request methods accepted by the server.
   *
   * @example
   * ```json
   * ['GET', 'HEAD']
   * ```
   *
   * @public
   */
  methods?: string[]

  /**
   * Map Mimetypes to extensions
   *
   * @public
   */
  mimeTypes?: {
    [type: string]: string
  }

  /**
   * Disable host check security features
   *
   * @public
   */
  disableHostCheck?: boolean
}
