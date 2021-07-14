import {cosmiconfig, Options} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework, Module} from '@roots/bud-framework'

export class Config {
  public target: Framework
  public options: Options

  public constructor(
    app: Framework,
    searchPlaces: Options['searchPlaces'],
  ) {
    this.target = app

    this.options = {
      searchPlaces,
      loaders: {
        '.ts': TypeScriptLoader,
      },
    }
  }

  @bind
  public async get() {
    const res = await cosmiconfig(
      this.target.name,
      this.options,
    ).search()

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
