import {Discovery} from '@roots/bud-typings'
import Service from '../Service'

declare interface Discovered {
  [key: string]: ExtensionItem
}
declare interface ExtensionItem {
  path: string
  type: 'preset' | 'extension'
  core: boolean
  [key: string]: any
}

/**
 * Discovery
 */
export default class extends Service implements Discovery {
  /**
   * Service ident
   */
  public name = 'discover'

  /**
   * Service register
   */
  public register(): void {
    this.filterUnique = this.filterUnique.bind(this)
    this.modulePath = this.modulePath.bind(this)
    this.discoverPackages = this.discoverPackages.bind(this)
  }

  /**
   * Service boot.
   */
  public boot(): void {
    this.app.sequence([
      () => this.discoverPackages(),
      () =>
        this.every(
          (name: string, pkg: {name: string; path: string}) => {
            this.app.disk.make(pkg.name, {
              baseDir: pkg.path,
            })
          },
        ),
      () =>
        this.app.store.enabled('options.discover') &&
        this.every(
          (name: string, pkg: {name: string; path: string}) => {
            if (!this.app.store.enabled('options.discover'))
              return

            const extension = require(name)
            this.app.extensions.add(name, extension)
          },
        ),
    ])
  }

  /**
   * Collect packages.
   */
  public discoverPackages(): void {
    const packageReducer = (pkgs: Discovered, pkg: string) => {
      const extension: {
        name: string
        [key: string]: any
      } = this.fs.readJsonSync(pkg)

      const isCore = extension.name?.includes('@roots/')
      const isPreset = extension.keywords?.includes('bud-preset')
      const isExtension = extension.keywords?.includes(
        'bud-extension',
      )

      if (!isExtension) return pkgs

      return {
        ...pkgs,
        [extension.name]: {
          ...extension,
          path: this.dirname(pkg),
          type: isExtension ?? isPreset,
          core: isCore,
        },
      }
    }

    const extensions = this.glob
      .sync([
        this.modulePath('@roots/sage/package.json'),
        this.modulePath('bud-*/package.json'),
        this.modulePath('**/bud-*/package.json'),
      ])
      .filter(this.filterUnique)
      .reduce(packageReducer, {})

    this.setStore(extensions)
  }
}
