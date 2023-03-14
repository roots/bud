import type {FSWatcher, WatchOptions} from 'node:fs'

import type {Bud} from '../../../index.js'

/**
 * Watcher
 */
export interface Watcher {
  _app: () => Bud

  app: Bud

  /**
   * Instance
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
   */
  logger: any

  /**
   * Initialize watch files
   */
  watch(): Promise<FSWatcher>

  /**
   * Watcher callback
   *
   * @param path - changed file
   */
  watcherCallback(path: string): unknown
}
