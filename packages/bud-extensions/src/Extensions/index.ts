import {Logger} from '@roots/bud-framework'
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

    this.processed = this.app.makeContainer()
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
    this.app.logger.info({name}, 'Adding extension')

    this.set(
      name,
      new Extension(this.app.get, extension).register().boot(),
    )
    this.processed.set(name, true)
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
    const plugins = this.processed
      .getKeys()
      .map(name =>
        this.get(name)?.makePlugin ? this.make(name) : null,
      )
      .filter(
        extension => !isNull(extension),
      ) as Webpack.Plugin[]

    this.service<Logger>('logger').info({
      plugins,
      count: plugins?.length,
      extensionsState: this,
      msg: 'make plugins',
    })

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
}
