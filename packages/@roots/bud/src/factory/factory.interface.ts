import type {SetOptional} from 'type-fest'
export type {SetOptional}

import {Bud} from '../Bud'

/**
 * {@link Bud} constructor property overrides
 *
 * @public
 */
export interface Options extends Partial<Bud.Options> {
  config: Partial<Bud.Options> & {
    features?: Partial<Bud.Options['config']['features']>
    location?: Partial<Bud.Options['config']['location']>
    cache?: Partial<Bud.Options['config']['cache']>
    mode?: Bud.Options['config']['mode']
    cli?: Bud.Options['config']['cli']
    name?: Bud.Options['config']['name']
  }
  services?: Partial<Bud.Options['services']>
}
