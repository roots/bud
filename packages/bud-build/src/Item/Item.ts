import {Framework} from '@roots/bud-typings'
import Item from './'

export default abstract class {
  public _bud: Framework.Ref

  public ident?: Item.Module.Ident

  public loader?: Item.Module.Loader

  public options?: Item.Module.Options

  public query?: Item.Module.Query

  public constructor(bud: Framework) {
    this._bud = bud.get
  }

  public get bud(): Framework {
    return this._bud()
  }

  public abstract propMap: Item.PropMap

  public abstract getIdent: Item.Getter<Item.Module.Ident>

  public abstract getLoader: Item.Getter<Item.Module.Loader>

  public abstract getOptions: Item.Getter<Item.Module.Options>

  public abstract getQuery: Item.Getter<Item.Module.Query>

  public abstract set: Item.Setter<Item.Module>

  public abstract setIdent: Item.Setter<Item.Module.Ident>

  public abstract setLoader: Item.Setter<Item.Module.Loader>

  public abstract setOptions: Item.Setter<Item.Module.Options>

  public abstract setQuery: Item.Setter<Item.Module.Query>

  public abstract make: () => Item.RuleSetLoader
}
