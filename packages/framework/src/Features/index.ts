import {Container} from '@roots/container'
import * as store from './store'

export class Features extends Container {
  repository: Container.Repository

  public constructor() {
    super()

    this.repository = store
  }
}
