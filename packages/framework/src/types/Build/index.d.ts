import type Webpack from 'webpack'
import type Container from '@roots/container'
import type {Index} from '../generic'

export {Use} from './Use'
export {Rule} from './Rule'

export declare interface Build {
  (): Build.Configuration
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

export as namespace Build
