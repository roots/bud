import {Repository} from '@roots/container'

import {Service} from '../Service'
import {CacheInterface} from './cache.interface'

/**
 * Cache service Interface
 *
 * @public
 */
export abstract class CacheAbstract
  extends Service
  implements CacheInterface
{
  /**
   * Is cache valid?
   */
  public abstract valid: boolean

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  public abstract hash(str: string): string

  /**
   * Verify cache validity
   *
   * @public
   */
  public abstract verify(
    hash1: string,
    hash2: string,
  ): Promise<boolean>

  /**
   * @public
   */
  public abstract write(
    callback: (cache: Repository) => Promise<Repository>,
  ): Promise<boolean>
}
