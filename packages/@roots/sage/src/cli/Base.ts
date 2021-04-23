import Command, {flags} from '@oclif/command'
import {App, Bud, services} from '@roots/bud'
import {mergeWith} from 'lodash'
import {cosmiconfigSync} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

const Conf = require('conf')
const conf = new Conf({default: {}})

export abstract class Base extends Command {
  public app: Bud

  public staticConfig() {
    return mergeWith(conf.store ?? {}, this.appConfig())
  }

  public mergedConfig(runtimeConfig) {
    return mergeWith(this.staticConfig(), runtimeConfig)
  }

  public build() {
    return cosmiconfigSync(this.app.name, {
      searchPlaces: [
        `${this.app.name}.config.ts`,
        `${this.app.name}.config.js`,
        `.${this.app.name}rc.ts`,
        `.${this.app.name}rc.js`,
      ],
      loaders: {
        '.ts': TypeScriptLoader,
      },
    })
      .search()
      ?.config(this.app)
  }

  public appConfig() {
    return (
      cosmiconfigSync(this.app.name, {
        searchPlaces: [
          'package.json',
          `.${this.app.name}rc`,
          `.${this.app.name}rc.json`,
          `.${this.app.name}rc.yaml`,
          `.${this.app.name}rc.yml`,
        ],
      }).search()?.config ?? {}
    )
  }

  public async init() {
    this.app = new App().bootstrap(services)
    this.app.name = 'sage'

    this.app.lifecycle()
  }
}

export {flags}
