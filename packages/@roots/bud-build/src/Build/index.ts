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

export class Build extends Service implements Contract {
  /** @hidden */
  public _config: Webpack.Configuration

  public name = 'build'

  public loaders: Framework.Loaders

  public rules: Framework.Rules

  public items: Framework.Items

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
      .reduce(componentReducer, {})

    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, {})

    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, {})

    config(this.app)
  }
}
