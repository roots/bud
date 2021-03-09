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
   * Service ident.
   */
  public name = 'extensions'

  /**
   * Service register.
   */
  public register(): void {
    this.boot = this.boot.bind(this)
    this.add = this.add.bind(this)
    this.use = this.use.bind(this)
    this.make = this.make.bind(this)
    this.makeAll = this.makeAll.bind(this)
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.every((name, extension) => {
      return this.add(name, extension)
    })
  }

  /**
   * Add an extension
   */
  public add(name, extension: Extension): void {
    this.info({msg: 'Adding extension'})

    this.set(
      name,
      new Extension(this.app.get, extension)._register()._boot(),
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
    const plugins = this.getKeys()
      .map(name =>
        this.app.hooks.filter<Webpack.Plugin>(
          `webpack.plugins.${name}`,
          this.get(name)?.makePlugin ? this.make(name) : null,
        ),
      )
      .filter(ext => !isNull(ext)) as Webpack.Plugin[]

    return plugins
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

  public discard(pkg: string): Service['app'] {
    this.remove(pkg)
    this.app.disk.remove(pkg)

    return this.app
  }
}
