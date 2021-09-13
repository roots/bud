import * as Project from '../Project'
import * as Peers from './'

/**
 * Peer dependencies abstract class
 *
 * @public @core
 */
export abstract class Abstract implements Peers.Interface {
  /**
   * Project instance.
   *
   * @public
   */
  public abstract project: Project.Interface

  /**
   * Collect packages.
   *
   * @param type - type of packages to discover (devDependencies or dependencies)
   * @returns {@link Peers}
   *
   * @public
   */
  public abstract discover(
    type: 'dependencies' | 'devDependencies',
  ): this

  /**
   * Register discovered packages as extensions
   *
   * @returns void
   *
   * @public
   */
  public abstract registerDiscovered(): void

  /**
   * Returns path for a module name (if findable)
   *
   * @param name - peer module name
   * @returns path to peer module
   *
   * @public
   */
  public abstract resolvePeerByName(name: string): string

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @param name - peer module name
   * @returns manifest for peer module
   *
   * @public
   */
  public abstract getPeerManifest(name: string): {
    [key: string]: any
  }

  /**
   * Returns true if a module is bud-related
   *
   * @param name - peer module name
   * @returns true if a module is bud-related
   *
   * @public
   */
  public abstract isExtension(name: string): boolean

  /**
   * Install packages
   *
   * @returns void
   *
   * @public
   */
  public abstract install(): void
}
