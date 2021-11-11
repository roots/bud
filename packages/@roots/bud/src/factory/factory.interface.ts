import type {SetOptional} from 'type-fest'
export type {SetOptional}

import * as Framework from '@roots/bud-framework'

/**
 * {@link Bud} constructor property overrides
 *
 * @core @public
 */
export interface Options extends Partial<Framework.Options> {
  config: Partial<Framework.Options> & {
    features?: Partial<Framework.Options['config']['features']>
    location?: Partial<Framework.Options['config']['location']>
    mode?: Framework.Options['config']['mode']
    cli?: Framework.Options['config']['cli']
    name?: Framework.Options['config']['name']
  }
  services?: Partial<Framework.Options['services']>
}

export {Framework}
