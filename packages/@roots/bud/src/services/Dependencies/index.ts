import * as Framework from '@roots/bud-framework'
import {Signale} from 'signale'

import {
  bind,
  DependenciesManager,
} from './dependencies.dependencies'

/**
 * Bud Dependencies Service class
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
   * @public
   */
  public ident = 'bud.dependencies'

  /**
   * Dependencies installation manager
   *
   * @public
   */
  public client: DependenciesManager['client']

  /**
   * Record of installed packages
   *
   * @public
   */
  public installed: Array<[string, string]> = []

  /**
   * {@link @roots/bud-framework#Service.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register(): Promise<void> {
    this.client = new DependenciesManager(
      this.app.path('project'),
    ).client
  }

  /**
   * Installs all the things
   *
   * @param deps - dependencies to install
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async install(
    dependencies: {
      name: string
      version: string
    }[],
  ): Promise<void> {
    const logger = new Signale({interactive: true})

    try {
      logger.await({
        message: 'installing packages',
        suffix: dependencies,
      })

      await this.client.install(
        dependencies.map(v => [v.name, v.version]),
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
