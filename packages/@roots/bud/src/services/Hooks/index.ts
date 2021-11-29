import {
  Configuration,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
import {bind} from '@roots/bud-support'

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
   * @internal
   */
  public ident: string = 'hooks'

  public locations: Array<`${keyof Configuration['location'] &
    string}`> = LOCATIONS

  /**
   * Registr lifecycle hook
   *
   * @remarks
   * Register hooks for each disk key
   *
   * @internal
   */
  @bind
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
      this.locations

    locales.map(mapLocale)
  }
}
