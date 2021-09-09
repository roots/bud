import * as Peers from '../Peers'
import {Service} from '../Service'
import {Repository} from '.'

/**
 * Peer service abstract class
 *
 * @virtual
 * @beta
 */
export abstract class Abstract extends Service<Repository> {
  /**
   * Array of paths for webpack to resolve modules from
   *
   * @virtual
   */
  public resolveFrom: string[] = []

  /**
   * Peer module related utilities
   *
   * @virtual
   */
  public abstract peers: Peers.Interface

  /**
   * Get aggregated project info
   *
   * @virtual
   */
  public abstract getProjectInfo(): {
    [key: string]: any
  }

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @virtual
   */
  public abstract hasPeerDependency(pkg: string): boolean
}
