import type {Service} from '../Service'

/**
 * Cache service Interface
 *
 * @public
 */
export interface CacheInterface extends Service {
  /**
   * Cache path
   *
   * @public
   */
  cachePath: string

  /**
   * Is a cache file present
   *
   * @public
   */
  hasCache(): Promise<boolean>

  /**
   * Directory used to store cache files
   *
   * @public
   */
  directory(): string

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  hash(str: string): string

  /**
   * Is cache valid?
   *
   * @public
   */
  valid: boolean

  /**
   * Update profile if needed
   *
   * @public
   */
  build(): Promise<void>

  /**
   * Verify cache validity
   *
   * @public
   */
  verify(): Promise<boolean>
}
