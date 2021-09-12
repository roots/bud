/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * The `@roots/bud-framework` package defines the abstract {@link Framework} class
 * and provides interfaces for the Framework's essential {@link Service} classes.
 *
 * {@link Framework} is a @virtual interface providing contracts
 * for {@link Service} implementations.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @core
 */

/// <reference types="node" />

import type { Application } from 'express';
import type { Class } from 'type-fest';
import { Compiler as Compiler_2 } from 'webpack';
import { Configuration as Configuration_2 } from 'webpack';
import { Container } from '@roots/container';
import type * as DevMiddleware from 'webpack-dev-middleware';
import type { Handler } from 'express';
import type { Instance } from 'ink';
import { MultiCompiler } from 'webpack';
import { ProgressPlugin } from 'webpack';
import type * as Proxy_2 from 'http-proxy-middleware';
import type { Server as Server_2 } from 'http';
import { Signale } from 'signale';
import { StatsCompilation } from 'webpack';
import { StatsError } from 'webpack';
import type { WatchOptions } from 'chokidar';
import * as Webpack from 'webpack';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Cache service abstract class
 *
 * @virtual
 * @public
 */
declare abstract class Abstract extends Service implements Cache_2.Interface {
    /**
     * Dependencies which should be checked to determine cache validity.
     *
     * @virtual
     */
    abstract buildDependencies(): string[];
    /**
     * Directory used to store cache files
     *
     * @virtual
     */
    abstract directory(): string;
    /**
     * Hash of config files and build dependencies
     *
     * @virtual
     */
    abstract hash(): string;
    /**
     * A short, unique string created from the hashed contents of the project
     * config files and build dependencies.
     *
     * @virtual
     */
    abstract version(): string;
}

/**
 * Peer service abstract class
 *
 * @virtual
 * @public
 */
declare abstract class Abstract_2 extends Service<Peers.Repository> {
    /**
     * Array of paths for webpack to resolve modules from
     *
     * @virtual
     */
    resolveFrom: string[];
    /**
     * Peer module related utilities
     *
     * @virtual
     */
    abstract peers: Peers.Interface;
    /**
     * Get aggregated project info
     *
     * @virtual
     */
    abstract getProjectInfo(): {
        [key: string]: any;
    };
    /**
     * Returns a boolean representing if
     * the project has a given pkg listed as a dependency
     * or devDependency
     *
     * @virtual
     */
    abstract hasPeerDependency(pkg: string): boolean;
}

/**
 * Peer dependencies abstract class
 *
 * @virtual
 */
declare abstract class Abstract_3 implements Peers.Interface {
    /**
     * Project instance.
     *
     * @virtual
     */
    abstract project: Project.Interface;
    /**
     * Collect packages.
     *
     * @virtual
     */
    abstract discover(type: 'dependencies' | 'devDependencies'): this;
    /**
     * Register discovered packages as extensions
     *
     * @virtual
     */
    abstract registerDiscovered(): void;
    /**
     * Returns path for a module name (if findable)
     *
     * @virutal
     */
    abstract resolvePeerByName(name: string): string;
    /**
     * Returns manifest for a module from name (if findable)
     *
     * @virtual
     */
    abstract getPeerManifest(name: string): {
        [key: string]: any;
    };
    /**
     * Returns true if a module is a bud
     *
     * @virtual
     */
    abstract isExtension(name: string): boolean;
    /**
     * Install packages
     *
     * @virtual
     */
    abstract install(): void;
}

/**
 * Calls a given value if it is a function. The function will be bound to
 * {@link @roots/bud-framework#Framework} before it is called.
 *
 * If it is not a function, returns the value without doing anything to it.
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 * @typeParam I - Type of the value expected to be returned
 *
 * @public
 */
export declare function access<I = any>(this: Framework, value: Framework.Tapable | I): any;

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export declare interface access<I = any> {
    (this: Framework, value: Framework.Tapable | I): I;
}

export declare interface Api extends Service {
}

export declare function bootstrap(this: Framework): Framework;

export declare interface bootstrap {
    (this: Framework): Framework;
}

/**
 * Provides container functionality and access to {@link Framework} instance.
 *
 * @public
 */
export declare abstract class Bootstrapper<T = any> extends Container<T> {
    /**
     * Service identifier
     * @virtual
     */
    name: any;
    /** @hidden */
    private _app;
    /**
     * Access {@link Framework Framework} instance
     *
     * @readonly
     */
    get app(): Framework;
    /**
     * Class constructor
     */
    constructor(app: Framework);
}

/**
 * {@link Service}: Generates {@link Webpack.Configuration} from {@link Framework.Rules}
 *
 * @remarks
 * The most current {@link Webpack.Configuration} is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Framework.Hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the {@link Webpack.Configuration['entry']} with `bud.hooks.filter('build/entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Framework.Loaders} interface
 * - {@link Build.items} should be declared by augmenting the {@link Framework.Items} interface
 * - {@link Build.rules} should be declared by augmenting the {@link Framework.Rules} interface
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
 * bud.hooks.filter('build/entry')
 * ```
 */
export declare interface Build extends Service {
    /**
     * {@link Build.Loaders Loader registry}
     */
    loaders: Build.Loaders;
    /**
     * {@link Build.Items Item registry}
     */
    items: Build.Items;
    /**
     * {@link Build.Rules Rule registry}
     */
    rules: Build.Rules;
    /**
     * Accesses {@link Webpack.Configuration}
     */
    config: Webpack.Configuration;
    /**
     * Regenerate {@link Webpack.Configuration}
     */
    rebuild(): Webpack.Configuration;
}

export declare namespace Build {
    /**
     * Registered loaders
     */
    export interface Loaders extends Framework.Index<Loader> {
        [key: string]: Loader;
    }
    /**
     * Registered items
     */
    export interface Items extends Framework.Index<Item> {
        [key: string]: Item;
    }
    /**
     * Registered rules
     */
    export interface Rules extends Framework.Index<Rule> {
        [key: string]: Rule;
    }
    /**
     * Makes a Webpack loader
     */
    export interface Loader {
        /**
         * Returns {@link Loader.Output}
         */
        make(app: Framework): string;
    }
    /**
     * Makes a {@link Webpack.RuleSetRule.use} item
     */
    export interface Item {
        /**
         * Set the {@link Loader}
         */
        setLoader(loader: (app?: Framework) => Build.Loader): void;
        /**
         * Set the {@link Build.Item.OptionsFn}
         */
        setOptions(options: Build.Item.OptionsFn): void;
        /**
         * Merge {@link Build.Item.Options} with existing options
         */
        mergeOptions(options: Build.Item.Options, app: Framework): void;
        /**
         * Makes the {@link Webpack.RuleSetRule.use} item
         */
        make(app: Framework): Build.Item.Output;
    }
    /**
     * Makes a {@link RuleSetRule}
     */
    export interface Rule {
        /**
         * Wrapping {@link Webpack.RuleSetRule.test}
         */
        test?: (app?: Framework) => Webpack.RuleSetRule['test'];
        /**
         * Returns an array of {@link Build.Item} values
         *
         * @remarks
         * each of the returned values is to be built with {@link Build.Item.make}
         * to produce {@link Webpack.RuleSetRule.use} compatible output.
         */
        use?: (app?: Framework) => Item[];
        /**
         * Get the value of `test`
         */
        getTest(app: Framework): RegExp;
        /**
         * Set the value of `test`
         */
        setTest(test: RegExp | Rule.TestFn): void;
        /**
         * Get the value of `use`
         */
        getUse(app: Framework): Item[];
        /**
         * Set the value of `use`
         */
        setUse(use: Rule.UseFn): void;
        /**
         * Get the value of `exclude`
         */
        getExclude(app: Framework): Rule.Output['exclude'];
        /**
         * Set the value of `exclude`
         */
        setExclude(exclude: Rule.ExcludeFn | RegExp): void;
        /**
         * Get the value of `type`
         */
        getType(app: Framework): Rule.Output['type'];
        /**
         * Set the value of `type`
         */
        setType(type: string | Rule.TypeFn): void;
        /**
         * Get the value of `parser`
         */
        getParser(app: Framework): Rule.Parser;
        /**
         * Set the value of `parser`
         */
        setParser(parser: Rule.Parser | Rule.ParserFn): void;
        /**
         * Get the value of `generator`
         */
        getGenerator(app: Framework): any;
        /**
         * Set the value of `generator`
         */
        setGenerator(Generator: any | Rule.GeneratorFn): void;
        /**
         * Returns final {@link RuleSetRule} for inclusion in {@link Build.config}
         */
        make(app: Framework): Rule.Output | Webpack.RuleSetRule;
    }
    export namespace Item {
        export type LoaderFn = (app?: Framework) => Loader;
        export type OptionsFn = (app?: Framework) => Options;
        export type Options = {
            [key: string]: any;
        };
        export interface ConstructorOptions {
            loader: Loader | LoaderFn;
            options?: OptionsFn | Options;
        }
        export interface Output {
            loader: Build.Loader.Output;
            options?: {
                [key: string]: any;
            };
        }
    }
    export namespace Loader {
        export type Output = string;
        export type Src = (app?: Framework) => Output;
        export type Input = Src | Output;
    }
    export namespace Rule {
        export type TestFn = (app?: Framework) => RegExp;
        export type UseFn = (app?: Framework) => Item[];
        export type ExcludeFn = (app?: Framework) => RegExp;
        export type TypeFn = (app?: Framework) => string;
        export interface Parser {
            parse: (input?: string) => any;
        }
        export type ParserFn = (app?: Framework) => Parser;
        export type GeneratorFn = (app?: Framework) => any;
        /**
         * Rule.Options
         */
        export interface Options {
            test: RegExp | TestFn;
            use?: Item[] | UseFn;
            exclude?: RegExp | ExcludeFn;
            type?: string | TypeFn;
            parser?: ParserFn | Parser;
            generator?: GeneratorFn | any;
        }
        /**
         * Rule.Output
         *
         * @remarks
         * Output conforming to Webpack {@link RuleSetRule} interface
         */
        export interface Output {
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
        }
    }
}

declare namespace Cache_2 {
    export {
        Interface,
        Abstract
    }
}
export { Cache_2 as Cache }

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
declare function close_2(this: Framework, done?: (code?: number) => never): void;

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
declare interface close_2 {
    (this: Framework, done?: CallableFunction): void;
}
export { close_2 as close }

/**
 * Compiles {@link Framework.build} configuration and reports on stats, progress, and errors.
 */
export declare interface Compiler extends Service {
    /**
     * The compiler: an instance of {@link WebpackMultiCompiler}
     */
    instance: Compiler.Instance;
    /**
     * `true` if compiler has already been instantiated.
     */
    isCompiled: boolean;
    /**
     * Contains {@link StatsCompilation}, if available.
     */
    stats: StatsCompilation;
    /**
     * Formatted progress plugin
     */
    progress: Compiler.Progress;
    /**
     * Returns a {@link WebpackMultiCompiler}, given {@link Configuration}
     *
     * @remarks
     * {@link Framework} compiler should always be specified in a multi-compiler format (wrap a standard configuration in an array).
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
     */
    compile(): Compiler.Instance;
    /**
     * Callback for {@link Framework.Hooks} `before` filter
     *
     * @remarks
     * Parses {@link Framework.Build.config} instances and generates final input for {@link Compiler.compile}
     */
    before(): any;
    /**
     * Compilation callback
     *
     * @remarks
     * Provides stats and error reporting
     */
    callback(err: StatsError, stats: StatsCompilation): void;
}

export declare namespace Compiler {
    export type Config = Configuration_2;
    export type Instance = Compiler_2 | MultiCompiler;
    export type Progress = any;
    export namespace Progress {
        export type Handler = ProgressPlugin['handler'];
    }
}

/**
 * Framework base configuration
 *
 * @remarks
 * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
 * It is recommended to use hooks to extend the configuration.
 *
 * @public
 */
export declare interface Configuration {
    /**
     * Application name
     */
    name: string;
    /**
     * Shared regular expressions for pattern matching.
     *
     * @example
     * ```js
     * app.patterns.get('js')
     * ```
     */
    patterns: {
        [key: string]: RegExp;
    };
    /**
     * Registered fs directories
     */
    location: Framework.Locations;
    /**
     * Enable or disable the command line interface
     *
     * @defaultValue true
     */
    cli: boolean;
    /**
     * Feature: Clean dist before compilation
     *
     * When enabled stale assets will be removed from
     * the `location/dist` directory prior to the next
     * compilation.
     *
     * @defaultValue true
     */
    clean: boolean;
    /**
     * Feature: produce webpack.debug.js artifact
     *
     * When enabled a `webpack.debug.js` artifact will be
     * emitted to the `location/storage` directory.
     *
     * @defaultValue true
     */
    debug: boolean;
    /**
     * Discover: automatically register locatable extensions
     *
     * When enabled, any discovered extensions will be automatically
     * initialized.
     *
     * @defaultValue false
     */
    discover: boolean;
    /**
     * Enable or disable filename hashing
     *
     * @defaultValue false
     */
    hash: boolean;
    /**
     * Emit html template
     *
     * @defaultValue true
     */
    html: boolean;
    /**
     * Automatically install peer dependencies
     *
     * @defaultValue false
     */
    install: boolean;
    /**
     * Log to console
     *
     * @defaultValue false
     */
    log: boolean;
    /**
     * Enable or disable producing a manifest.json file
     *
     * @defaultValue true
     */
    manifest: boolean;
    /**
     * Enable or disable file minification
     *
     * @defaultValue true
     */
    minimize: boolean;
    /**
     * File format
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name]'
     */
    fileFormat: string;
    /**
     * File format when hashing is enabled
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name].[contenthash:6]'
     */
    hashFormat: string;
    /**
     * Initial webpack configuration values
     */
    build: Webpack.Configuration;
    /**
     * Initial options for registered extensions
     */
    extension: {
        [key: string]: any;
    };
    /**
     * Server configuration
     */
    server: Server.Configuration;
    /**
     * Command line theme configuration
     */
    theme: {
        /**
         * width/height of spacer units
         */
        spacing: number;
        /**
         * Color palette
         */
        colors: {
            /**
             * Text color
             */
            foreground: Configuration.TermColor;
            /**
             * Grayed out text color
             */
            faded: Configuration.TermColor;
            /**
             * Primary color
             */
            primary: Configuration.TermColor;
            /**
             * Variant of primary color (for gradients, etc.)
             */
            primaryAlt: Configuration.TermColor;
            /**
             * Error color
             */
            error: Configuration.TermColor;
            /**
             * Variant of error color (for gradients, etc.)
             */
            errorAlt: Configuration.TermColor;
            /**
             * Warning color
             */
            warning: Configuration.TermColor;
            /**
             * Success color
             */
            success: Configuration.TermColor;
            /**
             * Accent color
             */
            accent: Configuration.TermColor;
            /**
             * Flavor color
             */
            flavor: Configuration.TermColor;
        };
        /**
         * Interface breakpoints
         *
         * @remarks
         * Expressed as [width, height]
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
         */
        columns: number;
        /**
         * Maximum width of raw rendered text
         */
        maxWidth: number;
        /**
         * Maximum height of raw rendered text
         */
        maxHeight: number;
    };
}

export declare namespace Configuration {
    /**
     * Can be either ansi-color or hex
     */
    export type TermColor = `#${string}` | `black` | `red` | `green` | `yellow` | `blue` | `magenta` | `cyan` | `white` | `gray` | `grey` | `blackBright` | `redBright` | `greenBright` | `yellowBright` | `blueBright` | `magentaBright` | `cyanBright` | `whiteBright`;
}

export declare interface container<T = any> {
    <T>(repository?: T): Container<T>;
}

export declare const container: <T = any>(repository?: T) => Container<T>;

/**
 * @interface Dashboard
 */
export declare interface Dashboard extends Service {
    /**
     * Ink instance
     */
    instance: Instance;
    /**
     * Mount and instantiate Dashboard
     */
    run(): void;
    /**
     * Render stdout
     */
    render(Component: any, title?: string): void;
    /**
     * Render error
     */
    renderError(body: string, title: string): void;
}

export declare interface Dependencies extends Service {
    /**
     * Installation status
     */
    messages: Container;
    /**
     * Install dependencies
     */
    install(dependencies: {
        name: string;
        ver: string;
        source: string;
        type: 'dependencies' | 'devDependencies';
    }[]): void;
    /**
     * Returns a boolean indicating whether `dep` is
     * required to be installed.
     */
    overrideInstallTarget(dep: string, type: 'dependencies' | 'devDependencies'): boolean;
}

export declare interface Env extends Container {
    getPublicEnv(): Framework.Index<any>;
}

export declare abstract class Extension {
    protected _module: Module;
    protected _app: () => Framework;
    abstract register(): Extension;
    abstract boot(): Extension;
    constructor(app: Framework, extension: Module);
    get module(): Module;
    get app(): Framework;
    get name(): keyof Framework.Extensions;
    get options(): Module['options'];
    set options(options: Module['options']);
    get when(): Module.When;
    set when(when: Module.When);
    /**
     * @property {Module.Make} make
     */
    get make(): Module.Make;
    get apply(): any;
    set make(make: Module.Make);
    makeKey(key: Key): Hooks.Name;
    get(key: Key): any;
    set(key: Key, value: any): void;
}

export declare interface Extensions extends Service<Partial<Framework.Extensions>> {
    /**
     * Add an extension
     */
    add(extension: Module | WebpackPlugin): void;
    /**
     * Get {@link WebpackPluginInstance} instances to be included in compilation
     */
    make(): Extensions.PluginOutput[];
    /**
     * Get {@link Extension} instances slated for inclusion in compilation
     */
    getEligibleWebpackModules(): (Module | WebpackPlugin)[];
}

export declare namespace Extensions {
    export type PluginOutput = WebpackPluginInstance[];
}

/**
 * Base {@link Framework} class
 *
 * @remarks
 * Implementations must provide a {@link Framework.implementation} property
 * conforming to the {@link Framework.Constructor} interface
 *
 * This is in addition to all required {@link Framework.Options}.
 */
export declare abstract class Framework {
    /**
     * Concrete implementation of the {@link Framework}
     *
     * @virtual
     */
    abstract implementation: Framework.Constructor;
    /**
     * Framework name
     *
     * @remarks
     * The name of the parent compiler is used as a base when sourcing configuration files.
     * So, in an implementation that uses the name `app`, the Framework will be sourcing
     * `app.config.js`, `app.development.config.js`, etc.
     *
     * @virtual
     */
    name: string;
    /**
     * Compilation mode
     *
     * @remarks
     * Either `production` or `development`. Unlike webpack, there is no 'none' mode.
     *
     * @defaultValue 'production'
     */
    mode: Framework.Mode;
    /**
     * Parent {@link Framework} instance
     *
     * @remarks
     * Is `null` if the current instance is the parent instance.
     *
     * @defaultValue null
     */
    parent: Framework | null;
    /**
     * True when current instance is the parent instance
     *
     * @readonly
     */
    get isParent(): boolean;
    /**
     * {@link Container} of child {@link Framework} instances
     *
     * @remarks
     * Is `null` if the current instance is a child instance.
     *
     * @defaultValue null
     */
    children: Container<Framework.Instances> | null;
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
     * Can be set directly on the child instance or passed as a property in the {@link Framework.Options Framework constructor options}.
     */
    services: Framework.Services;
    /* Excluded from this release type: api */
    /**
     * Build configuration container
     *
     * @example The `build.config` property holds the build config object:
     * ```js
     * build.config
     * ```
     *
     * @example Rebuild the configuration:
     * ```js
     * build.rebuild()
     * ```
     *
     * @virtual
     */
    build: Build;
    /**
     * Determines cache validity and generates version string based on SHA-1 hashed build configuration and project manifest files.
     *
     * @virtual
     */
    cache: Cache_2.Interface;
    /**
     * Compiles {@link Build} configuration and stats/errors/progress reporting.
     *
     * @virtual
     */
    compiler: Compiler;
    /**
     * Presents build progress, stats and errors from {@link Compiler} and {@link Server}
     * over the CLI.
     *
     * @virtual
     */
    dashboard: Dashboard;
    /**
     * Utilities for interfacing with user package manager software
     *
     * @virtual
     */
    dependencies: Dependencies;
    /**
     * Project information and peer dependency management utilities
     *
     * @virtual
     */
    project: Project.Interface;
    /**
     * .env container
     *
     * @virtual
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
     * @virtual
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
     *   'build/output/filename',
     *   () => '[name].[hash:4]',
     * )
     * ```
     */
    hooks: Hooks;
    /**
     * Logging service
     *
     * @virtual
     */
    logger: Logger;
    /**
     * Development server and browser devtools
     *
     * @virtual
     */
    server: Server;
    /**
     * Container service for holding {@link Configuration} values
     */
    store: Store;
    /**
     * True when {@link Framework.mode} is `production`
     */
    get isProduction(): boolean;
    /**
     * True when {@link Framework.mode} is `development`
     */
    get isDevelopment(): boolean;
    /**
     * Class constructor
     */
    constructor(options: Framework.Options);
    /* Excluded from this release type: bindMethod */
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
     */
    access: access;
    /**
     * Initializes and binds {@link Framework.services}
     *
     * @example
     * ```js
     * new FrameworkImplementation(...constructorParams).bootstrap()
     * ```
     */
    bootstrap: bootstrap;
    /**
     * Gracefully shutdown {@link Framework} and registered {@link Service Service instances}
     *
     * @example
     * ```js
     * bud.close()
     * ```
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
     */
    container: container;
    /**
     * Returns a {@link Framework} instance from the {@link Framework.children} container
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
     */
    make: make;
    /**
     * Returns a {@link Framework.Locations} value as an absolute path
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
     */
    pipe: pipe;
    /**
     * Set a {@link Framework.Locations} value
     *
     * @remarks
     * The {@link Framework.Locations `project` directory} should be an absolute path.
     * All other directories should be relative (src, dist, etc.)
     * @see {@link Framework.Locations}
     *
     * @example
     * ```js
     * bud.setPath('src', 'custom/src')
     * ```
     */
    setPath: setPath;
    /**
     * Run a value through an array of syncronous, non-mutational functions.
     *
     * @remarks
     * Unlike {@link pipe} the value returned from each function is ignored.
     */
    sequence: typeof sequence;
    /**
     * Execute a callback
     *
     * @remarks
     * Callback is provided {@link Framework the Framework instance} as a parameter.
     *
     * @example
     * ```js
     * bud.tap(bud => {
     *   // do something with bud
     * })
     * ```
     *
     * @example
     * Lexical scope is bound to {@link Framework} where applicable, so it is possible to reference the {@link Framework instance} using `this`.
     *
     * ```js
     * bud.tap(function () {
     *  // do something with this
     * })
     * ```
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
     */
    when: when;
    /**
     * Log a message
     *
     * @decorator `@bind`
     */
    log(message?: any, ...optionalArgs: any[]): void;
    /**
     * Log an `info` level message
     *
     * @decorator `@bind`
     */
    info(message?: any, ...optionalArgs: any[]): void;
    /**
     * Log a `success` level message
     *
     * @decorator `@bind`
     */
    success(message?: any, ...optionalArgs: any[]): void;
    /**
     * Log a `warning` level message
     *
     * @decorator `@bind`
     */
    warn(message?: any, ...optionalArgs: any[]): void;
    /**
     * Log a `debug` level message
     *
     * @decorator `@bind`
     */
    debug(message?: any, ...optionalArgs: any[]): void;
    /**
     * Log and display an error.
     *
     * @remark
     * This error is fatal and will kill the process
     *
     * @decorator `@bind`
     */
    error(message?: any, ...optionalArgs: any[]): void;
}

export declare namespace Framework {
    /**
     * Hash of a given object type
     */
    export type Index<T = any> = {
        [key: string]: T;
    };
    /**
     * Compilation mode
     */
    export type Mode = 'production' | 'development';
    /**
     * Registered loaders
     */
    export interface Loaders extends Framework.Index<Build.Loader> {
    }
    /**
     * Registered items
     */
    export interface Items extends Framework.Index<Build.Item> {
    }
    /**
     * Registered rules
     */
    export interface Rules extends Framework.Index<Build.Rule> {
    }
    /**
     * Registered locations
     */
    export interface Locations extends Framework.Index<string> {
        project: string;
        src: string;
        dist: string;
        publicPath: string;
        storage: string;
        modules: string;
    }
    /**
     * Registered services
     */
    export interface Services extends Index<new (app: Framework) => Service> {
    }
    /**
     * Registered compilers
     */
    export interface Instances extends Index<Framework> {
    }
    /**
     * Registered extensions
     */
    export interface Extensions extends Partial<Index<Module | WebpackPlugin>> {
    }
    /**
     * Framework Constructor
     */
    export type Constructor = new (options: Options) => Framework;
    export interface Options {
        /**
         * @virtual
         */
        name: string;
        /**
         * @virtual
         */
        mode?: Framework.Mode;
        /**
         * @virtual
         */
        config?: Configuration;
        /**
         * @virtual
         */
        services?: Framework.Services;
        /* Excluded from this release type: parent */
    }
    /**
     * Callback which accepts Framework as a parameter
     */
    export interface Tapable<T = Framework> {
        (value?: T): any;
    }
}

/**
 * Generic type defining the {@link Service.bindClass} map of
 * {@link Class} types to {@link Framework} property keys
 *
 * @public
 */
declare interface GenericClassMap {
    [key: string]: Class<any> | [Class<any>, any[]];
}

/**
 * Generic type defining the {@link Service.macro} map of
 * {@link CallableFunction} types to {@link Framework} property keys
 */
declare interface GenericFunctionMap {
    [key: string]: CallableFunction;
}

/**
 * Generic typing for a {@link Service} key-value store
 *
 * @public
 */
declare interface GenericRepository {
    [key: string]: any;
}

export declare interface get {
    (this: Framework, name: string, tap?: (app: Framework) => Framework): Framework;
}

export declare interface get {
    (name: string, tap?: (app: Framework) => Framework): Framework;
}

export declare const get: get;

/**
 * Service allowing for fitering {@link Framework} values through callbacks.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```js
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
 * ```js
 * hooks.on(
 *   'build/output/filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
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
     */
    on(id: Hooks.Name, callback: Hooks.Hook): Framework;
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
     */
    filter<T = any>(id: Hooks.Name, seed?: any): T;
}

export declare namespace Hooks {
    /**
     * Hook signature
     */
    export type Hook<T = any> = ((value?: T) => T) | T;
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
    export type LocationKeys = `location/${keyof Framework.Locations & string}`;
    export type LoaderKeys = `loader` | `loader/${keyof Build.Loaders}`;
    export type ItemKeys = `item` | `item/${keyof Build.Items}` | `item/${keyof Build.Items}/loader` | `item/${keyof Build.Items}/options` | `item/${keyof Build.Items}/options/${string}`;
    export type RuleKeys = `rule` | `rule/${keyof Build.Rules}` | `rule/${keyof Build.Rules}/${keyof Webpack.RuleSetRule}` | `rule/${keyof Build.Rules}/${keyof Webpack.RuleSetRule & `options`}/${string}`;
    export namespace BuildHooks {
        export type Rules = Webpack.Configuration['module']['rules'];
        export interface RulesOverride extends Rules {
            oneOf: Webpack.RuleSetRule;
        }
        export type Optimization = Webpack.Configuration['optimization'];
        export interface OptimizationOverride extends Optimization {
            splitChunks: {
                cacheGroups: any;
            };
        }
        export interface Config extends Webpack.Configuration {
            mode?: Framework.Mode;
            module?: {
                noParse?: RegExp | RegExp[] | ((content: string) => boolean);
                parser: any;
                rules?: RulesOverride;
            };
            optimization?: OptimizationOverride;
            parallelism?: Webpack.Configuration['parallelism'];
        }
        export type Dive<T, S> = {
            [K in keyof T as `build/${S & string}/${K & string}`]: T[K];
        };
        export type Keys = `build` | `build/${keyof Config}` | keyof Dive<Config['output'], 'output'> | 'build/output/pathInfo' | keyof Dive<Config['module'], 'module'> | keyof Dive<Config['module']['rules'], 'module/rules'> | keyof Dive<Config['module']['rules']['oneOf'], 'module/rules/oneOf'> | 'build/module/rules/parser' | keyof Dive<Config['resolve'], 'resolve'> | keyof Dive<Config['resolveLoader'], 'resolveLoader'> | 'build/cache/name' | 'build/cache/cacheLocation' | 'build/cache/cacheDirectory' | 'build/cache/hashAlgorithm' | 'build/cache/managedPaths' | 'build/cache/version' | 'build/cache/type' | 'build/cache/buildDependencies' | keyof Dive<Config['experiments'], 'experiments'> | keyof Dive<Config['watchOptions'], 'watchOptions'> | keyof Dive<Config['performance'], 'performance'> | keyof Dive<Config['optimization'], 'optimization'> | keyof Dive<Config['optimization']['splitChunks'], 'optimization/splitChunks'> | keyof Dive<Config['optimization']['splitChunks']['cacheGroups'], 'optimization/splitChunks/cacheGroups'> | keyof Dive<Config['optimization']['splitChunks']['cacheGroups']['vendor'], 'optimization/splitChunks/cacheGroups/vendor'>;
            {};
    }
    /**
     * Hooks.Extension
     */
    export namespace Extension {
        export type Keys = keyof {
            [K in keyof Framework.Extensions as `extension` | `extension/${K}` | `extension/${K}/${`${keyof Module & string}` | `${keyof Module & string}/${string}`}`]: Module | WebpackPlugin;
        };
    }
    /**
     * @hidden
     */
    export type Name = `before` | `after` | `done` | `${ItemKeys}` | `${LocationKeys}` | `${LoaderKeys}` | `${RuleKeys}` | `${Extension.Keys}` | `${BuildHooks.Keys}`;
        {};
}

/**
 * Cache service Interface
 *
 * @public
 */
declare interface Interface {
    /**
     * Dependencies which should be checked to determine cache validity.
     */
    buildDependencies(): string[];
    /**
     * Directory used to store cache files
     */
    directory(): string;
    /**
     * Hash of config files and build dependencies
     */
    hash(): string;
    /**
     * A short, unique string created from the hashed contents of the project
     * config files and build dependencies.
     */
    version(): string;
}

/**
 * Peer dependencies
 */
declare interface Interface_2 {
    /**
     * Project instance.
     */
    project: Project.Interface;
    /**
     * Collect packages.
     */
    discover(type: 'dependencies' | 'devDependencies'): this;
    /**
     * Register discovered packages as extensions
     */
    registerDiscovered(): void;
    /**
     * Returns path for a module name (if findable)
     */
    resolvePeerByName(name: string): string;
    /**
     * Returns manifest for a module from name (if findable)
     */
    getPeerManifest(name: string): {
        [key: string]: any;
    };
    /**
     * Returns true if a module is a bud
     */
    isExtension(name: string): boolean;
    /**
     * Registers all bud related extensions with bud.extensions
     */
    registerDiscovered(): void;
    /**
     * Install packages
     */
    install(): void;
}

/**
 * Peer service interface
 *
 * @virtual
 * @public
 */
declare interface Interface_3 extends Service {
    /**
     * Array of paths for webpack to resolve modules from
     *
     * @virtual
     */
    resolveFrom: string[];
    /**
     * Peer module related utilities
     *
     * @virtual
     */
    peers: Peers.Interface;
    /**
     * Get aggregated project info
     *
     * @virtual
     */
    getProjectInfo(): {
        [key: string]: any;
    };
    /**
     * Returns a boolean representing if
     * the project has a given pkg listed as a dependency
     * or devDependency
     *
     * @virtual
     */
    hasPeerDependency(pkg: string): boolean;
}

declare type Key = `${keyof Framework.Extensions & string}`;

/**
 * @noInherit
 */
export declare interface Logger extends Service {
    name: 'logger';
    /**
     * Logger instance
     */
    instance: Signale;
}

export declare function make(name: string, tap?: Framework.Tapable): Framework;

export declare interface make {
    (name: string, tap?: Framework.Tapable): Framework;
}

/**
 * A {@link Framework} extension
 */
export declare interface Module<Plugin = any, Options = any> {
    /**
     * The module name
     */
    name?: Module.Name;
    /**
     * Options registered to the extension module
     */
    options?: Module.Options<Options>;
    /**
     * General purpose callback. Called first.
     */
    register?: Module.Register;
    /**
     * General purpose callback. Called after everything else.
     */
    boot?: Module.Boot;
    /**
     * Objects to bind to the framework.
     */
    api?: Module.Api;
    /**
     * Returns an instantiated webpack plugin
     *
     * @deprecated Convert this instance to a {@link WebpackPlugin}
     */
    make?: Module.Make<Plugin, Options>;
    /**
     * Webpack plugin apply.
     *
     * @deprecated Convert this instance to a {@link WebpackPlugin}
     */
    apply?: CallableFunction;
    /**
     * Returns a boolean determining if
     * a webpack plugin should be used in
     * compilation.
     *
     * @deprecated Convert this instance to a {@link WebpackPlugin}
     */
    when?: Module.When<Options>;
}

export declare namespace Module {
    export type Name = keyof Framework.Extensions;
    export type Api = ((app: Framework) => {
        [key: string]: any;
    }) | {
        [key: string]: any;
    };
    export type Boot = (app: Framework) => any;
    export type Register = (app: Framework) => any;
    export type Config = (app: Framework) => any;
    export type Options<T = any> = T | ((app: Framework) => T);
    export type Make<Plugin = any, Opts = any> = (options?: Container<Opts>, app?: Framework) => Plugin;
    export type When<T = any> = ((app: Framework, opt?: Container<T>) => boolean) | boolean;
}

export declare interface path {
    (this: Framework, key: keyof Framework.Locations & string, ...path: string[]): string;
}

export declare interface path {
    (key: keyof Framework.Locations & string, ...path: string[]): string;
}

export declare const path: path;

/**
 * A Bud related peer dependency
 */
declare interface Peer {
    /**
     * The module/extension which uses this peer
     */
    source: string;
    /**
     * The peer module name
     */
    name: string;
    /**
     * The peer module version
     */
    ver: string;
    /**
     * The peer module type
     */
    type: 'dependencies' | 'devDependencies';
}

declare namespace Peers {
    export {
        Peer,
        Repository,
        Abstract_3 as Abstract,
        Interface_2 as Interface
    }
}
export { Peers }

export declare function pipe<T = Framework>(fns: Callback<T>[], value?: T): T;

export declare interface pipe {
    <T = Framework>(fns: Callback<T>[], value?: T): T;
}

declare namespace Project {
    export {
        Abstract_2 as Abstract,
        Interface_3 as Interface
    }
}
export { Project }

declare interface Repository {
    name: string;
    peers: {
        [key: string]: Peer;
    };
    extensions: {
        [key: string]: Peer;
    };
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}

export declare function sequence<T = Framework>(this: Framework, fns: Callback_2[], value?: T): Framework;

export declare interface sequence {
    <T = Framework>(this: Framework, fns: Callback_2[], value?: T): Framework;
}

export declare interface Server extends Service {
    /**
     * Registered server middlewares
     */
    middleware: Server.Middleware.Inventory;
    /**
     * Assets
     */
    assets: string[];
    /**
     * Server instance
     */
    application: Server.Application;
    /**
     * Server instance
     */
    instance: Server.Instance;
    /**
     * Server configuration
     */
    config: Server.Config;
    /**
     * Has files to watch and watch is enabled
     */
    isWatchable: boolean;
    /**
     * Watcher instance
     */
    watcher: {
        [key: string]: any;
        close: CallableFunction;
        on: CallableFunction;
    };
    /**
     * Retrieve an array of watched files.
     */
    getWatchedFilesArray(): string[];
    /**
     * Run the server instance
     */
    run(): this;
    /**
     * Inject client scripts innto compilation (HMR, dev experience)
     */
    inject(): void;
    /**
     * Close the server connection
     */
    close(): void;
}

export declare namespace Server {
    /**
     * Server application
     */
    export type Application = Application;
    /**
     * Server instance
     */
    export type Instance = Server_2;
    /**
     * Webpack compiler
     */
    export type Compiler = Webpack.Compiler | Webpack.MultiCompiler;
    /**
     * Middleware
     */
    export type Middleware = any;
    export namespace Middleware {
        export interface Inventory {
            [key: string]: Middleware;
        }
        export interface Options {
            config: Config;
            compiler: Compiler;
        }
        export type Init = (options: Options) => Middleware;
        export type Proxy = Proxy_2.RequestHandler & Handler;
        export interface Target {
            host: string;
            port: number;
        }
    }
    /**
     * Configuration container
     */
    export type Config = Container<Configuration>;
    /**
     * Server configuration
     */
    export interface Configuration {
        /**
         * Enabled middlewares
         */
        middleware?: {
            [key: string]: boolean;
        };
        /**
         * The development server host
         * @default localhost
         */
        host?: string;
        /**
         * The development server port
         * @default 3000
         */
        port?: number;
        /**
         * Proxy destination
         */
        proxy?: {
            /**
             * Proxy destination host
             * @default localhost
             */
            host?: string;
            /**
             * Proxy destination port
             * @default 8000
             */
            port?: number;
        };
        /**
         * Files which should reload the browser when changed.
         */
        watch?: {
            files: string[];
            options: WatchOptions;
        };
        /**
         * Client features
         */
        browser?: {
            log?: boolean;
            indicator?: boolean;
            overlay?: boolean;
        };
        /**
         * The index path for web server, defaults to "index.html".
         */
        index?: DevMiddleware.Options['index'];
        /**
         * The path that the middleware is bound to.
         */
        publicPath?: DevMiddleware.Options['publicPath'];
        /**
         * Filename to serve as index.
         */
        filename?: string;
        /**
         * This property for  passing  custom
         * HTTP headers on each request.
         *
         * @example
         *
         * ```json
         * { "X-Custom-Header": "yes" }
         * ```
         */
        headers?: DevMiddleware.Options['headers'];
        /**
         * This property for  passing  the
         * list of HTTP request methods accepted
         *
         *  @example
         *
         * ```json
         * ['GET', 'HEAD']
         * ```
         */
        methods?: DevMiddleware.Options['methods'];
        /**
         * This property for  to register custom
         * mime types or extension mappings
         */
        mimeTypes?: DevMiddleware.MimeTypeMap;
        /**
         * Escape hatch for Webpack's host check security feature.
         */
        disableHostCheck?: DevMiddleware.Options[];
    }
}

/**
 * Atomic unit of {@link Framework} functionality.
 *
 * @remarks
 * Services extend {@link Bootstrapper}, which provides {@link @roots/container#Container} and {@link Framework} access
 *
 * A {@link Service} is tapped through a series of callbacks at different points in the build.
 * Note that all of these callbacks are optional:
 *
 * - {@link Service.bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
 * - {@link Service.bootstrapped} is called once all Services have been instantiated.
 * - {@link Service.register} is intended for Services to register functionalities, modules, and bind functions and classes.
 * - {@link Service.registered} is called after all {@link Service.register} callbacks are complete.
 * - {@link Service.boot} is called once all services are registered. It should be safe for Services to reference one another.
 * - {@link Service.booted} is called after all {@link Service.boot} callbacks are complete.
 *
 * @typeParam Repository - {@link Repository} typing, if applicable
 *
 * @virtual
 * @public
 */
export declare abstract class Service<Repository = GenericRepository> extends Bootstrapper<Repository> {
    /**
     * Lifecycle method: bootstrap
     *
     * @remarks
     * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
     *
     * @virtual
     */
    bootstrap?(app: Framework): any;
    /**
     * Lifecycle method: bootstrapped
     *
     * @remarks
     * `bootstrapped` is called once all Services have been instantiated.
     *
     * @virtual
     */
    bootstrapped?(app: Framework): any;
    /**
     * Lifecycle method: register
     *
     * @remarks
     * `register` is intended for Services to register functionalities, modules, and bind functions and classes.
     *
     * @virtual
     */
    register?(app: Framework): any;
    /**
     * Lifecycle method: registered
     *
     * @remarks
     * `registered` is called after all {@link Service.register} callbacks are complete.
     *
     * @virtual
     */
    registered?(app: Framework): any;
    /**
     * Lifecycle method: boot
     *
     * @remarks
     * `boot` is called once all services are registered. It should be safe for Services to reference one another.
     *
     * @virtual
     */
    boot?(app: Framework): any;
    /**
     * Lifecycle method: booted
     *
     * @remarks
     * `booted` is called after all {@link Service.boot} callbacks are complete.
     *
     * @virtual
     */
    booted?(app: Framework): any;
    /**
     * Class constructor
     */
    constructor(app: Framework);
    /**
     * Bind a {@link CallableFunction} to the {@link Framework}
     *
     * @example
     * Bind a function named `fooFn` to `app.foo`
     *
     * ```js
     * app.service.bindClass({foo: fooFn})
     * ```
     *
     * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
     *
     * @decorator `@bind`
     */
    bindMacro<FunctionMap = GenericFunctionMap>(properties: FunctionMap): void;
    /**
     * Bind a {@link Class} to the {@link Framework}.
     *
     * @remarks
     * Constructor parameters can be specified using an array.
     *
     * @example
     * Bind a Class named `FooClass` to `app.Foo`:
     *
     * ```js
     * app.service.bindClass({Foo: FooClass})
     * ```
     *
     * Specify constructor parameters with a tuple:
     *
     * ```js
     * app.service.bindClass({bindingName: [BindingClass, foo, bar]})
     * ```
     *
     * @typeParam Binding - Map of {@link Framework} keys to {@link Class} types
     * @decorator `@bind`
     */
    bindClass<ClassMap = GenericClassMap>(properties: ClassMap): void;
}

export declare function setPath(this: Framework, ...args: any[]): Framework;

export declare interface setPath {
    (this: Framework, ...args: any[]): Framework;
}

/**
 * Options container store
 */
export declare class Store<T = Configuration> extends Service<T> {
    /**
     * {@inheritDoc Service.Repository}
     */
    name: string;
    /**
     * {@inheritDoc @roots/container#Container.get}
     *
     * @override
     */
    get<T = any>(path: keyof Store.Repository): T;
}

export declare namespace Store {
    export type Keys = `${keyof Configuration & string}` | `theme.${keyof Configuration['theme'] & string}` | `theme.screens` | `theme.colors.${keyof Configuration['theme']['colors'] & string}` | `server.${keyof Configuration['server'] & string}` | `server.middleware.${keyof Configuration['server']['middleware'] & string}` | `server.browser.${keyof Configuration['server']['browser'] & string}` | `server.${keyof Configuration['server'] & string}.${string}` | `env.${string}` | `location.${keyof Configuration['location'] & string}` | `patterns.${keyof Configuration['patterns'] & string}` | `build.${keyof Webpack.Configuration}` | `build.module.${keyof Webpack.Configuration['module']}` | `build.module.${keyof Webpack.Configuration['module']}.${string}` | `extension.${string}` | `build.${keyof Webpack.Configuration}.${string}`;
    export type Repository = {
        [K in Store.Keys & string]?: any;
    };
}

export declare interface tap<T = Framework> {
    (fn: Framework.Tapable<T>, bound?: boolean): T;
}

export declare const tap: tap<Framework>;

export declare interface WebpackPlugin<ApplyConstructor = {
    apply: any;
}, Options = any> extends Module {
    /**
     * Returns an instantiated webpack plugin
     */
    make?: Module.Make<ApplyConstructor & {
        apply: any;
    }, Options>;
    /**
     * Webpack plugin apply.
     */
    apply?: CallableFunction;
    /**
     * Returns a boolean determining if a webpack plugin should be used in compilation.
     */
    when?: Module.When<Options>;
}

export declare function when(this: Framework, test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;

export declare interface when {
    (this: Framework, test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;
}

export { }
