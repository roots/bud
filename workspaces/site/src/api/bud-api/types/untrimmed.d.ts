/**
 * Repository of high-level facades which simplify common configuration tasks
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

/// <reference types="node" />

import { Configuration } from 'webpack';
import type { DefinePlugin } from 'webpack';
import type { Extension } from '@roots/bud-framework';
import * as Framework from '@roots/bud-framework';
import { Framework as Framework_2 } from '@roots/bud-framework';
import type { GlobTask } from 'globby';
import type { Options as Options_2 } from 'html-webpack-plugin';
import type { Server } from '@roots/bud-framework';
import { URL as URL_2 } from 'url';
import Webpack from 'webpack';

declare type Alias = Configuration['resolve']['alias'] & {
    [index: string]: string | false | string[];
};

declare namespace alias {
    export {
        facade,
        alias_2 as method
    }
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
 * @param alias - module redirections
 * @returns configuration instance
 *
 * @public
 */
declare const alias_2: method;

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework
 * and provides a means to call the methods
 * directly for immediate execution.
 *
 * @public
 */
export declare class Api extends Framework.Service implements Framework.Api {
    /**
     * Queued method calls
     *
     * @internal
     */
    queue: Array<[string, ...any[]]>;
    /**
     * Trace of all method calls
     *
     * @internal
     */
    trace: Array<[string, ...any[]]>;
    /**
     * Service bootstrap event
     *
     * @internal
     */
    bootstrap(): Promise<void>;
    /**
     * Service registered event
     *
     * @internal
     */
    registered(): Promise<void>;
    /**
     * @internal
     */
    bindFacade(name: string): void;
    /**
     * Call an api method directly
     *
     * @public
     */
    call(name: string, ...args: any[]): Promise<any>;
    /**
     * Execute all queued method calls
     *
     * @public
     */
    processQueue(): Promise<void>;
    /**
     * Dump the method call trace
     *
     * @public
     */
    dump(): void;
}

declare namespace assets {
    export {
        assets_2 as method,
        facade_2 as facade
    }
}

declare const assets_2: method_2;

declare function config(overrides: (config: Partial<Webpack.Configuration>) => Partial<Webpack.Configuration>): Framework_2;

declare interface config {
    (overrides: Partial<Webpack.Configuration>): Framework_2;
}

declare function define(this: Framework_2, values: DefinePlugin['definitions']): Framework_2;

declare interface define {
    (this: Framework_2, values: DefinePlugin['definitions']): Framework_2;
}

declare interface devtool {
    (devtool?: Configuration['devtool']): Promise<Framework_2>;
}

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

declare interface experiments {
    (key: keyof Configuration['experiments'], setting: boolean): Framework_2;
}

declare const experiments: experiments;

declare interface externals {
    (externals: Configuration['externals']): Framework_2;
}

declare const externals: externals;

/**
 * Public interface for the Bud API
 *
 * @remarks
 * Virtual class representing a synchronous interface for use in consumer configs.
 * these type signatures are synchronous regardless of if the underlying method is.
 *
 * @public
 */
export declare class Facade {
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
     * @public
     */
    alias: alias.facade;
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
     * @public
     */
    assets: assets.facade;
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
     * @public
     */
    copy: assets.facade;
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
    config: config;
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
    webpackConfig: config;
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
    override: config;
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
    define: define;
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
    autoload: define;
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
    devtool: devtool;
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
     * @public
     */
    splitChunks: splitChunks;
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
     * @public
     */
    extract: splitChunks;
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
    entry: facade_3;
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
    js: facade_3;
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
    css: facade_3;
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
    experiments: experiments;
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
    externals: externals;
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
    hash: hash;
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
    version: hash;
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
    minimize: minimize;
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
    persist: persist;
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
    provide: provide;
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
    proxy: proxy;
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
     * @public
     */
    publicPath: publicPath;
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
    run: run;
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
    runtime: runtime;
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
    serve: serve;
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
     * @public
     */
    setPublicPath: setPublicPath;
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
    template: facade_4;
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
    use: use;
    /**
     * Configure the list of files that, when modified,
     * will force the browser to reload (even in hot mode).
     *
     * @example
     * ```js
     * app.watch(['templates/*.html'])
     * ```
     *
     * @public
     */
    watch: watch;
}

declare interface facade {
    (alias: Configuration['resolve']['alias']): Framework_2;
}

declare interface facade_2 {
    (from: string[]): Framework_2;
}

declare interface facade_3 {
    (name: string, entrypoint: EntryValue): Framework_2;
}

declare interface facade_3 {
    (entrypoints: EntryInput): Framework_2;
}

declare interface facade_4 {
    (userOptions?: Options | boolean): Framework_2;
}

declare interface hash {
    (this: Framework_2, enabled?: boolean): Framework_2;
}

declare const hash: hash;

declare interface method {
    (alias: Alias): Framework_2;
}

declare interface method_2 {
    (from: string[]): Promise<Framework_2>;
}

/**
 * Minimize function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should assets be minimized
 *
 * @public
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
 * @public
 */
declare const minimize: minimize;

/**
 * Template function options
 *
 * @public
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
    (cacheStrategy?: 'memory' | 'filesystem' | false): Framework_2;
}

declare const persist: persist;

declare interface provide {
    (packages?: Record<string, Array<string>>): Framework_2;
}

declare const provide: provide;

declare interface proxy {
    (config?: Server.Configuration['proxy']['url']): Framework_2;
}

declare interface proxy {
    (config?: boolean): Framework_2;
}

declare interface proxy {
    (config?: number): Framework_2;
}

declare interface proxy {
    (url?: URL_2): Framework_2;
}

declare interface proxy {
    (config?: Partial<Server.Configuration['proxy']>): Framework_2;
}

declare const proxy: proxy;

declare interface publicPath {
    (): Configuration['output']['publicPath'];
}

declare const publicPath: publicPath;

declare interface run {
    (): Promise<void>;
}

declare const run: run;

declare interface runtime {
    (this: Framework_2, runtime?: Configuration['optimization']['runtimeChunk']): Framework_2;
}

declare const runtime: runtime;

declare interface serve {
    (port: number): Framework_2;
}

declare interface serve {
    (url: URL_2): Framework_2;
}

declare interface serve {
    (url: string): Framework_2;
}

declare interface serve {
    (config: Partial<Server.Configuration['dev']>): Framework_2;
}

declare const serve: serve;

declare interface setPublicPath {
    (publicPath: string | ((publicPath: string) => string)): Framework_2;
}

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
 * @public
 */
declare const splitChunks: splitChunks;

declare interface use {
    (source: Source): Promise<Framework_2>;
}

declare const use: use;

declare interface watch {
    (files: Server.Configuration['watch']['files']): Framework_2;
}

declare const watch: watch;

export { }
