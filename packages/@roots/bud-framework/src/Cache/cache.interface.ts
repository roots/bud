import type {Service} from '../Service'

/**
 * Cache service Interface
 *
 * @public
 */
export interface CacheInterface extends Service {
  /**
   * Cached data
   *
   * @public
   */
  data: Record<string, any>

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
  hash(): string

  /**
   * Is cache valid?
   *
   * @public
   */
  valid: boolean

  /**
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   *
   * @public
   */
  version(): string

  /**
   * Update profile if needed
   *
   * @public
   */
  updateProfile(): void
}
