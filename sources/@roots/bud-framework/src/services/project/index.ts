import {ContainerService as Base} from '../../service'
import * as Peers from '../peers'

/**
 * Peer service interface
 *
 * @public
 */
export interface Service extends Base {
  [key: string]: any

  /**
   * Peer module related utilities
   *
   * @public
   */
  peers: Peers.Service

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @public
   */
  hasPeerDependency(pkg: string): boolean

  /**
   * Read profile
   *
   * @public
   */
  buildProfile(): Promise<any>

  /**
   * Write profile to filesystem
   *
   * @public
   */
  writeProfile(): Promise<any>

  /**
   * Refresh project json artifact
   *
   * @public
   */
  buildProfile(): Promise<any>
}
