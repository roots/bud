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
   * Dependency manager
   *
   * @public
   */
  manager: any

  /**
   * Package manager
   *
   * @public
   */
  packageManager: any

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
      version: string
    }[],
  ): Promise<void>
}
