import {Module} from '@roots/bud-framework'
import {bind, Webpack, isUndefined} from '@roots/bud-support'
import Extension from './Extension'
import Service from './Service'

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://github.com/roots/bud/blob/stable/README.md)
 */
export default class extends Service {
  /**
   * Service ident.
   */
  public name = '@roots/bud-extensions'

  /**
   * Service boot
   */
  @bind
  public boot(): void {
    this.every((name: string, extension: Module) => {
      return this.add(extension)
    })
  }

  /**
   * Add an extension
   */
  @bind
  public add(extension: Module): void {
    this.log(`Adding extension: %s`, extension.name)

    this.set(
      extension.name,
      new Extension(this.app, extension).register().boot(),
    )
  }

  /**
   * Make all extensions.
   *
   * Returns a webpack-ready array
   */
  @bind
  public make(): Webpack.WebpackPluginInstance[] {
    const plugins = this.getKeys()
      .map(name => this.get(name).make)
      .filter(
        ext => !isUndefined(ext),
      ) as Webpack.WebpackPluginInstance[]

    return plugins
  }

  /**
   * Register an extension from a pkg name
   */
  @bind
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.app.disk.make(pkg, {
      baseDir: path,
    })

    this.add(require(path))

    return this
  }

  /**
   * Discard a registered extension
   */
  @bind
  public discard(pkg: string): Service['app'] {
    this.remove(pkg)
    this.app.disk.remove(pkg)

    return this.app
  }
}
