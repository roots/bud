import {cosmiconfig, Options} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework} from '@roots/bud'

export class Config {
  public app: Framework

  public searchPlaces: Options['searchPlaces']

  public loaders: Options['loaders'] = {
    '.ts': TypeScriptLoader,
  }

  public constructor(app: Framework, searchPlaces) {
    this.app = app
    this.searchPlaces = searchPlaces
  }

  @bind
  public async get() {
    const res = await cosmiconfig(this.app.name, {
      searchPlaces: this.searchPlaces,
      loaders: this.loaders,
    }).search()

    return res?.config ?? {}
  }

  @bind
  public async apply() {
    const config = await this.get()

    if (config.extensions) {
      await Promise.all(
        config.extensions.map(moduleImport => {
          this.app.extensions.add(require(moduleImport))
        }),
      )
    }

    Object.keys(config)
      .filter(key => key !== 'extensions')
      .forEach(key => {
        this.app[key] && this.app[key](config[key])
      })
  }
}
