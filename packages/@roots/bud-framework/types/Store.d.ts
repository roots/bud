import * as Webpack from 'webpack'
import {Configuration} from './Configuration'
import {Service} from './Service'
/**
 * Options container store
 *
 * @sealed
 */
declare class Store<T = Configuration> extends Service<T> {
  name: string
  /**
   * Get a store value
   *
   * @override
   */
  get<T = any>(path: keyof Store.Repository): T
}
declare namespace Store {
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
  type Repository = {
    [K in Store.Keys & string]?: any
  }
}
export {Store}
//# sourceMappingURL=Store.d.ts.map
