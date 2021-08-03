import {get} from 'lodash'

import {Service} from './Service'

/**
 * Options container service
 *
 * @sealed
 */
class Store extends Service<Store.Repository> {
  /**
   * @property {string} name
   */
  public name = 'store'

  /**
   * @function get
   */
  public get<T = any>(path: Store.Keys) {
    return get(this.repository, path) as T
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
