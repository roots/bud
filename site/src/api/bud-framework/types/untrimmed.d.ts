/**
 * ⚡️ Bud/Framework - Extensible build tooling for modern web development
 *
 * @remarks
 * The {@link @roots/bud-framework# | @roots/bud-framework} package defines the
 * abstract {@link Framework} class and provides interfaces for the Framework's
 * essential {@link Service} classes.
 *
 * The overarching design goal of this architecture is to make it as simple as
 * possible to swap out the underlying {@link Service} implementations without
 * having to modify the core framework code.
 *
 * To that effect, interoperability with other build tools is possible through
 * extending the {@link Framework} class and adding or modifying {@link Service}
 * classes.
 *
 * The original implementation uses Webpack as the underlying
 * build tool, but this is not a requirement for future implementations and
 * we've done our best to maintain a separation of core code from
 * the build tool we are currently leveraging.
 *
 * We sincerely hope that these efforts will help you build a better web.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

/// <reference types="node" />

import type { Class } from 'type-fest';
import { Compiler as Compiler_2 } from 'webpack';
import { Configuration as Configuration_2 } from 'webpack';
import { Container } from '@roots/container';
import { DefaultMethods } from 'signale';
import type { HighlightOptions } from '@roots/bud-support';
import type Ink from 'ink';
import { MultiCompiler } from 'webpack';
import { Options as Options_2 } from 'http-proxy-middleware';
import type { PrettyFormatOptions } from '@roots/bud-support';
import { PrettyFormatOptions as PrettyFormatOptions_2 } from 'pretty-format/build/types';
import { ProgressPlugin } from 'webpack';
import { Repository as Repository_2 } from '@roots/container';
import { RuleSetRule } from 'webpack';
import { Server as Server_2 } from 'http';
import { Signale } from '@roots/bud-support';
import { Signale as Signale_2 } from 'signale';
import { SignaleConfig } from 'signale';
import { SignaleOptions } from 'signale';
import { StatsCompilation } from 'webpack';
import { StatsError } from 'webpack';
import Webpack from 'webpack';
import * as Webpack_2 from 'webpack';

/**
 * Peer service abstract class
 *
 * @public @core @container
 */
declare abstract class Abstract extends Service<Peers.Repository> {
    abstract repository: Repository_2;
    /**
     * Peer module related utilities
     *
     * @public
     */
    abstract peers: Peers.Interface;
    /**
     * Returns a boolean representing if
     * the project has a given pkg listed as a dependency
     * or devDependency
     *
     * @public
     */
    abstract hasPeerDependency(pkg: string): boolean;
}

/**
 * API service container
 *
 * @public @core @container
 */
export declare interface Api extends Service {
    trace: Array<[string, ...any[]]>;
    queue: Array<[string, ...any[]]>;
    call: (name: string, ...args: any[]) => Promise<void>;
    callAll: () => Promise<void>;
}

/**
 * Application interface
 *
 * @defaultValue express
 *
 * @public
 */
declare interface Application extends Loose {
    listen(on: string | number, cb: CallableFunction): Instance;
}

/**
 * Framework async factory
 *
 * @public
 */
export declare interface AsyncFactory<P extends any[], T> {
    (...args: P): Promise<T>;
}

/**
 * At least one parameter is required
 *
 * @public
 */
export declare type AtLeastOne<Type = unknown> = Type | Type[];

/**
 * Provides {@link @roots/container# | Container}
 * functionality and access to {@link Framework}
 .
 *
 * @public @core @container
 */
export declare abstract class Bootstrapper<T = any> extends Container<T> {
    /**
     * @internal
     */
    private _app;
    /**
     * Service identifier
     *
     * @public
     */
    abstract ident?: string;
    /**
     * Access {@link Framework}

     *
     * @public @readonly
     */
    get app(): Framework;
    /**
     * Class constructor
     *
     * @param app - {@link Framework}

     *
     * @public
     */
    constructor(app: Framework);
}

declare namespace Build {
    export {
        Build_2 as Interface,
        Build_3 as Abstract
    }
}
export { Build }

/**
 * Build container service interface
 *
 * @remarks
 * Generates a compiler config from {@link (Framework:namespace).Rules}
 *
 * The most current config is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link (Framework:class).hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the webpack entry with `bud.hooks.filter('build.entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link (Framework:namespace).Loaders} interface
 *
 * - {@link Build.items} should be declared by augmenting the {@link (Framework:namespace).Items} interface
 *
 * - {@link Build.rules} should be declared by augmenting the {@link (Framework:namespace).Rules} interface
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Rebuild the configuration
 *
 * ```js
 * build.rebuild()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public @core @container
 */
declare interface Build_2 extends Service {
    /**
     * {@link Loader.Interface} array
     *
     * @public
     */
    loaders: Loaders;
    /**
     * {@link Item.Interface} array
     *
     * @public
     */
    items: Items;
    /**
     * {@link Rule.Interface} array
     *
     * @public
     */
    rules: Rules;
    /**
     * Accesses the compiler configuration
     *
     * @public
     */
    config: Webpack_2.Configuration;
    /**
     * Make the configuration object
     *
     * @public
     */
    make(): Promise<Webpack_2.Configuration>;
}

/**
 * Build container service interface
 *
 * @remarks
 * The most current config is accessible through {@link @roots/bud-framework#Build | Build.config}.
 * If it has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link @roots/bud-framework#Build| Build.rebuild}
 * can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link @roots/bud-framework#(Hooks:interface) | Hooks}.
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Rebuild the configuration
 *
 * ```js
 * build.rebuild()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public @core @container
 */
declare abstract class Build_3 extends Service {
    /**
     * {@link Loader.Interface} array
     *
     * @public
     */
    loaders: Loader.Interface[];
    /**
     * {@link Item.Interface} array
     *
     * @public
     */
    items: Item.Interface[];
    /**
     * {@link Rule.Interface} array
     *
     * @public
     */
    rules: Rule.Interface[];
    /**
     * Make the configuration object
     *
     * @public
     */
    abstract make: () => Webpack_2.Configuration;
}

declare namespace Cache_2 {
    export {
        CacheInterface as Interface,
        CacheAbstract as Abstract
    }
}
export { Cache_2 as Cache }

/**
 * Cache service Interface
 *
 * @public
 */
declare abstract class CacheAbstract extends Service implements CacheInterface {
    /**
     * Is cache valid?
     */
    abstract version: string;
    /**
     * Cache directory
     *
     * @public
     */
    abstract directory: string;
    /**
     * Hash of config files and build dependencies
     *
     * @public
     */
    abstract hashFileContents(filePaths: Array<string>): Promise<string>;
}

/**
 * Cache service Interface
 *
 * @public
 */
declare interface CacheInterface extends Service {
    /**
     * Is cache valid?
     *
     * @public
     */
    version: string;
    /**
     * Cache directory
     *
     * @public
     */
    directory: string;
    /**
     * Hash of config files and build dependencies
     *
     * @public
     */
    hashFileContents(str: Array<string>): Promise<string>;
}

declare interface Callback<T = Framework> {
    (input: T): T;
}

declare interface Callback_2 {
    <T>(value: T): any;
}

/**
 * Exit the program
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
declare function close_2(done?: (code?: number) => never): void;

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
declare interface close_2 {
    (done?: CallableFunction): void;
}

/**
 * Compiler service interface
 *
 * @remarks
 * Compiles {@link @roots/bud-framework#Build.config | Build config}
 * and reports on stats, progress, and errors encountered during compilation.
 *
 * @public @core @container
 */
export declare interface Compiler extends Service {
    /**
     * The compiler instance
     *
     * @public
     */
    instance: Compiler.Instance;
    /**
     * `true` if compiler has already been instantiated.
     *
     * @public
     */
    isCompiled: boolean;
    /**
     * Contains compilation stats, if available.
     *
     * @public
     */
    stats: StatsCompilation;
    /**
     * Contains compilation progress, if avialable
     *
     * @public
     */
    progress: Compiler.Progress;
    /**
     * Returns a {@link @roots/bud-framework#Compiler."instance" | Compiler instance}
     * when provided with a valid {@link Configuration}
     *
     * @example
     * ```js
     * bud.compiler.compile()
     * ```
     *
     * @example
     * ```js
     * bud.compiler.compile([{
     *   entry: {app: 'foo.js'}
     * }])
     * ```
     *
     * @public
     */
    compile(): Promise<any>;
    /**
     * Callback for {@link (Framework:namespace).Hooks | Framework.Hooks} `before` filter
     *
     * @remarks
     * Parses {@link (Framework:namespace).Build.config} instances and generates
     * final input for {@link (Compiler:interface).compile | Compiler.compile}
     *
     * @public
     */
    before(): any;
    /**
     * Compilation callback
     *
     * @remarks
     * Provides stats and error reporting
     *
     * @public
     */
    callback(err: StatsError, stats: StatsCompilation): void;
}

/**
 * Compiler namespace
 *
 * @internalRemarks
 * Todo: move out of this namespace
 *
 * @internal
 */
export declare namespace Compiler {
    export type Config = Configuration_2;
    export type Instance = Compiler_2 | MultiCompiler;
    export type Progress = any;
    export namespace Progress {
        export type Handler = ProgressPlugin['handler'];
    }
}

declare interface CompilerConfig extends Partial<Webpack.Configuration> {
    optimization?: any;
    infrastructureLogging?: any;
}

/**
 * Apply plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
declare interface CompilerPlugin<Plugin = any, Options = Record<string, any>> extends Module_2 {
    /**
     * Either a function returning a finalized {@link ApplyPlugin} or a literal {@link ApplyPlugin}.
     *
     * @remarks
     * If a factory is implemented, it will be passed a {@link Container} instance holding
     * the {@link Module.options} (if any) as well as the {@link Framework} instance.
     *
     * @public
     */
    make?: Maybe<[Container<Options>, Framework, Signale], Plugin>;
    /**
     * Compiler plugin `apply` method
     *
     * @remarks
     * This function makes the {@link @roots/bud-framework#Extension.Module} interoperable with
     * the Webpack plugin interface
     *
     * @public
     */
    apply?: CallableFunction;
}

/**
 * Framework base configuration
 *
 * @remarks
 * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
 * It is recommended to use {@link @roots/bud-framework#Hooks.on} to extend the
 *
 * @public
 */
export declare interface Configuration {
    /**
     * Application name
     *
     * @public
     */
    name: string;
    /**
     * Mode
     *
     * @public
     */
    mode: 'production' | 'development';
    /**
     * Logger settings
     *
     * @public
     */
    log?: {
        /**
         * Log level
         *
         * @remarks
         * This is a little weird. It is not a standard log level (working around
         * Signale stuff). It would be better if 'log' and 'debug' were swapped.
         *
         * Map of levels:
         * - 'error' (least verbose)
         * - 'warn'
         * - 'log' (default)
         * - 'debug' (most verbose)
         *
         * @public
         */
        level?: 'v' | 'vv' | 'vvv' | 'vvvv';
    };
    /**
     * Features to enable
     *
     * @public
     */
    features: {
        /**
         * Is caching enabled?
         *
         * @public
         */
        cache?: boolean;
        /**
         * Feature toggle: enable or disable the command line interface
         *
         * @defaultValue true
         *
         * @public
         */
        dashboard?: boolean;
        /**
         * Feature toggle: Clean dist before compilation
         *
         * When enabled stale assets will be removed from
         * the `location.dist` directory prior to the next
         * compilation.
         *
         * @defaultValue true
         *
         * @public
         */
        clean?: boolean;
        /**
         * Enable or disable filename hashing
         *
         * @defaultValue false
         *
         * @public
         */
        hash?: boolean;
        /**
         * Emit html template
         *
         * @defaultValue true
         *
         * @public
         */
        html?: boolean;
        /**
         * Automatically inject installed extensions
         *
         * @public
         */
        inject?: boolean;
        /**
         * Automatically install peer dependencies
         *
         * @defaultValue false
         *
         * @public
         */
        install?: boolean;
        /**
         * Log to console
         *
         * @defaultValue false
         *
         * @public
         */
        log?: boolean;
        /**
         * Enable or disable producing a manifest.json file
         *
         * @defaultValue true
         *
         * @public
         */
        manifest?: boolean;
        /**
         * Enable or disable chunk splitting
         *
         * @defaultValue false
         *
         * @public
         */
        splitChunks?: boolean;
    };
    /**
     * Shared regular expressions for pattern matching.
     *
     * @example
     * ```js
     * app.patterns.get('js')
     * ```
     *
     * @public
     */
    patterns: Record<string, RegExp>;
    /**
     * Registered fs directories
     *
     * @public
     */
    location: Locations;
    /**
     * File format (when hashing is disabled)
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name]'
     *
     * @public
     */
    fileFormat: string;
    /**
     * File format when hashing is enabled
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name].[contenthash:6]'
     *
     * @public
     */
    hashFormat: string;
    /**
     * @public
     */
    cli?: {
        args: Record<string, any>;
        argv: Array<string>;
        flags: Record<string, any>;
        raw: Array<Record<string, string>>;
        metadata: Record<string, Record<string, any>>;
    };
    /**
     * Initial webpack configuration values
     *
     * @public
     */
    build: CompilerConfig;
    /**
     * Cache settings
     *
     * @public
     */
    cache: {
        type?: 'filesystem' | 'memory' | false;
    };
    /**
     * Initial options for registered extensions
     *
     * @public
     */
    extension: Index<any>;
    /**
     * Server configuration
     *
     * @public
     */
    server: Server.Configuration;
    /**
     * Command line theme configuration
     *
     * @public
     */
    theme: {
        /**
         * Scale of spacer unit
         *
         * @defaultValue 1
         *
         * @public
         */
        spacing: number;
        /**
         * Color palette
         *
         * @public
         */
        colors: {
            /**
             * Text color
             *
             * @public
             */
            foreground: TermColor;
            /**
             * Grayed out text color
             *
             * @public
             */
            faded: TermColor;
            /**
             * Primary color
             *
             * @public
             */
            primary: TermColor;
            /**
             * Variant of primary color (for gradients, etc.)
             *
             * @public
             */
            primaryAlt: TermColor;
            /**
             * Error color
             *
             * @public
             */
            error: TermColor;
            /**
             * Variant of error color (for gradients, etc.)
             *
             * @public
             */
            errorAlt: TermColor;
            /**
             * Warning color
             *
             * @public
             */
            warning: TermColor;
            /**
             * Success color
             *
             * @public
             */
            success: TermColor;
            /**
             * Accent color
             *
             * @public
             */
            accent: TermColor;
            /**
             * Flavor color
             *
             * @public
             */
            flavor: TermColor;
        };
        /**
         * Interface breakpoints
         *
         * @remarks
         * Expressed as [width, height]
         *
         * @public
         */
        screens: [
        [
        number,
        number
        ],
        [
        number,
        number
        ],
        [
        number,
        number
        ],
        [
        number,
        number
        ]
        ];
        /**
         * Number of columns (like a bootstrap/960 grid system for web)
         *
         * @public
         */
        columns: number;
        /**
         * Maximum width of raw rendered text
         *
         * @public
         */
        maxWidth: number;
        /**
         * Maximum height of raw rendered text
         *
         * @public
         */
        maxHeight: number;
    };
}

/**
 * Server configuration
 *
 * @public
 */
declare interface Configuration_3 {
    /**
     * Enable middleware
     *
     * @public
     */
    middleware: Index<boolean>;
    /**
     * The development server host
     *
     * @defaultValue localhost
     */
    host: string;
    /**
     * The development server port
     *
     * @defaultValue 3000
     *
     * @public
     */
    port: number;
    /**
     * Proxy destination
     *
     * @public
     */
    proxy: Options_2;
    /**
     * Files which should reload the browser when changed.
     *
     * @public
     */
    watch: {
        /**
         * Files which should reload the browser when changed.
         *
         * @public
         */
        files: string[];
    };
    /**
     * Client features
     *
     * @remarks
     *
     * - `log` - Logs dev server activity to the browser console
     *
     * - `indicator` - Displays a small indicator in the browser
     *
     * - `overlay` - Displays a fullscreen overlay in the browser on errors
     *
     * @public
     */
    browser: {
        log: boolean;
        indicator: boolean;
        overlay: boolean;
    };
    /**
     * The index path for web server, defaults to "index.html".
     *
     * @public
     */
    index?: string;
    /**
     * The publicPath to serve from.
     *
     * @public
     */
    publicPath?: string;
    /**
     * Filename to serve as index.
     *
     * @defaultValue 'index.html'
     *
     * @public
     */
    filename?: string;
    /**
     * Include HTTP headers on each request.
     *
     * @example
     * ```json
     * { "X-Custom-Header": "yes" }
     * ```
     *
     * @public
     */
    headers?: Index<string>;
    /**
     * Request methods accepted by the server.
     *
     * @example
     * ```json
     * ['GET', 'HEAD']
     * ```
     *
     * @public
     */
    methods?: string[];
    /**
     * Map Mimetypes to extensions
     *
     * @public
     */
    mimeTypes?: {
        [type: string]: string;
    };
    /**
     * Disable host check security features
     *
     * @public
     */
    disableHostCheck?: boolean;
}

/**
 * Framework Constructor
 */
export declare type Constructor = new (options: Options) => Framework;

/**
 * Constructor interface
 *
 * @public
 */
declare interface ConstructorOptions {
    /**
     * Loader
     *
     * @public
     */
    loader: Maybe<[Framework], Loader.Interface>;
    /**
     * Options
     *
     * @public
     */
    options?: Maybe<[Framework], Options_3>;
}

/**
 * container function interface
 *
 * @internal
 */
declare interface container<T = any> {
    <T>(repository?: T): Container<T>;
}

/**
 * Instantiates and returns a new {@link @roots/container#Container | Container}
 *
 * @public
 */
declare const container: <T = any>(repository?: T) => Container<T>;

/**
 * Dashboard service container
 *
 * @public @core @container
 */
export declare interface Dashboard extends Service {
    /**
     * CLI framework
     *
     * @public
     */
    instance: Ink.Instance;
    /**
     * Mount and render the {@link Dashboard}
     *
     * @returns void
     *
     * @public
     */
    run(): void;
    /**
     * Render stdout
     *
     * @param Component - Component or string to render
     * @param title - Title to render
     * @returns void
     *
     * @public
     */
    render(Component: any, title?: string): void;
}

/**
 * Dependencies service container
 *
 * @public @core @container
 */
export declare interface Dependencies extends Service {
    /**
     * Dependency manager
     *
     * @public
     */
    client: any;
    /**
     * Install dependencies
     *
     * @param dependencies - Array of dependencies to install
     *
     * @public
     */
    install(dependencies: {
        name: string;
        version: string;
    }[]): Promise<void>;
}

/**
 * Env container interface
 *
 * @public @core @container
 */
export declare interface Env extends Container {
    /**
     * Get public environment variables
     *
     * @public
     */
    getPublicEnv(): Index<any>;
}

declare namespace Extension {
    export {
        Name,
        CompilerPlugin,
        Module_2 as Module
    }
}
export { Extension }

/**
 * Extensions Service interface
 *
 * @core @public @container
 */
export declare interface Extensions extends Service {
    /**
     * Extensions to be processed before build
     *
     * @public
     */
    queue: Array<CompilerPlugin | Module_2>;
    /**
     * Add an extension
     *
     * @public
     */
    add(extension: CompilerPlugin | Module_2): Promise<void>;
    /**
     * @public
     */
    enqueue(extension: CompilerPlugin | Module_2): void;
    /**
     * Register event for all extensions
     *
     * @public
     */
    registerExtensions(): Promise<void>;
    /**
     * Boot event for all extensions
     *
     * @public
     */
    bootExtensions(): Promise<void>;
    /**
     * Get {@link ApplyPlugin} instances to be included in compilation
     *
     * @public
     */
    make(): {
        [key: string]: any;
        apply: CallableFunction;
    }[];
    /**
     * @public
     */
    processQueue(): Promise<void>;
}

/**
 * Framework factory
 *
 * @public
 */
export declare interface Factory<P extends any[], T> {
    (...args: P): T;
}

/**
 * Loader factory interface
 *
 * @public
 */
declare interface Factory_2 {
    (app: Framework): LoaderInterface;
}

/**
 * Base {@link Framework} class
 *
 * @core @public
 */
export declare abstract class Framework {
    /**
     * Concrete implementation of the {@link Framework}
     *
     * @public
     */
    abstract implementation: Constructor;
    /**
     * Framework name
     *
     * @remarks
     * The name of the parent compiler is used as a base when sourcing configuration files.
     * So, in an implementation that uses the name `app`, the Framework will be sourcing
     * `app.config.js`, `app.development.config.js`, etc.
     *
     * @public
     */
    get name(): string;
    set name(name: string);
    /**
     * Compilation mode
     *
     * @remarks
     * Either `production` or `development`. Unlike webpack, there is no 'none' mode.
     *
     * @defaultValue 'production'
     */
    get mode(): Mode;
    set mode(mode: Mode);
    /**
     * Parent {@link Framework} instance
     *
     * @remarks
     * Is `null` if the current instance is the parent instance.
     *
     * @defaultValue null
     */
    root: Framework | null;
    /**
     * True when current instance is the parent instance
     *
     * @readonly
     */
    get isRoot(): boolean;
    get isChild(): boolean;
    /**
     * {@link @roots/container#Container} of child {@link Framework} instances
     *
     * @remarks
     * Is `null` if the current instance is a child instance.
     *
     * @defaultValue null
     */
    children: Container<Record<string, Framework>>;
    /**
     * True when {@link Framework} has children
     *
     * @readonly
     */
    get hasChildren(): boolean;
    /**
     * Framework services
     *
     * @remarks
     * Can be set directly on the child instance or passed as a property in the {@link Options}.
     *
     * @public
     */
    services: Services;
    /**
     * Macros for assisting with common config tasks
     *
     * @public @container
     */
    api: Api;
    /**
     * Build service
     *
     * @public
     */
    build: Build.Interface;
    /**
     * Determines cache validity and generates cache keys.
     *
     * @public
     */
    cache: Cache_2.Interface;
    /**
     * Compiles {@link @roots/bud-framework#Build | Build} configuration and stats/errors/progress reporting.
     *
     * @public
     */
    compiler: Compiler;
    /**
     * Presents build progress, stats and errors from {@link Compiler} and {@link Server}
     * over the CLI.
     *
     * @public
     */
    dashboard: Dashboard;
    /**
     * Utilities for interfacing with user package manager software
     *
     * @public
     */
    dependencies: Dependencies;
    /**
     * Project information and peer dependency management utilities
     *
     * @public
     */
    project: Project.Interface;
    /**
     * .env container
     *
     * @public @container
     */
    env: Env;
    /**
     * Container service for {@link Framework} extensions.
     *
     * @remarks
     * Extensions can be defined as a {@link Module}, which is more generic.
     *
     * They can also be defined as a {@link WebpackPlugin} which is a {@link Module}
     * specifically yielding a {@link WebpackPluginInstance}.
     *
     * When adding a {@link Module} or {@link Plugin} to the container
     * with {@link Extensions.add} it is cast to the {@link Extension} type.
     *
     * @public
     */
    extensions: Extensions;
    /**
     * Service allowing for fitering {@link Framework} values through callbacks.
     *
     * @example Add a new entry to the `webpack.externals` configuration:
     * ```ts
     * hooks.on(
     *   'build/externals',
     *   externals => ({
     *     ...externals,
     *     $: 'jquery',
     *   })
     * )
     * ```
     *
     * @example Change the `webpack.output.filename` format:
     * ```ts
     * hooks.on(
     *   'build.output.filename',
     *   () => '[name].[hash:4]',
     * )
     * ```
     *
     * @public
     */
    hooks: Hooks;
    /**
     * Logging service
     *
     * @public
     */
    logger: Logger;
    /**
     * Development server and browser devtools
     *
     * @public
     */
    _server: Server.Interface;
    get server(): Server.Interface;
    set server(server: Server.Interface);
    /**
     * Container service for holding configuration values
     *
     * @public
     */
    store: Container;
    /**
     * True when {@link Framework.mode} is `production`
     *
     * @public
     */
    get isProduction(): boolean;
    /**
     * True when {@link Framework.mode} is `development`
     *
     * @public
     */
    get isDevelopment(): boolean;
    /**
     * True if ts-node has been invoked
     *
     * @public
     */
    usingTsNode: boolean;
    /**
     * Initially received options
     *
     * @public
     */
    options: Options;
    /**
     * Class constructor
     *
     * @param options - {@link Framework.Options | Framework constructor options}
     *
     * @public
     */
    constructor(options: Options);
    /**
     * @internal
     */
    lifecycle: lifecycle;
    /**
     * Access a value which may or may not be a function.
     *
     * @remarks
     * If a value is a function **access** will call that function and return the result.
     *
     * If the value is not a function **access** will return its value.
     *
     * @example
     * ```js
     * const isAFunction = (option) => `option value: ${option}`
     * const isAValue = 'option value: true'
     *
     * access(isAFunction, true) // => `option value: true`
     * access(isAValue) // => `option value: true`
     * ```
     *
     * @public
     */
    maybeCall: maybeCall;
    /**
     * Gracefully shutdown {@link Framework} and registered {@link @roots/bud-framework#Service | Service instances}
     *
     * @example
     * ```js
     * bud.close()
     * ```
     *
     * @public
     */
    close: close_2;
    /**
     * Create a new {@link Container} instance
     *
     * @example
     * ```js
     * const myContainer = bud.container({key: 'value'})
     *
     * myContainer.get('key') // returns 'value'
     * ```
     *
     * @public @container
     */
    container: container;
    /**
     * Returns a {@link Framework | Framework instance} from the {@link Framework.children} container
     *
     * @remarks
     * An optional {@link tap} function can be provided to configure the {@link Framework} instance.
     *
     * @example
     * ```js
     * const name = 'plugin'
     * const tapFn = plugin => plugin.entry('main', 'main.js')
     *
     * bud.get(name, tapFn)
     * ```
     *
     * @public
     */
    get: get;
    /**
     * Instantiate a child instance and add to {@link Framework.children} container
     *
     * @remarks
     * **make** takes two parameters:
     *
     * - The **name** of the new compiler
     * - An optional callback to use for configuring the compiler.
     *
     * @example
     * ```js
     * bud.make('scripts', child => child.entry('app', 'app.js'))
     * ```
     *
     * @public
     */
    make: make;
    /**
     * Returns a {@link Locations} value as an absolute path
     *
     * @public
     */
    path: path;
    /**
     * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
     *
     * @remarks
     * If no value is provided the value is assumed to be the {@link Framework} itself
     *
     * {@link sequence} is a non-mutational version of this method.
     *
     * @example
     * ```js
     * app.pipe(
     *   [
     *     value => value + 1,
     *     value => value + 1,
     *   ],
     *   1, // initial value
     * ) // resulting value is 3
     * ```
     *
     * @public
     */
    pipe: pipe;
    /**
     * Set a {@link @roots/bud-framework#Location | Location} value
     *
     * @remarks
     * The {@link Locations.project} should be an absolute path.
     * All other directories should be relative (src, dist, etc.)
     * @see {@link Locations}
     *
     * @example
     * ```js
     * bud.setPath('src', 'custom/src')
     * ```
     *
     * @param this - {@link Framework}
     * @param args - path parts
     * @returns {@link Framework}
         *
         * @public
         */
     setPath: setPath;
     /**
      * Run a value through an array of syncronous, non-mutational functions.
      *
      * @remarks
      * Unlike {@link pipe} the value returned from each function is ignored.
      *
      * @public
      */
     sequence: sequence;
     /**
      * Execute a callback
      *
      * @remarks
      * Callback is provided {@link Framework | the Framework instance} as a parameter.
      *
      * @example
      * ```js
      * bud.tap(bud => {
      *   // do something with bud
      * })
      * ```
      *
      * @example
      * Lexical scope is bound to Framework where applicable, so it
      * is possible to reference the Framework using `this`.
      *
      * ```js
      * bud.tap(function () {
      *  // do something with this
      * })
      * ```
      *
      * @public
      */
     tap: tap;
     /**
      * Executes a function if a given test is `true`.
      *
      * @remarks
      * - The first parameter is the conditional check.
      * - The second parameter is the function to run if `true`.
      * - The third parameter is optional; executed if the conditional is not `true`.
      *
      * @example
      * Only produce a vendor bundle when running in `production` {@link Mode}:
      *
      * ```js
      * bud.when(bud.isProduction, () => bud.vendor())
      * ```
      *
      * @example
      * Use `eval` sourcemap in development mode and `hidden-source-map` in production:
      *
      * ```js
      * bud.when(
      *   bud.isDevelopment,
      *   () => bud.devtool('eval'),
      *   () => bud.devtool('hidden-source-map'),
      * )
      * ```
      *
      * @public
      */
     when: when;
     /**
      * Bind method to {@link Framework | Framework instance}
      *
      * @public
      */
     bindMethod: any;
     /**
      * Adds a class as a property of the Framework
      *
      * @public
      */
     mixin: typeof mixin;
     /**
      * Read and write json files
      *
      * @public
      */
     json: typeof methods.json;
     /**
      * Read and write yaml files
      *
      * @public
      */
     yml: typeof methods.yaml;
     /**
      * Read and write typescript files
      *
      * @public
      */
     ts: typeof methods.ts;
     /**
      * Log a message
      *
      * @public
      * @decorator `@bind`
      */
     log(...messages: any[]): this;
     /**
      * Log an `info` level message
      *
      * @public
      * @decorator `@bind`
      */
     info(...messages: any[]): this;
     /**
      * Log a `success` level message
      *
      * @public
      * @decorator `@bind`
      */
     success(...messages: any[]): this;
     /**
      * Log a `warning` level message
      *
      * @public
      * @decorator `@bind`
      */
     warn(...messages: any[]): this;
     /**
      * Log a `warning` level message
      *
      * @public
      * @decorator `@bind`
      */
     time(...messages: any[]): this;
     /**
      * Log a `warning` level message
      *
      * @public
      * @decorator `@bind`
      */
     await(...messages: any[]): this;
     /**
      * Log a `warning` level message
      *
      * @public
      * @decorator `@bind`
      */
     complete(...messages: any[]): this;
     /**
      * Log a `warning` level message
      *
      * @public
      * @decorator `@bind`
      */
     timeEnd(...messages: any[]): this;
     /**
      * Log and display a debug message.
      *
      * @remarks
      * This error is fatal and will kill the process
      *
      * @public
      * @decorator `@bind`
      */
     debug(...messages: any[]): this;
     /**
      * Log and display an error.
      *
      * @remarks
      * This error is fatal and will kill the process
      *
      * @public
      * @decorator `@bind`
      */
     error(...messages: any[]): this;
     dump(obj: any, options?: PrettyFormatOptions & HighlightOptions & {
         prefix: string;
     }): Framework;
    }

    /**
     * Generic type defining the {@link Service.bindClass} map of classes to {@link Framework} property keys
     *
     * @public
     */
    declare interface GenericClassMap {
        [key: string]: [Class<any>, any];
    }

    /**
     * get function interface
     *
     * @internal
     */
    declare interface get {
        (this: Framework, name: string, tap?: (app: Framework) => Framework): Framework;
    }

    /**
     * get function interface
     *
     * @internal @override
     */
    declare interface get {
        (name: string, tap?: (app: Framework) => Framework): Framework;
    }

    /**
     * Retrieves a specific {@link Framework | Framework instance} by name.
     *
     * @public
     */
    declare const get: get;

    /**
     * Service allowing for fitering {@link Framework} values through callbacks.
     *
     * @example
     * Add a new entry to the `webpack.externals` configuration:
     *
     * ```ts
     * hooks.on(
     *   'build/externals',
     *   externals => ({
     *     ...externals,
     *     $: 'jquery',
     *   }),
     * )
     * ```
     *
     * @example
     * Change the `webpack.output.filename` format:
     *
     * ```ts
     * hooks.on(
     *   'build.output.filename',
     *   () => '[name].[hash:4]',
     * )
     * ```
     *
     * @public
     */
    export declare interface Hooks extends Service<Hooks.Repository> {
        /**
         * Register a function to filter a value.
         *
         * @remarks
         * If a filter calls for this name the function is then run,
         * passing whatever data along for modification. If more than one
         * hook is registered to a name, they will be called sequentially
         * in the order they were registered, with each hook's output used
         * as the input for the next.
         *
         * @example
         * ```js
         * app.hooks.on(
         *   'namespace.name.value',
         *   value => 'replaced by this string',
         * )
         * ```
         *
         * @public
         */
        on(id: Hooks.Name, callback: Hooks.Hook): Framework;
        /**
         * Async version of hook.on
         *
         * @example
         * ```js
         * app.hooks.on(
         *   'namespace.name.value',
         *   value => 'replaced by this string',
         * )
         * ```
         *
         * @public
         */
        promise(id: Hooks.Name, callback: Hooks.PromiseHook): Framework;
        /**
         * The other side of bud.hooks.on. Passes a key and a value. If
         * any filters are registered on that key they will transform
         * the output before it is returned.
         *
         * @example
         * ```js
         * bud.hooks.filter(
         *   'namespace.name.event',
         *   ['array', 'of', 'items'],
         * )
         * ```
         *
         * @public
         */
        filter<T = any>(id: Hooks.Name, seed?: any): T;
        /**
         * Async version of hook.filter
         *
         * @example
         * ```js
         * bud.hooks.filter(
         *   'namespace.name.event',
         *   ['array', 'of', 'items'],
         * )
         * ```
         *
         * @public
         */
        promised<T = any>(id: `${Hooks.Name & string}`, value?: any): Promise<T>;
    }

    /**
     * Hooks namespace
     *
     * @public
     */
    export declare namespace Hooks {
        /**
         * Hook signature
         */
        export type Hook<T = any> = ((value?: T) => T) | T;
        export type PromiseHook<T = any> = (value?: T) => Promise<T>;
        /**
         * Hooks repository
         *
         * @remarks
         * Mapped type for ensuring proper references throughout the application
         */
        export type Repository = {
            [K in Name as `${K & string}`]?: Hook[];
        };
        export type Key = `${keyof Repository}`;
        export type LocationKeys = `location.${keyof Locations & string}`;
        export type LoaderKeys = `loader` | `loader.${keyof Loaders & string}`;
        export type ItemKeys = `item` | `item.${keyof Items & string}` | `item.${keyof Items & string}.loader` | `item.${keyof Items & string}.options` | `item.${keyof Items & string}.options.${string}`;
        export type RuleKeys = `rule` | `rule.${keyof Rules & string}` | `rule.${keyof Rules & string}.${keyof Webpack_2.RuleSetRule & string}` | `rule.${keyof Rules & string}.${keyof Webpack_2.RuleSetRule & `options` & string}.${string}`;
        export namespace BuildHooks {
            export type Rules = Webpack_2.Configuration['module']['rules'];
            export interface RulesOverride extends Rules {
                oneOf: Webpack_2.RuleSetRule;
            }
            export type Optimization = Webpack_2.Configuration['optimization'];
            export interface OptimizationOverride extends Optimization {
                splitChunks: {
                    cacheGroups: any;
                };
            }
            export interface Config extends Webpack_2.Configuration {
                mode?: Mode;
                module?: {
                    noParse?: RegExp | RegExp[] | ((content: string) => boolean);
                    parser: any;
                    rules?: RulesOverride;
                };
                optimization?: OptimizationOverride;
                parallelism?: Webpack_2.Configuration['parallelism'];
            }
            export type Dive<T, S> = {
                [K in keyof T as `build.${S & string}.${K & string}`]: T[K];
            };
            export type Keys = `build` | `build.${keyof Config}` | keyof Dive<Config['output'], 'output'> | 'build.output.pathInfo' | keyof Dive<Config['module'], 'module'> | keyof Dive<Config['module']['rules'], 'module.rules'> | keyof Dive<Config['module']['rules']['oneOf'], 'module.rules.oneOf'> | 'build.module.rules.parser' | keyof Dive<Config['resolve'], 'resolve'> | keyof Dive<Config['resolveLoader'], 'resolveLoader'> | 'build.cache.name' | 'build.cache.cacheLocation' | 'build.cache.cacheDirectory' | 'build.cache.hashAlgorithm' | 'build.cache.managedPaths' | 'build.cache.version' | 'build.cache.type' | 'build.cache.buildDependencies' | keyof Dive<Config['experiments'], 'experiments'> | keyof Dive<Config['watchOptions'], 'watchOptions'> | keyof Dive<Config['performance'], 'performance'> | keyof Dive<Config['optimization'], 'optimization'> | keyof Dive<Config['optimization']['splitChunks'], 'optimization.splitChunks'> | keyof Dive<Config['optimization']['splitChunks']['cacheGroups'], 'optimization.splitChunks.cacheGroups'> | keyof Dive<Config['optimization']['splitChunks']['cacheGroups']['vendor'], 'optimization.splitChunks.cacheGroups.vendor'>;
                {};
        }
        /**
         * Hooks.Extension
         */
        export type Keys = keyof {
            [K in (keyof Modules & string) | (keyof Plugins & string) as `extension` | `extension.${K & string}` | `extension.${K}.${`${(keyof Modules & string) | (keyof Plugins & string)}` | (`${(keyof Modules & string) | (keyof Plugins & string)}.${string}` & string)}`]: Extension.Module;
        };
        /**
         * @internal
         */
        export type Name = `event.build.make.before` | `event.build.make.after` | `event.compiler.before` | `event.compiler.after` | `event.compiler.done` | `compiler.stats` | `compiler.error` | `${ItemKeys}` | `${LocationKeys}` | `${LoaderKeys}` | `${Keys}` | `${RuleKeys}` | `${BuildHooks.Keys}`;
            {};
    }

    /**
     * Hash of a given object type
     *
     * @public
     */
    export declare type Index<T = any> = {
        [key: string]: T;
    };

    /**
     * Server instance
     *
     * @defaultValue express instance
     *
     * @public
     */
    declare interface Instance extends Server_2 {
    }

    declare type INSTANCE_CONFIG = SignaleConfig;

    /**
     * Instance configuration
     *
     * @internal
     */
    declare const INSTANCE_CONFIG: SignaleConfig;

    /**
     * Server service interface
     *
     * @core @public @container
     */
    declare interface Interface extends Service {
        /**
         * Server application
         *
         * @public
         */
        application: Application;
        /**
         * Server configuration
         *
         * @remarks
         * Aliases for `store.config.repository.server`
         *
         * @public
         */
        config: Configuration['server'];
        /**
         * Server instance
         *
         * @public
         */
        instance: Instance;
        /**
         * Server middleware
         *
         * @public
         */
        middleware: Middleware;
        /**
         * Assets
         *
         * @public
         */
        assets: string[];
        /**
         * Watcher instance
         *
         * @public
         */
        watcher: {
            [key: string]: any;
            close: CallableFunction;
            on: CallableFunction;
        };
        /**
         * Retrieve an array of watched files.
         *
         * @public
         */
        getWatchedFiles(): Promise<Array<string>>;
        /**
         * Run the server instance
         *
         * @public
         */
        run(): Promise<this>;
        /**
         * Inject client scripts into compilation
         *
         * @public
         */
        inject(): void;
        /**
         * Close the server connection
         *
         * @public
         */
        close(): any;
    }

    /**
     * Peer dependencies interface
     *
     * @public
     */
    declare interface Interface_2 {
        /**
         * Application framework instance
         *
         * @public
         */
        app: Framework;
        /**
         * Collect packages.
         *
         * @public
         */
        discover(type: 'dependencies' | 'devDependencies'): Promise<this>;
        /**
         * Returns path for a module name (if findable)
         *
         * @public
         */
        getPackageManifestPath(name: string): Promise<string>;
        /**
         * Returns manifest for a module from name (if findable)
         *
         * @public
         */
        getManifest(name: string): Promise<Record<string, any>>;
        /**
         * Returns true if a module is a bud
         *
         * @public
         */
        isExtension(name: string): boolean;
    }

    /**
     * Peer service interface
     *
     * @public @core @container
     */
    declare interface Interface_3 extends Service {
        [key: string]: any;
        /**
         * Peer module related utilities
         *
         * @public
         */
        peers: Peers.Interface;
        /**
         * Returns a boolean representing if
         * the project has a given pkg listed as a dependency
         * or devDependency
         *
         * @public
         */
        hasPeerDependency(pkg: string): boolean;
        /**
         * Read profile
         *
         * @public
         */
        buildProfile(): Promise<any>;
        /**
         * Write profile to filesystem
         *
         * @public
         */
        writeProfile(): Promise<any>;
        /**
         * Refresh project json artifact
         *
         * @public
         */
        buildProfile(): Promise<any>;
    }

    declare namespace Item {
        export {
            Item_2 as Interface,
            Item_3 as Abstract,
            Options_3 as Options,
            ConstructorOptions,
            Output
        }
    }
    export { Item }

    /**
     * Item interface
     *
     * @public
     */
    declare interface Item_2 {
        /**
         * Loader
         *
         * @public
         */
        loader: Factory<[Framework], Loader.Interface>;
        /**
         * Options
         *
         * @public
         */
        options: Options_3;
        /**
         * Set loader
         *
         * @param factory - {@link Loader.Factory}
         * @returns void
         *
         * @public
         */
        setLoader(factory: Maybe<[Framework], Loader.Interface>): void;
        /**
         * Set options
         *
         * @param factory - {@link OptionsFactory}
         * @returns void
         *
         * @public
         */
        setOptions(factory: Maybe<[Framework], Options_3>): void;
        /**
         * Merge option
         *
         * @param options - Options to merge
         * @param app - {@link Framework}
         * @returns void
         *
         * @public
         */
        mergeOptions(options: Options_3, app: Framework): void;
        /**
         * Makes final Item output
         *
         * @param app - {@link Framework}
         * @returns finalized Item
         *
         * @public
         */
        make(app: Framework): Output;
    }

    /**
     * Item interface
     *
     * @public
     */
    declare abstract class Item_3 {
        /**
         * Loader
         *
         * @public
         */
        abstract loader: Factory<[Framework], Loader.Interface>;
        /**
         * Loader options
         *
         * @public
         */
        abstract options: Factory<[Framework], Options_3>;
        /**
         * Set loader
         *
         * @param factory - Function returning loader interface
         * @returns void
         *
         * @public
         */
        abstract setLoader(factory: Maybe<[Framework], Loader.Interface>): void;
        /**
         * Set options
         *
         * @param factory - Function returning options interface
         * @returns void
         *
         * @public
         */
        abstract setOptions(factory: Maybe<[Framework], Options_3>): void;
        /**
         * Merge option
         *
         * @param options - Options to merge
         * @param app - {@link Framework}
         * @returns void
         *
         * @public
         */
        abstract mergeOptions(options: Options_3, app: Framework): void;
        /**
         * Makes final Item output
         *
         * @param app - {@link Framework}
         * @returns finalized Item
         *
         * @public
         */
        abstract make(app: Framework): Output;
    }

    /**
     * Registered items
     *
     * @virtual @public
     */
    export declare interface Items extends Partial<Index<Item.Interface>> {
    }

    declare namespace json {
        export {
            read_2 as read,
            write
        }
    }

    /**
     * Store accessor keys
     *
     * @public
     */
    declare type Keys = `${keyof Configuration & string}` | `features.${keyof Configuration['features']}` | `theme.${keyof Configuration['theme'] & string}` | `theme.screens` | `theme.colors.${keyof Configuration['theme']['colors'] & string}` | `server.${keyof Configuration['server'] & string}` | `server.middleware.${keyof Configuration['server']['middleware'] & string}` | `server.browser.${keyof Configuration['server']['browser'] & string}` | `server.${keyof Configuration['server'] & string}.${string}` | `env.${string}` | `location.${keyof Configuration['location'] & string}` | `patterns.${keyof Configuration['patterns'] & string}` | `build.${keyof Webpack.Configuration}` | `build.module.${keyof Webpack.Configuration['module']}` | `build.module.${keyof Webpack.Configuration['module']}.${string}` | `extension.${string}` | `build.${keyof Webpack.Configuration}.${string}` | `cli` | `cli.${'flags' | 'args' | 'argv' | 'raw' | 'metadata'}` | `cli.${'flags' | 'args' | 'argv' | 'raw' | 'metadata'}.${string}`;

    /**
     * Initializes and binds {@link Framework.services}
     *
     * @example
     * ```js
     * new FrameworkImplementation(...constructorParams).bootstrap()
     * ```
     *
     * @param this - {@link Framework}
     * @returns Framework
     *
     * @public
     */
    declare function lifecycle(this: Framework): Promise<Framework>;

    /**
     * Bootstrap interface
     *
     * @internal
     */
    declare interface lifecycle {
        (this: Framework): Promise<Framework>;
    }

    declare namespace Loader {
        export {
            LoaderInterface as Interface,
            LoaderAbstract as Abstract,
            Factory_2 as Factory
        }
    }
    export { Loader }

    /**
     * Defines a webpack loader
     *
     * @public
     */
    declare abstract class LoaderAbstract implements LoaderInterface {
        /**
         * Loader src
         *
         * @public
         */
        abstract src: Factory<[Framework], string>;
        /**
         * Returns finalized Loader
         *
         * @param app - {@link @roots/bud-framework#Framework}
         * @returns loader path
         *
         * @public
         */
        abstract make(app: Framework): string;
        /**
         * Ensure that a value is a factory
         *
         * @param input - input value
         * @returns
         */
        abstract normalizeInput<T = any>(input: Maybe<[Framework], T>): Factory<[Framework], T>;
    }

    /**
     * Defines a webpack loader
     *
     * @public
     */
    declare interface LoaderInterface {
        /**
         * Loader src factory
         *
         * @public
         */
        src: Factory<[Framework], string>;
        /**
         * Returns finalized Loader
         *
         * @param app - {@link @roots/bud-framework#Framework}
         * @returns loader path
         *
         * @public
         */
        make(app: Framework): string;
        /**
         * Ensure that a value is a factory
         *
         * @param input - input value
         * @returns
         */
        normalizeInput<T = any>(input: Maybe<[Framework], T>): Factory<[Framework], T>;
    }

    /**
     * Registered loaders
     *
     * @virtual @public
     */
    export declare interface Loaders extends Partial<Index<Loader.Interface>> {
    }

    /**
     * Registered locations
     *
     * @virtual @public
     */
    export declare interface Locations extends Partial<Record<string, string>> {
        [key: string]: string;
        project?: string;
        src?: string;
        dist?: string;
    }

    /**
     * Logger service
     *
     * @public
     */
    export declare class Logger {
        private app;
        /**
         * Context
         */
        get context(): Array<string>;
        /**
         * Scoped logger
         *
         * @public
         */
        scoped(...scope: Array<string>): Signale_2<DefaultMethods>;
        /**
         * Logger instance
         *
         * @public
         */
        instance: Signale_2;
        /**
         * Logger enabled
         *
         * @public
         */
        get enabled(): boolean;
        /**
         * Logger level
         *
         * @public
         */
        get level(): string;
        /**
         * Logger interactive mode
         *
         * @public
         */
        get interactive(): boolean;
        /**
         * Logging flags
         *
         * @public
         */
        get flags(): Record<string, any>;
        /**
         * Logger secrets hidden in process stdout
         *
         * @public
         */
        secrets: Array<string>;
        /**
         * Stream destinations
         *
         * @public
         */
        stream: (NodeJS.WriteStream & {
            fd: 1;
        })[];
        /**
         * Config
         *
         * @public
         */
        config: INSTANCE_CONFIG;
        options: SignaleOptions;
        /**
         * Class constructor
         *
         * @public
         */
        constructor(app: Framework);
        /**
         * @public
         * @decorator `@bind`
         */
        instantiate(): void;
        /**
         * @public
         * @decorator `@bind`
         */
        makeInstance(options?: SignaleOptions, config?: SignaleConfig): Signale_2<DefaultMethods>;
    }

    /**
     * Util
     */
    /**
     * Loosely typed interface
     *
     * @public
     */
    export declare interface Loose {
        [key: string]: any;
    }

    /**
     * Instantiate a child instance and add to {@link Framework.children} container
     *
     * @remarks
     * **make** takes two parameters:
     *
     * - The **name** of the new compiler
     * - An optional callback to use for configuring the compiler.
     *
     * @example
     * ```js
     * bud.make('scripts', child => child.entry('app', 'app.js'))
     * ```
     *
     * @public
     */
    declare function make(name: string, tap?: (app: Framework) => any): Promise<Framework>;

    /**
     * make function interface
     *
     * @internal
     */
    declare interface make {
        (name: string, tap?: (app: Framework) => any): Promise<Framework>;
    }

    /**
     * Maybe
     *
     * @remarks
     * If T is a function, and it is passed a value of type A, it returns T.
     * If it is not a function, it returns T.
     *
     * @typeParam A - Arguments to be passed when T is a function and it is invoked
     * @typeParam T - Type to be returned
     *
     * @public
     */
    export declare type Maybe<A extends any[], T> = T | Factory<A, T>;

    /**
     * Calls a given value if it is a function. The function will be bound to
     * Budbefore it is called.
     *
     * If it is not a function, returns the value without doing anything to it.
     *
     * @param this - Bud
     * @typeParam I - Type of the value expected to be returned
     *
     * @public
     */
    declare function maybeCall<I = any>(value: (app: Framework) => I | I): any;

    /**
     * @internal
     */
    declare interface maybeCall<I = any> {
        (value: ((app: Framework) => I) | I): I;
    }

    declare namespace methods {
        export {
            ts,
            json,
            yaml
        }
    }

    /**
     * Map of middleware which are to be enabled
     *
     * @public
     */
    declare interface Middleware {
        [key: string]: any;
    }

    /**
     * Bind a {@link Class} to the {@link Framework}.
     *
     * @remarks
     * Constructor parameters can be specified using an array.
     *
     * @example
     * Bind a class named `FooClass` and expose `app.propertyName`:
     *
     * ```js
     * app.mixin({propertyName: [FooClass]})
     * ```
     *
     * Specify constructor parameters with a tuple:
     *
     * ```js
     * app.mixin({
     *   bindingName: [BindingClass, foo, bar]
     * })
     * ```
     *
     * @typeParam Binding - Map of {@link Framework} keys to classes
     *
     * @public
     * @decorator `@bind`
     */
    declare function mixin<ClassMap = GenericClassMap>(properties: ClassMap): void;

    /**
     * Compilation mode
     *
     * @public
     */
    export declare type Mode = 'production' | 'development';

    /**
     * Module
     *
     * @deprecated Use {@link Extension.Module} or {@link Extension.CompilerPlugin} instead
     *
     * @public
     */
    export declare interface Module<P = any, O = any> extends Extension.Module<O> {
    }

    /**
     * Bud extension interface
     *
     * @typeParam Options - Extension options
     *
     * @public @core
     */
    declare interface Module_2<Options = any> extends Loose {
        /**
         * The module name
         *
         * @public
         */
        name?: Name;
        /**
         * Options registered to the extension module
         *
         * @public
         */
        options?: Maybe<[Framework], Options>;
        /**
         * General purpose callback. Called first.
         *
         * @public
         */
        register?: Factory<[Framework, Signale], any>;
        /**
         * General purpose callback. Called after everything else.
         *
         * @public
         */
        boot?: Factory<[Framework, Signale], any>;
        /**
         * Objects to bind to the framework. May be expressed as an object literal or a factory function.
         *
         * @remarks
         * You might also use {@link @roots/bud-framework#Service.bindMethod | bindMethod} to accomplish the same thing.
         *
         * If expressed as a factory function, the function will be called with the {@link Framework} as the first parameter.
         *
         * @public
         */
        api?: Maybe<[Framework], Record<string, any>>;
        /**
         * Objects to bind to the framework. May be expressed as an object literal or a factory function.
         *
         * @remarks
         * You might also use {@link @roots/bud-framework#Service.bindClass | bindClass} to accomplish the same thing.
         *
         * If expressed as a factory function, the function will be called with the {@link Framework} as the first parameter.
         *
         * @public
         */
        mixin?: (app: Framework) => Promise<Record<string, any>>;
        /**
         * Boolean or a function returning a boolean indicating if the {@link Module} should be utilized.
         *
         * @remarks
         * If a factory is implemented, it will be passed the {@link Framework} instance as its first parameter and
         * a {@link Container} instance holding the {@link Module.options} (if any) as the second parameter.
         *
         * Do note that this is not the same parameter order as {@link Module.make}. That's because it is more common
         * to check the state of the {@link Framework} in the {@link Module.when} callback than the {@link Module.options}
         * (ie Checking the {@link Framework.isProduction} state).
         *
         * @public
         */
        when?: Maybe<[Framework, Container<Options>], boolean>;
    }

    /**
     * Registered extensions
     *
     * @virtual @public
     */
    export declare interface Modules extends Partial<Index<Extension.Module>> {
    }

    /**
     * Registered extension names
     *
     * @remarks
     * Extension names can be declared by overloading
     * the {@link Modules} and {@link Plugins} interfaces
     *
     * @public
     */
    declare type Name = `${(keyof Modules & string) | (keyof Plugins & string)}`;

    export declare interface Options {
        /**
         * The object providing initial configuration values.
         *
         * @remarks
         * It is probable that extensions and services will modify
         * values introduced in this object. If you are looking to simply modify
         * configuration values it is generally a better idea to use the
         * {@link @roots/bud-hooks#Hooks | Hooks class} instead.
         *
         * @public
         */
        config?: Partial<Configuration>;
        /**
         * Framework services
         * @public
         */
        services?: Services;
        /**
         * @internal
         */
        childOf?: Framework;
        /**
         * Extensions to be registered
         *
         * @public
         */
        extensions?: () => Record<string, Extension.Module | Extension.CompilerPlugin>;
    }

    /**
     * Options interface
     *
     * @public
     */
    declare interface Options_3 {
        [key: string]: any;
    }

    /**
     * Options interface
     *
     * @public
     */
    declare interface Options_4 extends Partial<{
        test: Maybe<Array<Framework>, RegExp>;
        use: Maybe<Array<Framework>, Array<Item.Interface>>;
        exclude: Maybe<Array<Framework>, RegExp>;
        type: Maybe<Array<Framework>, string>;
        parser: Maybe<Array<Framework>, Parser>;
        generator: Maybe<Array<Framework>, any>;
    }> {
    }

    /**
     * Output interface
     *
     * @public
     */
    declare interface Output {
        /**
         * Finalized loader
         *
         * @public
         */
        loader: string;
        /**
         * Finalized options
         *
         * @public
         */
        options?: Options_3;
    }

    /**
     * Output
     *
     * @public
     */
    declare interface Output_2 extends Partial<{
        test: RegExp;
        use?: {
            loader: string;
            options?: {
                [key: string]: any;
            };
        }[];
        exclude?: RegExp;
        type?: string;
        parser?: Parser;
        generator?: any;
    }> {
    }

    /**
     * File parser interface
     *
     * @public
     */
    declare interface Parser {
        parse: (input?: string) => any;
    }

    declare interface path {
        (this: Framework, key: keyof Locations & string, ...path: string[]): string;
    }

    declare interface path {
        (key: keyof Locations & string, ...path: string[]): string;
    }

    declare const path: path;

    /**
     * A Bud related peer dependency
     */
    declare interface Peer {
        /**
         * The module/extension which uses this peer
         *
         * @public
         */
        source: string;
        /**
         * The peer module name
         *
         * @public
         */
        name: string;
        /**
         * The peer module version
         *
         * @public
         */
        ver: string;
        /**
         * The peer module type
         *
         * @public
         */
        type: 'dependencies' | 'devDependencies';
    }

    declare namespace Peers {
        export {
            Peer,
            Repository,
            Interface_2 as Interface
        }
    }
    export { Peers }

    /**
     * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
     *
     * @remarks
     * If no value is provided the value is assumed to be the {@link (Framework:class)} itself
     *
     * {@link (sequence:function)} is a non-mutational version of this method.
     *
     * @public
     */
    declare function pipe<T = Framework>(fns: Callback<T>[], value?: T): T;

    /**
     * @public
     */
    declare interface pipe {
        <T = Framework>(fns: Callback<T>[], value?: T): T;
    }

    /**
     * Compiler plugin instance
     *
     * @remarks
     * Compatible with the webpack plugin interface.
     *
     * @public
     */
    export declare interface PluginInstance {
        /**
         * Apply method
         *
         * @public
         */
        apply: CallableFunction;
    }

    /**
     * Registered plugins
     *
     * @virtual @public
     */
    export declare interface Plugins extends Partial<Index<Extension.CompilerPlugin>> {
    }

    declare namespace Project {
        export {
            Abstract,
            Interface_3 as Interface
        }
    }
    export { Project }

    declare function read(path: string): Promise<any>;

    declare const read_2: (file: string) => Promise<any>;

    declare const read_3: (file: string) => Promise<any>;

    /**
     * Peer repository
     *
     * @public
     */
    declare interface Repository {
        [key: string]: any;
    }

    /**
     * Store repository
     *
     * @public
     */
    declare type Repository_3 = {
        [K in Keys & string]?: any;
    };

    declare namespace Rule {
        export {
            Rule_2 as Interface,
            Rule_3 as Abstract,
            Parser,
            Options_4 as Options,
            Output_2 as Output
        }
    }
    export { Rule }

    /**
     * Rule interface
     *
     * @public
     */
    declare interface Rule_2 {
        /**
         * Test pattern
         *
         * @public
         */
        test?(app?: Framework): RuleSetRule['test'];
        /**
         * Use item
         *
         * @public
         */
        use?(app?: Framework): Item.Interface[];
        /**
         * Get the value of `test`
         *
         * @public
         */
        getTest(app: Framework): RegExp;
        /**
         * Set the value of `test`
         *
         * @public
         */
        setTest(test: Maybe<[Framework], RegExp>): void;
        /**
         * Get the value of `use`
         *
         * @public
         */
        getUse(app: Framework): Item.Interface[];
        /**
         * Set the value of `use`
         *
         * @public
         */
        setUse(use: Maybe<[Framework], Item.Interface[]>): void;
        /**
         * Get the value of `exclude`
         *
         * @public
         */
        getExclude(app: Framework): Output_2['exclude'];
        /**
         * Set the value of `exclude`
         *
         * @public
         */
        setExclude(exclude: Maybe<[Framework], RegExp>): void;
        /**
         * Get the value of `type`
         *
         * @public
         */
        getType(app: Framework): Output_2['type'];
        /**
         * Set the value of `type`
         *
         * @public
         */
        setType(type: Maybe<[Framework], string>): void;
        /**
         * Get the value of `parser`
         *
         * @public
         */
        getParser(app: Framework): Parser;
        /**
         * Set the value of `parser`
         *
         * @public
         */
        setParser(parser: Maybe<[Framework], Parser>): void;
        /**
         * Get the value of `generator`
         *
         * @public
         */
        getGenerator(app: Framework): any;
        /**
         * Set the value of `generator`
         *
         * @public
         */
        setGenerator(Generator: Maybe<[Framework], any>): void;
        /**
         * Returns final RuleSetRule
         *
         * @public
         */
        make(app: Framework): Output_2 | RuleSetRule;
    }

    /**
     * Rule abstract class
     *
     * @public
     */
    declare abstract class Rule_3 {
        /**
         * Test pattern
         *
         * @public
         */
        abstract test?(app?: Framework): RuleSetRule['test'];
        /**
         * Use item
         *
         * @public
         */
        abstract use?(app?: Framework): Item.Interface[];
        /**
         * Get the value of `test`
         *
         * @public
         */
        abstract getTest(app: Framework): RegExp;
        /**
         * Set the value of `test`
         *
         * @public
         */
        abstract setTest(test: Maybe<[Framework], RegExp>): void;
        /**
         * Get the value of `use`
         *
         * @public
         */
        abstract getUse(app: Framework): Item.Interface[];
        /**
         * Set the value of `use`
         *
         * @public
         */
        abstract setUse(use: Maybe<[Framework], Item.Interface[]>): void;
        /**
         * Get the value of `exclude`
         *
         * @public
         */
        abstract getExclude(app: Framework): Output_2['exclude'];
        /**
         * Set the value of `exclude`
         *
         * @public
         */
        abstract setExclude(exclude: Maybe<[Framework], RegExp>): void;
        /**
         * Get the value of `type`
         *
         * @public
         */
        abstract getType(app: Framework): Output_2['type'];
        /**
         * Set the value of `type`
         *
         * @public
         */
        abstract setType(type: Maybe<[Framework], string>): void;
        /**
         * Get the value of `parser`
         *
         * @public
         */
        abstract getParser(app: Framework): Parser;
        /**
         * Set the value of `parser`
         *
         * @public
         */
        abstract setParser(parser: Maybe<[Framework], Parser>): void;
        /**
         * Get the value of `generator`
         *
         * @public
         */
        abstract getGenerator(app: Framework): any;
        /**
         * Set the value of `generator`
         *
         * @public
         */
        abstract setGenerator(Generator: Maybe<[Framework], any>): void;
        /**
         * Returns final RuleSetRule
         *
         * @public
         */
        abstract make(app: Framework): Output_2 | RuleSetRule;
    }

    /**
     * Registered rules
     *
     * @virtual @public
     */
    export declare interface Rules extends Partial<Index<Rule.Interface>> {
    }

    declare function sequence<T = Framework>(fns: Callback_2[], value?: T): Framework;

    declare interface sequence {
        <T = Framework>(fns: Callback_2[], value?: T): Framework;
    }

    declare namespace Server {
        export {
            Application,
            Instance,
            Middleware,
            Options_2 as ProxyOptions,
            Interface,
            Configuration_3 as Configuration
        }
    }
    export { Server }

    /**
     * Atomic unit of {@link Framework} functionality.
     *
     * @remarks
     * The {@link Service} interface extends {@link Bootstrapper}, which provides {@link @roots/container#Container}
     * and {@link Framework} access
     *
     * A {@link Service} is tapped through a series of callbacks at different points in the build.
     *
     * All of the callbacks are optional:
     *
     * - {@link Service.bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
     *
     * - {@link Service.bootstrapped} is called once all Services have been instantiated.
     *
     * - {@link Service.register} is intended for Services to register functionalities, modules, and bind functions and classes.
     *
     * - {@link Service.registered} is called after all {@link Service.register} callbacks are complete.
     *
     * - {@link Service.boot} is called once all services are registered. It should be safe for Services to reference one another.
     *
     * - {@link Service.booted} is called after all {@link Service.boot} callbacks are complete.
     *
     * @typeParam Repository - {@link Repository} typing, if applicable
     *
     * @public @core @container
     */
    export declare abstract class Service<Repository = Record<string, any>> extends Bootstrapper<Repository> {
        /**
         * Service identifier
         *
         * @public
         */
        ident?: string;
        /**
         * Service scoped logger
         *
         * @public
         */
        get logger(): Logger['instance'];
        /**
         * Log a message
         *
         * @public
         * @decorator `@bind`
         */
        log(type: string, ...messages: any[]): this;
        /**
         * Lifecycle method: bootstrap
         *
         * @remarks
         * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
         *
         * @virtual @public
         */
        bootstrap?(app: Framework): Promise<any>;
        /**
         * Lifecycle method: bootstrapped
         *
         * @remarks
         * Called once all {@link Service} instances are available.
         *
         * @param app - {@link Framework}
         *
         * @virtual @public
         */
        bootstrapped?(app: Framework): Promise<any>;
        /**
         * Lifecycle method: register
         *
         * @remarks
         * Intended for {@link Service} instances to register functionalities, modules, and bind functions and classes to the {@link Framework}
         *
         * @param app - {@link Framework}
         *
         * @virtual @public
         */
        register?(app: Framework): Promise<any>;
        /**
         * Lifecycle method: registered
         *
         * @remarks
         * `registered` is called after all {@link Service.register} callbacks are complete.
         *
         * @param app - {@link Framework}
         *
         * @virtual @public
         */
        registered?(app: Framework): Promise<any>;
        /**
         * Lifecycle method: boot
         *
         * @remarks
         * `boot` is called once all services are registered. It should be safe for Services to reference one another.
         *
         * @param app - {@link Framework}
         *
         * @virtual @public
         */
        boot?(app: Framework): Promise<any>;
        /**
         * Lifecycle method: booted
         *
         * @remarks
         * `booted` is called after all {@link Service.boot} callbacks are complete.
         *
         * @param app - {@link Framework}
         *
         * @virtual @public
         */
        booted?(app: Framework): Promise<any>;
        /**
         * Dump the service repository
         */
        dump(options?: PrettyFormatOptions_2): void;
    }

    /**
     * Registered services
     *
     * @virtual @public
     */
    export declare interface Services extends Partial<Record<string, new (app: Framework) => Service>> {
    }

    /**
     * Set a {@link @roots/bud-framework#Location | Location} value
     *
     * @remarks
     * The {@link Locations.project} should be an absolute path.
     * All other directories should be relative (src, dist, etc.)
     * @see {@link Locations}
     *
     * @example
     * ```js
     * bud.setPath('src', 'custom/src')
     * ```
     *
     * @param this - {@link Framework}
     * @param args - path parts
     * @returns {@link Framework}
         *
         * @public
         */
     declare function setPath(...args: any[]): Framework;

     /**
      * setPath function interface
      *
      * @internal
      */
     declare interface setPath {
         (...args: any[]): Framework;
     }

     /**
      * Container store for initial configuration and general options
      *
      * @public @core @config
      */
     export declare class Store<T = Configuration> extends Service<T> {
         /**
          * Service identifier
          *
          * @public
          */
         ident: string;
         /**
          * Repository
          *
          * @public
          */
         repository: Repository_3;
         /**
          * {@inheritDoc @roots/container#Container.get}
          *
          * @override
          */
         get<T = any>(path: keyof Repository_3): T;
     }

     declare interface tap<T = Framework> {
         (fn: (app: Framework) => any, bound?: boolean): T;
     }

     /**
      * Execute a callback function to contain code execution
      * side effects
      *
      * @remarks
      * Callback is provided {@link Framework} as a parameter.
      *
      * @example
      * ```ts
      * bud.tap(bud => {
      *   // do something with bud
      * })
      * ```
      *
      * @example
      * Lexical scope is bound to Framework where applicable, so it
      * is possible to reference the Framework using `this`.
      *
      * ```ts
      * bud.tap(function () {
      *  this.log('this references bud from the outer scope')
      * })
      * ```
      *
      * @public
      */
     declare const tap: tap;

     /**
      * Callback which accepts Framework as a parameter
      *
      * @public
      */
     export declare interface Tapable<P extends any[] = [Framework], T = any> extends Factory<[P], T> {
         (this: P, ...args: P): T;
     }

     /**
      * @public
      */
     declare type TermColor = `#${string}` | `black` | `red` | `green` | `yellow` | `blue` | `magenta` | `cyan` | `white` | `gray` | `grey` | `blackBright` | `redBright` | `greenBright` | `yellowBright` | `blueBright` | `magentaBright` | `cyanBright` | `whiteBright`;

     declare namespace ts {
         export {
             read
         }
     }

     declare function when(test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;

     declare interface when {
         (test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;
     }

     declare const write: (file: string, data: any) => Promise<void>;

     declare const write_2: (file: string, data: any) => Promise<void>;

     declare namespace yaml {
         export {
             read_3 as read,
             write_2 as write
         }
     }

     export { }
