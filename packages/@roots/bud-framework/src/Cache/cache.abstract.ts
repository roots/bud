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
   * Dependencies which should be checked to determine cache validity.
   *
   * @public
   */
  public abstract buildDependencies(): string[]

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
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   *
   * @public
   */
  public abstract version(): string
}
