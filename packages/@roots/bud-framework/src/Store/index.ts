import {Service} from '../Service'
import {get} from 'lodash'

class Store extends Service {
  public name = 'service/store'

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
}

export {Store}
