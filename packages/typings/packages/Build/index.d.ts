import { Webpack } from "../Webpack"
import type {Bud, Container, Index, Item, Rule} from '../'

/**
 * Framework.Build is ultimately responsible for producing
 * the webpack configuration utilized by Framework.Compiler
 * and Framework.Server.
 */
export declare class Build {
  /**
   * The Bud application instance.
   */
  public bud: Bud

  /**
   * The builders which do the work.
   */
  public builders: Partial<Build.Builders>

  /**
   * Loaders
   */
  public loaders: Index<Build.Loader>

  /**
   * Items (loader implementations)
   */
  public items: Index<Item>

  /**
   * Rules (sets of Framework.Build.Items used under certain conditions)
   */
  public rules: Index<Rule>

  /**
   * THe final built configuration object.
   */
  public config: Container

  /**
   * Class constructor.
   */
  public constructor(arguments: Index<Bud>)

  /**
   * Function producing the final webpack configuration.
   */
  public make(): Webpack.Configuration

  /**
   * Add or override a loader by key.
   */
  public setLoader(
    name: string,
    loader: Build.Loader,
  ): Build.Loader

  /**
   * Get a loader by key
   */
  public getLoader(name: string): Build.Loader

  /**
   * Ge an item by key.
   */
  public getItem(name: string): Build.RuleSetLoader

  /**
   * Add or override an item by key.
   */
  public setItem(
    name: string,
    module: Item.Module,
  ): Item

  /**
   * Merge values onto an existing item.
   */
  public mergeItem(
    item: string,
    value: Partial<Item.Module>,
  ): void

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
  ): Framework.Rule

  /**
   * Merge values onto an existing rule.
   */
  public mergeRule(name: string, rule: Rule.Module)
}

export namespace Build {
  /**
   * @see {webpack.Loader}
   */
  export type Loader = string
  export namespace Loader {
    /**
     * Loaders are keyed values so they can be manipulated by name.
     */
    export type Repository = Index<Loader>
  }

  /**
   * The final product.
   * @see {Webpack.Configuration}
   */
  export type Configuration = Webpack.Configuration

  /**
   * Output produced by the builders.
   */
  export namespace Product {
    /**
     * @see {webpack.Configuration['entry']}
     */
    export type Entry =
      | Webpack.Entry
      | Webpack.EntryFunc

    /**
     * @see {webpack.Configuration['externals']}
     */
    export type Externals = Webpack.ExternalsObjectElement

    /**
     * @see {webpack.Configuration['module']}
     */
    export type Module = Webpack.Module

    /**
     * @see {webpack.Configuration['resolve']}
     */
    export type Resolve = Webpack.Resolve
    export type Optimization = Webpack.Options.Optimization
    export type Output = Webpack.Output
    export type Plugins = Webpack.Plugin[]

    export type General = Omit<
      Configuration,
      | 'entry'
      | 'externals'
      | 'module'
      | 'resolve'
      | 'optimization'
      | 'plugins'
      | 'output'
      | 'string'
    >
  }

  /**
   * Builds webpack's entrypoint configuration
   */
  export type Entry = (
    state?: Container.Repository,
  ) => Product.Entry

  /**
   * Builds webpack's externals configuration
   */
  export type Externals = (
    state?: Container.Repository,
  ) => Product.Externals

  /**
   * Builds webpack's module configuration
   */
  export type Module = (
    build?: Container.Repository,
  ) => {module: Webpack.Module}

  /**
   * Called by Build.Module
   *
   * Builds webpack's rules configuration
   */
  export type Rules = (
    build?: Container.Repository,
  ) => Product.Module['rules']

  /**
   * Builds webpack's resolve configuration.
   */
  export type Resolve = (
    state?: Container.Repository,
  ) => Index<Product.Resolve>

  /**
   * Builds webpack's optimization configuration
   */
  export type Optimization = (
    state?: Container.Repository,
  ) => Product.Optimization

  /**
   * Builds webpack's plugins configuration
   */
  export type Plugins = (
    state?: Container.Repository,
  ) => Index<Product.Plugins>

  /**
   * Builds webpack's output configuration
   */
  export type Output = (
    state?: Container.Repository,
  ) => Index<Product.Output>

  /**
   * Webpack has a lot of top level keys which are
   * simple values or are very shallow tries.
   *
   * This component just aggregates the small stuff so
   * as to keep the top level reducer clear from also having
   * to handle many small concerns.
   */
  export type General = (
    state?: Container.Repository,
  ) => Product.General

  /**
   * Config file builder functions
   */
  export type Builders =
    | Build.Entry
    | Build.Externals
    | Build.Module
    | Build.Resolve
    | Build.Optimization
    | Build.Plugins
    | Build.Output
    | Build.General

  export type RuleSetLoader = {
      /**
       * Loader name
       */
      loader?: string;
      /**
       * Loader options
       */
      options?: Framework.Index<any>;
      /**
       * Unique loader identifier
       */
      ident?: string;
      /**
       * Loader query
       */
      query?: Webpack.RuleSetQuery;
  }
}
