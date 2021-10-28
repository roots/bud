import {INSTANCE_CONFIG} from './logger.constants'
import {bind, Signale} from './logger.dependencies'
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
  public constructor(protected app: Framework) {
    this.instance = new Signale({
      disabled: false,
      interactive: !process.argv.includes('--log'),
      secrets: [process.cwd()],
      stream: [process.stdout],
    })

    this.instance.config(INSTANCE_CONFIG)
  }

  @bind
  public getScope(): Array<string> {
    return this.app.parent?.name
      ? [this.app.parent.name, this.app.name]
      : [this.app.name, 'root']
  }
}
