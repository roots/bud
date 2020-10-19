import {TerserPluginOptions} from 'terser-webpack-plugin'
import Globby from 'globby'

/**
 * Framework.API
 *
 * Utilities intended for use in project-level configuration.
 *
 * @package @roots/bud-api
 */
export namespace API {
  /**
   * Indicate additional filetypes to be resolved by the compiler.
   */
  export type AddExtensions = Framework.Fluent<
    Framework.Bud,
    string | string[]
  >

  /**
   * Returns the path to the `dist` directory. Or, if passed a string,
   * formats it as a path with `dist` as the root.
   */
  export type Dist = PathGetter

  /**
   * Returns the path to the project root. Or, if passed a string,
   * formats it as a path with the project as the root.
   */
  export type Project = PathGetter

  /**
   * Returns the path to the `src` directory. Or, if passed a string,
   * formats it as a path with `src` as the root.
   */
  export type Src = PathGetter

  /**
   * Set the `dist` directory. Indicate with an asbsolute path.
   */
  export type DistPath = Framework.Fluent<Framework.Bud>

  /**
   * Set the `project` directory. Indicate with an asbsolute path.
   */
  export type ProjectPath = Framework.Fluent<Framework.Bud>

  /**
   * Set the `public` path. This should be the path to distributable files
   * as accessed in a web browser.
   *
   * Default: '/'
   */
  export type PublicPath = Framework.Fluent<Framework.Bud>

  /**
   * Set the `src` path. Indicate with an asbsolute path.
   */
  export type SrcPath = Framework.Fluent<Framework.Bud>

  /**
   * Set the `dist` directory. Indicate with an asbsolute path.
   */
  export type AddPlugin = Framework.Fluent<
    Framework.Bud,
    string,
    Framework.Extension.Make,
    Framework.Extension.Options,
    Framework.Extension.Conditional
  >

  /**
   * Alias windows variables or path shorthands.
   * @see {Webpack.Configuration['alias']}
   */
  export type Alias = Framework.Fluent<Framework.Bud>

  /**
   * Enable brotli compression for static assets.
   *
   * @todo typings for Webpack Compression
   */
  export type Brotli = Framework.Fluent<Framework.Bud, any>

  /**
   * Specify files to be compiled.
   */
  export type Entry = Framework.Fluent<
    Framework.Bud,
    string,
    string | string[]
  >

  /**
   * Run the compiler and/or dev server for you build.
   *
   * Indicates finalized configuration.
   */
  export type Compile = (this: Framework.Bud) => void

  /**
   * Copy files to the `dist` directory. Can be expressed as a glob.
   */
  export type Copy = Framework.Fluent<Framework.Bud, string, string>

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
