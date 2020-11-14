import {Bud, Container, Webpack, Index, Item, Rule} from '.'

/**
 * Build produces the final webpack configuration object.
 */
export declare class Contract {
  /**
   * The Bud application instance.
   */
  public bud: Bud.Contract

  /**
   * The builders which do the work.
   */
  public builders: Partial<Builders>

  /**
   * Loaders
   */
  public loaders: Container

  /**
   * Items (loader implementations)
   */
  public items: Container

  /**
   * Rules (sets of Items used under certain conditions)
   */
  public rules: Container

  /**
   * THe final built configuration object.
   */
  public config: Container

  /**
   * Class constructor.
   */
  public constructor(bud: Bud.Contract)

  /**
   * Function producing the final webpack configuration.
   */
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
  public getItem(name: string): RuleSetLoader

  /**
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
 * Build
 */
/**
 * @see {webpack.Loader}
 */
export type Loader = string

/**
 * Builds webpack's entrypoint configuration
 */
export type Entry = (config: Container) => Product.Entry

/**
 * Builds webpack's externals configuration
 */
export type Externals = (config: Container) => Product.Externals

/**
 * Builds webpack's module configuration
 */
export type Module = (
  args?: Index<any>,
) => {module: Webpack.Module}

/**
 * Called by Module
 *
 * Builds webpack's rules configuration
 */
export type Rules = (
  args?: Index<any>,
) => Product.Module['rules']

/**
 * Builds webpack's resolve configuration.
 */
export type Resolve = (
  args?: Index<any>,
) => Index<Product.Resolve>

/**
 * Builds webpack's optimization configuration
 */
export type Optimization = (
  args?: Index<any>,
) => Product.Optimization

/**
 * Builds webpack's plugins configuration
 */
export type Plugins = (
  this: Bud.Contract,
  args?: Index<any>,
) => {[key: string]: Webpack.Configuration['plugins']}

/**
 * Builds webpack's output configuration
 */
export type Output = (args?: Index<any>) => Index<Product.Output>

/**
 * Webpack has a lot of top level keys which are
 * simple values or are very shallow tries.
 *
 * This component just aggregates the small stuff so
 * as to keep the top level reducer clear from also having
 * to handle many small concerns.
 */
export type General = (
  this: Bud.Contract,
  build: Partial<Webpack.Configuration>,
) => Product.General

/**
 * Webpack.Configuration builder functions
 */
export type Builders =
  | Entry
  | Externals
  | Module
  | Resolve
  | Optimization
  | Plugins
  | Output
  | General

/**
 * Output produced by the builders.
 */
export namespace Product {
  /**
   * @see {webpack.Configuration['entry']}
   */
  export type Entry = Webpack.Entry | Webpack.EntryFunc

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

  /**
   * @see {webpack.Configuration['optimization']}
   */
  export type Optimization = Webpack.Options.Optimization

  /**
   * @see {webpack.Configuration['output']}
   */
  export type Output = Webpack.Output

  /**
   * @see {webpack.Configuration['plugin']}
   */
  export type Plugins = Webpack.Configuration['plugins']

  /**
   * @see {webpack.Configuration}
   */
  export type General = Omit<
    Webpack.Configuration,
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

export namespace Loader {
  /**
   * Loaders are keyed values so they can be manipulated by name.
   */
  export type Repository = Index<Loader>
}

/**
 * @see {Rule.Module}
 */
export type RuleSetLoader = {
  /**
   * Loader name
   */
  loader?: string

  /**
   * Loader options
   */
  options?: Index<any>

  /**
   * Unique loader identifier
   */
  ident?: string

  /**
   * Loader query
   */
  query?: Webpack.RuleSetQuery
}
