import Container from '@roots/container'
import * as store from './store'

export class Features extends Container {
  public constructor() {
    super(store)
  }
}
