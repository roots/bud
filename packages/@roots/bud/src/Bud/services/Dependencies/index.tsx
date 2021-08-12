import {Service} from '@roots/bud-framework'
import {React} from '@roots/bud-support'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {Static, Text} from 'ink'
import {isEqual} from 'lodash'

/**
 * Service: Dependencies
 *
 * @sealed
 */
class Dependencies extends Service<null> {
  public name = 'dependencies'

  /**
   * Handles interacting with package manager
   */
  public manager: DependenciesManager

  /**
   * {@inheritDoc Service.register}
   */
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  /**
   * Read project JSON and return as a hash
   *
   * @decorator `@bind`
   */
  @bind
  public readProjectJson() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  /**
   * Returns a boolean value representing if a package is eligible for installation
   *
   * @decorator `@bind`
   */
  @bind
  public shouldInstall(dep: string): boolean {
    const pkgJson = this.readProjectJson()

    return (
      !pkgJson ||
      !Object.keys({
        ...(pkgJson['dependencies'] ?? {}),
        ...(pkgJson['devDependencies'] ?? {}),
      })?.includes(dep)
    )
  }

  /**
   * Install an array of dependencies and/or devDependencies
   *
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
    deps

      /**
       * Filter out ineligible packages and notify user
       */
      .filter(({source, name}) => {
        if (!this.shouldInstall(name)) {
          this.app.dashboard.render(
            <Static items={[{name}]}>
              {({name}) => (
                <Text key={name}>
                  [{source}] {name} is already installed
                </Text>
              )}
            </Static>,
          )

          return false
        }

        return true
      })

      /**
       * Attempt installation of eligible packages
       */
      .forEach(dep => {
        this.app.dashboard.render(
          <Static
            items={[
              `[${dep.source}] Installing ${dep.type} ${dep.name}@${dep.ver}`,
            ]}>
            {msg => <Text key={`${msg}`}>{msg}</Text>}
          </Static>,
        )

        try {
          const result = this.manager.client
            .install(
              isEqual(dep.type, 'devDependencies'),
              `${dep.name}@${dep.ver}`,
            )
            .output.toString()

          this.app.dashboard.render(
            <Static items={[result]}>
              {msg => <Text key={`${msg}`}>{msg}</Text>}
            </Static>,
          )
        } catch (err) {
          this.app.dashboard.renderError(
            `Error installing ${dep.name}. Requested by ${
              dep.source
            } ${JSON.stringify(err)}`,
            `Package installation error`,
          )
        }
      })
  }
}

export {Dependencies}
