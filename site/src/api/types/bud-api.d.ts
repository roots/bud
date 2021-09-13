/**
 * The {@link @roots/bud-api# | @roots/bud-api package} is a repository of high-level functions
 * intended to make common configuration goals easier to accomplish.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @core @packageDocumentation
 */

import type { Configuration } from 'webpack';
import type { Configuration as Configuration_2 } from '@roots/bud-framework';
import type { DefinePlugin } from 'webpack';
import { Framework } from '@roots/bud-framework';
import type { GlobTask } from 'globby';
import type { Module } from '@roots/bud-framework';
import type { Options as Options_2 } from 'html-webpack-plugin';
import { Server } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import type { WebpackPlugin } from '@roots/bud-framework';

/**
 * Alias interface
 *
 * @param this - {@link @roots/bud-framework#Framework | Framework instance}
 * @param alias - {@link webpack#Configuration.resolve.alias | Webpack resolve alias option}
 *
 * @hook build/resolve/alias
 *
 * @public @config
 */
declare interface alias {
    (this: Framework, alias: Configuration['resolve']['alias']): Framework;
}

/**
 * Register shorthand for resolving modules using webpack aliases.
 *
 * @remarks
 * Useful for situations that may otherwise require brittle relative paths.
 *
 * @example
 * ```js
 * app.alias({
 *   '@scripts': app.path('src', 'scripts'),
 * })
 * ```
 *
 * @public @config
 */
declare const alias: alias;

/**
 * The API class binds all the functions from the {@link @roots/bud-api#Repository} to the {@link @roots/bud-framework#Framework} instance
 * during the {@link @roots/bud-framework#Service.bootstrap} lifecycle event.
 *
 * @public @core
 */
export declare class Api extends Service<Repository> {
    /**
     * {@inheritDoc @roots/bud-framework#Service.name}
     *
     * @public
     */
    name: string;
    /**
     * Collection of high-level functions used to configure the project
     *
     * @public
     */
    repository: Repository;
    /**
     * {@inheritDoc}
     *
     * @public
     */
    bootstrap(): void;
}

/**
 * Copy static assets during compilation.
 *
 * @remarks
 * You may specify paths with a string literal or glob pattern.
 *
 * @example
 * Copy **src/images** to **dist/images**
 *
 * ```js
 * app.assets(['src/images'])
 * ```
 *
 * @public @config
 */
declare function assets(this: Framework, paths: string[]): Framework;

/**
 * @public @config
 */
declare interface assets {
    (this: Framework, from: string[]): Framework;
}

/**
 * Modify the {@link Framework} baseline config.
 *
 * @remarks
 * Values defined in this function are more likely to be overwritten by {@link Framework} hooks, etc.
 * If there is a more direct way to make your change it is better to not use this function.
 *
 * Still, this function provides utility for certain use cases.
 *
 * @example
 * ```ts
 * app.config(config: Framework.Config)
 * ```
 *
 * @public
 */
declare function config(overrides: Partial<Configuration_2>): Framework;

/**
 * Config function interface
 *
 * @privateRemarks Should this function be nixxed entirely?
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param overrides - {@link @roots/bud-framework#Configuration}
 *
 * @public @config
 */
declare interface config {
    (this: Framework, overrides: Partial<Configuration_2>): Framework;
}

/**
 * Function accepting {@link webpack#DefinePlugin} definitions and
 * returning the {@link @roots/bud-framework#Framework}
 *
 * @param values - {@link webpack#DefinePlugin} definitions
 * @returns {@link @roots/bud-framework#Framework}
     *
     * @public @config
     */
 declare interface define {
     (this: Framework, values: DefinePlugin['definitions']): Framework;
 }

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
  * @public @config
  */
 declare const define: (values: DefinePlugin['definitions']) => Framework;

 /**
  * {@link dev | dev} config function interface
  *
  * @param this - {@link @roots/bud-framework#Framework | Framework instance}
  * @param config - {@link @roots/bud-framework#Server.Configuration | Server configuration}
  *
  * @public @config
  */
 declare interface dev {
     (this: Framework, config?: Server.Configuration): Framework;
 }

 /**
  * Configure development server.
  *
  * @example
  * ```js
  * app.dev({
  *   host: 'my-local-site.example',
  *   port: 5000,
  * })
  * ```
  *
  * @public @config
  */
 declare const dev: dev;

 /**
  * {@link devtool | devtool function} interface
  *
  * @hook build/devtool
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param devtool - {@link webpack#Configuration.devtool}
  *
  * @public @config
  */
 declare interface devtool {
     (this: Framework, devtool?: Configuration['devtool']): Framework;
 }

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
  * @public @config
  */
 declare const devtool: devtool;

 /**
  * {@link entry} interface supporting the definition of a single entrypoint
  *
  * @param name - Entrypoint name
  * @param entrypoint - Entrypoint value
  *
  * @hook build/entry
  *
  * @public @config
  */
 declare interface entry {
     (this: Framework, name: string, entrypoint: EntryValue): Framework;
 }

 /**
  * {@link entry} interface supporting the definition of multiple
  * entrypoints using a key-value mapping
  *
  * @param this - {@link @roots/bud-framework#Framework | Framework instandce}
  * @param entrypoints - {@link EntryInput | Entrypoint mapping}
  *
  * @hook build/entry
  *
  * @public @config
  */
 declare interface entry {
     (this: Framework, entrypoints: EntryInput): Framework;
 }

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
  * @public @config
  */
 declare const entry: entry;

 /**
  * Entry assets expressed as a key-value mapping
  */
 declare interface EntryInput {
     [k: string]: EntryObject | EntryObject['import'] | GlobTask['pattern'];
 }

 /**
  * A singular entrypoint asset value
  */
 declare interface EntryObject {
     /**
      * Lower-level representation of entrypoint
      */
     import?: string[];
     /**
      * Array of modules the entrypoint explicitly depends on
      */
     dependsOn?: string[];
 }

 /**
  * An entry asset or an array of entry assets expressed with fast-glob syntax.
  */
 declare type EntryValue = GlobTask['pattern'] | Array<GlobTask['pattern']>;

 /**
  * @hook build/experiments
  *
  * @public @config
  */
 declare interface experiments {
     (this: Framework, settings: Configuration['experiments']): Framework;
 }

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
  * @public @config
  */
 declare const experiments: experiments;

 /**
  * Externals function interface
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param externals - {@link webpack#Configuration.externals}
  *
  * @hook build/externals
  *
  * @public @config
  */
 declare interface externals {
     (this: Framework, externals: Configuration['externals']): Framework;
 }

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
  * @public @config
  */
 declare const externals: externals;

 /**
  * Hash function interface
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param enabled - should filenames be hashed
  *
  * @public @config
  */
 declare interface hash {
     (this: Framework, enabled?: boolean): Framework;
 }

 /**
  * Enable filename hashing of built assets.
  *
  * @example
  * ```js
  * bud.hash()
  * ```
  *
  * @public @config
  */
 declare const hash: hash;

 /**
  * Package/definition mappings
  *
  * @public @config
  */
 declare interface mappedPackages {
     [key: string]: string | string[];
 }

 /**
  * Minimize function interface
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param enabled - Should assets be minimized
  *
  * @hook build/optimization/minimize
  *
  * @public @config
  */
 declare interface minimize {
     (enabled?: boolean): Framework;
 }

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
  * @public @config
  */
 declare const minimize: minimize;

 /**
  * Template function options
  *
  * @public @config
  */
 declare interface Options extends Options_2 {
     /**
      * Explicitly enable or disable html templating.
      */
     enabled?: boolean;
     /**
      * Path to an HTML template to use. If none is supplied
      * one is provided as a default.
      */
     template?: string;
     /**
      * Template variable names are used as keys.
      * Each key is associated with a replacement value.
      */
     replace?: {
         [key: string]: string;
     };
 }

 /**
  * Persist function interface
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param enabled - Should cache be persisted on disk
  *
  * @defaultValue enabled = true
  *
  * @hook build/cache
  * @hook build/cache/cacheDirectory
  * @hook build/cache/managedPaths
  * @hook build/cache/buildDependencies
  * @hook build/cache/version
  * @hook build/cache/type
  *
  * @public @config
  */
 declare interface persist {
     (this: Framework, enabled?: boolean): Framework;
 }

 /**
  * Cache webpack builds to the filesystem.
  *
  * @example
  * ```js
  * app.persist({
  *   type: 'memory',
  * })
  * ```
  *
  * @public @config
  */
 declare const persist: persist;

 /**
  * Wrapper function for {@link webpack#ProvidePlugin}.
  *
  * @public @config
  */
 declare interface provide {
     (this: Framework, packages?: mappedPackages): Framework;
 }

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
  * @public @config
  */
 declare const provide: provide;

 /**
  * Configures proxy settings
  *
  * @public @config
  */
 declare interface proxy {
     (this: Framework, config?: {
         /**
          * Explicity enable or disable proxy service
          */
         enabled?: boolean;
         /**
          * Hostname of the proxy target
          */
         host?: Server.Configuration['proxy']['host'];
         /**
          * Port of the proxy target
          */
         port?: Server.Configuration['proxy']['port'];
     }): Framework;
 }

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
  * @public @config
  */
 declare const proxy: proxy;

 /**
  * @public @config
  */
 declare interface publicPath {
     (this: Framework): string;
 }

 /**
  * By default it is assumed that assets are served from webroot (`/`).
  * You can use this method to replace this value for apps  served from
  * a subdirectory.
  *
  * @example
  * Set the default path for a Sage project:
  *
  * ```js
  * bud.publicPath('/app/themes/sage/dist')
  * ```
  *
  * @public @config
  */
 declare const publicPath: publicPath;

 /**
  * API Repository interface
  *
  * @public
  */
 export declare interface Repository {
     alias: alias;
     assets: assets;
     config: config;
     define: define;
     dev: dev;
     devtool: devtool;
     entry: entry;
     experiments: experiments;
     externals: externals;
     hash: hash;
     minimize: minimize;
     persist: persist;
     provide: provide;
     proxy: proxy;
     publicPath: publicPath;
     run: run;
     runtime: runtime;
     setPublicPath: setPublicPath;
     splitChunks: splitChunks;
     template: template;
     use: use;
     watch: watch;
 }

 /**
  * @public @config
  */
 declare interface run {
     (this: Framework): void;
 }

 /**
  * Run the build
  *
  * @example
  * ```js
  * bud.run()
  * ```
  *
  * @public @config
  */
 declare const run: run;

 /**
  * Runtime function interface
  *
  * @param this - {@link @roots/bud-framework#Framework}
  * @param runtime - {@link webpack#Configuration.optimization.runtimeChunk}
  *
  * @returns {@link @roots/bud-framework#Framework}
      *
      * @hook build/optimization/runtime
      *
      * @public @config
      */
  declare interface runtime {
      (this: Framework, runtime?: Configuration['optimization']['runtimeChunk']): Framework;
  }

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
   * @public @config
   */
  declare const runtime: runtime;

  /**
   * @public @config
   */
  declare interface setPublicPath {
      (publicPath: string | ((publicPath: string) => string)): Framework;
  }

  /**
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps served from
   * a subdirectory.
   *
   * @example
   * Set the default path using a string
   *
   * ```js
   * app.setPublicPath('/app/themes/sage/dist')
   * ```
   *
   * @example
   * Set the publicPath using a function.
   *
   * ```js
   * app.setPublicPath(publicPath => {
   *   return `web/assets/${publicPath}`
   * })
   * ```
   *
   * @public @config
   */
  declare const setPublicPath: setPublicPath;

  /**
   * Wrapper configuring {@link webpack#Configuration.optimization.splitChunks} settings
   *
   * @param this - {@link @roots/bud-framework#Framework | Framework instance}
   * @param options - {@link webpack#Configuration.optimization.splitChunks | webpack splitchunks options}
   *
   * @hook build/optimization/splitChunks
   *
   * @public @config
   */
  declare interface splitChunks {
      (this: Framework, options?: Configuration['optimization']['splitChunks']): Framework;
  }

  /**
   * Bundle vendor modules separately from application code.
   *
   * @example
   * ```js
   * bud.splitChunks({
   *  chunks: 'all',
   * })
   * ```
   *
   * @public @config
   */
  declare const splitChunks: splitChunks;

  /**
   * Template function interface
   *
   * @param this - {@link Framework}
   * @param userOptions - {@link Options}
   *
   * @public @config
   */
  declare interface template {
      (this: Framework, userOptions?: Options): Framework;
  }

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
   * @public @config
   */
  declare const template: template;

  /**
   * @public @config
   */
  declare interface use {
      (source: Module | WebpackPlugin | Module[] | WebpackPlugin[]): Framework;
  }

  /**
   * Register an extension or set of extensions
   *
   * @example
   * Add packaged bud extensions:
   *
   * ```js
   * bud.use([
   *   require('@roots/bud-babel'),
   *   require('@roots/bud-react'),
   * ])
   * ```
   *
   * @example
   * Add an extension inline (also works with an array of extensions):
   *
   * ```js
   * bud.use({
   *  name: 'my-webpack-plugin',
   *  make: () => new MyWebpackPlugin(),
   * })
   * ```
   *
   * @example
   * Add a webpack plugin inline (also work with an array of plugins):
   *
   * ```js
   * bud.use(new MyWebpackPlugin())
   * ```
   *
   * @public @config
   */
  declare const use: use;

  /**
   * Configure the list of files that, when modified,
   * will force the browser to reload (even in hot mode).
   *
   * @example
   * ```js
   * app.watch(['templates/*.html'])
   * ```
   */
  declare interface watch {
      (files: Server.Configuration['watch']['files'], options?: Server.Configuration['watch']['options']): Framework;
  }

  declare const watch: watch;

  export { }
