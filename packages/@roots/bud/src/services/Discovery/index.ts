import {Discovery as Base} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {cosmiconfigSync} from 'cosmiconfig'
import {readJsonSync} from 'fs-extra'
import resolvePkg from 'pkg-up'
import {dirname} from 'path'

export class Discovery extends Base {
  public name = 'service/discovery'

  @bind
  public register(): void {
    this.setStore(
      readJsonSync(this.app.path('project', 'package.json')),
    )
    this.discover('dependencies')
    this.discover('devDependencies')
    this.registerDiscovered()

    this.has('peers') &&
      this.getValues('peers').forEach(this.resolvePeers)
  }

  @bind
  public discover(
    type: 'dependencies' | 'devDependencies',
  ): void {
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
  public registerDiscovered() {
    if (!this.app.store.isTrue('discover')) {
      return
    }

    this.each('peers', (_name, pkg) => {
      if (!pkg) return

      if (pkg?.type === 'extension' || pkg?.type === 'preset') {
        this.app.extensions.add(require(pkg.name))
      }
    }).each('peers', (_name, pkg) => {
      if (pkg?.type === 'extension' || pkg?.type === 'preset') {
        this.app.extensions.add(require(pkg.name))
      }
    })
  }

  @bind
  public mapConfig(pkg: {name: string; dir: string}) {
    if (!pkg) return {}

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
    this.each('peers', (name, peer) => {
      peer?.dependencies?.production &&
        this.app.dependencies.install(
          peer.dependencies.production,
          name,
        )

      peer?.dependencies?.dev &&
        this.app.dependencies.installDev(
          peer.dependencies.dev,
          name,
        )
    })
  }

  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }
}
