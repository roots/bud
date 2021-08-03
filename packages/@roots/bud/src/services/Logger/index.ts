/**
 * @module Bud.Logger
 */

import {Framework, Logger as Base} from '@roots/bud-framework'
import {Signale} from 'signale'

/**
 * Constants
 */
import {INSTANCE_CONFIG, LOGGER_TYPES} from './enum'

/**
 * Logger service
 *
 * @sealed
 */
class Logger extends Base {
  /** {@inheritDoc Base.name} */
  public name = 'logger'

  /**
   * Class constructor
   */
  public constructor(app: Framework) {
    super(app)

    this.instance = new Signale({
      disabled: true,
      interactive: false,
      secrets: [process.cwd()],
      scope: app.name,
      types: LOGGER_TYPES,
      stream: [process.stdout],
    })

    this.instance.config(INSTANCE_CONFIG)

    if (process.argv.includes('--log')) {
      this.instance.enable()
    }
  }
}

export {Logger}
