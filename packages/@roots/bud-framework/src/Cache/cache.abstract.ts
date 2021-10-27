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
   * Cache path
   *
   * @public
   */
  public abstract cachePath: string

  /**
   * Is a cache file present
   *
   * @public
   */
  public abstract hasCache(): Promise<boolean>

  /**
   * Directory used to store cache files
   *
   * @public
   */
  public abstract directory(): string

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  public abstract hash(str: string): string

  /**
   * Is cache valid?
   */
  public abstract readonly valid: boolean

  /**
   * Update profile if needed
   *
   * @public
   */
  public abstract build(): Promise<void>

  /**
   * Verify cache validity
   *
   * @public
   */
  public abstract verify(): Promise<boolean>
}
