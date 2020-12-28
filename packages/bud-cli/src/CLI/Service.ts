import {Instance, Service} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export default class extends Service<Framework> {
  protected _dashboard: Instance

  protected get dashboard(): Instance {
    return this._dashboard
  }

  protected set dashboard(instance: Instance) {
    this._dashboard = instance
  }
}
