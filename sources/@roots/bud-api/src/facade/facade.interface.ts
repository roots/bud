import type * as alias from '../methods/alias/index.js'
import type * as assets from '../methods/assets/index.js'
import type {config} from '../methods/config/index.js'
import type {define} from '../methods/define/index.js'
import type * as devtool from '../methods/devtool/index.js'
import type {facade as entryFacade} from '../methods/entry/index.js'
import type {experiments} from '../methods/experiments/index.js'
import type {externals} from '../methods/externals/index.js'
import type {hash} from '../methods/hash/index.js'
import type {minimize} from '../methods/minimize/index.js'
import type {persist} from '../methods/persist/index.js'
import type {provide} from '../methods/provide/index.js'
import type * as proxy from '../methods/proxy/index.js'
import type * as run from '../methods/run/index.js'
import type {runtime} from '../methods/runtime/index.js'
import type * as serve from '../methods/serve/index.js'
import type * as splitChunks from '../methods/splitChunks/index.js'
import type {facade as templateFacade} from '../methods/template/index.js'
import type * as use from '../methods/use/index.js'
import type {watch} from '../methods/watch/index.js'

/**
 * Public interface for the Bud API
 *
 * @remarks
 * Virtual class representing a synchronous interface for use in consumer configs.
 * these type signatures are synchronous regardless of if the underlying method is.
 *
 * @public
 */
export class Facade {
  /**
   * Register shorthand for resolving modules using webpack aliases.
   *
   * @remarks
   * Useful for situations that may otherwise require brittle relative paths.
   *
   * @example
   * ```js
   * app.alias({
   *   '@scripts': app.path('@src', 'scripts'),
   * })
   * ```
   *
   * @public
   */
  public alias: alias.facade

  /**
   * Copy static assets during compilation.
   *
   * @remarks
   * You may specify paths with a string literal, glob pattern, options object,
   * or an array of any of these.
   *
   * @example
   * ```js
   * app.assets('images')
   * ```
   *
   * @example
   * ```js
   * app.assets(['images', 'fonts'])
   * ```
   *
   * @example
   * ```js
   * app.assets({
   *  from: app.path('@src', 'images'),
   *  errorOnUnmatchedPattern: true,
   * })
   * ```
   *
   * @example
   * ```js
   * app.assets([
   *   {
   *    from: app.path('@src', 'images'),
   *    errorOnUnmatchedPattern: true,
   *   },
   *   'fonts',
   *   '** /*.txt'
   * ])
   * ```
   *
   * @public
   */
  public assets: assets.facade

  /**
   * Copy static assets during compilation.
   *
   * @remarks
   * You may specify paths with a string literal, glob pattern, options object,
   * or an array of any of these.
   *
   * @example
   * ```js
   * app.assets('images')
   * ```
   *
   * @example
   * ```js
   * app.assets(['images', 'fonts'])
   * ```
   *
   * @example
   * ```js
   * app.assets({
   *  from: app.path('@src', 'images'),
   *  errorOnUnmatchedPattern: true,
   * })
   * ```
   *
   * @example
   * ```js
   * app.assets([
   *   {
   *    from: app.path('@src', 'images'),
   *    errorOnUnmatchedPattern: true,
   *   },
   *   'fonts',
   *   '** /*.txt'
   * ])
   * ```
   *
   * @public
   */
  public copy: assets.facade

  /**
   * Modify the generated webpack config prior to compilation.
   *
   * @remarks
   * Override generated webpack config with custom config.
   *
   * @example
   * ```ts
   * app.config({entry: './src/index.js'})
   * ```
   *
   * @public
   */
  public config: config
  /**
   * Modify the generated webpack config prior to compilation.
   *
   * @remarks
   * Override generated webpack config with custom config.
   *
   * @example
   * ```ts
   * app.config({entry: './src/index.js'})
   * ```
   *
   * @public
   */
  public webpackConfig: config

  /**
   * Modify the generated webpack config prior to compilation.
   *
   * @remarks
   * Override generated webpack config with custom config.
   *
   * @example
   * ```ts
   * app.config({entry: './src/index.js'})
   * ```
   *
   * @public
   */
  public override: config

  /**
   * Define application variables
   *
   * @example
   * ```ts
   * app.define({
   *   APP_NAME: 'My Application',
   * })
   * ```
   *
   * @public
   */
  public define: define
  /**
   * Enable filename hashing of built assets.
   *
   * @example
   * ```js
   * bud.hash()
   * ```
   *
   * @public
   */
  public autoload: define

  /**
   * Configure sourcemaps
   *
   * @remarks
   * Compatible with any of [Webpack's devtool options](https://webpack.js.org/configuration/devtool/).
   *
   * @example
   * ```js
   * app.devtool('inline-cheap-module-source-map')
   * ```
   *
   * @public
   */
  public devtool: devtool.facade

  /**
   * Bundle vendor modules separately from application code.
   *
   * @example
   * Enable chunk splitting
   *
   * ```js
   * bud.splitChunks()
   * ```
   *
   * @example
   * Disable chunk splitting
   *
   * ```js
   * bud.splitChunks(false)
   * ```
   *
   * @example
   * Merge optimization.splitChunks object
   *
   * ```js
   * bud.splitChunks({chunks: 'all'})
   * ```
   *
   * @public
   */
  public splitChunks: splitChunks.facade

  /**
   * Bundle vendor modules separately from application code.
   *
   * @example
   * Enable chunk splitting
   *
   * ```js
   * bud.splitChunks()
   * ```
   *
   * @example
   * Disable chunk splitting
   *
   * ```js
   * bud.splitChunks(false)
   * ```
   *
   * @example
   * Merge optimization.splitChunks object
   *
   * ```js
   * bud.splitChunks({chunks: 'all'})
   * ```
   *
   * @deprecated Use `bud.splitChunks`
   *
   * @public
   */
  public extract: splitChunks.facade

  /**
   * Generate application entrypoints from source asset paths.
   *
   * @remarks
   * **Globbing**
   *
   * Uses [fast-glob](https://git.io/JkGbw) syntax.
   *
   * **Supported patterns**
   *
   * - `*` matches any number of characters, but not `/`
   * - `?` matches a single character, but not `/`
   * - `**` matches any number of characters, including `/`,
   *   as long as it's the only thing in a path part
   * - `{}` allows for a comma-separated list  of "or" expressions
   * - `!` at the beginning of a pattern will negate the match
   *
   * @example
   * Create an entrypoint from a single file:
   *
   * ```js
   * app.entry('app', 'app.js')
   * ```
   *
   * @example
   * Create an entrypoint from multiple files:
   *
   * ```js
   * app.entry('app', ['js/app.js', 'css/app.css'])
   * ```
   *
   * @example
   * Create an entrypoint comprised of all js assets:
   *
   * ```js
   * app.entry('app', '*.js')
   * ```
   *
   * @example
   * You may create more than one entrypoint using object syntax:
   *
   * ```js
   * app.entry({
   *   scripts: '*.js',
   *   styles: ['*.css', '*.scss'],
   * })
   * ```
   *
   * @example
   * Declare entrypoint dependencies:
   *
   * ```js
   * app.entry({
   *  react: {
   *    import: ['react', 'react-dom']
   *  },
   *  app: {
   *    import: ['app.js'],
   *    dependOn: ['react'],
   *  },
   * })
   * ```
   *
   * @public
   */
  public entry: entryFacade

  /**
   * Generate application entrypoints from source asset paths.
   *
   * @remarks
   * **Globbing**
   *
   * Uses [fast-glob](https://git.io/JkGbw) syntax.
   *
   * **Supported patterns**
   *
   * - `*` matches any number of characters, but not `/`
   * - `?` matches a single character, but not `/`
   * - `**` matches any number of characters, including `/`,
   *   as long as it's the only thing in a path part
   * - `{}` allows for a comma-separated list  of "or" expressions
   * - `!` at the beginning of a pattern will negate the match
   *
   * @example
   * Create an entrypoint from a single file:
   *
   * ```js
   * app.entry('app', 'app.js')
   * ```
   *
   * @example
   * Create an entrypoint from multiple files:
   *
   * ```js
   * app.entry('app', ['js/app.js', 'css/app.css'])
   * ```
   *
   * @example
   * Create an entrypoint comprised of all js assets:
   *
   * ```js
   * app.entry('app', '*.js')
   * ```
   *
   * @example
   * You may create more than one entrypoint using object syntax:
   *
   * ```js
   * app.entry({
   *   scripts: '*.js',
   *   styles: ['*.css', '*.scss'],
   * })
   * ```
   *
   * @example
   * Declare entrypoint dependencies:
   *
   * ```js
   * app.entry({
   *  react: {
   *    import: ['react', 'react-dom']
   *  },
   *  app: {
   *    import: ['app.js'],
   *    dependOn: ['react'],
   *  },
   * })
   * ```
   *
   * @public
   */
  public js: entryFacade
  /**
   * Generate application entrypoints from source asset paths.
   *
   * @remarks
   * **Globbing**
   *
   * Uses [fast-glob](https://git.io/JkGbw) syntax.
   *
   * **Supported patterns**
   *
   * - `*` matches any number of characters, but not `/`
   * - `?` matches a single character, but not `/`
   * - `**` matches any number of characters, including `/`,
   *   as long as it's the only thing in a path part
   * - `{}` allows for a comma-separated list  of "or" expressions
   * - `!` at the beginning of a pattern will negate the match
   *
   * @example
   * Create an entrypoint from a single file:
   *
   * ```js
   * app.entry('app', 'app.js')
   * ```
   *
   * @example
   * Create an entrypoint from multiple files:
   *
   * ```js
   * app.entry('app', ['js/app.js', 'css/app.css'])
   * ```
   *
   * @example
   * Create an entrypoint comprised of all js assets:
   *
   * ```js
   * app.entry('app', '*.js')
   * ```
   *
   * @example
   * You may create more than one entrypoint using object syntax:
   *
   * ```js
   * app.entry({
   *   scripts: '*.js',
   *   styles: ['*.css', '*.scss'],
   * })
   * ```
   *
   * @example
   * Declare entrypoint dependencies:
   *
   * ```js
   * app.entry({
   *  react: {
   *    import: ['react', 'react-dom']
   *  },
   *  app: {
   *    import: ['app.js'],
   *    dependOn: ['react'],
   *  },
   * })
   * ```
   *
   * @public
   */
  public css: entryFacade

  /**
   * Configure experimental webpack options.
   *
   * @example
   * ```js
   * bud.experiments({
   *  lazyCompilation: true,
   * })
   * ```
   *
   * @public
   */
  public experiments: experiments

  /**
   * Specify a non-standard resolution strategy for modules with a matching name.
   *
   * @example
   * ```js
   * bud.externals({
   *   'jQuery': 'window.jquery',
   * })
   * ```
   *
   * @public
   */
  public externals: externals

  /**
   * Enable filename hashing of built assets.
   *
   * @example
   * ```js
   * bud.hash()
   * ```
   *
   * @public
   */
  public hash: hash
  /**
   * Enable filename hashing of built assets.
   *
   * @example
   * ```js
   * bud.hash()
   * ```
   *
   * @public
   */
  public version: hash

  /**
   * Enables minification of built assets.
   *
   * @example
   * Enable:
   *
   * ```js
   * bud.minimize()
   * ```
   *
   * @example
   * Explicitly disable:
   *
   * ```js
   * bud.minimize(false)
   * ```
   *
   * @example
   * Explicitly enable:
   *
   * ```js
   * bud.minimize(true)
   * ```
   *
   * @public
   */
  public minimize: minimize

  /**
   * Cache webpack builds to the filesystem.
   *
   * @example
   * ```js
   * app.persist('memory')
   * ```
   *
   * @example
   * ```js
   * app.persist('filesystem')
   * ```
   *
   * @example
   * ```js
   * app.persist(false)
   * ```
   *
   * @public
   */
  public persist: persist

  /**
   * Make a variable/module available throughout the entire
   * application without needing to import it explicitly.
   *
   * @example
   * ```js
   * bud.provide({
   *   jquery: '$',
   * })
   * ```
   *
   * @public
   */
  public provide: provide

  /**
   * Set proxy settings for the development server.
   *
   * @remarks
   *
   * - By default there is no proxy enabled.
   *
   * - If enabled with no  proxies whatever is running on localhost on port 8000.
   *
   * @example
   * Enable:
   *
   * ```js
   * bud.proxy()
   * ```
   *
   * @example
   * Disable:
   *
   * ```js
   * bud.proxy({enabled: false})
   * ```
   *
   * @example
   * Specify host and port:
   *
   * ```js
   * bud.proxy({
   *  host: 'example.test',
   *  port: 3000,
   * })
   * ```
   *
   * @public
   */
  public proxy: proxy.facade

  /**
   * Run the build
   *
   * @example
   * ```js
   * bud.run()
   * ```
   *
   * @public
   */
  public run: run.facade

  /**
   * Generate a runtime chunk intended to be inlined on the page.
   *
   * Useful for code splitting and dynamic imports.
   *
   * @example
   * ```js
   * bud.runtime()
   * ```
   *
   * @public
   */
  public runtime: runtime

  /**
   * Configure development server.
   *
   * @example
   * ```js
   * app.serve({
   *   host: 'my-local-site.example',
   *   port: 5000,
   * })
   * ```
   *
   * @public
   */
  public serve: serve.facade

  /**
   * Enable and/or configure a generated HTML template
   *
   * @example
   *
   * ```ts
   * app.template()
   * ```
   *
   * With configuration defaults:
   *
   * ```ts
   * app.template({
   *   enabled: true,
   *   template: 'public/index.html',
   *   replace: {
   *     APP_NAME: name,
   *     APP_DESCRIPTION: description,
   *     PUBLIC_URL: app.env.get('PUBLIC_URL'),
   *   },
   * })
   * ```
   *
   * @public
   */
  public template: templateFacade

  /**
 * Register an extension or set of extensions
 *
 * @remarks
 * This function is used to register an extension or set of extensions.
 *
 *  - If the extension is a webpack plugin, it will be registered as a webpack plugin
 *
 *  - If the extension is an array of extensions, they will be registered as webpack plugins
 *
 * @example
 * Add packaged bud extensions
 *
 * ```ts
 * bud.use([
 *   require('@roots/bud-babel'),
 *   require('@roots/bud-react'),
 * ])
 * ```
 *
 * @example
 * Add a bud extension inline

 * ```ts
 * bud.use({
 *  name: 'my-webpack-plugin',
 *  make: () => new MyWebpackPlugin(),
 * })
 * ```
 *
 * @example
 * Add a webpack plugin inline
 *
 * ```ts
 * bud.use(new MyWebpackPlugin())
 * ```
 *
 * @public
 */
  public use: use.facade

  /**
   * Set files that, when modified, will force the browser to reload.
   *
   * @remarks
   * Modifying these files will cause a full page reload, even in hot mode.
   *
   * @example
   * ```js
   * app.watch(['templates/*.html'])
   * ```
   *
   * @example
   * Set chokidar options as well:
   *
   * ```js
   * app.watch(['templates/*.html'], {
   *   // chokidar options
   * })
   * ```
   *
   * @public
   */
  public watch: watch
}
