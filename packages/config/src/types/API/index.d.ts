import Container from '@roots/container'
import Server from '@roots/bud-server'
import * as TerserPluginOptions from 'terser-webpack-plugin'
import {TransformOptions} from '@babel/core'
import Globby from 'globby'
import {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'
import Webpack from 'webpack'

export as namespace API

declare interface Fluent<T, P> {
  (this: T, ...P): T
}

declare type AddExtensions = Fluent<any, string | string[]>

declare type Bud = any
declare type Dist = PathGetter
declare type Project = PathGetter
declare type Src = PathGetter
declare type DistPath = Fluent<Bud, string>
declare type ProjectPath = Fluent<Bud, string>
declare type PublicPath = Fluent<Bud, string>
declare type SrcPath = Fluent<Bud, string>
declare type AddPlugin = Fluent<Bud, unknown>
declare type addExtensions = Fluent<Bud, string | string[]>
declare type Alias = Fluent<Bud, Container['repository']>
declare type Babel = Fluent<Bud, Options.Babel>
declare type Brotli = Fluent<Bud, Container['repository']>
declare type Entry = (name: string, entries: string[]) => Bud
declare type Compile = (this: Bud) => Promise<void>
declare type Copy = Fluent<Bud, {from: string; to: string}>
declare type CopyAll = Fluent<Bud, {from: string; to: string}>
declare type Devtool = Fluent<Bud, Webpack.Options.Devtool>
declare type Extend = Fluent<Bud, PluginFactory>
declare type Glob = Fluent<Bud, Options.Glob>

declare type Gzip = (
  this: Bud,
  options?: Container['repository'],
) => Bud

declare type Hash = (this: Bud) => Bud
declare type Library = (this: Bud) => Bud
declare type Minify = (this: Bud) => Bud
declare type Postcss = (
  this: Bud,
  options?: Options.Postcss,
) => Bud

declare type Vendor = (
  this: Bud,
  options?: Webpack.Options.CacheGroupsOptions,
) => Bud

declare type When = (
  this: Bud,
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction | undefined,
) => Bud

declare type Template = (
  this: Bud,
  options: Options.Template,
) => Bud

declare type Dev = (this: Bud, config: Server.Config) => Bud

declare type Target = (
  this: Bud,
  target: Webpack.Configuration['target'],
) => Bud

declare type Terser = (
  this: Bud,
  options: TerserPluginOptions,
) => Bud

declare type PostPluginAdd = (
  this: Bud,
  entry: PostPluginStore | PostPluginStore[],
) => Bud

declare type PostPluginConfig = (
  this: Bud,
  plugin: PostPluginStore,
  options: unknown,
) => Bud

declare type Provide = (
  this: Bud,
  options: {
    [key: string]: string[]
  },
) => Bud

declare type Runtime = (this: Bud, name?: string) => Bud

declare interface PathGetter {
  (this: Bud, path?: string | undefined): string
}

declare namespace Options {
  export type Babel = TransformOptions

  export type Glob = {
    name: string
    files: string | string[]
    options?: Globby.GlobbyOptions
  }

  export type Postcss = {
    syntax?: Syntax
    plugins?: PostPluginStore[]
    map?: SourceMapOptions
    parser?: Parser
    stringifier?: Stringifier
  }

  export type Template = {
    template?: string
    replacements?: {[key: string]: string}
  }
}

declare type PluginFactory = (bud?: Bud) => Webpack.Plugin

declare interface PostPluginTuple {
  plugin: AcceptedPlugin
  options?: unknown
}

declare interface PostPluginStore {
  [key: string]: PostPluginTuple
}
