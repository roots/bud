import * as Peers from '../Peers'
import {Service} from '../Service'

/**
 * Peer service interface
 *
 * @public @core @container
 */
export interface Interface extends Service {
  [key: string]: any

  /**
   * Peer module related utilities
   *
   * @public
   */
  peers: Peers.Interface

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @public
   */
  hasPeerDependency(pkg: string): boolean
}
