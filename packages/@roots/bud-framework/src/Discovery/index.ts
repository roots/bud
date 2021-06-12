import {Service} from '../Service'

export abstract class Discovery extends Service {
  /**
   * Array of paths for webpack to resolve modules from
   */
  public resolveFrom: string[] = []

  /**
   * Collect packages.
   */
  public abstract discover(
    type: 'dependencies' | 'devDependencies',
  ): void

  /**
   * Register discovered packages as extensions
   */
  public abstract registerDiscovered(): void

  /**
   * Gather information on packages
   */
  public abstract mapConfig(pkg: {
    name: string
    dir: string
  }): void

  /**
   * Install packages
   */
  public abstract install(): void

  /**
   * Get aggregated project info
   */
  public abstract getProjectInfo(): {
    [key: string]: any
  }

  public abstract resolvePeers(pkg): void

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   */
  public abstract hasPeerDependency(pkg: string): boolean
}
