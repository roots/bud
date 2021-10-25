import {Signale} from './logger.dependencies'
import {INSTANCE_CONFIG} from './logger.constants'
import type {Framework} from './logger.interface'

/**
 * Logger service
 *
 * @public
 */
export class Logger {
  /**
   * Logger instance
   *
   * @public
   */
  public instance: Signale

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Framework) {
    this.instance = new Signale({
      disabled: true,
      interactive: false,
      secrets: [process.cwd()],
      scope: 'bud',
      stream: [process.stdout],
    })

    this.instance.config(INSTANCE_CONFIG)

    if (process.argv.includes('--log')) {
      this.instance.enable()
    }
  }
}
