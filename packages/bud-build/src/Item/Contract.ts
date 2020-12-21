import {Framework} from '@roots/bud-typings'
import Item from './'

export default interface Contract {
  bud: Framework

  ident?: Item.Module.Ident

  loader?: Item.Module.Loader

  options?: Item.Module.Options

  query?: Item.Module.Query

  /**
   * Prop map
   */
  propMap: Item.PropMap

  getIdent: Item.Getter<Item.Module.Ident>

  getLoader: Item.Getter<Item.Module.Loader>

  getOptions: Item.Getter<Item.Module.Options>

  getQuery: Item.Getter<Item.Module.Query>

  set: Item.Setter<Item.Module>

  setIdent: Item.Setter<Item.Module.Ident>

  setLoader: Item.Setter<Item.Module.Loader>

  setOptions: Item.Setter<Item.Module.Options>

  setQuery: Item.Setter<Item.Module.Query>

  make: () => Item.RuleSetLoader
}
