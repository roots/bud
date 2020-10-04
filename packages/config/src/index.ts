import Container from '@roots/container'
import Server from '@roots/bud-server'

import Babel from '@babel/core'
import Globby from 'globby'
import * as PostCss from 'postcss'
import Webpack from 'webpack'
import {TerserPluginOptions} from 'terser-webpack-plugin'

import Config from './methods'

export declare namespace Config {
  export type Bud = any

  export type Dist = PathGetter
  export type Project = PathGetter
  export type Src = PathGetter
  export type DistPath = Fluent<string>
  export type ProjectPath = Fluent<string>
  export type PublicPath = Fluent<string>
  export type SrcPath = Fluent<string>

  export namespace Options {
    export type Babel = Babel.TransformOptions

    export type Glob = {
      name: string
      files: string | string[]
      options?: Globby.GlobbyOptions
    }

    export type PostCss = {
      syntax?: PostCss.Syntax
      plugins?: PostPluginStore[]
      map?: PostCss.SourceMapOptions
      parser?: PostCss.Parser
      stringifier?: PostCss.Stringifier
    }

    export type Template = {
      template?: string
      replacements?: {[key: string]: string}
    }
  }

  export type AddExtensions = Fluent<string | string[]>

  export type AddPlugin = Fluent<{
    name: string
    plugin: PluginFactory
    when: () => boolean
  }>

  export type Alias = Fluent<{
    aliases: Container['repository']
  }>

  export type Babel = Fluent<{
    options: Options.Babel
  }>

  export type Brotli = Fluent<{
    options?: Container['repository']
  }>

  export type Bundle = (name: string, entries: string[]) => Bud

  export type Compile = (this: Bud) => Promise<void>

  export type Copy = Fluent<{from: string; to: string}>

  export type CopyAll = Fluent<{
    from: string
    to: string
  }>

  export type Devtool = Fluent<{
    devtool: Webpack.Options.Devtool
  }>

  export type Extend = Fluent<{
    plugins: PluginFactory
  }>

  export type Glob = Fluent<{
    options: Options.Glob
  }>

  export type Gzip = (
    this: Bud,
    options?: Container['repository'],
  ) => Bud

  export type Hash = (this: Bud) => Bud

  export type Library = (this: Bud) => Bud

  export type Minify = (this: Bud) => Bud

  export type PostCss = (
    this: Bud,
    options?: Options.PostCss,
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

  export interface Fluent<P> {
    (this: Bud, ...P): Bud
  }

  export interface PathGetter {
    (this: Bud, path?: string | undefined): string
  }

  export type PluginFactory = (bud?: Bud) => Webpack.Plugin

  export interface PostPluginTuple {
    plugin: PostCss.AcceptedPlugin
    options?: unknown
  }

  export interface PostPluginStore {
    [key: string]: PostPluginTuple
  }
}

export default Config
