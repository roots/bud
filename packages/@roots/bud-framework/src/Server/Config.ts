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
  middleware: Record<string, boolean>
  /**
   * Development server URL
   *
   * @public
   */
  dev: {
    url: string
  }

  /**
   * Development server URL
   *
   * @public
   */
  proxy: {
    url: string
    replace: {
      href: true
      window: true
      publicPath: true
    }
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
    files: Array<string>
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
   * Disable host check security features
   *
   * @public
   */
  disableHostCheck?: boolean
}
