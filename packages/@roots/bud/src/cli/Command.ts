import Base from '@oclif/command'
import * as Framework from '@roots/bud-framework'

import {Bud} from '..'
import * as flags from './flags'
import {Notifier} from './Notifier'
import {Runner} from './Runner'

/**
 * bud cli base command
 *
 * @public @virtual
 */
export abstract class Command extends Base {
  /**
   * @public
   */
  public static title: typeof Base.title

  /**
   * @public
   */
  public static description: typeof Base.description = ''

  /**
   * @public
   */
  public app: Bud

  /**
   * @public
   */
  public runner: Runner

  /**
   * @public
   */
  public notifier: Notifier

  /**
   * @public
   */
  public static flags = {
    ...flags.base,
    ...flags.log,
  }

  /**
   * @public
   */
  public logger: Framework.Logger['instance']

  /**
   * @public
   */
  public get jest() {
    return process.env.JEST_WORKER_ID !== undefined
  }

  /**
   * @public
   */
  public async init() {
    this.notifier = new Notifier()
  }

  /**
   * @remarks
   * this should be an oclif hook (plugin api)
   *
   * @public
   */
  public async prime(ConcreteCommand: typeof Command) {
    const options = this.parse(ConcreteCommand)

    this.runner = new Runner(options)

    await this.runner.initialize()

    this.app = await this.runner.make()

    this.logger = this.app.logger.makeInstance({
      interactive: false,
    })

    this.logger.enable()
    this.logger.scope(ConcreteCommand.title)
  }
}
