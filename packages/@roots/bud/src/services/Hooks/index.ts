/**
 * @module Bud.Hooks
 */

import {
  Configuration,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Service: Hooks
 *
 * @implements {Contract}
 */
class Hooks extends Base implements Contract, Service {
  /**
   * @method register
   */
  @bind
  public register({store}) {
    const hookLocale = (
      name: keyof Configuration['location'],
    ) => {
      this.on(`location/${name}`, () =>
        store.get(`location.${name}`),
      )
    }

    const locales: (keyof Configuration['location'] & string)[] =
      ['project', 'src', 'dist', 'storage', 'modules']

    locales.forEach(hookLocale)
  }
}

export {Hooks}
