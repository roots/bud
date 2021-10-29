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
  public abstract version: string

  /**
   * Hash of config files and build dependencies
   *
   * @public
   */
  public abstract hashFileContents(
    filePaths: Array<string>,
  ): Promise<string>
}
