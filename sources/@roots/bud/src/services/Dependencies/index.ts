import * as Framework from '@roots/bud-framework'

import {
  bind,
  DependenciesManager,
  Signale,
} from './dependencies.dependencies'

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
    const logger = new Signale({interactive: true})

    try {
      logger.await({
        message: 'installing packages',
        suffix: packages,
      })

      await this.client.install(
        packages.map(v => [v.name, v.version]),
        true,
        message => {
          logger.log(message)
        },
      )

      logger.success({
        message: 'installing packages',
      })
    } catch (err) {
      logger.error(err)
    }
  }
}
