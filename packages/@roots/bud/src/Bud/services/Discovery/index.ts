import {
  Discovery as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {dirname, join} from 'path'

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

class Discovery extends Contract implements Service<Repository> {
  public name = 'discovery'

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

    /**
     * Find out about all the buddy things
     */
    this.discover('dependencies').discover('devDependencies')
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

  /**
   * Returns path for a module name (if findable)
   */
  @bind
  public resolveModuleByName(name: string) {
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
   */
  @bind
  public resolveManifestByName(name: string) {
    const path = this.resolveModuleByName(name)
    return path ? readJsonSync(join(path, '/package.json')) : {}
  }

  /**
   * Returns true if a module is a bud
   */
  @bind
  public isModuleExtension(name: string): boolean {
    return name?.includes('@roots') || name?.includes('bud-')
  }

  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   */
  @bind
  public discover(
    type: 'dependencies' | 'devDependencies',
  ): Discovery {
    this.has(type) &&
      this.getKeys(type).map((name: string) => {
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
          !this.has(`extensions.${manifest.name}`) &&
            this.set(`extensions.${manifest.name}`, {
              name: manifest.name,
              ver: manifest.version,
              type: type,
            })

          /**
           * Add to resolvable paths
           */
          !this.resolveFrom.includes(
            this.resolveModuleByName(manifest.name),
          ) &&
            this.resolveFrom.push(
              this.resolveModuleByName(manifest.name),
            )

          /**
           * Dive through peer deps
           */
          manifest.peerDependencies &&
            Object.entries(manifest.peerDependencies).forEach(
              ([depName, ver]) => {
                !this.has(`peers.${depName}`) &&
                  this.set(`peers.${depName}`, {
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
            this.isModuleExtension(name) &&
              !this.has(`extensions.${name}`) &&
              resolvePeers(this.resolveManifestByName(name))
          })
        }

        /**
         * Checks each key in project level package.json
         * to determine if it is a bud extension. If so it
         * engages resolvePeers
         */
        this.isModuleExtension(name) &&
          resolvePeers(this.resolveManifestByName(name))
      })

    return this
  }

  /**
   * Registers all bud related extensions with bud.extensions
   */
  @bind
  public registerDiscovered() {
    this.getValues('extensions').forEach(pkg => {
      if (!pkg?.name) return

      this.app.extensions.add(require(pkg.name))
      this.set(`registered.${pkg.name}`, pkg)
    })
  }

  /**
   * Installs all required peer dependencies
   */
  @bind
  public install(): void {
    const required = this.get<Repository['peers']>('peers')

    required &&
      this.app.dependencies.install(Object.values(required))
  }
}

export {Discovery}
