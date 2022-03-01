import {WatchOptions} from 'chokidar'

import {Framework} from '../Framework'

export {WatchOptions}

/**
 * Dev config
 *
 * @public
 */
export interface Configuration {
  /**
   * Dev server URL
   *
   * @public
   */
  url: URL

  /**
   * Dev server client opts
   *
   * @public
   */
  client: {
    scripts: Array<(app: Framework) => string>
  }

  watch: {
    /**
     * Files which should reload the browser when changed.
     *
     * @public
     */
    files: Array<string>

    /**
     * Watch options
     *
     * @public
     */
    options: WatchOptions
  }
}
