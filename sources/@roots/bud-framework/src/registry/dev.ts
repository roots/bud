import {WatchOptions} from 'chokidar'

import {Bud} from '../bud'
import * as Server from '../services/server'

export interface Dev {
  /**
   * Dev server connection options
   * @public
   */
  options: Server.Options

  /**
   * IPV4 or IPV6 binding
   * @public
   */
  interface: string

  /**
   * Server URL
   * @public
   */
  url: URL

  /**
   * Files which trigger a full browser reload
   */
  'watch.files': Set<string>
  /**
   * FS.Watcher options
   * @public
   */
  'watch.options': WatchOptions

  /**
   * Scripts included in dev builds
   * @public
   */
  'client.scripts': Set<(app: Bud) => string>

  /**
   * Enabled middleware
   * @public
   */
  'middleware.enabled': Array<keyof Server.Middleware.Available>

  'middleware.dev.options': Server.Middleware.Available['dev']['options']
  'middleware.hot.options': Server.Middleware.Available['hot']['options']
  'middleware.proxy.options': Server.Middleware.Available['proxy']['options']

  /**
   * Proxy target URL
   * @public
   */
  'middleware.proxy.target': URL

  /**
   * Proxy middleware replacements
   * @public
   */
  'middleware.proxy.replacements': Array<[RegExp | string, string]>
}
