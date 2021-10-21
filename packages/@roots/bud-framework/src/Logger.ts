import {Signale} from 'signale'

import {Service} from '.'

/**
 * Logger Service interface
 *
 * @public
 */
export interface Logger extends Service {
  /**
   * Logger instance
   *
   * @public
   */
  instance: Signale
}
