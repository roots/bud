import {bind, lodash as _} from '@roots/bud-support'
import {Command} from 'clipanion'

import {Bud} from '../../Bud'
import * as dynamic from '../config/dynamic.config'
import * as manifest from '../config/manifest.config'
import {Notifier} from '../Notifier'

/**
 * Base command
 *
 * @public
 */
export abstract class BaseCommand extends Command {
  /**
   * Application
   *
   * @public
   */
  public app: Bud

  /**
   * Application logger
   *
   * @public
   */
  public get logger() {
    return this.app.logger.scoped('cli')
  }

  /**
   * Node notifier
   *
   * @public
   */
  public notifier: Notifier

  /**
   * Bootstrap Application
   *
   * @returns Bud
   */
  @bind
  public async make() {
    this.notifier = new Notifier()

    this.app.hooks.action('event.compiler.done', this.notifier.notify)

    try {
      this.logger.time('process user configs')

      await dynamic.configs(this.app, this.logger)
      await manifest.configs(this.app, this.logger)

      this.logger.timeEnd('process user configs')
    } catch (error) {
      throw new Error(error)
    }

    return this.app
  }

  /**
   * Run the build
   *
   * @public
   */
  @bind
  public async run() {
    await this.app.api.call('run')
  }
}
