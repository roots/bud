import {Discovery as Base} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {cosmiconfigSync} from 'cosmiconfig'
import {readJsonSync} from 'fs-extra'
import resolvePkg from 'pkg-up'
import {dirname} from 'path'

export class Discovery extends Base {
  public name = 'service/discovery'

  public repository: {
    name: string
    peers: {}
    dependencies: {
      [key: string]: string
    }
    devDependencies: {
      [key: string]: string
    }
    required: {
      [key: string]: {
        source: string
        name: string
        ver: string
        type: 'dependencies' | 'devDependencies'
      }
    }
  } = {
    name: null,
    peers: {},
    dependencies: {},
    devDependencies: {},
    required: {},
  }

  @bind
  public register(): void {
    this.setStore(
      readJsonSync(this.app.path('project', 'package.json')),
    )
    this.discover('dependencies')
      .discover('devDependencies')
      .setRequired()

    this.app.store.isTrue('discover') &&
      this.registerDiscovered()

    this.has('peers') &&
      this.getValues('peers').forEach(this.resolvePeers)
  }

  @bind
  public discover(
    type: 'dependencies' | 'devDependencies',
  ): Discovery {
    this.has(type) &&
      this.getEntries(type).map(([name, ver]) => {
        if (!name?.includes('bud') && !name?.includes('sage'))
          return

        const dir = dirname(
          resolvePkg.sync({cwd: dirname(require.resolve(name))}),
        )
        if (!dir) return

        this.set(`peers.${name}`, {
          name,
          ver,
          dir,
          ...this.mapConfig({name, dir}),
        })

        !this.resolveFrom?.includes(dir) &&
          this.resolveFrom.push(dir)
      })

    return this
  }

  @bind
  public resolvePeers(pkg): void {
    if (!pkg.peers) {
      return
    }

    pkg.peers.forEach(peer => {
      const dir = dirname(
        resolvePkg.sync({
          cwd: dirname(require.resolve(peer)),
        }),
      )

      if (!dir) return

      this.set(`peers.${peer}`, {
        name: peer,
        dir,
        ...this.mapConfig({name: peer, dir}),
      })

      !this.resolveFrom.includes(dir) &&
        this.resolveFrom.push(dir)
    })
  }

  @bind
  private setRequired() {
    this.each('peers', (source, pkg) => {
      if (!pkg) return

      if (pkg.dependencies?.dev) {
        Object.entries(pkg.dependencies.dev).forEach(
          ([name, ver]) => {
            this.set(`required.${name}`, {
              source,
              name,
              ver,
              type: 'devDependencies',
            })
          },
        )
      }

      if (pkg.dependencies?.production) {
        Object.entries(pkg.dependencies.production).forEach(
          ([name, ver]) => {
            this.set(`required.${name}`, {
              source,
              name,
              ver,
              type: 'dependencies',
            })
          },
        )
      }
    })
  }

  @bind
  public registerDiscovered() {
    this.each('peers', (_name, pkg) => {
      if (!pkg) return

      if (pkg?.type === 'extension' || pkg?.type === 'preset') {
        this.app.extensions.add(require(pkg.name))
      }
    })
  }

  @bind
  public mapConfig(pkg: {name: string; dir: string}) {
    if (!pkg) return

    const cosmi = cosmiconfigSync(pkg.name, {
      searchPlaces: ['manifest.yml'],
    }).search(pkg.dir)

    return cosmi?.config
      ? {
          ...cosmi.config,
          type: cosmi.config.type ?? 'external',
          manifestPath: cosmi.filepath,
        }
      : {}
  }

  @bind
  public install(): void {
    const required =
      this.get<{
        [key: string]: {
          source: string
          name: string
          ver: string
          type: 'dependencies' | 'devDependencies'
        }
      }>('required')

    required
      ? this.app.dependencies.install(
          Object.values(
            this.get<{
              [key: string]: {
                source: string
                name: string
                ver: string
                type: 'dependencies' | 'devDependencies'
              }
            }>('required'),
          ),
        )
      : console.log('Nothing to install')
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
}
