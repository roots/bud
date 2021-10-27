import {
  bind,
  globby,
  Peers,
  Project as FrameworkProject,
  readJson,
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
    version: undefined,
    configFiles: {
      dynamic: [],
      static: [],
    },
    manifestPath: null,
    peers: {},
    extensions: {},
    manifest: {},
    resolve: [],
  }

  /**
   * Array of paths for webpack to resolve modules from
   *
   * @public
   */
  public resolveFrom: string[] = []

  @bind
  public async register(): Promise<void> {
    this.logger.log('Project', 'Registering')

    this.set(
      'manifestPath',
      this.app.path('project', 'package.json'),
    )

    try {
      await readJson(this.get('manifestPath'))
    } catch (e) {
      this.app.error('Project', 'Manifest file not found')
      return
    }

    const manifest = await readJson(this.get('manifestPath'))

    this.set('manifest', {
      ...manifest,
    })

    const dynamic = await globby.globby([
      this.app.path(
        'project',
        `${this.app.name}.config.{js,ts}`,
      ),
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.config.{js,ys}`,
      ),
    ])

    const json = globby.globby([
      this.app.path(
        'project',
        `${this.app.name}.config.{yml,yaml,json}`,
      ),
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.config.{yml,yaml,json}`,
      ),
    ])

    this.set('configFiles', {
      dynamic,
      json,
    })

    this.set('dependencies', [
      ...new Set([
        this.get('manifestPath'),
        ...(this.get('configFiles.dynamic') ?? []),
        ...(this.get('configFiles.static') ?? []),
      ]),
    ])

    this.logger.log('Project registration', 'store', this.all())
  }

  public boot() {
    if (this.app.cache.valid) {
      this.mergeStore(this.app.cache.all())
      this.logger.log('Final project values', this.all())
      return
    }

    this.findPeers()
    this.app.cache.build()
    this.setStore(this.app.cache.all())
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
   * Read project package.json and set peer deps
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public findPeers(): void {
    this.logger.log('Analyzing peers')
    this.peers = new Peers(this)
  }

  /**
   * Returns true if a dependency is listed in the project manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasPeerDependency(pkg: string): boolean {
    return this.has(`peers.${pkg}`)
  }
}
