import * as Webpack from 'webpack'

import {Service} from '../Service'
import {Item} from './Item'
import {Loader} from './Loader'
import {Rule} from './Rule'

/**
 * Build Service interface
 *
 * @remarks
 * Generates a {@link Build.config} and acts as a repository for {@link Rule} {@link Item} 
 * and {@link Loader} instances.
 *
 * The most current config is accessible through {@link Build.config}. {@link Build.config}
 * can be created manually by calling {@link Build.make}.
 *
 * - {@link Build.loaders} can be extended by augmenting the {@link Framework.Loaders} interface
 * - {@link Build.items} can be extended by augmenting the {@link Framework.Items} interface
 * - {@link Build.rules} can be extended by augmenting the {@link Framework.Rules} interface
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 * 
 * @example
 * Build the config
 * 
 * ```js
 * await build.make()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public
 */
export interface Build extends Service {
  /**
   * Arrayed {@link Loader}
   * @public
   */
  loaders: Loaders

  /**
   * Arrayed {@link Item}
   * @public
   */
  items: Items

  /**
   * Arrayed {@link Rule}
   * @public
   */
  rules: Rules

  /**
   * Compiler configuration
   * @public
   */
  config: Webpack.Configuration

  /**
   * Make {@link Build.config}
   * @public
   */
  make(): Promise<Build['config']>

  /**
   * Set a {@link Loader}
   * @public
   */
  setLoader(name: string, options: string): Build

  /**
   * Make a {@link Loader}
   * @public
   */
  makeLoader(options?: string): Loader

  /**
   * Set a {@link Rule}
   * @public
   */
  setRule(
    name: string,
    options?: Partial<Rule.Options> | ((item: Rule) => Rule),
  ): Build

  /**
   * Make a new {@link Rule}
   * @public
   */
  makeRule(options?: Partial<Rule.Options>): Rule

  /**
   * Set a {@link Item}
   * @public
   */
  setItem(
    name: string,
    options?: Partial<Item.Options> | ((item: Item) => Item),
  ): Build

  /**
   * Make a new {@link Item}
   * @public
   */
  makeItem(options?: Partial<Item.Options>): Item
}

/**
 * Registered {@link Loader} instances
 * @virtual @public
 */
export interface Loaders extends Partial<Record<string, Loader>> {}
export {Loader}

/**
 * Registered {@link Item} instances
 * @virtual @public
 */
export interface Items extends Partial<Record<string, Item>> {}
export {Item}

/**
 * Registered {@link Rule} instances
 * @virtual @public
 */
export interface Rules extends Partial<Record<string, Rule>> {}
export {Rule}
