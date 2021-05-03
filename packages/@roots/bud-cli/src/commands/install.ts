import Command from '../Command'
import {Bud, services, config} from '@roots/bud'
import {Config} from '../Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

export default class Install extends Command {
  public app: Bud

  public static description = 'Install transitive dependencies registered by extensions.'
  public static examples = [`$ bud install`, `$ bud install @roots/bud-react`]
  public static help = 'Passing an arg will install dependencies listed by a specific extension. Pass nothing to install all dependencies.'

  public static args = [
    {
      name: 'pkg',
      description: 'name of package to install',
      required: false,
    }
  ]

  public async run() {
    this.app = new Bud(config).bootstrap(services).lifecycle()

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

    this.app.discovery.install()
  }

  @bind
  public async builder(configs) {
    const builder = await new Config(this.app, configs).get()

    this.app = !isFunction(builder)
      ? this.app
      : builder(this.app)
  }
}
