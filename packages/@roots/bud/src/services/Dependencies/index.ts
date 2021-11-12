import * as Framework from '@roots/bud-framework'

import {
  $,
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
  public manager: DependenciesManager

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
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  /**
   * Installs all the things
   *
   * @internalRemarks
   * #TODO: Fix this mess of a function and make it better. It's not good. -- GPT3
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
    const install = dependencies.reduce(
      (acc, dependency) =>
        `${acc} ${dependency.name}@${dependency.version}`,
      ``,
    )
    const pkgManager = this.manager.isYarn() ? `yarn` : `npm`
    const command = `${pkgManager} add ${install} --dev`

    this.log(`await`, {
      prefix: 'install',
      message: install,
    })

    const installation = $(command)
    installation.stderr.pipe(process.stderr)

    await installation

    this.log(`success`, {
      prefix: 'install',
      message: install,
    })
  }
}
