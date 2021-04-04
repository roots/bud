import type {Webpack, Build} from '@roots/bud-typings'
import {Service} from '@roots/bud-framework'

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [📦 @roots/bud-build](https://www.npmjs.com/package/@roots/bud-build)
 */
export default class extends Service implements Build {
  /**
   * Service ident
   */
  public name = '@roots/bud-build'

  /**
   * Service registration
   */
  public register(): void {
    this.make = this.make.bind(this)
  }

  /**
   * Framework lifecycle
   */
  public registered(): void {
    this.get('rules')(this.app)
    this.get('items')(this.app)
    this.get('config')(this.app)
  }

  /**
   * Make webpack config
   *
   * Produce a final webpack config.
   */
  public make(): Webpack.Configuration {
    return this.subscribe('build', '@roots/bud-build/make')
  }
}
