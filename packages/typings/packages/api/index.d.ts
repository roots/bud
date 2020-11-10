import {TerserPluginOptions} from 'terser-webpack-plugin'
import Globby from 'globby'
import {Webpack} from '../Webpack'

/**
 * Framework.API
 *
 * Utilities intended for use in project-level configuration.
 *
 * @package @roots/bud-api
 */
export namespace API {
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
  export type Copy = Framework.Fluent<
    Framework.Bud,
    string,
    string
  >

  /**
   * Define
   * Make vars available to application code.
   */
  export type Define = Framework.Fluent<
    Framework.Bud,
    Framework.Index<any>
  >

  /**
   * Specify what source-map tool should be utilized
   */
  export type Devtool = Framework.Fluent<
    Framework.Bud,
    Framework.Webpack.Options.Devtool
  >

  /**
   * Configure the application dev server.
   */
  export type Dev = Framework.Fluent<
    Framework.Bud,
    Framework.Server.Config
  >

  /**
   * Redefine the module resolution strategy for particular modules.
   */
  export type Externals = (
    this: Framework.Bud,
    externals: {
      [key: string]: any
    },
  ) => Framework.Bud

  /**
   * Create entrypoints from matching assets.
   */
  export type Glob = Framework.Fluent<
    Framework.Bud,
    Options.Glob
  >

  /**
   * Compress assets with gzip.
   */
  export type Gzip = (
    this: Framework.Bud,
    options?: Webpack.Plugin,
  ) => Framework.Bud

  /**
   * Append a version hash on asset filenames.
   */
  export type Hash = (this: Framework.Bud) => Framework.Bud

  /**
   * Create a DLL of vendor code.
   */
  export type Library = (
    this: Framework.Bud,
    modules: string[],
  ) => Framework.Bud

  /**
   * Minify compiled assets.
   */
  export type Minify = (this: Framework.Bud) => Framework.Bud

  /**
   * Produce an HTML template with application code included.
   */
  export type Template = (
    this: Framework.Bud,
    options: Options.Template,
  ) => Framework.Bud

  /**
   * Separate vendor code from application code.
   */
  export type Vendor = (
    this: Framework.Bud,
    options?: Framework.Webpack.HotModuleReplacementPlugin,
  ) => Framework.Bud

  /**
   * Executes a function if a given test is true.
   *
   * The first parameter is the conditional check.
   * The second parameter is the function to execute if true.
   * The third paramter is optional; executed if the conditional is not true.
   */
  export type When = (
    this: Framework.Bud,
    test: boolean,
    trueCase?: CallableFunction,
    falseCase?: CallableFunction | undefined,
  ) => Framework.Bud

  /**
   * Configure terser minification options.
   */
  export type Terser = (
    this: Framework.Bud,
    options: TerserPluginOptions,
  ) => Framework.Bud

  /**
   * Make a module globally available throughout the application.
   */
  export type Provide = (
    this: Framework.Bud,
    options: {
      [key: string]: string[]
    },
  ) => Framework.Bud

  /**
   * Produce a runtime bundle for code-splitting.
   */
  export type Runtime = (
    this: Framework.Bud,
    name?: string,
  ) => Framework.Bud

  export type PathGetter = (
    this: Framework.Bud,
    path?: string | undefined,
  ) => string | void

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
