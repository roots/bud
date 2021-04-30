import {Hooks as Base} from '@roots/bud-hooks'
import {boundMethod as bind} from 'autobind-decorator'

export class Hooks extends Base {
  public name = 'service/hooks'

  @bind
  public register() {
    this.on('location/project', () =>
      this.app.store.get('location.project'),
    )

    this.on('location/src', () =>
      this.app.store.get('location.src'),
    )

    this.on('location/dist', () =>
      this.app.store.get('location.dist'),
    )

    this.on('location/storage', () =>
      this.app.store.get('location.storage'),
    )

    this.on('location/modules', () =>
      this.app.store.get('location.modules'),
    )

    this.on('location/publicPath', () =>
      this.app.store.get('location.publicPath'),
    )

    this.on('location/records', () =>
      this.app.store.get('location.records'),
    )
  }
}
