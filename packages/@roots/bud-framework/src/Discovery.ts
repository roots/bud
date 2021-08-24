import {Service} from './Service'

interface Repository {
  name: string

  peers: {}

  dependencies: {
    [key: string]: string
  }

  devDependencies: {
    [key: string]: string
  }

  required: {
    [key: string]: {
      source: string
      name: string
      ver: string
      type: 'dependencies' | 'devDependencies'
    }
  }
}

/**
 * @noInherit
 */
export abstract class Discovery extends Service<Repository> {
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
   * Install packages
   */
  public abstract install(): void

  /**
   * Get aggregated project info
   */
  public abstract getProjectInfo(): {
    [key: string]: any
  }

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   */
  public abstract hasPeerDependency(pkg: string): boolean
}
