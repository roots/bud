import {Config} from '@roots/bud-framework'

import {Bud} from '../Bud'

/**
 * Bud constructor property overrides
 *
 * @public
 */
export interface Options extends Bud.Options {
  name: Bud['name']
  mode: Bud['mode']
  context?: Config.Context
  services?: Partial<Bud.Options['services']>
}
