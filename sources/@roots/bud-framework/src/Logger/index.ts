import {types} from './logger.constants'
import {Signale} from './logger.dependencies'
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
  public constructor(private app: Framework) {
    this.instance = new Signale({
      disabled: this.app.context.args.log !== true,
      interactive: false,
      secrets: [this.app.context.projectDir, this.app.context.cwd],
      logLevel: this.app.context.args.verbose ? 'vvvv' : 'vvv',
      types: types(app),
      // @ts-ignore
      stream: [this.app.context.stdout],
    })

    this.instance.config({
      displayScope: true,
      displayBadge: true,
      displayDate: false,
      displayFilename: false,
      displayLabel: false,
      displayTimestamp: false,
      underlineLabel: false,
      underlineMessage: false,
      underlinePrefix: false,
      underlineSuffix: false,
      uppercaseLabel: false,
    })
  }
}
