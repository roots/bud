import type {FSWatcher, WatchOptions} from 'node:fs'

import type {Logger} from '../../logger/index.js'

/**
 * Watcher
 *
 * @public
 */
export interface Watcher {
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
  logger: Logger['instance']

  /**
   * Get watch options
   *
   * @public
   * @decorator `@bind`
   */
  getOptions(): WatchOptions

  /**
   * Get watched files
   *
   * @public
   */
  getFiles(): Array<string>

  /**
   * Search files
   *
   * @public
   */
  search(): Promise<Array<string>>

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
