import {Webpack, isNull} from '@roots/bud-support'
import Extension from './Extension'
import Service from './Service'

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://github.com/roots/bud/blob/stable/README.md)
 * [📦 @roots/bud-extensions](https://github.com/roots/bud/blob/stable/packages/bud-extension/readme.md)
 */
export default class extends Service {
  /**
   * Service register
   */
  public register(): void {
    this.boot = this.boot.bind(this)
    this.add = this.add.bind(this)
    this.use = this.use.bind(this)
    this.make = this.make.bind(this)
    this.makeAll = this.makeAll.bind(this)

    this.mutateStoreEntries((name, extension) => {
      return new Extension(this.app.get, extension).register()
    })
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.mutateStoreEntries((name, ext) => ext.boot())
  }

  /**
   * Add an extension
   */
  public add(name, extension): void {
    this.set(
      name,
      new Extension(this.app.get, extension).register().boot(),
    )
  }

  /**
   * Make an extension
   */
  public make(request: string): Webpack.Plugin | null {
    return this.get(request).makePlugin()
  }

  /**
   * Make all extensions.
   *
   * Returns a webpack-ready array
   */
  public makeAll(): Webpack.Plugin[] {
    let plugins: Webpack.Plugin[] | null[] = []

    this.every((name, extension) => {
      extension?.makePlugin
        ? plugins.push(extension.makePlugin())
        : console.error(name, extension)
    })

    return plugins.filter(extension => !isNull(extension))
  }

  /**
   * Register an extension from a pkg name (string) [🏠 Internal]
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.app.disk.make(pkg, {
      baseDir: path,
    })

    this.add(pkg, require(path))

    return this
  }
}
