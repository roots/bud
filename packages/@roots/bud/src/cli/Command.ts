import Base from '@oclif/command'
import * as Framework from '@roots/bud-framework'

import {Bud} from '..'
import * as CLI from './cli.interface'
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
   * oclif parser output
   *
   * @public
   */
  public cli: CLI.Options

  /**
   * Command flags
   *
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
  public async prime(
    ConcreteCommand: typeof Command,
  ): Promise<void> {
    this.cli = this.parse(ConcreteCommand)

    this.runner = new Runner(this.cli)

    this.app = await this.runner.initialize()

    this.logger = this.app.logger.makeInstance()

    this.logger = this.logger.scope(
      ...this.app.logger.context,
      `${ConcreteCommand.title}`,
    )

    this.runner.logger = this.logger
  }

  public async build() {
    await this.runner.make()
  }
}
