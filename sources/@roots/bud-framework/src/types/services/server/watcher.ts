import type {FSWatcher, WatchOptions} from 'node:fs'

import type {Bud} from '../../../index.js'

/**
 * Watcher
 *
 * @public
 */
export interface Watcher {
  app: Bud

  /**
   * Instance
   *
   * @public
   */
  instance: FSWatcher

  /**
   * Watch files
   */
  files: Set<string>

  /**
   * Watch options
   */
  options: WatchOptions

  /**
   * Logger
   *
   * @public
   */
  logger: any

  /**
   * Initialize watch files
   *
   * @public
   */
  watch(): Promise<FSWatcher>

  /**
   * Watcher callback
   *
   * @param path - changed file
   * @public
   */
  watcherCallback(path: string): unknown
}
