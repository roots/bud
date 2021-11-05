import {lodash} from '@roots/bud-support'
import Webpack from 'webpack'

import {Configuration} from './Configuration'
import {Service} from './Service'

const {get} = lodash

/**
 * Container store for initial configuration and general options
 *
 * @public @core @config
 */
export class Store<T = Configuration> extends Service<T> {
  /**
   * Repository
   *
   * @public
   */
  public repository: Repository = {}

  /**
   * {@inheritDoc @roots/container#Container.get}
   *
   * @override
   */
  public get<T = any>(path: keyof Repository) {
    return get(this.repository, path) as T
  }
}

/**
 * Store accessor keys
 *
 * @public
 */
type Keys =
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
  | `server.${keyof Configuration['server'] & string}.${string}`
  | `env.${string}`
  | `location.${keyof Configuration['location'] & string}`
  | `patterns.${keyof Configuration['patterns'] & string}`
  | `build.${keyof Webpack.Configuration}`
  | `build.module.${keyof Webpack.Configuration['module']}`
  | `build.module.${keyof Webpack.Configuration['module']}.${string}`
  | `extension.${string}`
  | `build.${keyof Webpack.Configuration}.${string}`

/**
 * Store repository
 *
 * @public
 */
type Repository = {
  [K in Keys & string]?: any
}
