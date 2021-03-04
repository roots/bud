import type {
  Container,
  Webpack,
  Build,
  Store,
} from '@roots/bud-typings'
import {isObject} from 'lodash'
import Service from './Service'

declare type Cfg = Webpack.Configuration

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 packages/bud-build](https://github.com/roots/bud/tree/stable/packages/bud-build)
 * [📦 @roots/bud-build](https://www.npmjs.com/package/@roots/bud-build)
 */
export default class extends Service implements Build {
  /**
   * Service ident
   */
  public name = 'build'

  /**
   * Configuration continer
   */
  public webpack: Container<Webpack.Configuration>

  /**
   * Service registration
   */
  public register(): void {
    this.make = this.make.bind(this)
    this.makeWebpackProp = this.makeWebpackProp.bind(this)
  }

  /**
   * Service registration
   */
  public boot(): void {
    this.webpack = this.app.makeContainer()
    this.make()
  }

  /**
   * Make webpack config
   *
   * Produce a final webpack config.
   */
  public make(): Cfg {
    this.service('store').each('webpack', (key: keyof Cfg) => {
      this.makeWebpackProp(key)
    })

    return this.webpack.all()
  }

  /**
   * Make webpack config key value
   */
  public makeWebpackProp(configKey: keyof Cfg): void {
    if (
      this.app.store.has(`webpack.${configKey}`) &&
      this.app.store.disabled(`webpack.${configKey}`)
    ) {
      this.warn({
        configKey,
        msg: 'Webpack prop disabled.',
      })

      return
    }

    const value = this.app.access(
      this.app
        .get<Store>('store')
        .get(`webpack.${configKey}` as Store.Keys),
    )

    this.info({
      configKey,
      value: isObject(value) ? Object.entries(value) : value,
      msg: `Webpack output`,
    })

    this.webpack.set(configKey, value)
  }
}
