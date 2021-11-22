import {Bud, Framework, services} from '@roots/bud'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

import {Config} from '../Config'

export default class Runner {
  public app: Framework

  public cli: any

  public mode: 'development' | 'production'

  public constructor(cli, options) {
    this.cli = cli
    this.app = new Bud({
      name: 'bud',
      ...options,
      services,
    }).bootstrap()
  }

  public async make(build = true) {
    this.cli.flags.ci && this.app.store.set('ci', true)

    this.setEnv(this.app.mode)

    await this.doStatics()
    await this.doBuilders()

    if (build) {
      Object.entries(this.cli.flags).forEach(([k, v]) => {
        this.app.store.set(k, v)

        this.app.children.every((_name, child) => {
          child?.store && child.store.set(k, v)
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

      /**
       * Target was specified
       */
      if (this.cli.flags.target.length > 0) {
        !this.cli.flags.target.includes('bud') &&
          this.app.hooks.on('build/entry', false)

        this.app.children.getKeys().forEach(name => {
          !this.cli.flags.target.includes(name) &&
            this.app.children.remove(name)
        })
      }
    }

    return this.app
  }

  @bind
  public async build(configs) {
    const builder = await new Config(this.app, configs).get()
    isFunction(builder) && builder(this.app)
  }

  @bind
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
}
