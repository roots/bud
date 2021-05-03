import {Base} from './Base'
import {boundMethod as bind} from 'autobind-decorator'
import {sync} from 'globby'
import {cosmiconfigSync} from 'cosmiconfig'
import {dirname} from 'path'
import {readJsonSync} from 'fs-extra'

export class Discovery extends Base {
  @bind
  public register(): void {
    this.pkgJson = readJsonSync(
      this.app.path('project', 'package.json'),
    )

    this.discoverPackages()
    this.registerDiscovered()
  }

  @bind
  public discoverPackages(): void {
    const manifests = sync([
      `${__dirname}/../../../../../../@roots/*/manifest.yml`,
      `${__dirname}/../../../../../../{!@roots}/bud-*/manifest.yml`,
    ]).map(manifest => require.resolve(manifest))

    manifests.map(this.mapConfig)
  }

  @bind
  public registerDiscovered() {
    this.app.store.isTrue('discover') &&
      this.every((name: string) => {
        const extension = require(name)
        this.app.extensions.add(extension)
      })
  }

  @bind
  public mapConfig(pkg: string) {
    if (!pkg) return

    const pkgDir = dirname(pkg.replace('/manifest.yml', ''))

    const cosmi = cosmiconfigSync(pkgDir, {
      searchPlaces: ['manifest.yml'],
    }).search(dirname(pkg))

    const deps = Object.keys({
      ...(this.pkgJson?.dependencies ?? {}),
      ...(this.pkgJson?.devDependencies ?? {}),
    })

    cosmi &&
      !cosmi.isEmpty &&
      cosmi?.config?.name &&
      deps?.includes(cosmi.config.name) &&
      this.set(cosmi.config.name, {
        ...cosmi.config,
        modulePath: dirname(cosmi.filepath),
        configPath: cosmi.filepath,
      })
  }

  @bind
  public install(): void {
    this.every((_name, pkg) => {
      pkg?.dependencies?.production &&
        this.app.dependencies.install(
          pkg.dependencies.production,
          pkg.name,
        )

      pkg?.dependencies?.dev &&
        this.app.dependencies.installDev(
          pkg.dependencies.dev,
          pkg.name,
        )
    })
  }
}
