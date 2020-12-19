import {
  Bud,
  Container,
  Webpack,
  Loader,
  Item,
  Rule,
} from '@roots/bud-typings'

declare class Build {
  public bud: Bud.Ref

  public builders: Partial<Build.Builder>

  public loaders: Container

  public items: Container

  public rules: Container

  public constructor(bud: Bud)

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
  public getItem(name: string): Item.Contract

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
  public getRule(name: string): Rule.Contract

  /**
   * Add or override a rule by key.
   */
  public setRule(
    name: string,
    module: Rule.Module,
  ): Rule.Contract
}

declare namespace Build {
  /**
   * Builder
   */
  export type Builder = (
    this: Bud,
    config: Container,
  ) => Partial<Webpack.Configuration>
}

export {Build}
