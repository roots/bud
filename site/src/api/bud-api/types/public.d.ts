/**
 * Repository of high-level facades
 * which simplify common configuration tasks
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import { Configuration } from 'webpack';
import { Configuration as Configuration_2 } from '@roots/bud-framework';
import type { DefinePlugin } from 'webpack';
import type { Extension } from '@roots/bud-framework';
import * as Framework from '@roots/bud-framework';
import { Framework as Framework_2 } from '@roots/bud-framework';
import type { GlobTask } from 'globby';
import type { Options as Options_2 } from 'html-webpack-plugin';
import type { Server } from '@roots/bud-framework';
import Webpack from 'webpack';

declare interface alias {
    (alias: Configuration['resolve']['alias']): Framework_2;
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
 * API service
 *
 * @remarks
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
export declare class Api extends Framework.Service<Repository> implements Framework.Api {
    /**
     * Calls queue
     * @public
     */
    queue: Array<[string, ...any[]]>;
    /**
     * Record of all completed calls
     * @public
     */
    trace: Array<[string, ...any[]]>;
    /* Excluded from this release type: repository */
    /**
     * Service bootstrap event
     *
     * @public
     */
    bootstrap(): Promise<void>;
    /**
     * @public
     */
    registered(): Promise<void>;
    /**
     * @public
     */
    bindToApi(name: any, method: any): void;
    /**
     * @public
     */
    bindToBud(name: string, method: CallableFunction): void;
    /**
     * @public
     */
    bindProxy(name: string): void;
    /**
     * @public
     */
    call(name: string, ...args: any[]): Promise<any>;
    /**
     * @public
     */
    callAll(): Promise<void>;
    /**
     * debug logger
     *
     * @public
     */
    dump(options: any): void;
}

/**
 * Modify the {@link Framework} baseline config.
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
declare function config(overrides: Partial<Webpack.Configuration>): Framework_2;

/**
 * @privateRemarks Should this function be nixxed entirely?
 */
declare interface config {
    (overrides: Partial<Webpack.Configuration>): Framework_2;
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
 * @hook extension/webpack-define-plugin/options
 *
 * @public @config
 */
declare function define(this: Framework_2, values: DefinePlugin['definitions']): Framework_2;

declare interface define {
    (this: Framework_2, values: DefinePlugin['definitions']): Framework_2;
}

declare interface devtool {
    (devtool?: Configuration['devtool']): Promise<Framework_2>;
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
 * @hook build.experiments
 *
 * @public @config
 */
declare interface experiments {
    (key: keyof Configuration['experiments'], setting: boolean): Framework_2;
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
 * @hook build.externals
 *
 * @public @config
 */
declare interface externals {
    (externals: Configuration['externals']): Framework_2;
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

declare interface facade {
    (this: Framework_2, from: string[]): Framework_2;
}

/**
 * sync facade interfaces
 *
 * @remarks
 * prevent intellisense from complaining about bud being a promise
 *
 * @todo
 * probably this could be mapped with a generic type
 */
declare interface facade_2 {
    (name: string, entrypoint: EntryValue): Framework_2;
}

declare interface facade_2 {
    (entrypoints: EntryInput): Framework_2;
}

declare interface facade_3 {
    (userOptions?: Options | boolean): Framework_2;
}

declare interface hash {
    (this: Framework_2, enabled?: boolean): Framework_2;
}

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
declare const hash: hash;

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @hook build.optimization.minimize
 *
 * @public @config
 */
declare interface minimize {
    (enabled?: boolean, options?: {
        css: any;
    }): Framework_2;
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

declare interface persist {
    (type?: 'memory' | 'filesystem' | false): Framework_2;
}

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
 * @public @config
 */
declare const persist: persist;

/**
 * Wrapper function for {@link webpack#ProvidePlugin}.
 *
 * @public @config
 */
declare interface provide {
    (packages?: Record<string, Array<string>>): Framework_2;
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

declare interface proxy {
    (options?: Configuration_2['server']['proxy']): Framework_2;
}

declare interface proxy {
    (options?: boolean): Framework_2;
}

declare interface proxy {
    (options?: Configuration_2['server']['proxy']['target']): Framework_2;
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

declare interface publicPath {
    (): string;
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

export declare interface Repository {
    alias: alias;
    assets: facade;
    copy: facade;
    config: config;
    webpackConfig: config;
    override: config;
    devtool: devtool;
    splitChunks: splitChunks;
    extract: splitChunks;
    entry: facade_2;
    js: facade_2;
    css: facade_2;
    experiments: experiments;
    externals: externals;
    hash: hash;
    version: hash;
    define: define;
    autoload: define;
    minimize: minimize;
    persist: persist;
    provide: provide;
    proxy: proxy;
    publicPath: publicPath;
    run: run;
    runtime: runtime;
    serve: serve;
    setPublicPath: setPublicPath;
    template: facade_3;
    use: use;
    watch: watch;
}

declare interface run {
    (this: Framework_2): Promise<void>;
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
     * @hook build.optimization.runtime
     *
     * @public @config
     */
 declare interface runtime {
     (this: Framework_2, runtime?: Configuration['optimization']['runtimeChunk']): Framework_2;
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

 declare interface serve {
     (config?: Partial<Server.Configuration>): Framework_2;
 }

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
  * @public @config
  */
 declare const serve: serve;

 declare interface setPublicPath {
     (publicPath: string | ((publicPath: string) => string)): Framework_2;
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
  * Extension source interface
  *
  * @remarks
  * This interface is used to define a webpack plugin
  * or bud extension registrable with the `use` method.
  *
  * @public
  */
 declare type Source = Extension.Module | Extension.CompilerPlugin | Extension.Module;

 declare interface splitChunks {
     (options?: Configuration['optimization']['splitChunks']): Framework_2;
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

 declare interface use {
     (source: Source): Promise<Framework_2>;
 }

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
     (files: Server.Configuration['watch']['files']): Framework_2;
 }

 declare const watch: watch;

 export { }
