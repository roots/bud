import {Service} from '@roots/bud-framework'

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
export class Dependencies extends Service<null> {
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public @override
   */
  public name = 'dependencies'

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
   * Current pkg and version being installed
   *
   * @public
   */
  public installing: Array<[string, string]> = []

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
  public install(
    dependencies: {
      name: string
      version: string
    }[],
  ): void {
    const installStr = dependencies.reduce(
      (acc, dependency) =>
        `${acc} ${dependency.name}@${dependency.version}`,
      ``,
    )

    this.manager.isYarn()
      ? $(`yarn add ${installStr} --dev`)
      : $(`npm install ${installStr} --save-dev`)
  }
}
