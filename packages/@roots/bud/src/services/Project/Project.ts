import {
  bind,
  Peers,
  Project as FrameworkProject,
  readJsonSync,
} from './project.dependencies'
import type {Repository} from './project.interface'

/**
 * Project service class
 *
 * @public
 */
export class Project
  extends FrameworkProject.Abstract
  implements FrameworkProject.Interface
{
  /**
   * Project package.json location
   *
   * @public
   */
  public manifestPath: string

  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  /**
   * Project repository
   *
   * @public
   */
  public repository: Repository = {
    name: null,
    manifestPath: null,
    peers: {},
    extensions: {},
    dependencies: {},
    devDependencies: {},
  }

  /**
   * Array of paths for webpack to resolve modules from
   *
   * @public
   */
  public resolveFrom: string[] = []

  /**
   * Returns all gathered project data
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }

  public register(): void {
    this.manifestPath = this.app.path('project', 'package.json')
    this.logger.log(
      'Cache is either disabled or invalid and must be built',
    )
    this.setStore(readJsonSync(this.manifestPath))
    this.set('manifestPath', this.manifestPath)
  }

  /**
   * Read project package.json and set peer deps
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public initialize(): void {
    this.peers = new Peers(this)
    this.app.cache.data.project = this.all()
    this.app.cache.data.resolve = this.resolveFrom

    this.logger.log('Saving to cache', this.all())
  }

  /**
   * Returns true if a dependency is listed in the project manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasPeerDependency(pkg: string): boolean {
    return (
      this.has(`devDependencies.${pkg}`) ||
      this.has(`dependencies.${pkg}`)
    )
  }
}
