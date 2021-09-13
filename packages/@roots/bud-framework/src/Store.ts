import {get} from 'lodash'
import * as Webpack from 'webpack'

import {Configuration} from './Configuration'
import {Service} from './Service'

/**
 * Container store for initial configuration and general options
 *
 * @public @core @config
 */
class Store<T = Configuration> extends Service<T> {
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public
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

/**
 * @internal
 */
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
