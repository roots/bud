import * as Peers from '../Peers'
import {Service} from '../Service'

/**
 * Peer service interface
 *
 * @virtual
 * @beta
 */
export interface Interface extends Service {
  /**
   * Array of paths for webpack to resolve modules from
   *
   * @virtual
   */
  resolveFrom: string[]

  /**
   * Peer module related utilities
   *
   * @virtual
   */
  peers: Peers.Interface

  /**
   * Get aggregated project info
   *
   * @virtual
   */
  getProjectInfo(): {
    [key: string]: any
  }

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @virtual
   */
  hasPeerDependency(pkg: string): boolean
}
