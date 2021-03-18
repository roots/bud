import {Framework, Service} from '@roots/bud-framework'
import {Discovery as Contract} from '@roots/bud-typings'

/**
 * Framework/Discovery
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Discovery extends Service implements Contract {
  /**
   * Service name
   */
  public name = 'framework/discovery'

  /**
   * Service register
   */
  public register(): void {
    this.discoverPackages = this.discoverPackages.bind(this)
    this.setDisks = this.setDisks.bind(this)
    this.reducePackages = this.reducePackages.bind(this)
    this.registerDiscovered = this.registerDiscovered.bind(this)
  }

  /**
   * Service boot.
   */
  public boot(bootSequence = []): void {
    bootSequence.push(this.discoverPackages)
    bootSequence.push(this.setDisks)
    bootSequence.push(this.registerDiscovered)

    this.app.sequence(bootSequence)
  }

  /**
   * Collect packages.
   */
  public discoverPackages(): void {
    this.setStore(
      this.packagePaths
        .filter(this.filterUnique)
        .reduce(this.reducePackages, {}),
    )
  }

  /**
   * Register package disks
   */
  public setDisks() {
    this.every(
      (name: string, pkg: {name: string; path: string}) => {
        this.app.disk.make(name, {
          baseDir: pkg.path,
        })
      },
    )
  }

  /**
   * Register discovered packages as extensions
   */
  public registerDiscovered() {
    this.app.store.isTrue('options.discover') &&
      this.every((name: string) => {
        const extension = require(name)
        this.app.extensions.add(name, extension)
      })
  }

  /**
   * Get package paths
   */
  public get packagePaths() {
    return this.glob.sync([
      this.modulePath('@roots/sage/package.json'),
      this.modulePath('bud-*/package.json'),
      this.modulePath('**/bud-*/package.json'),
    ])
  }

  /**
   * Gather information on packages
   */
  public reducePackages(pkgs: Framework.Pkgs, pkg: string) {
    const json = this.fs.readJsonSync(pkg)

    Object.assign(json, {
      isCore: json.name?.includes('@roots/'),
      isPreset: json.keywords?.includes('bud-preset'),
      isExtension: json.keywords?.includes('bud-extension'),
    })

    if (!json.isExtension) return pkgs

    return {
      ...pkgs,
      [json.name]: {
        ...json,
        path: this.dirname(pkg),
        type: 'extension',
        core: json.isCore,
      },
    }
  }
}
