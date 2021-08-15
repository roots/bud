import {
  cosmiconfig,
  cosmiconfigTsLoader,
} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'

import {Framework, Module} from '../'

export class Config {
  public target: Framework
  public options: cosmiconfig.Options

  public constructor(
    app: Framework,
    searchPlaces: cosmiconfig.Options['searchPlaces'],
  ) {
    this.target = app

    this.options = {
      searchPlaces,
      loaders: {
        '.ts': cosmiconfigTsLoader,
      },
    }
  }

  @bind
  public async get() {
    const res = await cosmiconfig
      .cosmiconfig(this.target.name, this.options)
      .search()

    return res?.config ?? {}
  }

  @bind
  public async apply() {
    const config = await this.get()

    if (config.extensions) {
      config.extensions.map(mod => {
        const ext: Module = require(mod)
        this.target.use(ext as any)
      })
    }

    Object.entries(config)
      .filter(([key]) => key !== 'extensions')
      .forEach(([key, value]) => {
        this.target[key] && this.target[key](value)
      })

    return this.target
  }
}
