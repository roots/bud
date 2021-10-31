import {
  bind,
  cosmiconfig,
  cosmiconfigTsLoader,
} from '@roots/bud-support'

import {Bud} from '../../../Bud'

export class Config {
  public cosmiconfig = cosmiconfig.cosmiconfig
  public explorer

  public constructor(
    public app: Bud,
    searchPlaces: cosmiconfig.Options['searchPlaces'],
  ) {
    searchPlaces.forEach(s =>
      this.app.info(`Processing ${s} configuration`),
    )

    this.explorer = this.cosmiconfig(this.app.name, {
      loaders: {'.ts': cosmiconfigTsLoader},
      ignoreEmptySearchPlaces: true,
      stopDir: this.app.path('project'),
      searchPlaces,
    })
  }

  @bind
  public async search() {
    return await this.explorer.search()
  }

  @bind
  public clearCaches() {
    this.explorer.clearCaches()
  }
}
