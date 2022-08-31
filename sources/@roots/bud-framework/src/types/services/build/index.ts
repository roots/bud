import type * as Webpack from 'webpack'

import type {Service as BaseService} from '../../../service'
import type {Base} from './base'
import type {Item} from './item'
import type {Loader} from './loader'
import type {Rule} from './rule'

/**
 * Build Service
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
  loaders: Record<string, Loader>

  /**
   * Arrayed {@link Item} instances
   *
   * @public
   */
  items: Record<string, Item>

  /**
   * Arrayed {@link Rule} instances
   *
   * @public
   */
  rules: Record<string, Rule>

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

export type {Base, Item, Loader, Rule}
