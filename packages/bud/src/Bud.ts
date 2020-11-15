import Framework from '@roots/bud-typings'
import {Bud as Core} from '@roots/bud-framework'

import {Compiler} from '@roots/bud-compiler'
import {Extensions} from '@roots/bud-extensions'
import {Server} from '@roots/bud-server'
import {Hooks} from '@roots/bud-hooks'
import {Build} from '@roots/bud-build'
import {Runner} from '@roots/bud-cli'
import {Cache} from '@roots/bud-cache'

import type {
  AddPlugin,
  Alias,
  Brotli,
  BuildCache,
  Copy,
  Define,
  Dev,
  Devtool,
} from '@roots/bud-api'

import type * as api from '@roots/bud-api'

/**
 * ## Bud
 *
 * A webpack framework combining the best parts of
 * Laravel Mix and Symfony Encore.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://github.io/roots/bud)
 * [📦 @roots/bud](https://github.io/roots/bud)
 * [🔗 Documentation](#)
 */
export class Bud extends Core implements Framework.Bud.Contract {
  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config]()
   * [🔗 Documentation on containers]()
   */
  public config: Framework.Container

  /**
   * ## bud.args [🍱 _Container_]
   *
   * Collection of the arguments passed to the Framework and their values.
   *
   * [🔗 Documentation on bud.args]()
   * [🔗 Documentation on containers]()
   *
   * ### Usage
   *
   * #### Flags
   *
   * ```sh
   * $ bud build --html
   * ```
   *
   * ```js
   * bud.args.has('html') // => true
   * ```
   *
   * #### Values
   *
   * ```sh
   * $ bud build --html dist/index.html
   * ```
   *
   * ```js
   * bud.args.get('html') // => 'dist/index.html'
   * ```
   *
   * #### Arrayed
   *
   * ```sh
   * $ bud build --bento uni rainbow edamame
   * # or
   * $ bud build --bento uni --bento rainbow --bento edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   */
  public args: Framework.Container

  /**
   * ## bud.features [🍱 _Container_]
   *
   * Collection of feature flags each indicating whether or not a
   * particular feature is enabled or disabled.
   *
   * [🔗 Documentation on bud.features]()
   * [🔗 Documentation on containers]()
   *
   * ### Usage
   *
   * **Get the features store**
   *
   * ```js
   * bud.features.getStore() // returns all the features as a `k => v` obj.
   * ```
   *
   * **Check if a given feature is enabled**
   *
   * ```js
   * bud.features.enabled('minify') // `true` if `minify` flag is on
   * ```
   *
   * **Toggle a feature**
   *
   * ```js
   * bud.features.set('gzip', false) // disable `gzip` feature flag
   * ```
   */
  public features: Framework.Container

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects. The advantage of using them in
   * a container object is that they can be easily redefined by extensions.
   * [🔗 Documentation on bud.patterns]() [🔗 Documentation on containers]()
   *
   * ### Usage
   *
   * **Get a regular expression matching files with `.js` extension**
   *
   * ```js
   * bud.patterns.get('js')
   * ```
   *
   * **Redefine a regular expression**
   *
   * ```js
   * bud.patterns.set('cssModule', /\.module\.css$/)
   * ```
   */
  public patterns: Framework.Container

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.  [🔗 Documentation]()
   */
  public cli: Framework.CLI.Runner

  /**
   * ## bud.build
   *
   * [🔗 Documentation]()
   */
  public build: Framework.Build.Contract

  /**
   * ## bud.cache
   *
   * [🔗 Documentation]()
   */
  public cache: Framework.Cache.Contract

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Values defined in the application `.env` file are available via `bud.env`. [🔗 Documentation]()
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  public env: Framework.Env.Contract

  /**
   * ## bud.hooks
   *
   * Bud provides a system of 'hooks' to expose values
   * for easier modification.  [🔗 Documentation]()
   *
   * ### Usage
   *
   * ####  Add a new entry to the `webpack.externals` configuration:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.externals',
   *   externals => ({
   *     ...externals,
   *     $: 'jquery',
   *   }),
   * )
   * ```
   *
   * #### Change the `webpack.output.filename` format:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.output.filename',
   *   () => '[name].[hash:4]',
   * )
   * ```
   *
   * #### Replace the regular expression used for CSS modules:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.module.rules.oneOf.css.test',
   *   () => /\.css$/,
   * )
   * ```
   */
  public hooks: Framework.Hooks.Contract

  /**
   * ## bud.extensions
   *
   * [🔗 Documentation]()
   */
  public extensions: Framework.Extensions.Contract

  /**
   * ## bud.compiler
   *
   * [🔗 Documentation]()
   */
  public compiler: Framework.Compiler.Contract

  /**
   * ## bud.server
   *
   * Express application server used for development. [🔗 Documentation]()
   */
  public server: Framework.Server.Contract

  /**
   * ## bud.serverConfig [🍱 _Container_]
   *
   * Config store for the `bud.server` instance. You might
   * find it easier to do light configuration using
   * the `bud.dev` function. [🔗 Documentation]()
   */
  public serverConfig: Framework.Container

  /**
   * ## bud.addPlugin  [💁 Fluent]
   *
   * Import your plugin in the manner described by
   * the plugin documentation. Then, pass an identifier
   * for the plugin and the plugin instance. [🔗 Documentation](https://git.io/JTNGA)
   *
   * ### Usage
   *
   * **Add a plugin to the webpack configuration**
   *
   * ```js
   * bud.addPlugin('my-plugin', new myPlugin())
   * ```
   */
  public addPlugin: AddPlugin

  /**
   * ## bud.alias  [💁 Fluent]
   *
   * Register shorthand for resolving modules
   * using webpack aliases. Useful for
   * situations that may otherwise require
   * brittle relative paths. [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.alias({
   *   '@scripts': bud.src('scripts'),
   * })
   * ```
   */
  public alias: Alias

  /**
   * ## bud.buildCache  [💁 Fluent]
   *
   * Cache module output that remains unchanged between builds. [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.buildCache()
   * ```
   *
   * #### Specify an output path for the JSON used for cache busting
   *
   * ```js
   * bud.buildCache(bud.project('./.build'))
   * ```
   */
  public buildCache: BuildCache

  /**
   * ## bud.brotli  [💁 Fluent]
   *
   * Compress static assets with brotli compression.
   *
   * It's arguments are optional. For more information on
   * configuration consult [the compression webpack
   * plugin documentation]().
   *
   * [🔗 Documentation]()
   *
   * ### Usage
   *
   * **Simplest way to get started is to just call it** This is likely fine.
   *
   * ```js
   * bud.brotli()
   * ```
   *
   * #### Shown with default options
   *
   * ```js
   * bud.brotli({
   *   filename: '[name].br[query]',
   *   algorithm: 'brotliCompress',
   *   test: /\.js$|\.css$|\.html$|\.html$/,
   *   compressionOptions: {
   *     level: 11,
   *   },
   *   threshold: 10240,
   *   minRatio: 0.8,
   *   deleteOriginalAssets: false,
   * })
   * ```
   */
  public brotli: Brotli

  /**
   * ## bud.copy  [💁 Fluent]
   *
   * Copy static assets to your output directory.
   *
   * You may specify a path to a specific file or
   * use glob syntax to match many files at once. [🔗 Documentation]()
   *
   * ### Usage
   *
   * **Copy all files from `src/images`**
   *
   * ```js
   * bud.copy({from: 'images/*'})
   * ```
   *
   * **Copy all files from a path outside of `bud.src`**
   *
   * ```js
   * bud.copy({
   *   from: 'images/*',
   *   context: bud.project('assets')
   * })
   * ```
   *
   * **Copy all files to a path outside of `bud.dist`**
   *
   * ```js
   * bud.copy({
   *   from: 'images/*',
   *   to: '/app/cdn/media'
   * })
   * ```
   */
  public copy: Copy

  /**
   * ## bud.define  [💁 Fluent]
   *
   * Make modules and variables global for the application.
   *
   * [🔗 Documentation](https://git.io/JTNZk)
   *
   * ### Usage
   *
   * #### Define values
   *
   * ```ts
   * bud.define({
   *   APP_NAME: 'My Application',
   * })
   * ```
   *
   * #### Use them in application code
   *
   * ```ts
   * const {APP_NAME} = window
   * ```
   *
   * #### Use them in generated templates
   *
   * ```html
   * <html>
   *   <title>%APP_NAME%</title>
   *   <!-- ... -->
   * </html>
   * ```
   */
  public define: Define

  /**
   * ## bud.dev  [💁 Fluent]
   *
   * Make modules and variables global for the application.
   *
   * [🔗 Documentation](https://git.io/JTNZk)
   */
  public dev: Dev

  /**
   * ## bud.devtool  [💁 Fluent]
   *
   * Enable and configure sourcemaps using any of Webpack's
   * [devtool utilities](https://webpack.js.org/configuration/devtool/).
   *
   * [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.devtool('inline-cheap-module-source-map')
   * ```
   */
  public devtool: Devtool

  /**
   * ## bud.dist  [💁 Fluent]
   *
   * With no arguments, this function returns the path where built assets will
   * be written.
   *
   * Optionally, **bud.dist** may be passed a path relative to the project dist
   * directory. In this case it will return the path as an abspath. [🔗 Documentation]()
   *
   * ### Usage
   *
   * Absolute path to the dist directory:
   *
   * ```js
   * bud.dist()
   * ```
   *
   * Absolute path to `scripts/app.js` in the dist directory:
   *
   * ```js
   * bud.dist('scripts/app.js')
   *  ```
   */
  public dist: typeof api.dist

  /**
   * ## bud.distPath [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public distPath: typeof api.distPath

  /**
   * ## bud.entry  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public entry: typeof api.entry

  /**
   * ## bud.externals  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public externals: typeof api.externals

  /**
   * ## bud.glob  [💁 Fluent]
   *
   * Generate an entrypoint from assets matching a
   * [fast-glob](https://git.io/JkGbw) formatted string. [🔗 Documentation]()
   *
   * ### Globbing
   *
   * **Supported patterns**
   *
   * - `*` matches any number of characters, but not `/`
   * - `?` matches a single character, but not `/`
   * - `**` matches any number of characters, including `/`, as long as it's theonly thing in a path part
   * - `{}` allows for a comma-separated list of "or" expressions
   * - `!` at the beginning of a pattern will negate the match
   *
   * ### Usage
   *
   * Create an app bundle comprised of all js assets in the src root:
   *
   * ```js
   * bud.glob('app', '*.js')
   * ```
   */
  public glob: typeof api.glob

  /**
   * ## bud.gzip  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public gzip: typeof api.gzip

  /**
   * ## bud.hash  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public hash: typeof api.hash

  /**
   * ## bud.library  [💁 Fluent]
   *
   * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library))
   * caching of specified modules. [🔗 Documentation]()
   *
   * ### Usage
   *
   * Pass `bud.library` the module you would like to add to the DLL cache:
   *
   * ```js
   * bud.library('jquery')
   * ```
   *
   * Multiple modules can be added at once by passing an array
   *
   * ```js
   * bud.library(['react', 'react-dom'])
   * ```
   */
  public library: typeof api.library

  /**
   * ## bud.minify  [💁 Fluent]
   *
   * `bud.minify` enables minification of static assets. [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.minify()
   * ```
   */
  public minify: typeof api.minify

  /**
   * ## bud.project  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public project: typeof api.project

  /**
   * ## bud.projectPath  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public projectPath: typeof api.projectPath

  /**
   * ## bud.provide  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public provide: typeof api.provide

  /**
   * ## bud.publicPath  [💁 Fluent]
   *
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps  served from
   * a subdirectory. [🔗 Documentation]()
   *
   * ### Usage
   *
   * #### Set the default public path for a [@roots/sage project](https://github.com/roots/sage)
   *
   * ```js
   * bud.publicPath('/app/themes/sage/dist')
   * ```
   */
  public publicPath: typeof api.publicPath

  /**
   * ## bud.run  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public run: typeof api.run

  /**
   * ## bud.runtime  [💁 Fluent]
   *
   * Generate a runtime chunk intended to be inlined on the page.
   *
   * Useful for code splitting and dynamic imports. [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.runtime()
   * ```
   */
  public runtime: typeof api.runtime

  /**
   * ## bud.src  [💁 Fluent]
   *
   * With no arguments, this function returns the project's src path.
   * Optionally, **bud.src** may be passed a path relative to the project src
   * directory. In this case it returns the absolute path of whatever it was
   * passed.
   *
   * Root path used by this function is set by [bud.srcPath](). [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  public src: typeof api.src

  /**
   * ## bud.srcPath  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public srcPath: typeof api.srcPath

  /**
   * ## bud.target  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public target: typeof api.target

  /**
   * ## bud.template  [💁 Fluent]
   *
   * Generate and/or configure boilerplate HTML for your project.
   *
   * This HTML includes the path to your built assets automatically. So,
   * it is especially when the filenames of your assets can't be known
   * in advance of the build (such as is the case with hashing.) [🔗 Documentation]()
   */
  public template: typeof api.template

  /**
   * ## bud.terser  [💁 Fluent]
   *
   * Bud uses `terser` to minify js assets. This function lets you configure *
   * terser options. For more information [see the Webpack documentation for
   * configuring Terser](https://webpack.js.org/plugins/terser-webpack-plugin/). [🔗 Documentation]()
   */
  public terser: typeof api.terser

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions to add
   * additional functionality to Bud.. [🔗 Documentation]()
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  public use: typeof api.use

  /**
   * ## bud.vendor  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public vendor: typeof api.vendor

  /**
   * ## bud.when  [💁 Fluent]
   *
   * [🔗 Documentation]()
   */
  public when: typeof api.when

  /**
   * Class constructor
   */
  public constructor(registrable?: any) {
    super(registrable)

    this.hooks = new Hooks(this)

    this.build = new Build(this)

    this.cache = new Cache(this)

    this.cli = new Runner(this)

    this.compiler = new Compiler(this)

    this.server = new Server(this)

    this.extensions = new Extensions(this)
  }

  /**
   * Setup FS abstractions.
   * @ignore
   */
  public disks(): this {
    this.fs.setBase(process.cwd())

    this.makeDisk('project', this.fs.base)
    this.makeDisk('@roots', '../../..')

    return this
  }

  /**
   * Register containers and api methods (static)
   * @ignore
   */
  public register: () => this = function () {
    this.registry
      .getEntries('containers')
      .map(
        ([name, repo]: [string, Framework.Index<unknown>]) => {
          this[name] = this.makeContainer({...repo})
        },
      )

    this.registry
      .getEntries('api')
      .map(([name, method]: [string, CallableFunction]) => {
        this[method.name] = method.bind(this)
      })

    return this
  }

  /**
   * Register parts of the application that
   * might rely on having container access (dynamic)
   * @ignore
   */
  public boot(): this {
    this.when(
      this.args.has('mode'),
      bud => bud.mode.set(bud.args.get('mode')),
      bud => bud.mode.set('none'),
    )

    this.registry
      .getEntries('loaders')
      .map((args: [string, Framework.Build.Loader]) => {
        this.build.setLoader(...args)
      })

    this.registry
      .getEntries('items')
      .map((args: [string, Framework.Item.Module]) => {
        this.build.setItem(...args)
      })

    this.registry
      .getEntries('rules')
      .map((args: [string, Framework.Rule.Module]) => {
        this.build.setRule(...args)
      })

    this.registry
      .getEntries('extensions')
      .map((args: [string, Framework.Extension.Contract]) => {
        this.extensions.set(...args)
      })

    return this
  }
}
