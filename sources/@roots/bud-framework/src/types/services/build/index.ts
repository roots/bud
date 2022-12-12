import type {Configuration} from '@roots/bud-support/webpack'

import type {Items, Loaders, Rules} from '../../../index.js'
import type {Service as BaseService} from '../../../service.js'
import type {Base} from './base.js'
import type {Item} from './item.js'
import type {Loader} from './loader.js'
import type {
  Options as RuleOptions,
  Output as RuleOutput,
  Rule,
} from './rule.js'

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
  config: Configuration

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
  getLoader<K extends `${keyof Loaders & string}`>(name: K): Loaders[K]

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
  setRule<K extends `${keyof Rules & string}`>(
    name: K,
    options?: RuleOptions | Rule,
  ): this

  /**
   * Make a new {@link Rule} instance
   *
   * @public
   */
  makeRule(options?: Partial<RuleOptions> | RuleOutput): Rule

  /**
   * Get a {@link Item} instance
   *
   * @public
   */
  getItem<K extends `${keyof Items & string}`>(name: K): Items[K]

  /**
   * Set a {@link Item} instance
   *
   * @public
   */
  setItem<K extends `${keyof Items & string}`>(
    name: K,
    options?: any,
  ): this

  /**
   * Make a new {@link Item} instance
   *
   * @public
   */
  makeItem(options?: Partial<Item['options']>): Item
}

export type {Base, Item, Loader, Rule}
