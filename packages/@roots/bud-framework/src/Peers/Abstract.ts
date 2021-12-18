import {Framework} from '../Framework'
import * as Peers from './'

/**
 * Peer dependencies abstract class
 *
 * @public @core
 */
export abstract class Abstract implements Peers.Interface {
  /**
   * App instance
   *
   * @public
   */
  public abstract app: Framework

  /**
   * Collect packages.
   *
   * @param type - type of packages to discover (devDependencies or dependencies)
   *
   * @public
   */
  public abstract discover(
    type: 'dependencies' | 'devDependencies',
  ): Promise<this>

  /**
   * Packages already checked
   *
   * @public
   */
  public abstract profiled: Array<string>

  /**
   * Returns path for a module name (if findable)
   *
   * @param name - peer module name
   * @returns path to peer module
   *
   * @public
   */
  public abstract resolveModulePath(
    name: string,
  ): Promise<string>

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @param name - peer module name
   * @returns manifest for peer module
   *
   * @public
   */
  public abstract getManifest(
    name: string,
  ): Promise<Record<string, any>>

  /**
   * Returns true if a module is bud-related
   *
   * @param name - peer module name
   * @returns true if a module is bud-related
   *
   * @public
   */
  public abstract isExtension(
    manifest: Record<string, any>,
  ): boolean
}
