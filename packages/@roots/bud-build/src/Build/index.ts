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
 * Builds the {@link Webpack Webpack} configuration object from
 * {@link Framework Framework} components.
 */
export class Build extends Service implements Contract {
  /**
   * Service identifier
   */
  public name = 'build'

  /**
   * Registered loaders
   */
  public loaders: Framework.Loaders

  /**
   * Registered rules
   */
  public rules: Framework.Rules

  /**
   * Registered items
   */
  public items: Framework.Items

  /** @hidden */
  public _config: Webpack.Configuration

  /**
   * The Webpack config object
   * @readonly
   */
  public get config(): Webpack.Configuration {
    if (!this._config) {
      this.rebuild()
    }

    return this._config
  }

  /**
   * Rebuild the Webpack config object
   *
   * @decorator `@bind`
   */
  @bind
  public rebuild(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * Registers config builder components and calls initial hooks
   */
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
