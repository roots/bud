import {get} from 'lodash'
import * as Webpack from 'webpack'

import {Configuration} from './Configuration'
import {Service} from './Service'

/**
 * Options container store
 */
class Store<T = Configuration> extends Service<T> {
  /**
   * {@inheritDoc Service.Repository}
   */
  public name = 'store'

  /**
   * {@inheritDoc @roots/container#Container.get}
   *
   * @override
   */
  public get<T = any>(path: keyof Store.Repository) {
    return get(this.repository, path) as T
  }
}

namespace Store {
  export type Keys =
    | `${keyof Configuration & string}`
    | `theme.${keyof Configuration['theme'] & string}`
    | `theme.screens`
    | `theme.colors.${keyof Configuration['theme']['colors'] &
        string}`
    | `server.${keyof Configuration['server'] & string}`
    | `server.middleware.${keyof Configuration['server']['middleware'] &
        string}`
    | `server.browser.${keyof Configuration['server']['browser'] &
        string}`
    | `server.${keyof Configuration['server'] &
        string}.${string}`
    | `env.${string}`
    | `location.${keyof Configuration['location'] & string}`
    | `patterns.${keyof Configuration['patterns'] & string}`
    | `build.${keyof Webpack.Configuration}`
    | `build.module.${keyof Webpack.Configuration['module']}`
    | `build.module.${keyof Webpack.Configuration['module']}.${string}`
    | `extension.${string}`
    | `build.${keyof Webpack.Configuration}.${string}`

  export type Repository = {
    [K in Store.Keys & string]?: any
  }
}

export {Store}
