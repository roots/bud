import type {Service} from '../Service'

/**
 * Cache service Interface
 *
 * @public
 */
export interface CacheInterface extends Service {
  /**
   * Is cache valid?
   *
   * @public
   */
  version: string

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  hashFileContents(str: Array<string>): Promise<string>
}
