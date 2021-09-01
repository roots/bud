import {
  Framework,
  Project as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'

import {Peers} from './Peers'

interface Buddy {
  source: string
  name: string
  ver: string
  type: 'dependencies' | 'devDependencies'
}

interface Repository extends Framework.Index {
  name: string
  peers: {
    [key: string]: Buddy
  }
  extensions: {
    [key: string]: Buddy
  }
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
}

class Project extends Contract implements Service<Repository> {
  public name = 'project'

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
   */
  public resolveFrom: string[] = []

  @bind
  public registered(): void {
    /**
     * Read package.json
     */
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

export {Project}
