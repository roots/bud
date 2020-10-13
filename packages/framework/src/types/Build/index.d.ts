import type Webpack from 'webpack'
import type Container from '@roots/container'
import type {Index} from '../generic'

export as namespace Build

export declare class Build {
  [key: string]: any

  public bud: Framework.Bud

  public builders: Partial<Build.Builders>

  public loaders: Framework.Index<Build.Loader>

  public items: Framework.Index<Build.Item>

  public rules: Framework.Index<Build.Rule>

  public config: Container

  public constructor(bud: Framework.Bud)

  public compile(): Configuration

  public getLoader(name: string): Build.Loader

  public setLoader(
    name: string,
    loader: Build.Loader,
  ): Build.Loader

  public getItem(name: string): Build.Item.Product

  public setItem(
    name: string,
    module: Build.Item.Module,
  ): Build.Item

  public getRule(name: string): Build.Rule.Generic

  public setRule(
    name: string,
    module: Build.Rule.Module,
  ): Build.Rule
}

export {Item} from './Item'

export {Rule} from './Rule'

export type Loader = string
export namespace Loader {
  export type Repository = Framework.Index<Loader>
}

export type Configuration = Webpack.Configuration

export type Input = any

export namespace Product {
  export type Entry = Webpack.Entry | Webpack.EntryFunc
  export type Externals = Webpack.ExternalsObjectElement
  export type Module = Webpack.Module
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

export type Entry = (
  state?: Container.Repository,
) => Product.Entry

export type Externals = (
  state?: Container.Repository,
) => Product.Externals

export type Module = (
  build?: Container.Repository,
) => Webpack.Module

export type Rules = (
  build?: Container.Repository,
) => Product.Module['rules']

export type Resolve = (
  state?: Container.Repository,
) => Index<Product.Resolve>

export type Optimization = (
  state?: Container.Repository,
) => Product.Optimization

export type Plugins = (
  state?: Container.Repository,
) => Index<Product.Plugins>

export type Output = (
  state?: Container.Repository,
) => Index<Product.Output>

export type General = (
  state?: Container.Repository,
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
