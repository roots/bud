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
 * [🔗 Documentation]()
 *
 */
export class Bud extends Core implements Framework.Bud.Contract {
  /**
   * ### bud.config [🍱 Container]
   *
   * Webpack configuration settings
   *
   * [🔗 Docs on bud.config]()
   * [🔗 Docs on containers]()
   *
   */
  public config: Framework.Container

  /**
   * ### bud.args [🍱 Container]
   *
   * Collection of the arguments passed to the process from the terminal
   *
   * [🔗 Docs on bud.args]()
   * [🔗 Docs on containers]()
   *
   * #### Usage
   *
   * **Flags**
   *
   * ```sh
   * $ bud build --html
   * ```
   *
   * ```js
   * bud.args.has('html') // => true
   * ```
   *
   * **Values**
   *
   * ```sh
   * $ bud build --html dist/index.html
   * ```
   *
   * ```js
   * bud.args.get('html') // => 'dist/index.html'
   * ```
   *
   * **Arrayed**
   *
   * ```sh
   * $ bud build --bento uni rainbow edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   *
   * _or_
   *
   * ```sh
   * $ bud build --bento uni --bento rainbow --bento edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   */
  public args: Framework.Container

  /**
   * ### bud.features [🍱 Container]
   *
   * Collection of feature flags each indicating whether or not a
   * particular feature is enabled or disabled.
   *
   * [🔗 Docs on bud.features]()
   * [🔗 Docs on containers]()
   *
   * #### Usage
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
   *
   */
  public features: Framework.Container

  /**
   * ### bud.patterns [🍱 Container]
   *
   * Collection of common RegExp objects. The advantage of using them in
   * a container object is that they can be easily redefined by extensions.
   * [🔗 Docs on bud.patterns]() [🔗 Docs on containers]()
   *
   * #### Usage
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
   *
   */
  public patterns: Framework.Container

  /**
   * ### bud.cli
   *
   */
  public cli: Framework.CLI.Runner

  /**
   * ### bud.build
   *
   */
  public build: Framework.Build.Contract

  /**
   * ### bud.cache
   *
   */
  public cache: Framework.Cache.Contract

  /**
   * ### bud.env [🍱 Container]
   *
   */
  public env: Framework.Env.Contract

  /**
   * ### bud.hooks
   *
   */
  public hooks: Framework.Hooks.Contract

  /**
   * ### bud.extensions
   *
   */
  public extensions: Framework.Extensions.Contract

  /**
   * ### bud.compiler
   *
   */
  public compiler: Framework.Compiler.Contract

  /**
   * ### bud.server
   *
   * Express application server used for development.
   *
   * [🔗 Docs]()
   *
   */
  public server: Framework.Server.Contract

  /**
   * ### bud.serverConfig [🍱 Container]
   *
   * Configures `bud.server` instance.
   *
   * [🔗 Docs]()
   *
   * @see {@property bud.server}
   * @see {@function bud.dev}
   *
   */
  public serverConfig: Framework.Container

  /**
   * ### bud.addPlugin  [💁 _Fluent_]
   *
   * Import your plugin in the manner described by
   * the plugin documentation. Then, pass an identifier
   * for the plugin and the plugin instance.
   *
   * [🔗 Docs](https://git.io/JTNGA)
   *
   * #### Usage
   *
   * **Add a plugin to the webpack configuration**
   *
   * ```js
   * bud.addPlugin('my-plugin', new myPlugin())
   * ```
   *
   */
  public addPlugin: typeof api.addPlugin

  /**
   * ### bud.alias  [💁 _Fluent_]
   *
   * Register shorthand for resolving modules
   * using webpack aliases. Useful for
   * situations that may otherwise require
   * brittle relative paths.
   *
   * [🔗 Docs]()
   *
   * #### Usage
   *
   * ```js
   * bud.alias({
   *   '@scripts': bud.src('scripts'),
   * })
   * ```
   *
   */
  public alias: typeof api.alias

  /**
   * ### bud.buildCache  [💁 _Fluent_]
   *
   * Cache module output that remains unchanged between builds.
   *
   * [🔗 Docs]()
   *
   * #### Usage
   *
   * ```js
   * bud.buildCache()
   * ```
   *
   * **Specify an output path for the JSON used for cache busting**
   *
   * ```js
   * bud.buildCache(bud.project('./.build'))
   *
   * Even though this is a generated file, you may want to check it into
   * version control if you are using a continuous integration service.
   *
   * This will allow for faster builds during jobs.
   *
   */
  public buildCache: BuildCache

  /**
   * ### bud.brotli  [💁 _Fluent_]
   *
   * Compress static assets with brotli compression.
   *
   * It's arguments are optional. For more information on
   * configuration consult [the compression webpack
   * plugin documentation]().
   *
   * [🔗 Docs]()
   *
   * #### Usage
   *
   * **Simplest use is to just call it**
   *
   * ```js
   * bud.brotli()
   * ```
   *
   * **Shown with default options**
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
   *
   */
  public brotli: Brotli

  /**
   * ### bud.copy  [💁 Fluent]
   *
   * Copy static assets to your output directory.
   *
   * You may specify a path to a specific file or
   * use glob syntax to match many files at once.
   *
   * [🔗 Docs]()
   *
   * #### Usage
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
   *
   */
  public copy: Copy

  /**
   * ### bud.define  [💁 Fluent]
   *
   * Make modules and variables global for the application.
   *
   * [🔗 Docs](https://git.io/JTNZk)
   *
   * #### Usage
   *
   * **Define values**
   *
   * ```ts
   * bud.define({
   *   APP_NAME: 'My Application',
   * })
   * ```
   *
   * **Use them in application code**
   *
   * ```ts
   * const {APP_NAME} = window
   * ```
   *
   * **Use them in templates**
   *
   * ```html
   * <html>
   *   <title>%APP_NAME%</title>
   *   <!-- ... -->
   * </html>
   * ```
   *
   */
  public define: Define

  /**
   * ### bud.dev  [💁 Fluent]
   *
   * Make modules and variables global for the application.
   *
   * [🔗 Docs](https://git.io/JTNZk)
   *
   */
  public dev: Dev

  /**
   * ### bud.devtool  [💁 _Fluent_]
   *
   * Enable and configure sourcemaps using any of Webpack's
   * [devtool utilities](https://webpack.js.org/configuration/devtool/).
   *
   * [🔗 Docs]()
   *
   * #### Usage
   *
   * ```js
   * bud.devtool('inline-cheap-module-source-map')
   * ```
   *
   */
  public devtool: Devtool

  /**
   * ### bud.dist  [💁 _Fluent_]
   *
   * With no arguments, this function returns the path where built assets wil
   * be written.
   *
   * Optionally, **bud.dist** may be passed a path relative to the project dist
   * directory. In this case it will return the path as an abspath.
   *
   * The root path used by this function is set by
   * [bud.distPath](config-distPath.md).

   * #### Usage
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
   *
   */
  public dist: typeof api.dist

  /**
   * ### bud.distPath  [💁 _Fluent_]
   *
   */
  public distPath: typeof api.distPath

  /**
   * ### bud.entry  [💁 _Fluent_]
   *
   */
  public entry: typeof api.entry

  /**
   * ### bud.externals  [💁 _Fluent_]
   *
   */
  public externals: typeof api.externals

  /**
   * ### bud.glob  [💁 _Fluent_]
   *
   */
  public glob: typeof api.glob

  /**
   * ### bud.gzip  [💁 _Fluent_]
   *
   */
  public gzip: typeof api.gzip

  /**
   * ### bud.hash  [💁 _Fluent_]
   *
   */
  public hash: typeof api.hash

  /**
   * ### bud.library  [💁 _Fluent_]
   *
   * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching of specified modules.
   *
   * [🔗 Docs]()
   *
   * #### Usage
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
   *
   */
  public library: typeof api.library

  /**
   * ### bud.minify  [💁 _Fluent_]
   *
   * `bud.minify` enables minification of static assets. [🔗 Docs]()
   *
   * #### Usage
   *
   * ```js
   * bud.minify()
   * ```
   *
   */
  public minify: typeof api.minify

  /**
   * ### bud.project  [💁 _Fluent_]
   *
   */
  public project: typeof api.project

  /**
   * ### bud.projectPath  [💁 _Fluent_]
   *
   */
  public projectPath: typeof api.projectPath

  /**
   * ### bud.provide  [💁 _Fluent_]
   *
   */
  public provide: typeof api.provide

  /**
   * ### bud.publicPath  [💁 _Fluent_]
   *
   */
  public publicPath: typeof api.publicPath

  /**
   * ### bud.run  [💁 _Fluent_]
   *
   */
  public run: typeof api.run

  /**
   * ### bud.runtime  [💁 _Fluent_]
   *
   */
  public runtime: typeof api.runtime

  /**
   * ### bud.src  [💁 _Fluent_]
   *
   * With no arguments, this function returns the project's src path.
   * Optionally, **bud.src** may be passed a path relative to the project src
   * directory. In this case it returns the absolute path of whatever it was
   * passed.
   *
   * Root path used by this function is set by [bud.srcPath](). [🔗 Docs]()
   *
   * #### Usage
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   *
   */
  public src: typeof api.src

  /**
   * ### bud.srcPath  [💁 _Fluent_]
   *
   */
  public srcPath: typeof api.srcPath

  /**
   * ### bud.target  [💁 _Fluent_]
   *
   */
  public target: typeof api.target

  /**
   * ### bud.template  [💁 _Fluent_]
   *
   * Generate and/or configure boilerplate HTML for your project.
   *
   * This HTML includes the path to your built assets automatically. So,
   * it is especially when the filenames of your assets can't be known
   * in advance of the build (such as is the case with hashing.) [🔗 Docs]()
   *
   */
  public template: typeof api.template

  /**
   * ### bud.terser  [💁 _Fluent_]
   *
   * Bud uses `terser` to minify js assets. This function lets you configure *
   * terser options. For more information [see the Webpack documentation for
   * configuring Terser](https://webpack.js.org/plugins/terser-webpack-plugin/). [🔗 Docs]()
   *
   */
  public terser: typeof api.terser

  /**
   * ### bud.use [💁 _Fluent_]
   *
   * Register an extension or set of extensions to use. [🔗 Docs]()
   *
   */
  public use: typeof api.use

  /**
   * ### bud.vendor  [💁 _Fluent_]
   *
   */
  public vendor: typeof api.vendor

  /**
   * ### bud.when  [💁 _Fluent_]
   *
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
