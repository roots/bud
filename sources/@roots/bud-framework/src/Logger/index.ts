import {Signale} from '@roots/bud-support'

import type {Framework} from '../'
import {LEVEL} from './logger.levels'
import {types} from './logger.types'

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
  public instance: Signale | Console

  public get level() {
    if (!this.app.context.args.log) return LEVEL.ERROR
    if (!this.app.context.args.verbose) return LEVEL.STANDARD
    return LEVEL.VERBOSE
  }

  public get interactive() {
    return !this.app.context.args.log ? true : false
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(private app: Framework) {
    this.instance = new Signale({
      interactive: this.interactive,
      secrets: [this.app.context.projectDir, this.app.context.cwd],
      logLevel: this.level,
      types: types(app),
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
