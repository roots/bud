import Command, {flags} from '@oclif/command'
import {App, Bud, services} from '@roots/bud'
import {mergeWith} from 'lodash'
import {cosmiconfig} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

const Conf = require('conf')
const conf = new Conf({default: {}})

export abstract class Base extends Command {
  public app: Bud

  public async staticConfig() {
    const config = await this.appConfig()
    return mergeWith(conf.store ?? {}, config)
  }

  public async mergedConfig(runtimeConfig) {
    const buildConfig = await this.staticConfig()
    return mergeWith(buildConfig, runtimeConfig)
  }

  public async build() {
    const res = await cosmiconfig(this.app.name, {
      searchPlaces: [
        `${this.app.name}.config.ts`,
        `${this.app.name}.config.js`,
        `.${this.app.name}rc.ts`,
        `.${this.app.name}rc.js`,
      ],
      loaders: {
        '.ts': TypeScriptLoader,
      },
    }).search()

    this.app = res?.config(this.app)
  }

  public async appConfig() {
    const res = await cosmiconfig(this.app.name, {
      searchPlaces: [
        'package.json',
        `.${this.app.name}rc`,
        `.${this.app.name}rc.json`,
        `.${this.app.name}rc.yaml`,
        `.${this.app.name}rc.yml`,
      ],
    }).search()

    return res?.config
  }

  public async init() {
    this.app = new App().bootstrap(services)
    this.app.name = 'sage'

    this.app.lifecycle()
  }
}

export {flags}
