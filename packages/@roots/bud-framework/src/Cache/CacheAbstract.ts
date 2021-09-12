import {Service} from '../Service'
import * as Cache from './'

/**
 * Cache service abstract class
 *
 * @virtual
 * @public
 */
export abstract class Abstract
  extends Service
  implements Cache.Interface
{
  /**
   * Dependencies which should be checked to determine cache validity.
   *
   * @virtual
   */
  public abstract buildDependencies(): string[]

  /**
   * Directory used to store cache files
   *
   * @virtual
   */
  public abstract directory(): string

  /**
   * Hash of config files and build dependencies
   *
   * @virtual
   */
  public abstract hash(): string

  /**
   * A short, unique string created from the hashed contents of the project
   * config files and build dependencies.
   *
   * @virtual
   */
  public abstract version(): string
}
