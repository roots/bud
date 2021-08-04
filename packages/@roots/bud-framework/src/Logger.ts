import {Signale} from 'signale'

import {Service} from '.'

/**
 * Logging service abstract class
 */
interface Logger extends Service {
  name: 'logger'

  /**
   * Logger instance
   */
  instance: Signale
}

export {Logger}
