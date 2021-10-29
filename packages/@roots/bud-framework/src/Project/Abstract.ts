import * as Peers from '../Peers'
import {Service} from '../Service'

/**
 * Peer service abstract class
 *
 * @public @core @container
 */
export abstract class Abstract extends Service<Peers.Repository> {
  [key: string]: any

  /**
   * Peer module related utilities
   *
   * @public
   */
  public abstract peers: Peers.Interface

  /**
   * Get aggregated project info
   *
   * @public
   */
  public abstract getProjectInfo(): {
    [key: string]: any
  }

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @public
   */
  public abstract hasPeerDependency(pkg: string): boolean
}
