import {Container, Framework, Webpack} from '@roots/bud-typings'
import Build from './'
import Loader from '../Loader'
import Item from '../Item'
import Rule from '../Rule'

export default abstract class {
  public _bud: Framework.Ref

  public builders: Partial<Build.Builder>

  public loaders: Container

  public items: Container

  public rules: Container

  /**
   * Class constructor
   */
  public constructor(bud: Framework) {
    this._bud = bud.get
    this.loaders = bud.makeContainer()
    this.items = bud.makeContainer({})
    this.rules = bud.makeContainer({})
  }

  /**
   * Bud accessor.
   */
  public get bud(): Framework {
    return this._bud()
  }

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
