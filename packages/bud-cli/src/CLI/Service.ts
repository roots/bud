import {Instance} from '@roots/bud-support'
import {Service} from '@roots/bud-framework'

export default class extends Service {
  protected _dashboard: Instance

  protected get dashboard(): Instance {
    return this._dashboard
  }

  protected set dashboard(instance: Instance) {
    this._dashboard = instance
  }
}
