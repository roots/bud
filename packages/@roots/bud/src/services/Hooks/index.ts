import {Hooks as Base} from '@roots/bud-hooks'
import {boundMethod as bind} from 'autobind-decorator'

export class Hooks extends Base {
  public name = 'service/hooks'

  @bind
  public register({store}) {
    this.on('location/project', () =>
      store.get('location.project'),
    )

    this.on('location/src', () => store.get('location.src'))
    this.on('location/dist', () => store.get('location.dist'))

    this.on('location/storage', () =>
      store.get('location.storage'),
    )

    this.on('location/modules', () =>
      store.get('location.modules'),
    )

    this.on('location/records', () =>
      store.get('location.records'),
    )
  }
}
