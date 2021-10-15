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
   * {@link Peers} instance
   *
   * @public
   */
  public peers: Peers

  public repository: Repository = {
    name: null,
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
   * Read project package.json and set peer deps
   *
   * @public
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
   * @public
   * @decorator `@bind`
   */
  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
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
