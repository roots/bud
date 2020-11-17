import {
  Bud,
  Container,
  Webpack,
  Loader,
  Item,
  Rule,
  Build,
} from '.'

/**
 * Build produces the final webpack configuration object.
 */
export declare class Contract {
  public bud: Bud.Ref

  public builders: Partial<Builder>

  public loaders: Container<Loader>

  public items: Container<Item.Module>

  public rules: Container<Rule.Module>

  public constructor(bud: Bud.Contract)

  public make(): Webpack.Configuration

  /**
   * Add or override a loader by key.
   */
  public setLoader(name: string, loader: Loader): Loader

  /**
   * Get a loader by key
   */
  public getLoader(name: string): Loader

  /**
   * Ge an item by key.
   */
  public getItem(name: string): Item.RuleSetLoader

  /**  /**
   * Add or override an item by key.
   */
  public setItem(
    name: string,
    module: Item.Module,
  ): Item.Contract

  /**
   * Get a rule by key.
   */
  public getRule(name: string): Webpack.RuleSetRule

  /**
   * Add or override a rule by key.
   */
  public setRule(
    name: string,
    module: Rule.Module,
  ): Rule.Contract
}

/**
 * Builder
 */
export type Builder = (
  this: Bud.Contract,
  config: Container<Webpack.Configuration>,
) => Partial<Webpack.Configuration>
