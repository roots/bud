import {
  Build as Contract,
  Items,
  Loaders,
  Rules,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
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
export class Build
  extends Service
  implements Contract.Interface
{
  /**
   * @internal
   */
  public config: Webpack.Configuration

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
   * Make build
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(): Webpack.Configuration {
    this.app.time('running build/before hooks')
    this.app.hooks.filter('build/before')
    this.app.timeEnd('running build/before hooks')

    this.app.time('build.make')
    this.config = Object.entries(
      this.app.hooks.filter('build'),
    ).reduce(
      (all: Partial<Webpack.Configuration>, [key, value]) => {
        if (typeof value === 'undefined') {
          this.app.warn(
            `webpack ${key} is undefined. excluding.`,
          )
          return all
        }
        return {...all, [key]: value}
      },
      {},
    )

    this.app.timeEnd('build.make')

    this.app.time('running build/after hooks')
    this.app.hooks.filter('build/after')
    this.app.timeEnd('running build/after hooks')

    return this.config
  }

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bootstrap() {
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
}
