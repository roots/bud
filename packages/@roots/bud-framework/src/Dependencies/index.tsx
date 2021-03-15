import Service from '../Service'
import {
  Dependencies,
  IDependencyManager,
} from '@roots/dependencies'
import {
  React,
  Box,
  Text,
  Spinner,
  Instance,
} from '@roots/bud-support'

/**
 * Dependencies
 */
export default class extends Service {
  /**
   * Service ident
   */
  public name = 'dependencies'

  /**
   * Dependencies manager
   */
  public manager: Dependencies

  /**
   * Ink instance
   */
  protected renderInstance: Instance

  /**
   * Project package.json
   */
  public get pkg() {
    return this.app.disk.get('project').readJson('package.json')
  }

  /**
   * Is framework being run with yarn
   */
  public get isYarn() {
    return this.manager.isYarn()
  }

  /**
   * Dependency manager
   */
  public get client(): IDependencyManager {
    return this.manager.client
  }

  public boot() {
    this.manager = new Dependencies(
      this.app.subscribe('location/project'),
    )
  }

  /**
   * Install development dependency
   */
  public installDev(deps: string[], source: string): void {
    deps.forEach(dep => {
      if (
        !this.pkg.devDependencies ||
        !Object.keys(this.pkg.devDependencies).includes(dep)
      ) {
        this.notifyConsole(dep, source)
        this.client.install(true, dep)
      }
    })
  }

  /**
   * Install dependency
   */
  public install(deps: string[], source: string): void {
    deps.forEach(dep => {
      if (
        !this.pkg.dependencies ||
        !Object.keys(this.pkg.dependencies).includes(dep)
      ) {
        this.notifyConsole(dep, source)
        this.client.install(false, dep)
      }
    })
  }

  /**
   * Display information to console
   */
  public notifyConsole(dep: string, source: string) {
    this.renderInstance = this.app.dashboard.render(
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
