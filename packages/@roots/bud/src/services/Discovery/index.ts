import {Framework, Service} from '@roots/bud-framework'
import type {Discovery as Contract} from '@roots/bud-typings'
import {boundMethod as bind} from 'autobind-decorator'

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
   * Project info: get accessor
   */
  public get projectInfo(): {[key: string]: any} {
    return this.fs.readJsonSync(
      this.disk('project').get('package.json'),
    )
  }

  /**
   * Package paths: get accessor
   */
  public get packagePaths() {
    return this.glob.sync([
      this.modulePath('@roots/sage/package.json'),
      this.modulePath('bud-*/package.json'),
      this.modulePath('**/bud-*/package.json'),
    ])
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
  @bind
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
  @bind
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
  @bind
  public registerDiscovered() {
    this.app.store.isTrue('options.discover') &&
      this.every((name: string) => {
        const extension = require(name)
        this.app.extensions.add(extension)
      })
  }

  /**
   * Gather information on packages
   */
  @bind
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
