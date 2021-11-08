import {
  Configuration,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'

import {LOCATIONS} from './hooks.constants'

/**
 * Hooks service
 *
 * @public
 */
export class Hooks extends Base implements Contract, Service {
  /**
   * Registr lifecycle hook
   *
   * @remarks
   * Register hooks for each {@link Framework.Locations} key
   *
   * @public
   */
  public async register({store}) {
    const mapLocale = (
      name: keyof Configuration['location'],
    ) => {
      this.on(`location.${name}`, () =>
        store.get(`location.${name}`),
      )
    }

    const locales: (keyof Configuration['location'] & string)[] =
      LOCATIONS

    locales.map(mapLocale)
  }
}
