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
  /**
   * @internalRemarks
   * Just your friendly neighborhood Real JavaScript design pattern
   *
   * @internal
   */
  public _config: Webpack.Configuration

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.name}
   *
   * @public
   */
  public name = 'build'

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.loaders}
   *
   * @public
   */
  public loaders: Loaders

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.rules}
   *
   * @public
   */
  public rules: Rules

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.items}
   *
   * @public
   */
  public items: Items

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
   *
   * @public
   */
  public bootstrap(): void {
    /**
     * Reduces components to their normalized form
     *
     * @returns normalized loaders
     *
     * @internal
     */
    function componentReducer<T = any>(
      a,
      [k, v]: [string, () => T],
    ) {
      return {...a, [k]: v()}
    }

    // Reduce loaders
    this.loaders = this.app
      .container(loaders)
      .getEntries()
      .reduce(componentReducer, {}) as Loaders

    // Reduce rules
    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, {}) as Rules

    // Reduce items
    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, {}) as Items

    config(this.app)
  }

  /**
   * Finalized build configuration
   *
   * @public @readonly
   */
  public get config(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }

  /**
   * Finalized build configuration
   *
   * @deprecated Use {@link Build.Interface.config} instead
   *
   * @public
   */
  @bind
  public rebuild(): Webpack.Configuration {
    this._config = this.app.hooks.filter('build')

    return this._config
  }
}
