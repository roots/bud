import {WatchOptions} from 'chokidar'
import {URL} from 'url'

import {Framework} from '../Framework'

/**
 * Files which should reload the browser when changed.
 *
 * @public
 */
export interface DevConfiguration {
  url: URL

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
