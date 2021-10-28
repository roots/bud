import * as Project from '../Project'

/**
 * Peer dependencies interface
 *
 * @public
 */
export interface Interface {
  /**
   * Project instance.
   *
   * @public
   */
  project: Project.Interface

  /**
   * Collect packages.
   *
   * @public
   */
  discover(type: 'dependencies' | 'devDependencies'): this

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   */
  resolvePeerByName(name: string): string

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @public
   */
  getPeerManifest(name: string): {[key: string]: any}

  /**
   * Returns true if a module is a bud
   *
   * @public
   */
  isExtension(name: string): boolean
}
