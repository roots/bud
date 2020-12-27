import type Webpack from 'webpack'
export type {Webpack}

import type Express from 'express'
export type {Express}

import type {Container} from '../../container/src'
export type {Container}

import type {GlobTask, zlib} from '@roots/bud-support'
export type {GlobTask, zlib}

import type CompressionPlugin from 'compression-webpack-plugin'
export type {CompressionPlugin}

import type {
  FileContainer,
  FileSystem,
} from '../../filesystem/src'
export type {FileContainer, FileSystem}

import type {Service} from '../../bud-support/src/Service/Service'
import type {ServiceContainer} from '../../bud-support/src/Service/ServiceContainer'
export type {Service, ServiceContainer}

import {
  dotenv,
  Instance,
  ProxyMiddleware,
  webpackDevMiddleware,
} from '@roots/bud-support'

/**
 * Utility types.
 */
import {
  Constructor,
  Index,
  Fluent,
  Use,
  When,
  Factory,
  MaybeCallable,
} from './utility'
export {
  Constructor,
  Index,
  Fluent,
  Use,
  When,
  Factory,
  MaybeCallable,
}

export namespace Framework {
  export {Api}
  export {Build}
  export {Cache}
  export {CLI}
  export {Compiler}
  export {Container}
  export {Env}
  export {Extensions, Extension}
  export {FileContainer}
  export {FileSystem}
  export {Item}
  export {Mode}
  export {Module}
  export {Hooks}
  export {Loader}
  export {Logger}
  export {Rule}
  export {Server}
  export {Index, Use, Factory, MaybeCallable, When}
}

/**
 * # Bud Framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/framework](#)
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 * [🔗 Documentation](#)
 */
export declare interface Framework extends Api {
  /**
   * ## bud.args [🍱 _Container_]
   *
   * CLI arguments passed to Bud.
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
  args: Container

  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  config: Container

  /**
   * ## bud.features [🍱 _Container_]
   *
   * Collection of feature flags each indicating
   * whether or not a  particular feature
   * is enabled or disabled.
   *
   * [🔗 Documentation on bud.features](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get the features store**
   *
   * ```js
   * bud.features.all() // returns all the features as a `k => v` obj.
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
  features: Container

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects.
   *
   * The advantage of using them in
   * a container object is that they can be
   * easily redefined by extensions.
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
  patterns: Container

  /**
   * ## bud.presets [🍱 _Container_]
   *
   * Preset configuration container
   */
  presets: Container

  /**
   * ## bud.serverConfig [🍱 _Container_]
   *
   * Server configuration container
   */
  serverConfig: Container

  register(): void

  boot(): void

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  build: Build

  /**
   * ## bud.cache
   */
  cache: Cache

  /**
   * ## bud.compiler
   */
  compiler: Compiler

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.
   *
   * - [🔗 Documentation](#)
   */
  cli: CLI.Runner

  /**
   * ## bud.disk
   *
   * Index of virtual filesystems. Allows for swapping
   * "disks". Each disk is the same class as `bud.fs` (which
   * is always set to the `bud.project` rootDir).
   *
   * @note disks do not index `.gitignore` matches by default
   * @note disks do not index `node_modules` by default
   *
   * [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * #### List file contents of project
   *
   * ```js
   * bud.disk.get('project').ls()
   * ```
   *
   * #### Get the absolute path of this class.
   *
   * ```js
   * bud.disk.get(`@roots`).get('bud-framework/src/Bud/index.js')
   * ```
   */
  disk: FileSystem

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Container for definitions founds in the
   * application `.env` file *
   *
   * - [🔗 Documentation](#)
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  env: Env

  /**
   * ## bud.extensions
   *
   * Bud extension controller class.
   *
   * - [🔗 Documentation](#)
   */
  extensions: Extensions

  /**
   * ## bud.fs
   *
   * Project filesystem. [🔗 Documentation on bud.fs](#)
   *
   * ```js
   * bud.fs.readJson('project.json')
   * ```
   *
   * ```js
   * bud.fs.has('src/index.js')
   * ```
   */
  fs: FileContainer

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
  hooks: Hooks

  /**
   * ## bud.logger
   *
   * Logging utility
   *
   * [🔗 Documentation on bud.mode](#)
   */
  logger: Logger

  /**
   * ## bud.mode
   */
  mode: Mode

  /**
   * ## bud.server
   *
   * Express application server used for development.
   *
   * - [🔗 Documentation](#)
   */
  server: Server

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  use: Use

  /**
   * Initialize class
   */
  init(): this

  /**
   * ## bud.get  [🏠 Internal]
   *
   * ```js
   * bud.get()
   * ```
   */
  get(): this

  /**
   * ## bud.set  [🏠 Internal]
   *
   * ```js
   * bud.set()
   * ```
   */
  set<T = any>(prop: string, value: T): void

  /**
   * ## bud.callMeMaybe
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * bud.callMeMaybe(isAFunction, true)
   * // => `option value: true`
   *
   * bud.callMeMaybe(isAValue)
   * // => `option value: true`
   * ```
   */
  callMeMaybe<I = unknown>(value: MaybeCallable<I>): I

  /**
   * ## bud.makeContainer
   *
   * Create a new container. May be passed an initial set of values.
   *
   * [🔗 Documentation on containers](#)
   */
  makeContainer(repository?: Index<any>): Container

  /**
   * ## bud.makeDisk
   *
   * Create a new disk. Provide a name, root directory, and -- optionally --
   * a custom glob array. [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * ```js
   * bud.makeDisk(
   *   'icons',
   *   bud.project('assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  makeDisk(name: string, dir: string, glob?: string[]): void

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
  pipe(fns: CallableFunction[]): this

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
  when: Framework.When
}

export declare class Api {
  /**
   * ## bud.addPlugin  [💁 Fluent]
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
  public addPlugin: Api.AddPlugin

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
  public alias: Api.Alias

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
  public copy: Api.Copy

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
  public define: Api.Define

  /**
   * ## bud.dev  [💁 Fluent]
   *
   * Configure Framework's development server. [🔗 Documentation](#)
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
  public dev: Api.Dev

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
  public devtool: Api.Devtool

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
  public dist: Api.Dist

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
  public distPath: Api.DistPath

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
  public entry: Api.Entry

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
  public externals: Api.Externals

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
  public glob: Api.Glob

  /**
   * ## bud.gzip  [💁 Fluent]
   *
   * Gzip static assets. [🔗 Documentation](#)
   */
  public gzip: Api.Gzip

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
  public hash: Api.Hash

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
  public minify: Api.Minify

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
  public project: Api.Project

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
  public projectPath: Api.ProjectPath

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
  public provide: Api.Provide

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
  public proxy: Api.Proxy

  /**
   * ## bud.publicPath  [💁 Fluent]
   *
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps  served from
   * a subdirectory. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * #### Set the default path for a [@roots/sage project](https://github.com/roots/sage)
   *
   * ```js
   * bud.publicPath('/app/themes/sage/dist')
   * ```
   */
  public publicPath: Api.PublicPath

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
  public run: Api.Run

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
  public runtime: Api.Runtime

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
  public src: Api.Src

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
  public srcPath: Api.SrcPath

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
  public string: Api.Stringify

  /**
   * ## bud.storage  [💁 Fluent]
   *
   * Cache module output that remains unchanged between builds. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.storage()
   * ```
   *
   * #### Specify an output path for the JSON used for cache busting
   *
   * ```js
   * bud.storage(bud.project('./.build'))
   * ```
   */
  public storage: Api.Storage

  /**
   * ## bud.target  [💁 Fluent]
   *
   * Set the webpack build target. Default is 'web'. [🔗 Documentation](#)
   *
   * ```js
   * bud.target('web')
   * ```
   */
  public target: Api.Target

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
  public template: Api.Template

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
  public vendor: Api.Vendor
}

export namespace Api {
  export type AddPlugin = (
    this: Framework,
    name: string,
    make: Webpack.Plugin | CallableFunction,
  ) => Framework

  export type Alias = (
    this: Framework,
    aliases: {
      [key: string]: string
    },
  ) => Framework

  export type Copy = (
    this: Framework,
    options: Copy.Options,
  ) => Framework

  export namespace Copy {
    export interface Options {
      from: string
      to: string
      context: string
      options: {
        noErrorOnMissing: boolean
        globOptions: {
          ignore: string
        }
      }
    }
  }

  export type Define = (
    this: Framework,
    values: Framework.Index<any>,
  ) => Framework

  export type Dev = (
    this: Framework,
    config: Framework.Server.Config,
  ) => Framework

  export type Devtool = (
    this: Framework,
    devtool?: Webpack.Configuration['devtool'],
  ) => Framework

  export type Dist = (this: Framework, path?: string) => string

  export type DistPath = (
    this: Framework,
    segment: string,
  ) => Framework

  export type Entry = (
    this: Framework,
    bundleName: string,
    assets:
      | string
      | string[]
      | {
          [key: string]: string | string[]
        },
  ) => Framework

  export type Externals = (
    this: Framework,
    externals: {
      [key: string]: any
    },
  ) => Framework

  export type Glob = (
    this: Framework,
    name: string,
    files: GlobTask['pattern'],
    options: GlobTask['options'],
  ) => Framework

  export type Gzip = (
    this: Framework,
    options?: Gzip.Options,
  ) => Framework

  namespace Gzip {
    export type Options = CompressionPlugin.Options<
      zlib.ZlibOptions
    >
  }

  export type Hash = (
    this: Framework,
    enabled?: boolean,
  ) => Framework

  export type Minify = (this: Framework) => Framework

  export type ProjectPath = (
    this: Framework,
    dir: string,
  ) => Framework

  export type Provide = (
    this: Framework,
    options: {
      [key: string]: string | string[]
    },
  ) => Framework

  export type Project = (
    this: Framework,
    path?: string,
  ) => string

  export type Proxy = (
    this: Framework,
    config?: {
      enabled?: boolean
      host?: Framework.Server.Config['proxy']['host']
      port?: Framework.Server.Config['proxy']['port']
    },
  ) => Framework

  export type PublicPath = (
    this: Framework,
    publicPath: string,
  ) => Framework

  export type Run = (this: Framework, safeMode?: boolean) => void

  export type Runtime = (this: Framework) => Framework

  export type Src = (this: Framework, segment?: string) => string

  export type Storage = (
    this: Framework,
    path?: string,
  ) => Framework

  export type Stringify = (
    this: Framework,
    string: unknown,
  ) => string

  export type SrcPath = (
    this: Framework,
    segment: string,
  ) => Framework

  export type Target = (
    this: Framework,
    target: string,
  ) => Framework

  export type Template = (
    this: Framework,
    options?: {
      template?: string
      replacements?: Framework.Index<string>
    },
  ) => Framework

  export type Vendor = (this: Framework) => Framework
}

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Build extends Service<Framework> {
  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  builders: Partial<Build.Builder>

  /**
   * ## bud.build.loaders
   */
  loaders: Container

  /**
   * ## bud.build.items
   */
  items: Container

  /**
   * ## bud.build.rules
   */
  rules: Container

  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  make(): Webpack.Configuration

  /**
   * ## bud.build.getLoader
   *
   * Get a loader from the store.
   */
  getLoader(name: string): Loader

  /**
   * ## bud.build.setLoader
   *
   * Set a loader to the store. Returns the set loader.
   */
  setLoader(name: string, loader: Loader): Loader

  /**
   * ## bud.build.getItem
   *
   * Get an item  from the store.
   */
  getItem(name: string): Item

  /**
   * ## bud.build.setItem
   *
   * Set an item to the store. Returns the set item.
   */
  setItem(name: string, module: Item.Module): Item

  /**
   * ## bud.build.getRule
   *
   * Get a rule from the store.
   */
  getRule(name: string): Rule

  /**
   * ## bud.build.setRule
   *
   * Set a rule to the store. Returns the set rule.
   */
  setRule(name: string, module: Rule.Module): Rule
}

export namespace Build {
  export type Builder = (
    this: Framework,
    config: Container,
  ) => Partial<Webpack.Configuration>
}

/**
 * RulesetRule
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Rule extends Service<Framework> {
  /**
   * Rule.Enforce
   */
  enforce?: Rule.Module['enforce']

  /**
   * Rule.Exclude
   */
  exclude?: Rule.Module['exclude']

  /**
   * Rule.Include
   */
  include?: Rule.Module['include']

  /**
   * Rule.Issuer
   */
  issuer?: Rule.Module['issuer']

  /**
   * Rule.OneOf
   */
  oneOf?: Rule.Module['oneOf']

  /**
   * Rule.Options
   */
  options?: Rule.Module['options']

  /**
   * Rule.Parser
   */
  parser?: Rule.Module['parser']

  /**
   * Rule.Resolve
   */
  resolve?: Rule.Module['resolve']

  /**
   * Rule.SideEffects
   */
  sideEffects?: Rule.Module['sideEffects']

  /**
   * Rule.Query
   */
  query?: Rule.Module['query']

  /**
   * Rule.Type
   */
  type?: Rule.Module['type']

  /**
   * Rule.Resource
   */
  resource?: Rule.Module['resource']

  /**
   * Rule.ResourceQuery
   */
  resourceQuery?: Rule.Module['resourceQuery']

  /**
   * Rule.Compiler
   */
  compiler?: Rule.Module['compiler']

  /**
   * Rule.Rules
   */
  rules?: Rule.Module['rules']

  /**
   * Rule.Test
   */
  test?: Rule.Module['test']

  /**
   * Rule.Use
   */
  use?: Rule.Module['use']

  /**
   * Register module
   */
  register(rule: Rule.Module): this

  /**
   * Produce rulesetrule
   *
   * @see RuleSetRule
   */
  make(): Webpack.RuleSetRule
}

export namespace Rule {
  export interface Module {
    enforce?: MaybeCallable<Enforce, Framework>

    exclude?: MaybeCallable<RegExp, Framework>

    include?: MaybeCallable<RegExp, Framework>

    issuer?: MaybeCallable<RegExp, Framework>

    oneOf?: MaybeCallable<OneOf, Framework>

    options?: MaybeCallable<Index<any>, Framework>

    parser?: MaybeCallable<Parser, Framework>

    resolve?: MaybeCallable<Resolve, Framework>

    sideEffects?: MaybeCallable<SideEffects, Framework>

    query?: MaybeCallable<Query, Framework>

    type?: MaybeCallable<Type, Framework>

    resource?: MaybeCallable<Conditional, Framework>

    resourceQuery?: MaybeCallable<Conditional, Framework>

    compiler?: MaybeCallable<Conditional, Framework>

    rules?: MaybeCallable<OneOf, Framework>

    test?: MaybeCallable<RegExp, Framework>

    use?: MaybeCallable<Array<Index<any>>, Framework>
  }

  export type Resolve = Index<Webpack.Resolve>

  export type Type =
    | 'javascript/auto'
    | 'javascript/dynamic'
    | 'javascript/esm'
    | 'json'
    | 'webassembly/experimental'

  export type Enforce = 'pre' | 'post'

  export type Conditional = boolean

  export type Parser = Index<any>

  export type Query = string | Parser

  export type SideEffects = boolean

  export type Options = Index<any>

  export type OneOf = Array<Webpack.RuleSetRule>

  export type Use = Array<Index<any>>
}

/**
 * Loader
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export type Loader = string

export namespace Loader {
  export interface Module {
    ident: string
    loader: Loader
  }
}

/**
 * Item
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Item extends Service<Framework> {
  ident?: Item.Module.Ident

  loader?: Item.Module.Loader

  options?: Item.Module.Options

  query?: Item.Module.Query

  register(module: Item.Module): void

  make: () => Item.RuleSetLoader
}

export namespace Item {
  export type RuleSetLoader = {
    ident?: string

    loader?: string

    options?: Index<any>

    query?: Webpack.RuleSetQuery
  }

  export type Module = {
    ident?: Module.Ident
    loader?: Module.Loader
    options?: Module.Options
    query?: Module.Query
  }

  export namespace Module {
    export type Ident = string
    export type Loader = string
    export type Options = Webpack.RuleSetLoader['options']
    export type Query = Webpack.RuleSetQuery
  }
}

/**
 * ## bud.compiler
 *
 * Compiler controller for the @roots/bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Compiler extends Service<Framework> {
  /**
   * The compiler instance
   */
  instance: Webpack.Compiler

  /**
   * Compiler stats output
   */
  stats: Compiler.Stats.Output

  /**
   * Compiler statsa configuration
   */
  statsOptions: Compiler.Stats.Options

  /**
   * Get the compiler instance
   */
  get(): Webpack.Compiler

  /**
   * Set the compiler instance
   */
  set(compiler: Webpack.Compiler): void

  /**
   * ## bud.compiler.compile
   *
   * Return a compiler instance for a webpack configuration.
   *
   * If none is supplied the configuration will be made from `bud.build.make`.
   *
   * [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.compile()
   * ```
   *
   * ```js
   * bud.compiler.compile({
   *   entry: {app: 'foo.js'}
   * })
   * ```
   */
  compile(): Webpack.Compiler

  /**
   * ## bud.compiler.run
   *
   * Run the stored instance. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.run((err, stats) => {...})
   * ```
   */
  run(): void

  /**
   * ## bud.compiler.makeError
   */
  makeError(err: string): void

  /**
   * ## bud.compiler.applyPlugins
   *
   * Applies the progress plugin. [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.compiler.applyPlugin((progressArgs) => progressHandler())
   * ```
   */
  applyPlugins(handler: Compiler.ProgressHandler): void
}

export namespace Compiler {
  export type {Instance}

  export type Handler = Webpack.Compiler.Handler

  export type ProgressHandler = Webpack.ProgressPlugin.Handler

  export namespace Stats {
    export type Options = {
      json: Webpack.Stats.ToJsonOptions
      string: Webpack.Stats.ToStringOptions
    }

    export type Output = {
      string: string
      json: Webpack.Stats.ToJsonOutput
    }
  }
}

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Extensions extends ServiceContainer<Framework> {
  set(name: string, extension: MaybeCallable<Module>): this

  use(pkg: string): Promise<this>

  make(extensions: Container): void
}

export interface Extension extends ServiceContainer {
  readonly app: Framework

  initialized: boolean

  module: Module

  init(): void

  callMeMaybe(
    value: CallableFunction | any,
    ...args: unknown[]
  ): unknown

  fromProp(prop: string, dep?: unknown[]): [string, unknown]

  makePlugin(): MaybeCallable<any> | boolean

  isPlugin(): boolean

  isPluginEnabled(): boolean

  setOptions(options: Index<any>): void

  setBuilders(builders: [string, CallableFunction][]): void
}

export interface Module {
  options?: Module.RawOptions

  register?: Module.Register

  boot?: Module.Boot

  api?: Module.Api

  registerLoader?: Module.RegisterOne<Loader>

  registerLoaders?: Module.RegisterMany<Loader>

  registerRule?: Module.RegisterOne<Rule.Module>

  registerRules?: Module.RegisterMany<Rule.Module>

  registerItem?: Module.RegisterOne<Item.Module>

  registerItems?: Module.RegisterMany<Item.Module>

  make?: Module.Make

  when?: Module.When
}

/**
 * Extension module
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export namespace Module {
  export type Api =
    | {[key: string]: CallableFunction}
    | ((bud?: Framework) => {[key: string]: CallableFunction})

  export type Register = (bud: Framework) => void

  export type RegisterOne<T> =
    | ((bud?: Framework) => [string, T])
    | [string, T]

  export type RegisterMany<T> =
    | ((bud?: Framework) => {[key: string]: T})
    | {[key: string]: T}

  export type RawOptions<T = any> = T | ((bud?: Framework) => T)

  export type Options = {[key: string]: any}

  export type Make<P = unknown, T = Options> =
    | ((options: Container<T>, bud?: Framework) => P)
    | P

  export type When = (bud: Framework, opt?: Container) => boolean

  export type Boot = (bud: Framework) => void
}

/**
 * ## bud.env
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export type Env = Container
export namespace Env {
  export type Data = dotenv.DotenvParseOutput
}

/**
 * ## bud.hooks
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Hooks extends Service<Framework> {
  has: Hooks.Has
  on: Hooks.On
  action: Hooks.Action
  filter: Hooks.Filter
}

export namespace Hooks {
  export type Hook<T = unknown> = (data: T) => T

  export type Filter = <T = unknown>(name: string, value: T) => T

  export namespace Filter {
    export type Reducer<T> = (val: T, hook: Hook<T>) => T
  }

  export type Action = <T = unknown>(
    name: string,
    binding: T,
  ) => void

  export namespace Action {
    export type Map<T> = (hook: Hook<T>) => Hook<T>
  }

  export type Store = {[key: string]: Hook[]}

  export type Has = (name: string) => boolean

  export type On = <T = unknown>(
    name: string,
    hook: Hook<T>,
  ) => Hooks
}

/**
 * ## bud.logger
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Logger {
  fatal: Logger.LogFn

  error: Logger.LogFn

  warn: Logger.LogFn

  info: Logger.LogFn
}

export namespace Logger {
  export interface LogFn {
    <T extends object>(
      obj: T,
      msg?: string,
      ...args: any[]
    ): void
    (msg: string, ...args: any[]): void
  }
}

/**
 * ## bud.mode
 *
 * Utility for working with the webpack compiler's mode setting.
 *
 * [🔗 Documentation on bud.mode](#)
 */
export declare class Mode extends Service<Framework> {
  /**
   * ## bud.mode.mode
   *
   * Webpack compilation mode.
   */
  public mode: Webpack.Configuration['mode']

  /**
   * ## bud.mode.ci
   *
   * Is CI mode enabled?
   */
  public ci: boolean

  /**
   * ## bud.mode.get
   *
   * Returns the currently set mode.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.get()
   * ```
   */
  public get(): Webpack.Configuration['mode']

  /**
   * ## bud.mode.set
   *
   * Set the mode value.
   *
   * Accepted values: `production`, `development`, `none`
   *
   * ### Usage
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  public set(mode: Webpack.Configuration['mode']): Framework

  /**
   * ## bud.mode.is
   *
   * Returns `true` if webpack mode matches the mode passed to it.
   *
   * Returns `false` if it does not.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.is('production')
   * // returns true if bud.mode.get() === 'production'
   * ```
   */
  public is(check: Webpack.Configuration['mode']): boolean
}

/**
 * ## bud.server
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Server extends Service<Framework> {
  instance: Server.Instance

  config: Container

  run(callback?: () => void): this

  listen(callback?: () => void): void
}

export namespace Server {
  export type Instance = Express.Application

  export interface Config {
    /**
     * The development server host
     * @example example.test
     */
    host?: string

    /**
     * The development server port
     * @example 3000
     */
    port?: number

    /**
     * Proxy destination
     */
    proxy?: {
      /**
       * Proxy destination host
       * @example localhost
       */
      host?: string

      /**
       * Proxy destination port
       * @example 3000
       */
      port?: number
    }

    /**
     * The index path for web server, defaults to "index.html".
     */
    index?: webpackDevMiddleware.Options['index']

    /**
     * The path that the middleware is bound to.
     */
    publicPath?: webpackDevMiddleware.Options['publicPath']

    /**
     * Proxy setting: object passed to  https.createServer
     */
    ssl?: ProxyMiddleware.Options['ssl']

    /**
     * Proxy setting: set to true to verify SSL certificates
     */
    secure?: ProxyMiddleware.Options['secure']

    /**
     * Proxy setting: proxy websockets.
     */
    ws?: ProxyMiddleware.Options['ws']

    /**
     * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
     */
    autoRewrite?: ProxyMiddleware.Options['autoRewrite']

    /**
     * Proxy setting: change the origin of the host header to the target URL
     */
    changeOrigin?: ProxyMiddleware.Options['changeOrigin']

    /**
     * Escape hatch for Webpack's host check security feature.
     */
    disableHostCheck?: webpackDevMiddleware.Options[]

    /**
     * Proxy setting: specify whether you want to follow redirects
     */
    followRedirects?: ProxyMiddleware.Options['followRedirects']

    /**
     * Filename to serve as index.
     */
    filename?: webpackDevMiddleware.Options['filename']

    /**
     * This property for  passing  custom
     * HTTP headers on each request.
     *
     * ### Example
     *
     * ```json
     * { "X-Custom-Header": "yes" }
     * ```
     */
    headers?: webpackDevMiddleware.Options['headers']

    /**
     * This property for  passing  the
     * list of HTTP request methods accepted
     *
     * ### Example
     *
     * ```json
     * ['GET', 'HEAD']
     * ```
     */
    methods?: webpackDevMiddleware.Options['methods']

    /**
     * This property for  to register custom
     * mime types or extension mappings
     */
    mimeTypes?:
      | webpackDevMiddleware.MimeTypeMap
      | webpackDevMiddleware.OverrideMimeTypeMap
      | null

    /**
     * Instructs the module to enable or disable the s
     * erver-side rendering mode
     */
    serverSideRender?: webpackDevMiddleware.Options['serverSideRender']

    /**
     * Specify polling, etc.
     */
    watchOptions?: Webpack.Options.WatchOptions

    /**
     * If true, the option will instruct the module
     * to write files to the configured location on disk
     * as specified in your webpack config file.
     *
     * This option also accepts a Function value, which can be used to
     * filter which files are written to disk
     */
    writeToDisk?: webpackDevMiddleware.Options['writeToDisk']
  }
}

/**
 * ## bud.cache
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export class Cache extends Service<Framework> {
  /**
   * Is cache enabled?
   */
  public enabled(): boolean

  /**
   * Set cache.
   */
  public setCache(): void
}

export interface Cache extends Service<Framework> {
  /**
   * Is cache enabled?
   */
  enabled(): boolean

  /**
   * Set cache.
   */
  setCache(): void
}

/**
 * ## bud.cli
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
import type {Error} from '../../bud-cli/src/Error'
import type {Runner} from '../../bud-cli/src/Runner'
export namespace CLI {
  export type {Error, Runner}
}

/**
 * ## bud.dependencies
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
import type Dependencies from '../../dependencies/src/dependencies'
export type {Dependencies}
