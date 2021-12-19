import {Service} from './Service'

/**
 * Dependencies service container
 *
 * @public
 */
export interface Dependencies extends Service {
  /**
   * Dependency manager
   *
   * @public
   */
  client: any

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
