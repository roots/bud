import {TerserPluginOptions} from 'terser-webpack-plugin'
import {TransformOptions} from '@babel/core'
import Globby from 'globby'

export namespace API {
  export interface Method<T> {
    Fluent(): void
    (): unknown
    (argument: unknown): unknown
  }

  export type AddExtensions = Framework.Fluent<
    Framework.Bud,
    string | string[]
  >

  export type Dist = PathGetter

  export type Project = PathGetter

  export type Src = PathGetter

  export type DistPath = Framework.Fluent<Framework.Bud>

  export type ProjectPath = Framework.Fluent<Framework.Bud>

  export type PublicPath = Framework.Fluent<Framework.Bud>

  export type SrcPath = Framework.Fluent<Framework.Bud>

  export type AddPlugin = Framework.Fluent<
    Framework.Bud,
    string,
    Framework.Extension.Make,
    Framework.Extension.Options,
    Framework.Extension.Conditional
  >

  export type addExtensions = Framework.Fluent<Framework.Bud>

  export type Alias = Framework.Fluent<Framework.Bud>

  export type Babel = Framework.Fluent<Framework.Bud, Options.Babel>

  export type Brotli = Framework.Fluent<Framework.Bud, any>

  export type Entry = Framework.Fluent<
    Framework.Bud,
    string,
    string | string[]
  >

  export type Compile = (this: Framework.Bud) => Promise<void>

  export type Copy = Framework.Fluent<Framework.Bud, string, string>

  export type CopyAll = Framework.Fluent<Framework.Bud, string, string>

  export type Devtool = Framework.Fluent<
    Framework.Bud,
    Framework.Webpack.Options.Devtool
  >

  export type Dev = Framework.Fluent<
    Framework.Bud,
    Framework.Server.Config
  >

  export type Extend = Framework.Fluent<Framework.Bud, () => any>

  export type Glob = Framework.Fluent<Framework.Bud, Options.Glob>

  export type Gzip = (
    this: Framework.Bud,
    options?: Framework.Container.Repository,
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
    options?: Framework.Webpack.HotModuleReplacementPlugin
  ) => Framework.Bud

  export type When = (
    this: Framework.Bud,
    test: boolean,
    trueCase?: CallableFunction,
    falseCase?: CallableFunction | undefined,
  ) => Framework.Bud

  export type Target = (
    this: Framework.Bud,
    target: Framework.Webpack.Configuration['target'],
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

  export type PathGetter = (this: Framework.Bud, path?: string | undefined) => string | void

  export type Runtime = (
    this: Framework.Bud,
    name?: string,
  ) => Framework.Bud

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
}
