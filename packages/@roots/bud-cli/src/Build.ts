import Command from './Command'
import {Bud, services, config} from '@roots/bud'
import {Config} from './Config'
import * as flags from './flags/index'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

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

  public async run() {
    const flags = this.parse(Build).flags

    this.app = new Bud(config).bootstrap(services).lifecycle()
    this.app.mode = this.mode

    this.app.discovery.every((name, cfg) => {
      if (!(cfg.type === 'preset')) return

      Object.entries(cfg?.build?.all).forEach(
        ([fnName, fnArgs]) => {
          if (fnName == 'extensions') {
            ;(fnArgs as string[]).forEach(ext => {
              this.app.use(require(ext))
              console.log(`Registering ${ext}`)
            })
          } else {
            console.log(`Calling app.${fnName}(${fnArgs})`)
            this.app[fnName] && this.app[fnName](fnArgs)
          }
        },
      )

      cfg?.build[this.app.mode] &&
        Object.entries(cfg?.build[this.app.mode]).forEach(
          ([fnName, fnArgs]) => {
            if (fnName == 'extensions') {
              ;(fnArgs as string[]).forEach(ext => {
                this.app.use(require(ext))
                console.log(`Registering ${ext}`)
              })
            } else {
              console.log(`Calling app.${fnName}(${fnArgs})`)
              this.app[fnName] && this.app[fnName](fnArgs)
            }
          },
        )
    })

    await new Config(this.app, [
      `${this.app.name}.json`,
      `${this.app.name}.yaml`,
      `${this.app.name}.yml`,
      `${this.app.name}.config.json`,
      `${this.app.name}.config.yaml`,
      `${this.app.name}.config.yml`,
    ]).apply()

    await new Config(this.app, [
      `${this.app.name}.${this.app.mode}.json`,
      `${this.app.name}.${this.app.mode}.yaml`,
      `${this.app.name}.${this.app.mode}.yml`,
      `${this.app.name}.${this.app.mode}.config.json`,
      `${this.app.name}.${this.app.mode}.config.yaml`,
      `${this.app.name}.${this.app.mode}.config.yml`,
    ]).apply()

    await new Config(this.app, [
      `${this.app.name}.${this.app.mode}.json`,
      `${this.app.name}.${this.app.mode}.yaml`,
      `${this.app.name}.${this.app.mode}.yml`,
      `${this.app.name}.${this.app.mode}.config.json`,
      `${this.app.name}.${this.app.mode}.config.yaml`,
      `${this.app.name}.${this.app.mode}.config.yml`,
    ]).apply()

    await this.builder([
      `${this.app.name}.ts`,
      `${this.app.name}.js`,
      `${this.app.name}.config.ts`,
      `${this.app.name}.config.js`,
    ])

    await this.builder([
      `${this.app.name}.${this.app.mode}.ts`,
      `${this.app.name}.${this.app.mode}.js`,
      `${this.app.name}.${this.app.mode}.config.ts`,
      `${this.app.name}.${this.app.mode}.config.js`,
    ])

    Object.entries(flags).forEach(([k, v]) => {
      this.app.store.set(k, v)
    })

    this.app.run()
  }

  @bind
  public async builder(configs) {
    const builder = await new Config(this.app, configs).get()

    this.app = !isFunction(builder)
      ? this.app
      : builder(this.app)
  }
}
