import {
  cosmiconfig,
  cosmiconfigTsLoader,
} from '@roots/bud-support'

import {Bud} from '../Bud'

export default class Config {
  public config

  public constructor(
    public app: Bud,
    searchPlaces: cosmiconfig.Options['searchPlaces'],
  ) {
    searchPlaces.forEach(s =>
      this.app.info(`Processing ${s} configuration`),
    )

    this.config = cosmiconfig.cosmiconfig(this.app.name, {
      loaders: {
        '.ts': cosmiconfigTsLoader,
      },
      cache: this.app.cache.valid,
      ignoreEmptySearchPlaces: true,
      stopDir: this.app.path('project'),
      searchPlaces: searchPlaces,
    })

    this.get = this.get.bind(this)
  }

  public async get() {
    const res = await this.config.search()

    return res
  }
}
