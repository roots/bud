import {
  Configuration,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'

/**
 * @sealed
 */
class Hooks extends Base implements Contract, Service {
  /**
   * {@inheritDoc Service.register}
   */
  public register({store}) {
    const mapLocale = (
      name: keyof Configuration['location'],
    ) => {
      this.on(`location/${name}`, () =>
        store.get(`location.${name}`),
      )
    }

    const locales: (keyof Configuration['location'] & string)[] =
      ['project', 'src', 'dist', 'storage', 'modules']

    locales.map(mapLocale)
  }
}

export {Hooks}
