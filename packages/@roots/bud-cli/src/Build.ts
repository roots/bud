import {Command} from './Command'
import * as flags from './flags'
import {mergeWith} from 'lodash'
import {App, Bud, services} from '@roots/bud'
import {cosmiconfig as conf} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {boundMethod as bind} from 'autobind-decorator'

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
    manifest: flags.boolean(),
  }

  public mode: 'development' | 'production'

  public configMerge(...configs: {[key: string]: any}[]) {
    return configs.reduce((a, c) => mergeWith(a, c), {})
  }

  @bind
  public async conf() {
    const res = await conf(this.app.name, {
      searchPlaces: [
        `.${this.app.name}rc.json`,
        `.${this.app.name}rc.yaml`,
        `.${this.app.name}rc.yml`,
        `.${this.app.name}.json`,
        `.${this.app.name}.yaml`,
        `.${this.app.name}.yml`,
      ],
    }).search()

    return res?.config ? this.app.container(res.config) : null
  }

  @bind
  public async productionConf() {
    const res = await conf(this.app.name, {
      searchPlaces: [
        `.${this.app.name}.production.rc.json`,
        `.${this.app.name}.production.rc.yaml`,
        `.${this.app.name}.production.rc.yml`,
        `.${this.app.name}.production.json`,
        `.${this.app.name}.production.yaml`,
        `.${this.app.name}.production.yml`,
      ],
    }).search()

    return res?.config ? this.app.container(res.config) : null
  }

  @bind
  public async developmentConf() {
    const res = await conf(this.app.name, {
      searchPlaces: [
        `.${this.app.name}.development.rc.json`,
        `.${this.app.name}.development.rc.yaml`,
        `.${this.app.name}.development.rc.yml`,
        `.${this.app.name}.development.json`,
        `.${this.app.name}.development.yaml`,
        `.${this.app.name}.development.yml`,
      ],
    }).search()

    return res?.config ? this.app.container(res.config) : null
  }

  @bind
  public async projectBuilder() {
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

    if (!res?.config) return

    this.app = res.config(this.app)
  }

  public async run() {
    const flags = this.parse(Build).flags

    this.app = new App().bootstrap(services).lifecycle()
    this.app.mode = this.mode

    /**
     * Config
     */
    let config = await this.conf()
    if (config) {
      config.has('extensions') &&
        config.get('extensions').forEach(ext => {
          this.app.use(require(ext))
        })

      config
        .getKeys()
        .filter(key => key !== 'extensions')
        .forEach(key => {
          this.app[key] && this.app[key](config.get(key))
        })
    }

    if (this.app.isProduction) {
      let config = await this.productionConf()
      if (config) {
        config.has('extensions') &&
          config.get('extensions').forEach(ext => {
            this.app.use(require(ext))
          })

        config
          .getKeys()
          .filter(key => key !== 'extensions')
          .forEach(key => {
            this.app[key] && this.app[key](config.get(key))
          })
      }
    }

    if (this.app.isDevelopment) {
      let config = await this.developmentConf()
      if (config) {
        config.has('extensions') &&
          config.get('extensions').forEach(ext => {
            this.app.use(require(ext))
          })

        config
          .getKeys()
          .filter(key => key !== 'extensions')
          .forEach(key => {
            this.app[key] && this.app[key](config.get(key))
          })
      }
    }

    /**
     * Run project builder config
     */
    await this.projectBuilder()

    /**
     * Flag overrides
     */
    Object.entries(flags).forEach(([k, v]) => {
      this.app.store.set(k, v)
    })

    /**
     * Run build
     */
    this.app.run()
  }
}
