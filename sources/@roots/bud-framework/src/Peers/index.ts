import {Framework} from '../Framework'

/**
 * Peer dependencies manager
 *
 * @public
 */
export interface Peers {
  /**
   * App instance
   *
   * @public
   */
  app: Framework

  /**
   * Module load order
   *
   * @public
   */
  adjacents: any

  /**
   * True if project is missing dependencies
   *
   * @public
   */
  hasMissingDependencies: boolean

  /**
   * Expected project dependencies
   *
   * @public
   */
  peerDependencies: Map<string, string>

  /**
   * Collect packages.
   *
   * @param type - type of packages to discover (devDependencies or dependencies)
   *
   * @public
   */
  discover(type: 'dependencies' | 'devDependencies'): Promise<this>

  /**
   * Returns path from a module name
   *
   * @param name - peer module name
   * @returns path to peer module
   *
   * @public
   */
  resolveModulePath(name: string): Promise<string>

  /**
   * Returns manifest from a module name
   *
   * @param name - peer module name
   * @returns manifest for peer module
   *
   * @public
   */
  getManifest(name: string): Promise<Record<string, any>>
}
