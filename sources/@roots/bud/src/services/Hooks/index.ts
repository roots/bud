import {Hooks as Contract} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'

import {Bud} from '../../Bud'

/**
 * Hooks service
 *
 * @public
 */
export class Hooks extends Base implements Contract.Service {
  public constructor(bud: Bud) {
    super(bud)

    this.on('location.@src', this.app.store.get('location.@src'))
    this.on('location.@dist', this.app.store.get('location.@dist'))
    this.on('location.@storage', this.app.store.get('location.@storage'))
    this.on('location.@modules', this.app.store.get('location.@modules'))
  }
}
