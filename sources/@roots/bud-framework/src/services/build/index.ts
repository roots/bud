import type * as Webpack from 'webpack'

import type {Service as BaseService} from '../../service.js'
import type {Item} from './item/index.js'
import type {Loader} from './loader/index.js'
import type {Rule} from './rule/index.js'

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
 * - {@link Build.loaders} can be extended by augmenting the {@link Bud.Loaders} interface
 * - {@link Build.items} can be extended by augmenting the {@link Bud.Items} interface
 * - {@link Build.rules} can be extended by augmenting the {@link Bud.Rules} interface
 *
 * @example
 * Access the configuration:
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Build the configuration:
 *
 * ```js
 * await build.make()
 * ```
 *
 * @example
 * Get the current `configuration.entry` value
 *
 * ```js
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public
 */
export interface Service extends BaseService {
  /**
   * Arrayed {@link Loader} instances
   *
   * @public
   */
  loaders: Loaders

  /**
   * Arrayed {@link Item} instances
   *
   * @public
   */
  items: Items

  /**
   * Arrayed {@link Rule} instances
   *
   * @public
   */
  rules: Rules

  /**
   * Compiler configuration
   *
   * @public
   */
  config: Webpack.Configuration

  /**
   * Make {@link Build.config}
   *
   * @public
   */
  make(): Promise<Service['config']>

  /**
   * Set a {@link Loader} instance
   *
   * @public
   */
  setLoader(name: string, options: string): Service

  /**
   * Make a {@link Loader} instance
   *
   * @public
   */
  makeLoader(options?: string): Loader

  /**
   * Set a {@link Rule} instance
   *
   * @public
   */
  setRule(
    name: string,
    options?: Partial<Rule.Options> | ((item: Rule) => Rule),
  ): Service

  /**
   * Make a new {@link Rule} instance
   *
   * @public
   */
  makeRule(options?: Partial<Rule.Options>): Rule

  /**
   * Set a {@link Item} instance
   *
   * @public
   */
  setItem(
    name: string,
    options?: Partial<Item.Options> | ((item: Item) => Item),
  ): Service

  /**
   * Make a new {@link Item} instance
   *
   * @public
   */
  makeItem(options?: Partial<Item.Options>): Item
}

/**
 * Registered {@link Loader} instances
 *
 * @virtual @public
 */
export interface Loaders extends Partial<Record<string, Loader>> {}
export {Loader}

/**
 * Registered {@link Item} instances
 *
 * @virtual @public
 */
export interface Items extends Partial<Record<string, Item>> {}
export {Item}

/**
 * Registered {@link Rule} instances
 *
 * @virtual @public
 */
export interface Rules extends Partial<Record<string, Rule>> {}
export {Rule}

export {Service as Build}
