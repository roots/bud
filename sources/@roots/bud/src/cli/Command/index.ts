import * as oclif from '@oclif/core'
import * as Framework from '@roots/bud-framework'

import {Bud} from '../../'
import * as CLI from '../cli.interface'
import * as flags from '../flags'
import {Notifier} from '../Notifier'
import {Runner} from '../Runner'

/**
 * cli base command
 *
 * @internal
 */
export abstract class Command extends oclif.Command {
  /**
   * Application instance
   *
   * @internal
   */
  public app: Bud

  /**
   * Build helper
   *
   * @internal
   */
  public runner: Runner

  /**
   * Node notifier
   *
   * @internal
   */
  public notifier: Notifier

  /**
   * Command parser output object
   *
   * @internal
   */
  public cli: CLI.Options

  /**
   * Command flags
   *
   * @internal
   */
  public static flags = {
    ...flags.base,
    ...flags.log,
  }

  /**
   * Command logging instance
   *
   * @internal
   */
  public logger: Framework.Logger['instance']

  /**
   * @internal
   */
  public async prime(command: any): Promise<void> {
    this.cli = await this.parse(command)
    this.runner = new Runner(this.cli)
    this.app = await this.runner.initialize()
    this.logger = this.app.logger.makeInstance()
    this.runner.logger = this.logger

    this.notifier = new Notifier(this.app)
  }

  /**
   * @internal
   */
  public async build() {
    await this.runner.make()
  }
}
