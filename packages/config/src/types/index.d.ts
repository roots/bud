import type Framework from '@roots/bud-framework'
import Container from '@roots/container'
import {Server} from '@roots/bud-server'
import * as TerserPluginOptions from 'terser-webpack-plugin'
import {TransformOptions} from '@babel/core'
import Globby from 'globby'
import Webpack from 'webpack'

export as namespace API

type Fluent<T, P=void, P1=void, P2=void> = (this: T, P, P1, P2) => T

export interface Method<T> {
  Fluent
  (): void
  (): unknown
  (argument: unknown): unknown
}

export type AddExtensions = Fluent<Framework.Bud, string | string>

export type Dist = PathGetter

export type Project = PathGetter

export type Src = PathGetter

export type DistPath = Fluent<Framework.Bud>

export type ProjectPath = Fluent<Framework.Bud>

export type PublicPath = Fluent<Framework.Bud>

export type SrcPath = Fluent<Framework.Bud>

export type AddPlugin = Fluent<Framework.Bud>

export type addExtensions = Fluent<Framework.Bud>

export type Alias = Fluent<Framework.Bud>

export type Babel = Fluent<Framework.Bud, Options.Babel>

export type Brotli = Fluent<Framework.Bud>

export type Entry = Fluent<Framework.Bud, string, string | string[]>

export type Compile = (this: Framework.Bud) => Promise<void>

export type Copy = Fluent<Framework.Bud, string, string>

export type CopyAll = Fluent<Framework.Bud, string, string>

export type Devtool = Fluent<Framework.Bud, Webpack.Options.Devtool>

export type Dev = Fluent<Framework.Bud, Server.Config>

export type Extend = Fluent<Framework.Bud, PluginFactory>

export type Glob = Fluent<Framework.Bud, Options.Glob>

export type Gzip = (
  this: Framework.Bud,
  options?: Container['repository'],
) => Framework.Bud

export type Hash = (this: Framework.Bud) => Framework.Bud

export type Library = (this: Framework.Bud) => Framework.Bud

export type Minify = (this: Framework.Bud) => Framework.Bud

export type Template = (
  this: Framework.Bud,
  options: Options.Template,
) => Framework.Bud

export type Vendor = (
  this: Framework.Bud,
  options?: Webpack.Options.CacheGroupsOptions,
) => Framework.Bud

export type When = (
  this: Framework.Bud,
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction | undefined,
) => Framework.Bud

export type Target = (
  this: Framework.Bud,
  target: Webpack.Configuration['target'],
) => Framework.Bud

export type Terser = (
  this: Framework.Bud,
  options: TerserPluginOptions,
) => Framework.Bud

export type Provide = (
  this: Framework.Bud,
  options: {
    [key: string]: string[]
  },
) => Framework.Bud

export interface PathGetter {
  (this: Framework.Bud, path?: string | undefined): string
}

export type Runtime = (this: Framework.Bud, name?: string) => Framework.Bud

export namespace Options {
  export type Babel = TransformOptions

  export type Glob = {
    name: string
    files: string | string[]
    options?: Globby.GlobbyOptions
  }

  export type Template = {
    template?: string
    replacements?: {[key: string]: string}
  }
}

export type PluginFactory = (bud?: Framework.Bud) => Webpack.Plugin
