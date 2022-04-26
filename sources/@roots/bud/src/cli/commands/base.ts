import {Config} from '@roots/bud-framework'
import {bind, lodash as _} from '@roots/bud-support'
import {BaseContext, Command} from 'clipanion'

import {Bud} from '../../Bud'
import * as disk from '../config/disk.config'
import {Notifier} from '../Notifier'

/**
 * Base command
 *
 * @public
 */
export abstract class BaseCommand extends Command {
  /**
   * Context
   * @public
   */
  public context: Config.Context & BaseContext

  /**
   * Application
   * @public
   */
  public app: Bud

  /**
   * Application logger
   * @public
   */
  public get logger() {
    return this.app.logger.instance
  }

  /**
   * Node notifier
   * @public
   */
  public notifier: Notifier

  /**
   * Bootstrap Application
   * @returns Bud
   */
  @bind
  public async make() {
    this.notifier = new Notifier(this.app)

    this.app.hooks.action('event.compiler.done', this.notifier.notify)

    try {
      await disk.config(this.app)
    } catch (error) {
      throw new Error(error)
    }

    return this.app
  }

  /**
   * Run the build
   * @public
   */
  @bind
  public async run() {
    await this.app.api.call('run')
  }
}
