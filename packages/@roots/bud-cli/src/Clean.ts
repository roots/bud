import Command from './Command'
import {Framework} from '@roots/bud'
import {Config} from './Config'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import {remove} from 'fs-extra'
import * as flags from './flags'

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

  public async run() {
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

    if (this.target !== 'all') {
      await remove(this.app.path(this.target))
    } else {
      await remove(this.app.path('storage'))
      await remove(this.app.path('dist'))
    }
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

    if (
      !isFunction(builder) &&
      builder.hasOwnProperty('parent')
    ) {
      const {parent, ...multi} = builder as Multi

      this.app = parent(this.app)

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
