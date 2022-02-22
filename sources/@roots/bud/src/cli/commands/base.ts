import {bind, lodash as _} from '@roots/bud-support'
import {Command} from 'clipanion'

import {Bud} from '../../Bud/index.js'
import {seed} from '../../seed.js'
import * as dynamic from '../config/dynamic.config.js'
import * as manifest from '../config/manifest.config.js'
import * as overrides from '../config/override.config.js'
import {Notifier} from '../Notifier/index.js'

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
   * Config
   *
   * @public
   */
  public config() {
    return seed
  }

  /**
   * Bootstrap Application
   *
   * @returns Bud
   */
  @bind
  public async make() {
    this.notifier = new Notifier(this.app)

    try {
      this.logger.time('process user configs')

      await dynamic.configs(this.app, this.logger)
      await manifest.configs(this.app, this.logger)

      this.logger.timeEnd('process user configs')
    } catch (error) {
      throw new Error(error)
    }

    await overrides.config(this.app, this.config())
    this.app.api.processQueue()
    this.app.extensions.processQueue()

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
