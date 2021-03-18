import {Hooks as Base} from '@roots/bud-hooks'
import {repository} from './repository'
import {config} from '../../bootstrap/config'

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
      () => config(['location.project', 'APP_PATH']),
    ])
      .set('location/src', [
        () => config(['location.src', 'APP_SRC']),
      ])
      .set('location/dist', [
        () => config(['location.dist', 'APP_DIST']),
      ])
      .set('location/storage', [
        () => config(['location.storage', 'APP_STORAGE']),
      ])
      .set('location/modules', [
        () => config(['location.modules', 'APP_MODULES']),
      ])
      .set('location/publicPath', [
        () => config(['location.publicPath', 'APP_PUBLIC_PATH']),
      ])
      .set('location/records', [
        () => config(['location.records', 'APP_RECORDS']),
      ])
  }
}
