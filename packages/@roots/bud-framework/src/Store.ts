import {get} from 'lodash'

import {Framework} from './Framework'
import {Service} from './Service'

/**
 * Options container store
 *
 * @sealed
 */
class Store extends Service {
  /** {@inheritDoc name} */
  public name = 'store'

  /**
   * Get a store value
   *
   * @override
   */
  public get<T = any>(path: Store.Keys) {
    return get(this.repository, path) as T
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public bootstrap(app: Framework) {
    this.setStore({...app.options.config})
  }
}

namespace Store {
  export type Keys =
    | `theme`
    | `theme.${string}`
    | `server.${string}`
    | `server`
    | `env`
    | `env.${string}`
    | `location`
    | `location.${string}`
    | `patterns`
    | `patterns.${string}`
    | `project`
    | `project.${string}`
    | `compilation.${string}`
    | `build`
    | `build.resolve`
    | `build.${string}`
    | `hash`
    | `hashFormat`
    | `fileFormat`
    | `ci`
    | `clean`
    | `define`
    | `debug`
    | `discover`
    | `html`
    | `manifest`
    | `extension`
    | `extension.${string}`

  export type Repository = {
    [K in Store.Keys & string]?: any
  }
}

export {Store}
