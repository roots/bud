import _ from 'lodash'
import {FileContainer} from '../FileContainer'

/**
 * Filesystem
 */
export declare class FileSystem {
  /**
   * Current disk
   */
  public current: FileContainer

  /**
   * Base dir
   */
  public baseDir: string

  /**
   * Get disk
   *
   * Call without a key to get all disks.
   * Pass a key to get a specific disk.
   */
  public getDisk(key?: string): FileContainer

  /**
   * Set disk
   *
   * Create a new disk. Provide a name, root directory, and -- optionally --
   * a custom glob array. [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * ```js
   * fs.makeDisk(
   *   'icons',
   *   bud.project('assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  public setDisk(
    key: string,
    options?: {baseDir?: string; glob?: string[]},
  ): this['current']

  /**
   * Use disk
   */
  public useDisk(key: string): FileSystem

  /**
   * Has disk?
   */
  public hasDisk(key: string): boolean
}
