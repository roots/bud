/**
 * Framework.Build is ultimately responsible for producing
 * the webpack configuration utilized by Framework.Compiler
 * and Framework.Server.
 */
export declare class Build {
  /**
   * The Bud application instance.
   */
  public bud: Framework.Bud

  /**
   * The builders which do the work.
   */
  public builders: Partial<Build.Builders>

  /**
   * Loaders
   */
  public loaders: Framework.Index<Build.Loader>

  /**
   * Items (loader implementations)
   */
  public items: Framework.Index<Framework.Item>

  /**
   * Rules (sets of Framework.Build.Items used under certain conditions)
   */
  public rules: Framework.Index<Framework.Rule>

  /**
   * THe final built configuration object.
   */
  public config: Framework.Container

  /**
   * Class constructor.
   */
  public constructor(bud: Framework.Bud)

  /**
   * Function producing the final webpack configuration.
   */
  public compile(): Framework.Webpack.Configuration

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
  public getItem(name: string): Framework.Item.Product

  /**
   * Add or override an item by key.
   */
  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item

  /**
   * Merge values onto an existing item.
   */
  public mergeItem(
    item: string,
    value: Partial<Framework.Item>,
  ): void

  /**
   * Get a rule by key.
   */
  public getRule(name: string): Framework.Rule.Product

  /**
   * Add or override a rule by key.
   */
  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule

  /**
   * Merge values onto an existing rule.
   */
  public mergeRule(name: string, rule: Framework.Rule.Module)
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
    export type Repository = Framework.Index<Loader>
  }

  /**
   * The final product.
   * @see {Webpack.Configuration}
   */
  export type Configuration = Framework.Webpack.Configuration

  /**
   * Output produced by the builders.
   */
  export namespace Product {
    /**
     * @see {webpack.Configuration['entry']}
     */
    export type Entry =
      | Framework.Webpack.Entry
      | Framework.Webpack.EntryFunc

    /**
     * @see {webpack.Configuration['externals']}
     */
    export type Externals = Framework.Webpack.ExternalsObjectElement

    /**
     * @see {webpack.Configuration['module']}
     */
    export type Module = Framework.Webpack.Module

    /**
     * @see {webpack.Configuration['resolve']}
     */
    export type Resolve = Framework.Webpack.Resolve
    export type Optimization = Framework.Webpack.Options.Optimization
    export type Output = Framework.Webpack.Output
    export type Plugins = Framework.Webpack.Plugin[]

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
    state?: Framework.Container.Repository,
  ) => Product.Entry

  /**
   * Builds webpack's externals configuration
   */
  export type Externals = (
    state?: Framework.Container.Repository,
  ) => Product.Externals

  /**
   * Builds webpack's module configuration
   */
  export type Module = (
    build?: Framework.Container.Repository,
  ) => Framework.Webpack.Module

  /**
   * Called by Build.Module
   *
   * Builds webpack's rules configuration
   */
  export type Rules = (
    build?: Framework.Container.Repository,
  ) => Product.Module['rules']

  /**
   * Builds webpack's resolve configuration.
   */
  export type Resolve = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Resolve>

  /**
   * Builds webpack's optimization configuration
   */
  export type Optimization = (
    state?: Framework.Container.Repository,
  ) => Product.Optimization

  /**
   * Builds webpack's plugins configuration
   */
  export type Plugins = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Plugins>

  /**
   * Builds webpack's output configuration
   */
  export type Output = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Output>

  /**
   * Webpack has a lot of top level keys which are
   * simple values or are very shallow tries.
   *
   * This component just aggregates the small stuff so
   * as to keep the top level reducer clear from also having
   * to handle many small concerns.
   */
  export type General = (
    state?: Framework.Container.Repository,
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
}
