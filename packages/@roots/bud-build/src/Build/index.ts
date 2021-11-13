import {
  Build as Contract,
  Items,
  Loaders,
  Rules,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {ensureFile, writeFile} from 'fs-extra'
import type * as Webpack from 'webpack'

import {config} from './config'
import items from './items'
import loaders from './loaders'
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
  public async make(): Promise<Webpack.Configuration> {
    this.app.hooks.filter('build.before')

    this.config = Object.entries(
      this.app.hooks.filter('build'),
    ).reduce(
      (all: Partial<Webpack.Configuration>, [key, value]) => {
        if (typeof value === 'undefined') {
          this.log(`warn`, {
            prefix: 'bud.build.config',
            message: `excluding ${key}`,
            suffix: `value is undefined`,
          })
          return all
        }
        return {...all, [key]: value}
      },
      {},
    )

    this.app.hooks.filter('build.after', this.app)

    await this.writeFinalConfig(this.config)

    return this.config
  }

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
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
      .reduce(componentReducer, this.loaders) as Loaders

    // Reduce rules
    this.rules = this.app
      .container(rules)
      .getEntries()
      .reduce(componentReducer, this.rules) as Rules

    // Reduce items
    this.items = this.app
      .container(items)
      .getEntries()
      .reduce(componentReducer, this.items) as Items

    config(this.app)
  }

  @bind
  public async writeFinalConfig(config: Webpack.Configuration) {
    try {
      const filePath = this.app.path(
        'storage',
        config.name,
        'webpack.config.js',
      )

      await ensureFile(filePath)
      await writeFile(
        filePath,
        `module.exports = (${JSON.stringify(config, null, 2)})`,
      )
    } catch (error) {
      this.log('error', `failed to write webpack.config.json`)
      this.log(`error`, error)
    }
  }
}
