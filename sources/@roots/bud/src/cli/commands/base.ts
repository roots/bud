import {Config} from '@roots/bud-framework'
import {BaseContext, Command} from 'clipanion'
import {bind} from 'helpful-decorators'

import Bud from '../../bud.js'
import * as disk from '../config/disk.config.js'
import {Notifier} from '../notifier/index.js'

/**
 * Base command
 *
 * @public
 */
export abstract class BaseCommand extends Command {
  /**
   * Context
   *
   * @public
   */
  public context: Config.Context & BaseContext

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
    return this.app.logger.instance
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
    this.notifier = new Notifier(this.app)

    this.app.hooks.action('event.compiler.close', this.notifier.notify)

    try {
      await disk.config(this.app)
    } catch (error) {
      this.app.error(error)
    }

    try {
      await this.app.hooks.fire('event.config.after')
    } catch (err) {
      this.app.error(err)
    }

    await Promise.all(
      Object.values(this.app.children ?? {}).map(async instance => {
        try {
          await instance.hooks.fire('event.config.after')
        } catch (err) {
          instance.error(err)
        }
      }),
    )

    return this.app
  }

  /**
   * Run the build
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.run()
  }
}
