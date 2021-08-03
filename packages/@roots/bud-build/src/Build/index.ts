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

/**
 * Service: Build
 */
export class Build extends Service implements Contract {
  /**
   * @property {string} name
   */
  public name = 'build'

  /**
   * @property {Framework.Loaders}
   */
  public loaders: Framework.Loaders

  public rules: Framework.Rules

  public items: Framework.Items

  public _config: Webpack.Configuration

  public get config(): Webpack.Configuration {
    if (!this._config) {
      this.rebuild()
    }

    return this._config
  }

  public rebuild(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }

  @bind
  public register(): void {
    const componentReducer = (a, [k, v]) => ({...a, [k]: v()})

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

    this.app.hooks.on('before', () => [])
    this.app.hooks.on('after', () => [])

    config(this.app)
  }
}
