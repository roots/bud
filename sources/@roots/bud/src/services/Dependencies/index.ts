/* eslint-disable no-console */
import * as Framework from '@roots/bud-framework'

import {bind, DependenciesManager} from './dependencies.dependencies'

/**
 * Dependencies management service
 *
 * @public
 */
export class Dependencies
  extends Framework.Service
  implements Framework.Dependencies
{
  /**
   * Service ident
   *
   * @internal
   */
  public ident = 'dependencies'

  /**
   * Package manager client interface
   *
   * @public
   */
  public client: DependenciesManager['client']

  /**
   * Service registration event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async register(): Promise<void> {
    this.client = new DependenciesManager(this.app.path()).client
  }

  /**
   * Installs all the things
   *
   * @param dep - dependencies to install
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async install(
    packages: {
      name: string
      version: string
    }[],
  ): Promise<void> {
    try {
      console.log('installing packages')

      await this.client.install(
        packages.map(v => [v.name, v.version]),
        true,
        message => {
          console.log(message)
        },
      )
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }
}
