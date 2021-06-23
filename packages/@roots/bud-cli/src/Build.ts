import {flags} from '@oclif/command'
import Command from './Command'
import {Framework} from '@roots/bud'
import {Config} from './Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import {NotificationCenter} from 'node-notifier'
import {resolve} from 'path/posix'

declare interface Multi {
  parent: (app: Framework) => Framework
  [key: string]: (app: Framework) => Framework
}

export default class Build extends Command {
  public static description = 'Build application'

  public app: Framework

  public mode: 'development' | 'production'

  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.boolean({
      char: 'c',
      description: 'cache compiler references to disk',
    }),
    ci: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),
    debug: flags.boolean({
      char: 'd',
      description: 'produce config artifacts in [storage] dir',
    }),
    log: flags.boolean({
      char: 'l',
      description: 'log to console',
    }),
    hash: flags.boolean({
      description: 'hash compiled filenames',
    }),
    manifest: flags.boolean({
      description: 'produce a manifest',
    }),
    minimize: flags.boolean({
      char: 'm',
      description: 'minimize file size of compiled assets',
    }),
    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
    }),
  }

  public get cli() {
    return (this.parse as any)(Build as any)
  }

  public setEnv(env) {
    this.app.mode = env
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  public async run() {
    !this.cli.flags.ci
      ? this.app.dashboard.run()
      : this.app.store.set('ci', true)

    this.setEnv(this.mode)

    await this.doStatics()
    await this.doBuilders()

    Object.entries(this.cli.flags).forEach(([k, v]) => {
      this.app.store.set(k, v)
      this.app.children.every((_name, child) => {
        child.store.set(k, v)
      })
    })

    if (this.cli.flags.cache) {
      this.app.persist()
      this.app.children.every((_name, child) => {
        child.persist()
      })
    }

    if (this.cli.flags.minimize) {
      this.app.minimize()
      this.app.children.every((_name, child) => {
        child.minimize()
      })
    }

    this.app.hooks.on('done', () => {
      const notifier = new NotificationCenter({
        customPath: resolve(
          __dirname,
          '../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
        ),
      })

      notifier.notify({
        title: this.app.compiler.errors
          ? `Build error`
          : `Build success`,
        message: this.app.compiler.errors
          ? `${
              this.app.discovery.getProjectInfo().name ??
              this.app.name
            } couldn't be compiled`
          : `${
              this.app.discovery.getProjectInfo().name ??
              this.app.name
            } compiled successfully`,
        group:
          this.app.discovery.getProjectInfo().name ??
          this.app.name,
        contentImage: resolve(
          __dirname,
          '../assets/bud-icon.jpg',
        ),
      })
    })

    if (this.cli.flags.target) {
      if (!this.cli.flags.target.includes('parent')) {
        this.app.hooks.on('build/entry', false)
      }

      this.app.children.getKeys().forEach(k => {
        if (!this.cli.flags.target.includes(k)) {
          this.app.children.remove(k)
        }
      })
    }

    this.app.run()
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

    isFunction(builder) && builder(this.app)
  }
}
