import {Repository} from '@roots/container'

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
  valid: boolean

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  hash(str: string): string

  /**
   * Verify cache validity
   *
   * @public
   */
  verify(hash1: string, hash2: string): Promise<boolean>

  /**
   * @public
   */
  write(
    callback: (cache: Repository) => Promise<Repository>,
  ): Promise<boolean>
}
