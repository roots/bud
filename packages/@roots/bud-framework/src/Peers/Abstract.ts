import * as Project from '../Project'
import * as Peers from './'

/**
 * Peer dependencies abstract class
 *
 * @virtual
 */
export abstract class Abstract implements Peers.Interface {
  /**
   * Project instance.
   *
   * @virtual
   */
  public abstract project: Project.Interface

  /**
   * Collect packages.
   *
   * @virtual
   */
  public abstract discover(
    type: 'dependencies' | 'devDependencies',
  ): this

  /**
   * Register discovered packages as extensions
   *
   * @virtual
   */
  public abstract registerDiscovered(): void

  /**
   * Returns path for a module name (if findable)
   *
   * @virutal
   */
  public abstract resolvePeerByName(name: string): string

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @virtual
   */
  public abstract getPeerManifest(name: string): {
    [key: string]: any
  }

  /**
   * Returns true if a module is a bud
   *
   * @virtual
   */
  public abstract isExtension(name: string): boolean

  /**
   * Install packages
   *
   * @virtual
   */
  public abstract install(): void
}
