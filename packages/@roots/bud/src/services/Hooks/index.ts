import {Hooks as Contract} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
import {boundMethod as bind} from 'autobind-decorator'

type LocationName = keyof Contract.Locale.Definitions

export class Hooks extends Base implements Contract {
  public name = 'service/hooks'

  @bind
  public register({store}) {
    const hookLocale = (name: LocationName) => {
      this.on(`location/${name}`, () =>
        store.get(`location.${name}`),
      )
    }

    const locales: LocationName[] = [
      'project',
      'src',
      'dist',
      'storage',
      'modules',
    ]

    locales.forEach(hookLocale)
  }
}
