import {Bud as Abstract} from '@roots/bud-typings'
import {Bud as Core} from '@roots/bud-framework'

import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Extensions} from '@roots/bud-extensions'
import {Hooks} from '@roots/bud-hooks'
import {Runner} from '@roots/bud-cli'
import {Server} from '@roots/bud-server'

import * as api from '@roots/bud-api'

import type {Brotli, Imagemin} from '../components/extensions'

export type Config<C = Bud> = C | Framework.Bud.Contract

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
export class Bud extends Core implements Abstract.Contract {
  /**
   * ## bud.addPlugin  [💁 Fluent]
   *
   * Import your plugin in the manner described by
   * the plugin documentation. Then, pass an identifier
   * for the plugin and the plugin instance.
   *
   * [🔗 Documentation](https://git.io/JTNGA)
   *
   * ### Usage
   *
   * **Add a plugin to the webpack configuration**
   *
   * ```js
   * bud.addPlugin('my-plugin', new myPlugin())
   * ```
   */
  public addPlugin: api.AddPlugin<Abstract.Bud> = api.addPlugin

  /**
   * ## bud.alias  [💁 Fluent]
   *
   * Register shorthand for resolving modules
   * using webpack aliases. Useful for
   * situations that may otherwise require
   * brittle relative paths. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.alias({
   *   '@scripts': bud.src('scripts'),
   * })
   * ```
   */
  public alias: api.Alias<Abstract.Bud> = api.alias

  /**
   * ## bud.buildCache  [💁 Fluent]
   *
   * Cache module output that remains unchanged between builds. [🔗 Documentation](#)
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
  public buildCache: api.BuildCache<Abstract.Bud> =
    api.buildCache

  /**
   * ## bud.brotli  [💁 Fluent]
   *
   * Compress static assets with brotli compression.
   *
   * It's arguments are optional. For more information on
   * configuration consult [the compression webpack
   * plugin documentation](#).
   *
   * [🔗 Documentation](#)
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
  public brotli: Brotli.Config

  /**
   * ## bud.copy  [💁 Fluent]
   *
   * Copy static assets to your output directory.
   *
   * You may specify a path to a specific file or
   * use glob syntax to match many files at once. [🔗 Documentation](#)
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
  public copy: api.Copy<Abstract.Bud> = api.copy

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
  public define: api.Define<Abstract.Bud> = api.define

  /**
   * ## bud.dev  [💁 Fluent]
   *
   * Configure Bud's development server. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.dev({
   *   host: 'my-local-site.example',
   *   port: 5000,
   * })
   * ```
   */
  public dev: api.Dev<Abstract.Bud> = api.dev

  /**
   * ## bud.devtool  [💁 Fluent]
   *
   * Enable and configure sourcemaps using any of Webpack's
   * [devtool utilities](https://webpack.js.org/configuration/devtool/).
   *
   * [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.devtool('inline-cheap-module-source-map')
   * ```
   */
  public devtool: api.Devtool<Abstract.Bud> = api.devtool

  /**
   * ## bud.dist  [💁 Fluent]
   *
   * With no arguments, this function returns the path where built assets will
   * be written.
   *
   * Optionally, **bud.dist** may be passed a path relative to the project dist
   * directory. In this case it will return the path as an abspath. [🔗 Documentation](#)
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
  public dist: api.Dist<Abstract.Bud> = api.dist

  /**
   * ## bud.distPath [💁 Fluent]
   *
   * Sets the directory where assets will be built to.
   *
   * By default this directory is set as `dist`. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.distPath('build')
   * ```
   */
  public distPath: api.DistPath<Abstract.Bud> = api.distPath

  /**
   * ## bud.entry  [💁 Fluent]
   *
   * Define groups of files to be bundled together. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.entry('app', 'app.js')
   * ```
   *
   * ```js
   * bud.entry('app', ['app.js', 'app.css'])
   * ```
   *
   * ```js
   * bud.config.set('entry', {
   *   app: ['app.js', 'app.css'],
   *   another: ['another.js'],
   * })
   * ```
   */
  public entry: api.Entry<Abstract.Bud> = api.entry

  /**
   * ## bud.externals  [💁 Fluent]
   *
   * Specify a non-standard resolution strategy for modules
   * with a matching name. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.externals({
   *   'jQuery': 'window.jquery',
   * })
   */
  public externals: api.Externals<Abstract.Bud> = api.externals

  /**
   * ## bud.glob  [💁 Fluent]
   *
   * Generate an entrypoint from assets matching a
   * [fast-glob](https://git.io/JkGbw) formatted string. [🔗 Documentation](#)
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
  public glob: api.Glob<Abstract.Bud> = api.glob

  /**
   * ## bud.gzip  [💁 Fluent]
   *
   * Gzip static assets. [🔗 Documentation](#)
   */
  public gzip: api.Gzip<Abstract.Bud> = api.gzip

  /**
   * ## bud.hash  [💁 Fluent]
   *
   * Enable filename hashing of built assets. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.hash()
   * ```
   */
  public hash: api.Hash<Abstract.Bud> = api.hash

  /**
   * ## bud.imagemin [💁 Fluent]
   *
   * Losslessly images with imagemin.
   *
   * [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.imagemin()
   * ```
   *
   * ```js
   * bud.imagemin(false) // disable
   * ```
   */
  public imagemin: Imagemin.Config

  /**
   * ## bud.imageminOption [💁 Fluent]
   *
   * Configure imagmin setting
   *
   * [🔗 bud.imagemin documentation](#)
   *
   * [🔗 image-minimizer-webpack-plugin documentation](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)
   *
   * ### Usage
   *
   * ```js
   * bud.imageminOption('severityError', 'warning')
   * ```
   */
  public imageminOption: Imagemin.ConfigOption

  /**
   * ## bud.imageminPlugins [💁 Fluent]
   *
   * Customize imagemin plugins.
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   *
   * Shown with defaults:
   *
   * ```js
   * bud.imageminPlugins([
   *   ['gifsicle', {interlaced: true}],
   *   ['jpegtran', {progressive: true}],
   *   ['optipng', {optimizationLevel: 5}],
   *   [
   *     'svgo',
   *     {
   *       plugins: [
   *         {
   *           removeViewBox: false,
   *         },
   *       ],
   *     },
   *   ],
   * ])
   * ```
   */
  public imageminPlugins: Imagemin.ConfigPlugins

  /**
   * ## bud.library  [💁 Fluent]
   *
   * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library))
   * caching of specified modules.
   *
   * - [🔗 Documentation](#)
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
  public library: api.Library<Abstract.Bud> = api.library

  /**
   * ## bud.minify  [💁 Fluent]
   *
   * `bud.minify` enables minification of static assets. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.minify()
   * ```
   */
  public minify: api.Minify<Abstract.Bud> = api.minify

  /**
   * ## bud.pipe [💁 Fluent]
   *
   * Execute an array of functions. Each will be passed a fresh
   * copy of the bud object.
   *
   * ### Usage
   *
   * ```js
   * bud.pipe([
   *   bud => bud.srcPath('resources'),
   *   bud => bud.proxy(),
   * ])
   * ```
   */
  public pipe: api.Pipe<Abstract.Bud> = api.pipe

  /**
   * ## bud.project  [💁 Fluent]
   *
   * With no arguments, this function returns the project's root path.
   *
   * Optionally, **bud.project** may be passed a path relative to the project root.
   *
   * In this case it returns the absolute path. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.project()
   * ```
   *
   * ```js
   * bud.project('node_modules')
   * ```
   */
  public project: api.Project<Abstract.Bud> = api.project

  /**
   * ## bud.projectPath [💁 Fluent]
   *
   * Set the root directory reference.
   *
   * By default this directory is set as the current working dir. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.projectPath('build')
   * ```
   */
  public projectPath: api.ProjectPath<Abstract.Bud> =
    api.projectPath

  /**
   * ## bud.provide  [💁 Fluent]
   *
   * Makes a variable/module available throughout the entire
   * application without needing to import it explicitly. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.provide({
   *   jquery: '$',
   * })
   * ```
   */
  public provide: api.Provide<Abstract.Bud> = api.provide

  /**
   * ## bud.proxy  [💁 Fluent]
   *
   * Set proxy settings for the development server.
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.proxy()
   * ```
   *
   * ```js
   * bud.proxy({
   *  host: 'example.test',
   *  port: 3000,
   * })
   * ```
   */
  public proxy: api.Proxy<Abstract.Bud> = api.proxy

  /**
   * ## bud.publicPath  [💁 Fluent]
   *
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps  served from
   * a subdirectory. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * #### Set the default public path for a [@roots/sage project](https://github.com/roots/sage)
   *
   * ```js
   * bud.publicPath('/app/themes/sage/dist')
   * ```
   */
  public publicPath: api.PublicPath<Abstract.Bud> =
    api.publicPath

  /**
   * ## bud.run  [💁 Fluent]
   *
   * Run the build [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.run()
   * ```
   *
   * Disable the custom dashboard (use webpack default output)
   *
   * ```js
   * bud.run(true)
   * ```
   */
  public run: api.Run<Abstract.Bud> = api.run

  /**
   * ## bud.runtime  [💁 Fluent]
   *
   * Generate a runtime chunk intended to be inlined on the page.
   *
   * Useful for code splitting and dynamic imports. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.runtime()
   * ```
   */
  public runtime: api.Runtime<Abstract.Bud> = api.runtime

  /**
   * ## bud.src  [💁 Fluent]
   *
   * With no arguments, this function returns the project's src path.
   * Optionally, **bud.src** may be passed a path relative to the project src
   * directory. In this case it returns the absolute path of whatever it was
   * passed.
   *
   * Root path used by this function is set by [bud.srcPath](#). [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  public src: api.Src<Abstract.Bud> = api.src

  /**
   * ## bud.srcPath [💁 Fluent]
   *
   * Sets the root directory for source files.
   *
   * By default this directory is set as `src`. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.srcPath('build')
   * ```
   */
  public srcPath: api.SrcPath<Abstract.Bud> = api.srcPath

  /**
   * ## bud.string
   *
   * Interpolate to string.
   *
   * ### Usage
   *
   * ```js
   * const value = bud.env.get('some_env')
   * const stringValue = bud.string(value)
   * ```
   */
  public string: api.Stringify<Abstract.Bud> = api.string

  /**
   * ## bud.target  [💁 Fluent]
   *
   * Set the webpack build target. Default is 'web'. [🔗 Documentation](#)
   *
   * ```js
   * bud.target('web')
   * ```
   */
  public target: api.Target<Abstract.Bud> = api.target

  /**
   * ## bud.template  [💁 Fluent]
   *
   * Generate and/or configure boilerplate HTML for your project. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.template({
   *   template: bud.project('public/index.html'),
   *   replacements: {
   *     APP_NAME: name,
   *     APP_DESCRIPTION: description,
   *     PUBLIC_URL: bud.env.get('PUBLIC_URL'),
   *   },
   * })
   * ```
   */
  public template: api.Template<Abstract.Bud> = api.template

  /**
   * ## bud.terser  [💁 Fluent]
   *
   * Configure the minifier. [🔗 Documentation](#)
   *
   * For more information on options [see the
   * terser-webpack-plugin docs](https://webpack.js.org/plugins/terser-webpack-plugin/).
   */
  public terser: api.Terser<Abstract.Bud> = api.terser

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions to add
   * additional functionality to Bud.. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  public use: api.Use<Abstract.Bud> = api.use

  /**
   * ## bud.vendor  [💁 Fluent]
   *
   * Bundle vendored modules separately from application code. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.vendor()
   * ```
   *
   * Optionally, give the vendor bundle a specific name:
   *
   * ```js
   * bud.vendor('third-party')
   * ```
   */
  public vendor: api.Vendor<Config> = api.vendor

  /**
   * ## bud.when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`. [🔗 Documentation](#)
   *
   * - The first parameter is the conditional check.
   * - The second parameter is the function to be run if `true`.
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * bud.when(bud.mode.is('production'), () => bud.vendor())
   * ```
   */
  public when: api.When<Config> = api.when

  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  public config: Framework.Container

  /**
   * ## bud.args [🍱 _Container_]
   *
   * Collection of the arguments passed to the Framework and their values.
   *
   * [🔗 Documentation on bud.args](#)
   * [🔗 Documentation on containers](#)
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
   * [🔗 Documentation on bud.features](#)
   * [🔗 Documentation on containers](#)
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
   *
   * - [🔗 Documentation on bud.patterns](#)
   * - [🔗 Documentation on containers](#)
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
   * configuration progress, reports and errors.
   *
   * - [🔗 Documentation](#)
   */
  public cli: Framework.CLI.Runner

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  public build: Framework.Build.Contract

  /**
   * ## bud.cache
   *
   * Cache controller class.
   *
   * - [🔗 Documentation](#)
   */
  public cache: Framework.Cache.Contract

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Framework.Container for definitions founds in the application `.env` file *
   *
   * - [🔗 Documentation](#)
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
   * for easier modification.
   *
   * - [🔗 Documentation](#)
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
  public hooks: Hooks

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  public extensions: Framework.Extensions.Contract

  /**
   * ## bud.compiler
   *
   * Webpack compilation controller class.
   *
   * - [🔗 Documentation](#)
   */
  public compiler: Framework.Compiler.Contract

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  public server: Framework.Server.Contract

  /**
   * Class constructor
   */
  public constructor(registrable?: {[key: string]: unknown}) {
    super(registrable)

    Object.keys(api).map(fnName => {
      this[fnName] = this[fnName].bind(this)
    })

    this.hooks = new Hooks()

    this.build = new Build(this)

    this.cache = new Cache(this)

    this.cli = new Runner(this)

    this.compiler = new Compiler(this)

    this.server = new Server(this)

    this.extensions = new Extensions(this)
  }

  /**
   * ## bud.disks [🏠 Internal]
   *
   * Setup FS abstractions.
   *
   * @ignore
   */
  public disks(): this {
    this.fs.setBase(process.cwd())

    this.makeDisk('project', this.fs.base)

    this.makeDisk('@roots', '../../..')

    return this
  }

  /**
   * ## bud.register [🏠 Internal]
   *
   * Register framework components.
   *
   * @ignore
   */
  public register(): this {
    const containers = this.registry.getEntries('containers')

    containers
      .filter(
        ([name]: [string, Framework.Container['repository']]) =>
          name !== 'serverConfig',
      )
      .map(
        ([name, repo]: [
          string,
          Framework.Container['repository'],
        ]) => {
          this[name] = this.makeContainer({...repo})
        },
      )

    this.server.setConfig(
      containers
        .filter(
          ([name]: [
            string,
            Framework.Container['repository'],
          ]) => name == 'serverConfig',
        )
        .pop()
        .pop(),
    )

    return this
  }

  /**
   * ## bud.boot [🏠 Internal]
   *
   * Register parts of the application that
   * might rely on having container access (dynamic)
   *
   * @ignore
   */
  public boot(): this {
    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')

    this.registry
      .each('loaders', (k, v) => {
        this.build.setLoader(k, v)
      })

      .each('items', (k, v) => {
        this.build.setItem(k, v)
      })

      .each('rules', (k, v) => {
        this.build.setRule(k, v)
      })

      .each('extensions', (k, v) => {
        this.extensions.set(k, v)
      })

    return this
  }
}
