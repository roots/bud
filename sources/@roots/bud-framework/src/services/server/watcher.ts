import type {Bud} from '@roots/bud-framework'

import type {FSWatcher, WatchOptions} from 'node:fs'

/**
 * Watcher
 */
export interface Watcher {
  _app: () => Bud

  app: Bud

  /**
   * Watch files
   */
  files: Set<string>

  /**
   * Instance
   */
  instance: FSWatcher

  /**
   * Logger
   */
  logger: any

  /**
   * Watch options
   */
  options: WatchOptions

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
