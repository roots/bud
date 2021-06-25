import {flags} from '@oclif/command'
import Command from './Command'
import {Config} from './Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import {NotificationCenter} from 'node-notifier'
import {resolve} from 'path/posix'

const appFlags = {
  build: {
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
      default: [],
    }),
  },
}

const MACOS_NOTIFIER_PATH = resolve(
  __dirname,
  '../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
)

export default class Build extends Command {
  public static description = 'Build application'

  public mode: 'development' | 'production'

  public static flags = appFlags.build

  public setEnv(env: 'production' | 'development') {
    this.app.mode = env

    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  @bind
  public async doBuilders() {
    await this.build([
      `${this.app.name}.ts`,
      `${this.app.name}.js`,
      `${this.app.name}.config.ts`,
      `${this.app.name}.config.js`,
    ])

    await this.build([
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

  public async run() {
    const cli = this.parse(Build)

    !cli.flags.ci
      ? this.app.dashboard.run()
      : this.app.store.set('ci', true)

    this.setEnv(this.mode)

    await this.doStatics()
    await this.doBuilders()

    Object.entries(cli.flags).forEach(([k, v]) => {
      this.app.store.set(k, v)

      this.app.children.every((_name, child) => {
        child.store.set(k, v)
      })
    })

    if (cli.flags.cache) {
      this.app.persist()

      this.app.children.every((_name, child) => {
        child.persist()
      })
    }

    if (cli.flags.minimize) {
      this.app.minimize()

      this.app.children.every((_name, child) => {
        child.minimize()
      })
    }

    if (cli.flags.target.length > 0) {
      !cli.flags.target.includes('parent') &&
        !cli.flags.target.includes('bud') &&
        !cli.flags.target.includes('global') &&
        this.app.hooks.on('build/entry', false)

      this.app.children.getKeys().forEach(name => {
        !cli.flags.target.includes(name) &&
          this.app.children.remove(name)
      })
    }

    this.app.hooks.on('done', this.notify)

    this.app.run()
  }

  @bind
  public async build(configs) {
    const builder = await new Config(this.app, configs).get()
    isFunction(builder) && builder(this.app)
  }

  @bind
  public notify() {
    const macOS = new NotificationCenter({
      customPath: MACOS_NOTIFIER_PATH,
    })

    macOS.notify({
      title:
        this.app.compiler.stats.errors.length > 0
          ? `Build error`
          : `Build success`,
      message:
        this.app.compiler.stats.errors.length > 0
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
      contentImage: resolve(__dirname, '../assets/bud-icon.jpg'),
    })
  }
}
