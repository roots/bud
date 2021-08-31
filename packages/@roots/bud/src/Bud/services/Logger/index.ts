import {
  Framework,
  Logger as Contract,
  Service,
} from '@roots/bud-framework'
import {Signale} from 'signale'

import {INSTANCE_CONFIG, LOGGER_TYPES} from './constants'

class Logger extends Service implements Contract {
  /**
   * Logger instance
   */
  public instance: Signale

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
