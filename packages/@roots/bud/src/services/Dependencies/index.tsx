import {Service} from '@roots/bud-framework'
import {
  Dependencies as DependenciesManager,
  IDependencyManager,
} from '@roots/dependencies'
import {
  bind,
  fs,
  React,
  Box,
  Text,
  Spinner,
} from '@roots/bud-support'

/**
 * Framework/Dependencies
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Dependencies extends Service {
  /**
   * Service name
   */
  public name = 'service/dependencies'

  /**
   * Dependencies manager
   */
  public manager: DependenciesManager

  /**
   * Project package.json
   */
  public get pkg() {
    return fs.readJsonSync(
      this.app.path('project', 'package.json'),
    )
  }

  /**
   * Is framework being run with yarn
   */
  public get isYarn() {
    return this.manager.isYarn()
  }

  /**
   * Get client
   */
  public get client(): IDependencyManager {
    return this.manager.client
  }

  /**
   * Boot
   */
  public boot() {
    this.manager = new DependenciesManager(
      this.app.subscribe('location/project'),
    )
  }

  /**
   * Install development dependency
   */
  @bind
  public installDev(deps: string[], source: string): void {
    deps.forEach(dep => {
      if (
        !this.pkg.devDependencies ||
        !Object.keys(this.pkg.devDependencies).includes(dep)
      ) {
        this.notify(dep, source)
        this.client.install(true, dep)
      }
    })
  }

  /**
   * Install dependency
   */
  @bind
  public install(deps: string[], source: string): void {
    deps.forEach(dep => {
      if (
        !this.pkg.dependencies ||
        !Object.keys(this.pkg.dependencies).includes(dep)
      ) {
        this.notify(dep, source)
        this.client.install(false, dep)
      }
    })
  }

  /**
   * Display information to console
   */
  @bind
  public notify(dep: string, source: string) {
    this.app.dashboard.write(
      <Box flexDirection="row">
        <Text>
          <Text color="green">
            <Spinner /> {source}{' '}
          </Text>
          Adding <Text color="green">{dep}</Text> to project.
        </Text>
      </Box>,
    )
  }
}
