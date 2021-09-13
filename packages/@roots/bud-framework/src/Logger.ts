import {Signale} from 'signale'

import {Service} from '.'

/**
 * Logger Service interface
 *
 * @public @core @container
 */
interface Logger extends Service {
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public
   */
  name: 'logger'

  /**
   * Logger instance
   *
   * @public
   */
  instance: Signale
}

export {Logger}
