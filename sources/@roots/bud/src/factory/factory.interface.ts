import type {SetOptional} from 'type-fest'
export type {SetOptional}

import {Bud} from '../Bud'

/**
 * Bud constructor property overrides
 *
 * @public
 */
export interface Options extends Bud.Options {
  name: Bud['name']
  mode: Bud['mode']
  services?: Partial<Bud.Options['services']>
}
