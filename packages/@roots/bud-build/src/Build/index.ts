import type {
  Build as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import type * as Webpack from 'webpack'

import {config} from './config'
import * as items from './items'
import * as loaders from './loaders'
import * as rules from './rules'

class Build extends Service implements Contract {
  public name = 'build'

  public loaders: Framework.Loaders

  public rules: Framework.Rules

  public items: Framework.Items

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
      .reduce(componentReducer, {}) as Framework.Loaders

    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, {}) as Framework.Rules

    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, {}) as Framework.Items

    config(this.app)
  }

  /** @hidden */
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

export {Build}
