import {Repository} from '@roots/container'

import * as Peers from '../Peers'
import {Service} from '../Service'

/**
 * Peer service abstract class
 *
 * @public @core @container
 */
export abstract class Abstract extends Service<Peers.Repository> {
  public abstract repository: Repository

  /**
   * Peer module related utilities
   *
   * @public
   */
  public abstract peers: Peers.Interface

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   *
   * @public
   */
  public abstract hasPeerDependency(pkg: string): boolean

  public flush: boolean
}
