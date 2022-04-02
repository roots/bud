import {FSWatcher} from 'chokidar'

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
   * Get watched files
   *
   * @public
   */
  getWatchedFiles(): Promise<Array<string>>

  /**
   * Initialize watch files
   *
   * @public
   */
  watch(): Promise<FSWatcher>
}
