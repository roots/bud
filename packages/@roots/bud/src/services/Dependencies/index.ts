import {Service} from '@roots/bud-framework'

import {
  bind,
  DependenciesManager,
  isEqual,
  readJsonSync,
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
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  /**
   * Read project `package.json` manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public readProjectJson() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  /**
   * Override installation target?
   *
   * @param dep - dependency in question
   * @param proposed - proposed installation target
   * @returns whether to install it differently than proposed
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public overrideInstallTarget(
    dep: string,
    proposed: string,
  ): boolean {
    const pkgJson = this.readProjectJson()
    const checkAgainst =
      proposed == 'dependencies'
        ? 'devDependencies'
        : 'dependencies'

    if (Object.keys(pkgJson[checkAgainst] ?? {}).includes(dep)) {
      return true
    }

    return false
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
    deps: {
      name: string
      ver: string
      source: string
      type: 'devDependencies' | 'dependencies'
    }[],
  ): void {
    /**
     * Filter out ineligible packages
     */
    deps
      .map(dep => {
        this.installing.push([dep.name, dep.ver])
        return dep
      })
      .map((dep, i) => {
        this.manager.client.install(
          isEqual(dep.type, 'devDependencies') &&
            !this.overrideInstallTarget(dep.name, dep.type),
          `${dep.name}@${dep.ver}`,
        )

        this.installed.push([dep.name, dep.ver])

        return dep
      })
  }
}
