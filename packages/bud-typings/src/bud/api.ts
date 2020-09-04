import {
  Bud,
  BabelTransformOptions,
  Plugin,
  PluginControllerInterface,
  WebpackOptions,
} from '../'

export namespace Base {
  export type Option = {
    [key: string]: any | CallableFunction | CallableFunction[]
  }

  export interface Options {
    options: Option[]
  }

  export interface Fluent {
    (this: Bud, ...args: any)
  }

  export interface FluentOptions extends Fluent {
    (this: Bud, Options): Bud
  }

  export interface PathGetter {
    (path?: string | undefined): string
  }
  export interface PathSetter extends FluentOptions {
    (this: Bud, path: string): Bud
  }

  export interface Test extends Fluent {
    (this: Bud, test: boolean, callback: CallableFunction): Bud
  }
}

/**
 * Bud public API
 *
 * Methods intended to make accessing and manipulating Bud data less error prone.
 */
export namespace Api {
  /**
   * ## bud.addExtensions
   *
   * Add support for additional extensions.
   *
   * ```js
   * bud.addExtensions(['jsx', 'vue'])
   * ```
   */
  export type AddExtensions = (this: Bud, extensions: string[]) => Bud

  /**
   * ## bud.alias
   *
   * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
   *
   * Having defined this alias:
   *
   * ```js
   * bud.alias({'scripts': bud.src('scripts')})
   * ```
   *
   * You can now reference scripts against that alias in your import statements:
   *
   * ```js
   * import 'scripts/myScript' // replacing '../../myScript'
   * ```
   **/
  export type Alias = (this: Bud, alias: Base.Option) => Bud

  /**
   * ## bud.babel
   *
   * Configure Babel.
   *
   * If you prefer, you may utilize a `babel.config.js` file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * @see https://babeljs.io/docs/en/configuration
   */
  export type Babel = (
    this: Bud,
    options: BabelTransformOptions,
  ) => Bud

  /**
   * ## bud.bundle
   *
   * Compile a group of assets.
   *
   * ```js
   * bud.bundle('app', [
   *   bud.src('app.js'),
   *   bud.src('app.css'),
   * ])
   * ```
   */
  export type Bundle = (
    this: Bud,
    name: string,
    entries: string[],
  ) => Bud

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```
   * bud.compile()
   * ```
   */
  export type Compile = () => void

  /**
   * ## bud.copy
   *
   * Copy a file.
   *
   * ```js
   * bud.copy(
   *   bud.src('images/image.png'),
   *   bud.dist('image.png'),
   * )
   * ```
   */
  export type Copy = (this: Bud, from: string, to: string) => Bud

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
   */
  export type Dev = (this: Bud, options: any) => Bud

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  export type Devtool = (devtool: WebpackOptions.Devtool) => Bud

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  export type Dist = Base.PathGetter

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  export type DistPath = Base.PathSetter

  /**
   * ## bud.extension
   *
   * Extension controller
   */
  export type Controller = PluginControllerInterface

  /**
   * ## bud.glob
   *
   * Compile assets into a particular directory.
   *
   * ```js
   * bud.bundlePath(
   *  bud.dist('scripts'),
   *  [bud.src('scripts')],
   * )
   * ```
   */
  export type Glob = (this: Bud, output: string, files: string) => Bud

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  export type Hash = Base.Fluent

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  export type RuntimeManifest = (args?: {name: string}) => Bud

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  export type Mini = (this: Bud) => Bud

  /**
   * ## bud.postcss
   *
   * Configure PostCSS.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * ```js
   * bud.postCss({
   *   plugins: [
   *    require('astroturf'),
   *   ],
   * })
   * ```
   */
  export type PostCss = (options?: {plugins?: any[]}) => Bud

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  export type Project = Base.PathGetter

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  export type ProjectPath = Base.PathSetter

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  export type Provide = (options: {[key: string]: string[]}) => Bud

  /**
   * ## bud.publicPath
   *
   * Set the project public path.
   *
   * ### Example
   *
   * ```js
   * bud.publicPath('dist')
   * ```
   */
  export type PublicPath = Base.PathSetter

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  export type Src = Base.PathGetter

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  export type SrcPath = Base.PathSetter

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  export type Target = (target: string) => Bud

  /**
   * ## bud.terser
   *
   * Optimize build with terser.
   *
   * ```js
   * bud.terser({
   *  parse: {
   *   ecma: 8,
   *  },
   *  compress: {
   *    ecma: 5,
   *    warnings: false,
   *    comparisons: false,
   *    inline: 2,
   *  },
   * })
   * ```
   */
  export type Terser = (this: Bud, options?: Base.Options) => Bud

  /**
   * ## bud.use
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.use([require('@roots/bud-demo-plugin')])
   */
  export type Use = (this: Bud, plugins: Plugin[]) => Bud

  /**
   * ## bud.vendor
   *
   * Enable bundling vendor modules separately from application code.
   *
   * ```js
   * bud.vendor()
   * ```
   */
  export type Vendor = (this: Bud, options?: Base.Options) => Bud

  /**
   * ## bud.when
   *
   * Define build steps to be carried out under certain conditions
   *
   * ```js
   * bud.when(bud.inProduction, bud => {
   *  bud.mini()
   *  bud.vendor()
   *  // ...
   * })
   */
  export type When = (
    this: Bud,
    test: boolean,
    action: CallableFunction,
  ) => Bud
}
