import Command from './Command'
import {Framework} from '@roots/bud'
import {Config} from './Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import * as flags from './flags'
import {NotificationCenter} from 'node-notifier'
import {resolve} from 'path/posix'

declare interface Multi {
  parent: (app: Framework) => Framework
  [key: string]: (app: Framework) => Framework
}

export default class Build extends Command {
  public static strict = false

  public static args = [
    {
      name: 'target',
      required: false,
      description: 'compiler to build',
    },
  ]

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

  public app: Framework

  public mode: 'development' | 'production'

  public get cli(): {[key: string]: any} {
    return this.parse(Build)
  }

  public setEnv(env) {
    this.app.mode = env
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  public async run() {
    const features = this.cli.flags

    !features.ci
      ? this.app.dashboard.run()
      : this.app.store.set('ci', true)

    this.setEnv(this.mode)

    await this.doStatics()

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

    Object.entries(features).forEach(([k, v]) => {
      this.app.store.set(k, v)
    })

    features.cache && this.app.persist()

    this.app.run()
  }

  @bind
  public async doStatics() {
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
  }

  @bind
  public async builder(configs) {
    const builder = await new Config(this.app, configs).get()

    this.app.hooks.on('done', () => {
      this.app.compiler.instance.hooks.done.tap(
        `${this.app.name}.notifier`,
        ({stats}: any) => {
          const final: any = stats.reduce(
            (final: any, {compilation: stat}: any) => {
              return {
                count: final.count + 1,
                errors: final.errors ?? stat.hasErrors(),
                assets:
                  final.assets +
                  Array.from(stat.entrypoints).length,
              }
            },
            {
              count: 0,
              errors: false,
              assets: 0,
            },
          )

          const notifier = new NotificationCenter({
            title: this.app.name,
            subtitle: final.errors ? `❌ Error` : `✅ Success`,
            message: `${final.assets} entrypoints produced`,
            remove: this.app.name,
            group: this.app.name,
            contentImage: resolve(
              __dirname,
              '../assets/bud-icon.png',
            ),
            customPath: resolve(
              __dirname,
              '../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
            ),
          })

          notifier.notify({
            title: final.errors
              ? `❌ Build error`
              : `✅ Build success`,
            message: `${final.assets} entrypoints produced`,
            group: this.app.name,
          })
        },
      )
    })

    if (
      !isFunction(builder) &&
      builder.hasOwnProperty('parent')
    ) {
      const {parent, ...multi} = builder as Multi

      this.app = parent(this.app)

      if (this.cli.args.target) {
        !multi[this.cli.args.target] &&
          (() => {
            console.error(
              `${this.cli.args.target} not found in bud config`,
            )

            process.exit(1)
          })()

        const instance = this.app.make(this.cli.args.target)
        instance.name = this.cli.args.target

        this.app.children.set(
          this.cli.args.target,
          multi[this.cli.args.target](instance),
        )

        return
      }

      Object.entries(multi).map(([name, child]) => {
        const instance = this.app.make(name)
        instance.name = name

        this.app.children.set(name, child(instance))
      })

      return
    }

    this.app = !isFunction(builder)
      ? this.app
      : builder(this.app)
  }
}
