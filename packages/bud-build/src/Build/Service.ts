import {Service} from '@roots/bud-support'
import Build from '../Build'
import Loader from '../Loader'
import Item from '../Item'
import Rule from '../Rule'
import {Container, Framework, Webpack} from '@roots/bud-typings'

export default abstract class extends Service<Framework> {
  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  public abstract builders: Partial<Build.Builder>

  /**
   * ## bud.build.loaders
   *
   * Container of available loaders.
   *
   * @see {webpack.Loader}
   */
  public loaders: Container

  /**
   * ## bud.build.items
   *
   * Container of available RuleSetRule['use'] items.
   *
   * @see {webpack.Configuration}
   */
  public items: Container

  /**
   * ## bud.build.rules
   *
   * Container of available RuleSetRules
   *
   * @see {webpack.Configuration}
   */
  public rules: Container

  /**
   * Make build.
   */
  public abstract make(): Webpack.Configuration

  /**
   * Add or override a loader by key.
   */
  public abstract setLoader(name: string, loader: Loader): Loader

  /**
   * Get a loader by key
   */
  public abstract getLoader(name: string): Loader

  /**
   * Ge an item by key.
   */
  public abstract getItem(name: string): Item

  /**
   * Add or override an item by key.
   */
  public abstract setItem(
    name: string,
    module: Item.Module,
  ): Item

  /**
   * Get a rule by key.
   */
  public abstract getRule(name: string): Rule

  /**
   * Add or override a rule by key.
   */
  public abstract setRule(
    name: string,
    module: Rule.Module,
  ): Rule
}
