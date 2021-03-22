import {Hooks as Base} from '@roots/bud-hooks'
import {repository} from './repository'

export class Hooks extends Base {
  /**
   * Service name
   */
  public name = 'service/hooks'

  /**
   * Service repository
   */
  public repository = repository

  /**
   * Service register
   */
  public register() {
    this.set('location/project', [
      () => this.app.store.get('options.context'),
    ])
      .set('location/src', [
        () => this.app.store.get('options.src'),
      ])
      .set('location/dist', [
        () => this.app.store.get('options.dist'),
      ])
      .set('location/storage', [
        () => this.app.store.get('options.storage'),
      ])
      .set('location/modules', [
        () => this.app.store.get('options.modules'),
      ])
      .set('location/publicPath', [
        () => this.app.store.get('options.publicPath'),
      ])
      .set('location/records', [
        () => this.app.store.get('options.records'),
      ])
  }
}
