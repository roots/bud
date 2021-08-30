import Base from '@oclif/command'
import {Configuration, Framework} from '@roots/bud-framework'

import {config as DEFAULT_CONFIG} from '../'
import {Notifier} from './Notifier'
import {Runner} from './Runner'

abstract class Command extends Base {
  public notifier: Notifier
  public runner: Runner
  public app: Framework
  public cli: {flags: any; args: any}

  public async init() {
    this.notifier = new Notifier()
  }

  public async appFactory(
    cli: {},
    config?: Configuration,
    parse = true,
  ) {
    this.runner = new Runner(
      cli,
      config ? {...DEFAULT_CONFIG, ...config} : DEFAULT_CONFIG,
    )
    this.app = await this.runner.make(parse)
  }
}

export {Command}
