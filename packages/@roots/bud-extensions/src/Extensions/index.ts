import type {Module} from '@roots/bud-framework'
import type Webpack from 'webpack/types'
import {boundMethod as bind} from 'autobind-decorator'
import {isUndefined} from 'lodash'
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
export class Extensions extends Service {
  /**
   * Service ident.
   */
  public name = '@roots/bud-extensions'

  /**
   * Service boot
   */
  @bind
  public register(): void {
    this.every((name: string, extension: Module) => {
      return this.registerExtension(extension)
    })
  }

  /**
   * Service boot
   */
  @bind
  public boot(): void {
    this.every((name: string, extension: Module) => {
      return this.bootExtension(extension)
    })
  }

  @bind
  public registerExtension(extension: Module): void {
    this.log(`Registering extension: %s`, extension.name)
    this.set(
      extension.name,
      new Extension(this.app, extension).register(this.app),
    )
  }

  @bind
  public bootExtension(extension: Module): void {
    this.log(`Booting extension: %s`, extension.name)
    this.set(
      extension.name,
      this.get(extension.name).boot(this.app),
    )
  }

  /**
   * Add an extension
   */
  @bind
  public add(extension: Module): void {
    this.log(`Adding extension: %s`, extension.name)
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  /**
   * Make all extensions.
   *
   * Returns a webpack-ready array
   */
  @bind
  public make(): Webpack.WebpackPluginInstance[] {
    this.log(`Building extensions: %s`, this.getKeys())

    const plugins = this.getKeys()
      .map(name => this.get(name).make)
      .filter(
        ext => !isUndefined(ext),
      ) as Webpack.WebpackPluginInstance[]

    return plugins
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
