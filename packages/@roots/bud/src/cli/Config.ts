import {
  cosmiconfig,
  cosmiconfigTsLoader,
} from '@roots/bud-support'

import {Framework, Module} from '../'

export class Config {
  public app: Framework

  public options: cosmiconfig.Options

  public constructor(
    app: Framework,
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
