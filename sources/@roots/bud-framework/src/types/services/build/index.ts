import type * as Webpack from 'webpack'

import type {Service as BaseService} from '../../../service'
import type {Base} from './base'
import type {Item} from './item'
import type {Loader} from './loader'
import type {Items, Loaders, Rules} from './registry'
import type * as Rule from './rule'

/**
 * Build Service
 *
 * @remarks
 * Generates a compiler config and acts as a repository for {@link Rule} {@link Item}
 * and {@link Loader} instances.
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
 * Get the current `build.entry` value
 *
 * ```js
 * bud.hooks.filter('build.entry', {})
 * ```
 *
 * @public
 */
export interface Service extends BaseService {
  [key: string]: any

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
  getLoader<K extends `${keyof Loaders}`>(name: K): Loaders[K]

  /**
   * Set a {@link Loader} instance
   *
   * @public
   */
  setLoader<K extends `${keyof Loaders & string}`>(
    name: K,
    definition?: any,
  ): this

  /**
   * Make a {@link Loader} instance
   *
   * @public
   */
  makeLoader(src?: string): Loader

  /**
   * Set a {@link Rule} instance
   *
   * @public
   */
  setRule<K extends `${keyof Rules}`>(
    name: K,
    options?: Rule.Options | Rule.Interface,
  ): this

  /**
   * Make a new {@link Rule} instance
   *
   * @public
   */
  makeRule(options?: Partial<Rule.Options> | Rule.Output): Rule.Interface

  /**
   * Get a {@link Item} instance
   *
   * @public
   */
  getItem<K extends `${keyof Items}`>(name: K): Items[K]

  /**
   * Set a {@link Item} instance
   *
   * @public
   */
  setItem<K extends `${keyof Items & string}`>(
    name: K,
    options?: Items[K]['options'] | ((item: Items[K]) => Items[K]),
  ): this

  /**
   * Make a new {@link Item} instance
   *
   * @public
   */
  makeItem(options?: Partial<Item['options']>): Item
}

export type {Base, Item, Items, Loader, Loaders, Rule, Rules}
