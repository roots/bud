import {Indexed} from '@roots/container'
import * as store from './store'

export class Features extends Indexed {
  repository: Indexed['repository']

  public constructor() {
    super({...store})
  }
}
