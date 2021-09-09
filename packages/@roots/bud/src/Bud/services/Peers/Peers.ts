import * as Peers from '@roots/bud-framework/src/Peers'
import * as Project from '@roots/bud-framework/src/Project'
import {pkgUp} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {dirname, join} from 'path'

/**
 * Peers service class
 *
 * @beta
 */
export default class
  extends Peers.Abstract
  implements Peers.Interface
{
  /**
   * {@inheritDoc}
   */
  public name = 'project'

  public project: Project.Interface

  /**
   * Class constructor
   */
  public constructor(project: Project.Interface) {
    super()

    this.project = project

    this.discover('dependencies').discover('devDependencies')
  }

  /**
   * Returns path for a module name (if findable)
   *
   * @decorator `@bind`
   */
  @bind
  public resolvePeerByName(name: string) {
    try {
      const dir = dirname(
        pkgUp.sync({
          cwd: dirname(require.resolve(name)),
        }),
      )

      return dir
    } catch (err) {
      return null
    }
  }

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @decorator `@bind`
   */
  @bind
  public getPeerManifest(name: string) {
    const path = this.resolvePeerByName(name)
    return path ? readJsonSync(join(path, '/package.json')) : {}
  }

  /**
   * Returns true if a module is a bud
   *
   * @decorator `@bind`
   */
  @bind
  public isExtension(name: string): boolean {
    return name?.includes('@roots') || name?.includes('bud-')
  }

  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   *
   * @decorator `@bind`
   */
  @bind
  public discover(
    type: 'dependencies' | 'devDependencies',
  ): this {
    this.project.has(type) &&
      this.project.getKeys(type).map((name: string) => {
        /**
         * Resolver: given a manifest, will separate peers
         * and extensions for further processing.
         *
         * If an extension requires another extension, it will call
         * itself recursively until it reaches bottom.
         *
         * If two extensions require one another it will not iterate
         * infinitely as it checks if an extension exists before
         * recursing.
         */
        const resolvePeers = (manifest: {
          [key: string]: any
        }) => {
          /**
           * Add to eligible extensions
           */
          !this.project.has(`extensions.${manifest.name}`) &&
            this.project.set(`extensions.${manifest.name}`, {
              name: manifest.name,
              ver: manifest.version,
              type: type,
            })

          /**
           * Add to resolvable paths
           */
          !this.project.resolveFrom.includes(
            this.resolvePeerByName(manifest.name),
          ) &&
            this.project.resolveFrom.push(
              this.resolvePeerByName(manifest.name),
            )

          /**
           * Dive through peer deps
           */
          manifest.peerDependencies &&
            Object.entries(manifest.peerDependencies).forEach(
              ([depName, ver]) => {
                !this.project.has(`peers.${depName}`) &&
                  this.project.set(`peers.${depName}`, {
                    name: depName,
                    ver: ver,
                    type: 'devDependencies',
                  })
              },
            )

          /**
           * Tail recursion on nested requires
           */
          manifest?.bud?.peers?.forEach((name: string) => {
            this.isExtension(name) &&
              !this.project.has(`extensions.${name}`) &&
              resolvePeers(this.getPeerManifest(name))
          })
        }

        /**
         * Checks each key in project level package.json
         * to determine if it is a bud extension. If so it
         * engages resolvePeers
         */
        this.isExtension(name) &&
          resolvePeers(this.getPeerManifest(name))
      })

    return this
  }

  /**
   * Registers all bud related extensions with bud.extensions
   *
   * @decorator `@bind`
   */
  @bind
  public registerDiscovered() {
    this.project.getValues('extensions').forEach(pkg => {
      if (!pkg?.name) return

      this.project.app.extensions.add(require(pkg.name))
      this.project.set(`registered.${pkg.name}`, pkg)
    })
  }

  /**
   * Installs all required peer dependencies
   *
   * @decorator `@bind`
   */
  @bind
  public install(): void {
    const required = this.project.get('peers')

    required &&
      this.project.app.dependencies.install(
        Object.values(required),
      )
  }
}
