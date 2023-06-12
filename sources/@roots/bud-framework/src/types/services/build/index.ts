import type {Configuration} from '@roots/bud-framework/config'

import type {Items, Loaders, Rules} from '../../../index.js'
import type {Service as BaseService} from '../../../service.js'
import type {Base} from './base.js'
import type {Item} from './item.js'
import type {Loader} from './loader.js'
import type {
  Rule,
  Options as RuleOptions,
  Output as RuleOutput,
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
 */
export interface Service extends BaseService {
  /**
   * Compiler configuration
   */
  config: Configuration

  /**
   * Get a {@link Item} instance
   */
  getItem<K extends `${keyof Items & string}`>(name: K): Items[K]

  /**
   * Set a {@link Loader} instance
   */
  getLoader<K extends `${keyof Loaders & string}`>(name: K): Loaders[K]

  /**
   * Get a {@link Rule} instance
   */
  getRule<K extends `${keyof Rules & string}`>(name: K): Rules[K]

  /**
   * {@link Item} instances
   */
  items: Items

  /**
   * {@link Loader} instances
   */
  loaders: Loaders

  /**
   * Make {@link Build.config}
   */
  make(): Promise<Service['config']>

  /**
   * Make a new {@link Item} instance
   */
  makeItem(options?: Partial<Item['options']>): Item

  /**
   * Make a {@link Loader} instance
   */
  makeLoader(name: string, definition?: string): Loader

  /**
   * Make a new {@link Rule} instance
   */
  makeRule(options?: Partial<RuleOptions> | RuleOutput): Rule

  /**
   * {@link Rule} instances
   */
  rules: Rules

  /**
   * Set a {@link Item} instance
   */
  setItem<K extends `${keyof Items & string}`>(
    name: K,
    options?: any,
  ): this

  /**
   * Set a {@link Loader} instance
   */
  setLoader<K extends `${keyof Loaders & string}`>(
    name: K,
    definition?: any,
  ): this

  /**
   * Set a {@link Rule} instance
   */
  setRule<K extends `${keyof Rules & string}`>(
    name: K,
    options?: Rule | RuleOptions,
  ): this
}

export type {Base, Item, Loader, Rule}
