import type {Config} from '@roots/bud-framework'
import {BaseContext, Command} from 'clipanion'
import {bind} from 'helpful-decorators'

import type Bud from '../../bud.js'
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

    this.app.hooks.action('compiler.after', async () => {
      this.app.compiler.compilation.hooks.done.tap(
        'bud-cli-notifier',
        this.notifier.notify,
      )
    })

    try {
      await disk.config(this.app)
    } catch (error) {
      this.app.error(error)
    }

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
