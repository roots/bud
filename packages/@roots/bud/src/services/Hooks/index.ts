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
   * Service identifier
   *
   * @public
   */
  public ident: string = 'bud.hooks'

  /**
   * Registr lifecycle hook
   *
   * @remarks
   * Register hooks for each {@link Framework.Locations} key
   *
   * @public
   */
  public async bootstrap({store}) {
    const mapLocale = (
      name: keyof Configuration['location'],
    ) => {
      this.on(`location.${name}`, () =>
        !store.isUndefined(`cli.flags.location.${name}`)
          ? store.get(`cli.flags.location.${name}`)
          : store.get(`location.${name}`),
      )
    }

    const locales: (keyof Configuration['location'] & string)[] =
      LOCATIONS

    locales.map(mapLocale)
  }
}
