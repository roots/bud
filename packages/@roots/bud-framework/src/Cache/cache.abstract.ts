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
   * Cached data.
   *
   * @public
   */
  public abstract data: Record<string, any>

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
  public abstract hash(): string

  /**
   * Is cache valid?
   */
  public abstract readonly valid: boolean

  /**
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   *
   * @public
   */
  public abstract version(): string

  /**
   * Update profile if needed
   *
   * @public
   */
  public abstract updateProfile(): void
}
