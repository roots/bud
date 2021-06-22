import {flags} from '@oclif/command'
import Command from './Command'
import {Framework} from '@roots/bud'
import {Config} from './Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import {remove} from 'fs-extra'
import {NotificationCenter} from 'node-notifier'
import {resolve} from 'path/posix'

declare interface Multi {
  parent: (app: Framework) => Framework
  [key: string]: (app: Framework) => Framework
}

export default class Flush extends Command {
  public app: Framework

  public static flags = {
    help: flags.help({char: 'h'}),
  }

  public target: 'all' | 'storage' | 'dist'

  public get cli() {
    return (this.parse as any)(Flush as any)
  }

  public setEnv(env) {
    this.app.mode = env
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  public async run() {
    await this.doStatics()
    await this.doBuilders()

    if (this.target !== 'all') {
      await remove(this.app.path(this.target))
    } else {
      await remove(this.app.path('storage'))
      await remove(this.app.path('dist'))
    }
  }

  @bind
  public async doBuilders() {
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
      return this.handleMultiConfig(builder)
    }

    this.app = !isFunction(builder)
      ? this.app
      : builder(this.app)
  }

  @bind
  public handleMultiConfig(builder: Multi) {
    const {parent, ...multi} = builder

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
      this.app.make(name, child)
    })
  }
}
