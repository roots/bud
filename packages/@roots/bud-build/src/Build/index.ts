import {Build, Items, Loaders, Rules} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import type * as Webpack from 'webpack'

import {config} from './config'
import * as items from './items'
import * as loaders from './loaders'
import * as rules from './rules'

/**
 * Framework configuration builder class
 *
 * @public
 */
export default class extends Service implements Build.Interface {
  public name = 'build'

  public loaders: Loaders

  public rules: Rules

  public items: Items

  public bootstrap(): void {
    function componentReducer<T = any>(
      a,
      [k, v]: [string, () => T],
    ) {
      return {...a, [k]: v()}
    }

    this.loaders = this.app
      .container(loaders)
      .getEntries()
      .reduce(componentReducer, {}) as Loaders

    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, {}) as Rules

    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, {}) as Items

    config(this.app)
  }

  /**
   * @internal
   */
  public _config: Webpack.Configuration

  /**
   * {@link Webpack.Configuration}
   *
   * @readonly
   */
  public get config(): Webpack.Configuration {
    if (!this._config) {
      this.rebuild()
    }

    return this._config
  }

  @bind
  public rebuild(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }
}
