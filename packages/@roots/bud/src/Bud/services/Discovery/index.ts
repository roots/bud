import {
  Discovery as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {dirname, join} from 'path'

interface Repository extends Framework.Index {
  name: string
  peers: Framework.Index<{
    source: string
    name: string
    ver: string
    type: 'dependencies' | 'devDependencies'
  }>
  dependencies: Framework.Index<string>
  devDependencies: Framework.Index<string>
  required: Framework.Index<{
    source: string
    name: string
    ver: string
    type: 'dependencies' | 'devDependencies'
  }>
}

class Discovery extends Contract implements Service<Repository> {
  public name = 'discovery'

  public repository: Repository = {
    name: null,
    peers: {},
    dependencies: {},
    devDependencies: {},
    required: {},
  }

  /**
   * Array of paths for webpack to resolve modules from
   */
  public resolveFrom: string[] = []

  @bind
  public registered(): void {
    this.setStore(
      readJsonSync(this.app.path('project', 'package.json')),
    )

    this.discover('dependencies').discover('devDependencies')
  }

  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }

  @bind
  public hasPeerDependency(pkg: string): boolean {
    return (
      this.has(`devDependencies.${pkg}`) ||
      this.has(`dependencies.${pkg}`)
    )
  }

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

  @bind
  public resolveManifestByName(name: string) {
    const path = this.resolveModuleByName(name)
    return path ? readJsonSync(join(path, '/package.json')) : {}
  }

  @bind
  public isModuleExtension(name: string): boolean {
    return name?.includes('@roots') || name?.includes('bud-')
  }

  @bind
  public discover(
    type: 'dependencies' | 'devDependencies',
  ): Discovery {
    this.has(type) &&
      this.getEntries(type).map(([name, ver]) => {
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
              resolvePeers(this.resolveManifestByName(name))
          })
        }

        this.isModuleExtension(name) &&
          resolvePeers(this.resolveManifestByName(name))
      })

    return this
  }

  @bind
  public registerDiscovered() {
    this.getValues('extensions').forEach(pkg => {
      if (!pkg?.name) return

      this.app.extensions.add(require(pkg.name))
      this.set(`registered.${pkg.name}`, pkg)
    })
  }

  @bind
  public install(): void {
    const required = this.get<Repository['peers']>('peers')

    required &&
      this.app.dependencies.install(Object.values(required))
  }
}

export {Discovery}
