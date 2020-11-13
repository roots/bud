import * as builders from '../builders'
import {Item} from '../Item'
import {Rule} from '../Rule'

import type Webpack from 'webpack'
import type {Bud} from '@roots/bud-typings'

export {Build, Build as default}

class Build implements Build.Contract {
  public bud: Bud.Contract

  public builders: Partial<Framework.Build.Builders> = builders

  public loaders

  public items

  public rules

  public config

  public constructor(bud: Bud.Contract) {
    this.bud = bud

    this.loaders = this.bud.makeContainer<
      Framework.Build.Loader
    >()
    this.items = this.bud.makeContainer<Item.Module>()
    this.rules = this.bud.makeContainer<Rule.Module>()
  }

  public make(): Webpack.Configuration {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [string, Framework.Build.Builders],
      ) => ({
        ...config,
        ...builder.bind(this.bud)(this.bud.config.all()),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  public filterEmpty(
    object: Framework.Index<any>,
  ): {[key: string]: any} {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  public getLoader(name: string): Framework.Build.Loader {
    return this.loaders.get(name)
  }

  public setLoader(
    this: Build,
    name: string,
    loader: Framework.Build.Loader,
  ): Framework.Build.Loader {
    this.loaders.set(name, loader)
    return this.loaders.get(name)
  }

  public getItem(name: string): Framework.Build.RuleSetLoader {
    return this.items.get(name)
  }

  public setItem(name: string, module: Item.Module): Item {
    this.items.set(name, new Item(this.bud, module).make())
    return this.items.get(name)
  }

  public getRule(name: string): Webpack.RuleSetRule {
    return this.rules.get(name)
  }

  public setRule(name: string, module: Rule): Rule {
    this.rules.set(name, new Rule(this.bud, module).make())
    return this.rules.get(name)
  }
}

namespace Build {
  /**
   * Framework.Build produces the final webpack configuration object.
   */
  export declare class Contract {
    /**
     * The Bud application instance.
     */
    public bud: Bud.Contract

    /**
     * The builders which do the work.
     */
    public builders: Partial<Build.Builders>

    /**
     * Loaders
     */
    public loaders: Framework.Indexed

    /**
     * Items (loader implementations)
     */
    public items: Framework.Indexed

    /**
     * Rules (sets of Framework.Build.Items used under certain conditions)
     */
    public rules: Framework.Indexed

    /**
     * THe final built configuration object.
     */
    public config: Framework.Indexed

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
    public setItem(name: string, module: Item.Module): Item

    /**
     * Get a rule by key.
     */
    public getRule(name: string): Webpack.RuleSetRule

    /**
     * Add or override a rule by key.
     */
    public setRule(name: string, module: Rule.Module): Rule
  }

  /**
   * Build
   */
  /**
   * @see {webpack.Loader}
   */
  export type Loader = string

  /**
   * The final product.
   * @see {Webpack.Configuration}
   */
  export type Configuration = Webpack.Configuration

  /**
   * Builds webpack's entrypoint configuration
   */
  export type Entry = (
    args?: Framework.Index<any>,
  ) => Product.Entry

  /**
   * Builds webpack's externals configuration
   */
  export type Externals = (
    args?: Framework.Index<any>,
  ) => Product.Externals

  /**
   * Builds webpack's module configuration
   */
  export type Module = (
    args?: Framework.Index<any>,
  ) => {module: Webpack.Module}

  /**
   * Called by Build.Module
   *
   * Builds webpack's rules configuration
   */
  export type Rules = (
    args?: Framework.Index<any>,
  ) => Product.Module['rules']

  /**
   * Builds webpack's resolve configuration.
   */
  export type Resolve = (
    args?: Framework.Index<any>,
  ) => Framework.Index<Product.Resolve>

  /**
   * Builds webpack's optimization configuration
   */
  export type Optimization = (
    args?: Framework.Index<any>,
  ) => Product.Optimization

  /**
   * Builds webpack's plugins configuration
   */
  export type Plugins = (
    this: Bud,
    args?: Framework.Index<any>,
  ) => {[key: string]: Webpack.Configuration['plugins']}

  /**
   * Builds webpack's output configuration
   */
  export type Output = (
    args?: Framework.Index<any>,
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
    this: Bud.Contract,
    build: Partial<Framework.Build.Configuration>,
  ) => Product.General

  /**
   * Webpack.Configuration builder functions
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

  export namespace Loader {
    /**
     * Loaders are keyed values so they can be manipulated by name.
     */
    export type Repository = Framework.Index<Loader>
  }

  /**
   * @see {Framework.Rule.Module}
   */
  export type RuleSetLoader = {
    /**
     * Loader name
     */
    loader?: string

    /**
     * Loader options
     */
    options?: Framework.Index<any>

    /**
     * Unique loader identifier
     */
    ident?: string

    /**
     * Loader query
     */
    query?: Webpack.RuleSetQuery
  }
}
