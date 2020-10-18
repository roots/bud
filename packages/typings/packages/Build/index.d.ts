export declare class Build {
  [key: string]: any

  public bud: Framework.Bud

  public builders: Partial<Build.Builders>

  public loaders: Framework.Index<Build.Loader>

  public items: Framework.Index<Framework.Item>

  public rules: Framework.Index<Framework.Rule>

  public config: Framework.Container

  public constructor(bud: Framework.Bud)

  public compile(): Framework.Webpack.Configuration

  public getLoader(name: string): Build.Loader

  public setLoader(
    name: string,
    loader: Build.Loader,
  ): Build.Loader

  public getItem(name: string): Framework.Item.Product

  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item

  public getRule(name: string): Framework.Rule.Product

  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule
}

export namespace Build {
  export type Loader = string
  export namespace Loader {
    export type Repository = Framework.Index<Loader>
  }

  export type Configuration = Framework.Webpack.Configuration

  export type Input = any

  export namespace Product {
    export type Entry = Framework.Webpack.Entry | Framework.Webpack.EntryFunc
    export type Externals = Framework.Webpack.ExternalsObjectElement
    export type Module = Framework.Webpack.Module
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

  export type Entry = (
    state?: Framework.Container.Repository,
  ) => Product.Entry

  export type Externals = (
    state?: Framework.Container.Repository,
  ) => Product.Externals

  export type Module = (
    build?: Framework.Container.Repository,
  ) => Framework.Webpack.Module

  export type Rules = (
    build?: Framework.Container.Repository,
  ) => Product.Module['rules']

  export type Resolve = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Resolve>

  export type Optimization = (
    state?: Framework.Container.Repository,
  ) => Product.Optimization

  export type Plugins = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Plugins>

  export type Output = (
    state?: Framework.Container.Repository,
  ) => Framework.Index<Product.Output>

  export type General = (
    state?: Framework.Container.Repository,
  ) => Product.General

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
