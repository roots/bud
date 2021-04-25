import {Command} from './Command'
import * as flags from './flags'
import {mergeWith} from 'lodash'
import {App, Bud, services} from '@roots/bud'
import {cosmiconfig as conf} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

export default class Build extends Command {
  public app: Bud

  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.boolean(),
    ci: flags.boolean(),
    debug: flags.boolean(),
    log: flags.boolean(),
    hash: flags.boolean(),
    install: flags.boolean(),
    'locations.project': flags.string(),
    'locations.src': flags.string(),
    'locations.dist': flags.string(),
    'locations.storage': flags.string(),
    manifest: flags.boolean(),
    'server.middleware.hot': flags.boolean(),
    'server.middleware.proxy': flags.boolean(),
    'server.proxy.host': flags.string(),
    'server.proxy.port': flags.string(),
  }

  public mode: 'development' | 'production'

  public configMerge(...configs: {[key: string]: any}[]) {
    return configs.reduce((a, c) => mergeWith(a, c), {})
  }

  public async conf() {
    const res = await conf(this.app.name, {
      searchPlaces: [
        `.${this.app.name}rc`,
        `.${this.app.name}rc.json`,
        `.${this.app.name}rc.yaml`,
        `.${this.app.name}rc.yml`,
      ],
      loaders: {
        '.ts': TypeScriptLoader,
      },
    }).search()

    return res?.config
  }

  public async build() {
    const res = await conf(this.app.name, {
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

  public async run() {
    const flags = this.parse(Build).flags
    this.app = new App().bootstrap(services).lifecycle()

    let config = await this.conf()

    this.app.mode = this.mode
    await this.build()

    Object.entries(this.configMerge(config, flags)).forEach(
      ([k, v]) => {
        this.app.store.set(k, v)
      },
    )

    this.app.run()
  }
}
