import Container from '@roots/container'
import {Server} from '@roots/bud-server'
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

declare type Bud = any

export as namespace API

export interface Fluent<T, P> {
  (this: T, ...P): T
}

export type AddExtensions = Fluent<any, string | string[]>

export type Dist = PathGetter

export type Project = PathGetter

export type Src = PathGetter

export type DistPath = Fluent<Bud, string>

export type ProjectPath = Fluent<Bud, string>

export type PublicPath = Fluent<Bud, string>

export type SrcPath = Fluent<Bud, string>

export type AddPlugin = Fluent<Bud, unknown>

export type addExtensions = Fluent<Bud, string | string[]>

export type Alias = Fluent<Bud, Container['repository']>

export type Babel = Fluent<Bud, Options.Babel>

export type Brotli = Fluent<Bud, Container['repository']>

export type Entry = (name: string, entries: string[]) => Bud

export type Compile = (this: Bud) => Promise<void>

export type Copy = Fluent<Bud, {from: string; to: string}>

export type CopyAll = Fluent<Bud, {from: string; to: string}>

export type Devtool = Fluent<Bud, Webpack.Options.Devtool>

export type Extend = Fluent<Bud, PluginFactory>

export type Glob = Fluent<Bud, Options.Glob>

export type Gzip = (
  this: Bud,
  options?: Container['repository'],
) => Bud

export type Hash = (this: Bud) => Bud

export type Library = (this: Bud) => Bud

export type Minify = (this: Bud) => Bud

export type Postcss = (
  this: Bud,
  options?: Options.Postcss,
) => Bud

export type Vendor = (
  this: Bud,
  options?: Webpack.Options.CacheGroupsOptions,
) => Bud

export type When = (
  this: Bud,
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction | undefined,
) => Bud

export type Template = (
  this: Bud,
  options: Options.Template,
) => Bud

export type Dev = (this: Bud, config: Server.Config) => Bud

export type Target = (
  this: Bud,
  target: Webpack.Configuration['target'],
) => Bud

export type Terser = (
  this: Bud,
  options: TerserPluginOptions,
) => Bud

export type PostPluginAdd = (
  this: Bud,
  entry: PostPluginStore | PostPluginStore[],
) => Bud

export type PostPluginConfig = (
  this: Bud,
  plugin: PostPluginStore,
  options: unknown,
) => Bud

export type Provide = (
  this: Bud,
  options: {
    [key: string]: string[]
  },
) => Bud

export type Runtime = (this: Bud, name?: string) => Bud

export interface PathGetter {
  (this: Bud, path?: string | undefined): string
}

export namespace Options {
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

export type PluginFactory = (bud?: Bud) => Webpack.Plugin

export interface PostPluginTuple {
  plugin: AcceptedPlugin
  options?: unknown
}

export interface PostPluginStore {
  [key: string]: PostPluginTuple
}
