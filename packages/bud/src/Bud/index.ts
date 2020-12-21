import {Framework} from '@roots/bud-framework'
import * as Api from '@roots/bud-api'

import type {Container} from '@roots/container'
import type {Brotli} from '../components/extensions'

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
export default class Bud extends Framework {
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
   * #### Set the default public path for a [@roots/sage project](https://github.com/roots/sage)
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
  public use: Api.Use

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
  public when: Api.When

  /**
   * ## bud.register [🏠 Internal]
   *
   * Register framework components.
   */
  protected register(): void {
    this.containers
      .getEntries()
      .filter(
        ([name]: [string, Container['repository']]) =>
          name !== 'serverConfig',
      )
      .forEach(
        ([name, repo]: [string, Container['repository']]) => {
          this[name] = this.makeContainer({...repo})
        },
      )

    this.server.setConfig(
      this.containers
        .getEntries()
        .filter(
          ([name]: [string, Framework['repository']]) =>
            name == 'serverConfig',
        )
        .pop()
        .pop(),
    )
  }

  /**
   * ## bud.boot [🏠 Internal]
   *
   * Register parts of the application that
   * might rely on having container access (dynamic)
   */
  protected boot(): void {
    this.components
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
  }
}
