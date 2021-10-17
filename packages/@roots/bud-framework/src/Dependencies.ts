import {Service} from './Service'

/**
 * Dependencies service container
 *
 * @public @core @container
 */
export interface Dependencies extends Service {
  /**
   * Record of installed packages
   *
   * @public
   */
  installed: Array<[string, string]>

  /**
   * Current pkg and version being installed
   *
   * @public
   */
  installing: [string, string]

  /**
   * Install dependencies
   *
   * @param dependencies - Array of dependencies to install
   *
   * @public
   */
  install(
    dependencies: {
      name: string
      ver: string
      source: string
      type: 'dependencies' | 'devDependencies'
    }[],
  ): void

  /**
   * Returns a boolean indicating whether a dependency is
   * required to be installed.
   *
   * @param dep - Dependency name
   * @param type - The current installation target (dependencies or devDependencies)
   *
   * @returns true if the dependency should be installed opposite of expectations
   *
   * @public
   */
  overrideInstallTarget(
    dep: string,
    type: 'dependencies' | 'devDependencies',
  ): boolean
}
