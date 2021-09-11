import {Project} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'

import {Peers, Repository} from '../Peers'

/**
 * Project service class
 *
 * @public
 */
export default class
  extends Project.Abstract
  implements Project.Interface
{
  /**
   * {@inheritDoc}
   */
  public name = 'project'

  /**
   * {@link Peers} instance
   */
  public peers: Peers

  /**
   * {@inheritDoc}
   */
  public repository: Repository = {
    name: null,
    peers: {},
    extensions: {},
    dependencies: {},
    devDependencies: {},
  }

  /**
   * Array of paths for webpack to resolve modules from
   */
  public resolveFrom: string[] = []

  /**
   * Read project package.json and set peer deps
   *
   * @decorator `@bind`
   */
  @bind
  public registered(): void {
    this.setStore(
      readJsonSync(this.app.path('project', 'package.json')),
    )

    this.peers = new Peers(this)
  }

  /**
   * Returns all gathered project data
   *
   * @decorator `@bind`
   */
  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }

  /**
   * Returns true if a dependency is listed in the project manifest
   *
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
