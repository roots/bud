import {Module} from '@roots/bud-framework'
import {
  cosmiconfig,
  cosmiconfigTsLoader,
} from '@roots/bud-support'

import Bud from '../Bud'

/**
 * Configuration class
 *
 * @internal
 */
export default class Config {
  /**
   * {@link Bud} instance
   */
  public app: Bud

  /**
   * {@link cosmiconfig.Options}
   */
  public options: cosmiconfig.Options

  /**
   * Class constructor
   *
   * @param app - {@link Bud.implementation}
   * @param searchPlaces - cosmiconfig search patterns
   */
  public constructor(
    app: Bud,
    searchPlaces: cosmiconfig.Options['searchPlaces'],
  ) {
    this.app = app

    this.options = {
      searchPlaces,
      packageProp: this.app.name,
      loaders: {
        '.ts': cosmiconfigTsLoader,
      },
    }

    this.get = this.get.bind(this)
    this.apply = this.apply.bind(this)
  }

  public async get() {
    const res = await cosmiconfig
      .cosmiconfig(this.app.name, this.options)
      .search()

    return (
      res?.config ??
      function (app) {
        return app
      }
    )
  }

  public async apply() {
    const config = await this.get()

    if (!config) return this.app

    if (config.extensions) {
      config.extensions.map(mod => {
        const ext: Module = require(mod)
        this.app.use(ext as any)
      })
    }

    Object.entries(config)
      .filter(([key]) => key !== 'extensions')
      .forEach(([key, value]) => {
        this.app[key] && this.app[key](value)
      })

    return this.app
  }
}
