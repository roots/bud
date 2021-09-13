/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks

 * The {@link @roots/bud-framework# | @roots/bud-framework} package defines the abstract {@link Framework} class
 * and provides interfaces for the Framework's essential {@link Service} classes.
 *
 * {@link (Framework:class)} is an abstract class providing contracts for {@link Service} implementations.
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

/**
 * Cache service abstract class
 *
 * @public @core @container
 */
declare abstract class Abstract extends Service implements Cache_2.Interface {
    /**
     * Dependencies which should be checked to determine cache validity.
     *
     * @public
     */
    abstract buildDependencies(): string[];
    /**
     * Directory used to store cache files
     *
     * @public
     */
    abstract directory(): string;
    /**
     * Hash of config files and build dependencies
     *
     * @public
     */
    abstract hash(): string;
    /**
     * A short, unique string created from the hashed contents of the project
     * config files and build dependencies.
     *
     * @public
     */
    abstract version(): string;
}

/**
 * Peer service abstract class
 *
 * @public @core @container
 */
declare abstract class Abstract_2 extends Service<Peers.Repository> {
    /**
     * Array of paths for webpack to resolve modules from
     *
     * @public
     */
    resolveFrom: string[];
    /**
     * Peer module related utilities
     *
     * @public
     */
    abstract peers: Peers.Interface;
    /**
     * Get aggregated project info
     *
     * @public
     */
    abstract getProjectInfo(): {
        [key: string]: any;
    };
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
 * Peer dependencies abstract class
 *
 * @public @core
 */
declare abstract class Abstract_3 implements Peers.Interface {
    /**
     * Project instance.
     *
     * @public
     */
    abstract project: Project.Interface;
    /**
     * Collect packages.
     *
     * @param type - type of packages to discover (devDependencies or dependencies)
     * @returns {@link Peers}
         *
         * @public
         */
     abstract discover(type: 'dependencies' | 'devDependencies'): this;
     /**
      * Register discovered packages as extensions
      *
      * @returns void
      *
      * @public
      */
     abstract registerDiscovered(): void;
     /**
      * Returns path for a module name (if findable)
      *
      * @param name - peer module name
      * @returns path to peer module
      *
      * @public
      */
     abstract resolvePeerByName(name: string): string;
     /**
      * Returns manifest for a module from name (if findable)
      *
      * @param name - peer module name
      * @returns manifest for peer module
      *
      * @public
      */
     abstract getPeerManifest(name: string): {
         [key: string]: any;
     };
     /**
      * Returns true if a module is bud-related
      *
      * @param name - peer module name
      * @returns true if a module is bud-related
      *
      * @public
      */
     abstract isExtension(name: string): boolean;
     /**
      * Install packages
      *
      * @returns void
      *
      * @public
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

    /* Excluded declaration from this release type: access */

    /**
     * API service container
     *
     * @public @core @container
     */
    export declare interface Api extends Service {
    }

    /**
     * First thing called by the {@link @roots/bud-framework#Framework | Framework}
     *
     * Initializes core {@link @roots/bud-framework#Service | Service instances} and
     * calls all lifecycle events
     *
     * @public
     */
    export declare function bootstrap(this: Framework): Framework;

    /* Excluded declaration from this release type: bootstrap */

    /**
     * Provides {@link @roots/container# | Container}
     * functionality and access to {@link (Framework:class) | Framework}.
     *
     * @public @core @container
     */
    export declare abstract class Bootstrapper<T = any> extends Container<T> {
        /* Excluded from this release type: _app */
        /**
         * Service identifier
         *
         * @public
         */
        name: any;
        /**
         * Access {@link (Framework:class) | Framework}
         *
         * @public @readonly
         */
        get app(): Framework;
        /**
         * Class constructor
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @public
         */
        constructor(app: Framework);
    }

    /**
     * Build container service interface
     *
     * @remarks
     * Generates a compiler config from {@link (Framework:namespace).Rules}
     *
     * The most current config is accessible through {@link (Build:interface).config}. If {@link (Build:interface).Config}
     * has never been built before, accessing the property will automatically build it.
     *
     * If the configuration has changed {@link (Build:interface).rebuild} can be called to regenerate the configuration.
     *
     * Most configuration values are produced using {@link (Framework:class).hooks} callbacks. They are keyed with strings starting `build/`.
     * So, you could access the webpack entry with `bud.hooks.filter('build/entry')`
     *
     * For typescript users who wish to maintain typing accuracy while adding support for
     * various loaders, items and rules:
     *
     * - {@link (Build:interface).loaders} should be declared by augmenting the {@link (Framework:namespace).Loaders} interface
     *
     * - {@link (Build:interface).items} should be declared by augmenting the {@link (Framework:namespace).Items} interface
     *
     * - {@link (Build:interface).rules} should be declared by augmenting the {@link (Framework:namespace).Rules} interface
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
     *
     * @public @core @container
     */
    export declare interface Build extends Service {
        /**
         * {@link (Build:namespace).Loaders | Loader registry}
         *
         * @public
         */
        loaders: Build.Loaders;
        /**
         * {@link (Build:namespace).Items | Item registry}
         *
         * @public
         */
        items: Build.Items;
        /**
         * {@link (Build:namespace).Rules | Rule registry}
         *
         * @public
         */
        rules: Build.Rules;
        /**
         * Accesses the compiler configuration
         *
         * @public
         */
        config: Webpack.Configuration;
        /**
         * Regenerate the compiler configuration
         *
         * @public
         */
        rebuild(): Webpack.Configuration;
    }

    /**
     * Build namespace
     *
     * @internalRemarks
     * Todo: Move all these definitions out of this namespace
     *
     * @public
     */
    export declare namespace Build {
        /**
         * Registered loaders
         *
         * @public
         */
        export interface Loaders extends Framework.Index<Loader> {
            [key: string]: Loader;
        }
        /**
         * Registered items
         *
         * @public
         */
        export interface Items extends Framework.Index<Item> {
            [key: string]: Item;
        }
        /**
         * Registered rules
         *
         * @public
         */
        export interface Rules extends Framework.Index<Rule> {
            [key: string]: Rule;
        }
        /**
         * Makes a Webpack loader
         *
         * @public
         */
        export interface Loader {
            /**
             * Returns {@link Loader.Output}
             *
             * @public
             */
            make(app: Framework): string;
        }
        /**
         * Makes a {@link Webpack.RuleSetRule.use} item
         *
         * @public
         */
        export interface Item {
            /**
             * Set the {@link Loader}
             *
             * @public
             */
            setLoader(loader: (app?: Framework) => Build.Loader): void;
            /**
             * Set the {@link (Build:namespace).Item.OptionsFn}
             *
             * @public
             */
            setOptions(options: Build.Item.OptionsFn): void;
            /**
             * Merge {@link (Build:namespace).Item.Options} with existing options
             *
             * @public
             */
            mergeOptions(options: Build.Item.Options, app: Framework): void;
            /**
             * Makes the {@link Webpack.RuleSetRule.use} item
             *
             * @public
             */
            make(app: Framework): Build.Item.Output;
        }
        /**
         * Makes a Rule
         *
         * @public
         */
        export interface Rule {
            /**
             * Wrapping {@link Webpack.RuleSetRule.test}
             *
             * @public
             */
            test?: (app?: Framework) => Webpack.RuleSetRule['test'];
            /**
             * Returns an array of {@link (Build:namespace).Item} values
             *
             * @remarks
             * each of the returned values is to be built with {@link (Build:namespace).Item.make}
             * to produce {@link Webpack.RuleSetRule.use} compatible output.
             *
             * @public
             */
            use?: (app?: Framework) => Item[];
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
            setTest(test: RegExp | Rule.TestFn): void;
            /**
             * Get the value of `use`
             *
             * @public
             */
            getUse(app: Framework): Item[];
            /**
             * Set the value of `use`
             *
             * @public
             */
            setUse(use: Rule.UseFn): void;
            /**
             * Get the value of `exclude`
             *
             * @public
             */
            getExclude(app: Framework): Rule.Output['exclude'];
            /**
             * Set the value of `exclude`
             *
             * @public
             */
            setExclude(exclude: Rule.ExcludeFn | RegExp): void;
            /**
             * Get the value of `type`
             *
             * @public
             */
            getType(app: Framework): Rule.Output['type'];
            /**
             * Set the value of `type`
             *
             * @public
             */
            setType(type: string | Rule.TypeFn): void;
            /**
             * Get the value of `parser`
             *
             * @public
             */
            getParser(app: Framework): Rule.Parser;
            /**
             * Set the value of `parser`
             *
             * @public
             */
            setParser(parser: Rule.Parser | Rule.ParserFn): void;
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
            setGenerator(Generator: any | Rule.GeneratorFn): void;
            /**
             * Returns final {@link RuleSetRule} for inclusion in {@link (Build:interface).config}
             *
             * @public
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
     * Compiles {@link (Framework:class).build | Framework.build} configuration
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
         * @remarks
         * The {@link (Framework:class) | Framework} compiler should always be
         * specified in a multi-compiler format (wrap a standard configuration
         * in an array).
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
        compile(): Compiler.Instance;
        /**
         * Callback for {@link (Framework:namespace).Hooks | Framework.Hooks} `before` filter
         *
         * @remarks
         * Parses {@link (Framework:namespace).Build.config} instances and generates final input for {@link (Compiler:interface).compile | Compiler.compile}
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

    /* Excluded declaration from this release type: Compiler */

    /**
     * Framework base configuration
     *
     * @remarks
     * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
     * It is recommended to use {@link @roots/bud-framework#Hooks.on} to extend the configuration.
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
         * Shared regular expressions for pattern matching.
         *
         * @example
         * ```js
         * app.patterns.get('js')
         * ```
         *
         * @public
         */
        patterns: {
            [key: string]: RegExp;
        };
        /**
         * Registered fs directories
         *
         * @public
         */
        location: Framework.Locations;
        /**
         * Feature toggle: enable or disable the command line interface
         *
         * @defaultValue true
         *
         * @public
         */
        cli: boolean;
        /**
         * Feature toggle: Clean dist before compilation
         *
         * When enabled stale assets will be removed from
         * the `location/dist` directory prior to the next
         * compilation.
         *
         * @defaultValue true
         *
         * @public
         */
        clean: boolean;
        /**
         * Feature: produce webpack.debug.js artifact
         *
         * When enabled a `webpack.debug.js` artifact will be
         * emitted to the `location/storage` directory.
         *
         * @defaultValue true
         *
         * @public
         */
        debug: boolean;
        /**
         * Discover: automatically register locatable extensions
         *
         * When enabled, any discovered extensions will be automatically
         * initialized.
         *
         * @defaultValue false
         *
         * @public
         */
        discover: boolean;
        /**
         * Enable or disable filename hashing
         *
         * @defaultValue false
         *
         * @public
         */
        hash: boolean;
        /**
         * Emit html template
         *
         * @defaultValue true
         *
         * @public
         */
        html: boolean;
        /**
         * Automatically install peer dependencies
         *
         * @defaultValue false
         *
         * @public
         */
        install: boolean;
        /**
         * Log to console
         *
         * @defaultValue false
         *
         * @public
         */
        log: boolean;
        /**
         * Enable or disable producing a manifest.json file
         *
         * @defaultValue true
         *
         * @public
         */
        manifest: boolean;
        /**
         * Enable or disable file minification
         *
         * @defaultValue true
         *
         * @public
         */
        minimize: boolean;
        /**
         * File format
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
         * Initial webpack configuration values
         *
         * @public
         */
        build: Partial<Webpack.Configuration>;
        /**
         * Initial options for registered extensions
         *
         * @public
         */
        extension: {
            [key: string]: any;
        };
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
                foreground: Configuration.TermColor;
                /**
                 * Grayed out text color
                 *
                 * @public
                 */
                faded: Configuration.TermColor;
                /**
                 * Primary color
                 *
                 * @public
                 */
                primary: Configuration.TermColor;
                /**
                 * Variant of primary color (for gradients, etc.)
                 *
                 * @public
                 */
                primaryAlt: Configuration.TermColor;
                /**
                 * Error color
                 *
                 * @public
                 */
                error: Configuration.TermColor;
                /**
                 * Variant of error color (for gradients, etc.)
                 *
                 * @public
                 */
                errorAlt: Configuration.TermColor;
                /**
                 * Warning color
                 *
                 * @public
                 */
                warning: Configuration.TermColor;
                /**
                 * Success color
                 *
                 * @public
                 */
                success: Configuration.TermColor;
                /**
                 * Accent color
                 *
                 * @public
                 */
                accent: Configuration.TermColor;
                /**
                 * Flavor color
                 *
                 * @public
                 */
                flavor: Configuration.TermColor;
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
     * Configuration namespace
     *
     * @public
     */
    export declare namespace Configuration {
        /**
         * Can be either ansi-color or hex
         *
         * @public
         */
        export type TermColor = `#${string}` | `black` | `red` | `green` | `yellow` | `blue` | `magenta` | `cyan` | `white` | `gray` | `grey` | `blackBright` | `redBright` | `greenBright` | `yellowBright` | `blueBright` | `magentaBright` | `cyanBright` | `whiteBright`;
    }

    /* Excluded declaration from this release type: container */

    /**
     * Instantiates and returns a new {@link @roots/container#Container | Container}
     *
     * @public
     */
    export declare const container: <T = any>(repository?: T) => Container<T>;

    /**
     * Dashboard service container
     *
     * @public @core @container
     */
    export declare interface Dashboard extends Service {
        /**
         * Ink instance
         *
         * @public
         */
        instance: Instance;
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
        /**
         * Render error
         *
         * @param body - body of the error message
         * @param title - title of the error message
         * @returns void
         *
         * @public
         */
        renderError(body: string, title: string): void;
    }

    /**
     * Dependencies service container
     *
     * @public @core @container
     */
    export declare interface Dependencies extends Service {
        /**
         * Installation status
         *
         * @public @container
         */
        messages: Container;
        /**
         * Install dependencies
         *
         * @param dependencies - Array of dependencies to install
         *
         * @public
         */
        install(dependencies: {
            name: string;
            ver: string;
            source: string;
            type: 'dependencies' | 'devDependencies';
        }[]): void;
        /**
         * Returns a boolean indicating whether a dependency is
         * required to be installed.
         *
         * @param dep - Dependency name
         * @param type - The current installation target (dependencies or devDependencies)
         *
         * @returns true if the dependency should be installed opposite of expectations
         *
         * @public
         */
        overrideInstallTarget(dep: string, type: 'dependencies' | 'devDependencies'): boolean;
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
        getPublicEnv(): Framework.Index<any>;
    }

    /**
     * Extension controller instance
     *
     * @public @core
     */
    export declare interface Extension {
        /**
         * The application instance
         *
         * @public
         */
        app: Framework;
        /**
         * The module definining this extension
         *
         * @public
         */
        module: Module | WebpackPlugin;
        /**
         * The name of this extension
         *
         * @public
         */
        name: Module['name'] | WebpackPlugin['options'];
        /**
         * The extension objects
         *
         * @public
         */
        options: Module['options'] | WebpackPlugin['options'];
        /**
         * Callback determining if extension should be used during compilation
         *
         * @public
         */
        when: Module['when'];
        /**
         * Callback which returns a Plugin for compilation
         *
         * @public
         */
        make: Module['make'] | WebpackPlugin['make'];
        /**
         * A native plugin instance
         *
         * @public
         */
        apply: WebpackPlugin['apply'];
        /**
         * An extension registration function
         *
         * @public
         */
        register(): Extension;
        /**
         * An extension boot function
         *
         * @public
         */
        boot(): Extension;
        /**
         * Make an extension key from a simple {@link @roots/bud-framework#Module.name}
         */
        makeKey(key: `${keyof Framework.Extensions & string}`): Hooks.Name;
        /**
         * Get the value of an extension property
         */
        get(key: `${keyof Framework.Extensions & string}`): any;
        /**
         * Set the value of an extension property
         *
         * @returns void
         *
         * @public
         */
        set(key: `${keyof Framework.Extensions & string}`, value: any): void;
    }

    /**
     * Extensions Service interface
     *
     * @public @core
     */
    export declare interface Extensions extends Service<Partial<Framework.Extensions>> {
        /**
         * Add an extension
         *
         * @public
         */
        add(extension: Module | WebpackPlugin): void;
        /**
         * Get {@link PluginInstance} instances to be included in compilation
         *
         * @public
         */
        make(): PluginInstance[];
        /**
         * Get {@link Extension} instances slated for inclusion in compilation
         *
         * @public
         */
        getEligibleWebpackModules(): (Module | WebpackPlugin)[];
    }

    /**
     * Base {@link (Framework:class) | Framework} class
     *
     * @core @public
     */
    export declare abstract class Framework {
        /**
         * Concrete implementation of the {@link (Framework:class) | Framework}
         *
         * @public
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
         * @public
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
         * Parent {@link (Framework:class) | Framework} instance
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
         * {@link Container} of child {@link (Framework:class) | Framework} instances
         *
         * @remarks
         * Is `null` if the current instance is a child instance.
         *
         * @defaultValue null
         */
        children: Container<Framework.Instances> | null;
        /**
         * True when {@link (Framework:class) | Framework} has children
         *
         * @readonly
         */
        get hasChildren(): boolean;
        /**
         * Framework services
         *
         * @remarks
         * Can be set directly on the child instance or passed as a property in the {@link @roots/bud-framework#Framework.Options | Framework constructor options}.
         *
         * @public
         */
        services: Framework.Services;
        /**
         * Macros for assisting with common config tasks
         *
         * @public @container
         */
        api: Api;
        /**
         * Build configuration container
         *
         * @example
         * The `build.config` property holds the build config object:
         * ```js
         * build.config
         * ```
         *
         * @example
         * Rebuild the configuration:
         * ```js
         * build.rebuild()
         * ```
         *
         * @public
         */
        build: Build;
        /**
         * Determines cache validity and generates cache keys.
         *
         * @public
         */
        cache: Cache_2.Interface;
        /**
         * Compiles {@link Build} configuration and stats/errors/progress reporting.
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
         * Container service for {@link (Framework:class) | Framework} extensions.
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
         * Service allowing for fitering {@link (Framework:class) | Framework} values through callbacks.
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
        server: Server;
        /**
         * Container service for holding {@link @roots/bud-framework#Configuration} values
         *
         * @public
         */
        store: Store;
        /**
         * True when {@link Framework.mode | Framework.mode} is `production`
         *
         * @public
         */
        get isProduction(): boolean;
        /**
         * True when {@link Framework.mode | Framework.mode} is `development`
         *
         * @public
         */
        get isDevelopment(): boolean;
        /**
         * Class constructor
         *
         * @param options - {@link Framework.Options | Framework constructor options}
         *
         * @public
         */
        constructor(options: Framework.Options);
        /**
         * Bind method to {@link (Framework:class) | Framework instance}
         *
         * @public
         */
        bindMethod<T = Function>(key: string, method: T & Function): Framework;
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
        access: access;
        /**
         * Initializes and binds {@link Framework.services}
         *
         * @example
         * ```js
         * new FrameworkImplementation(...constructorParams).bootstrap()
         * ```
         *
         * @public
         */
        bootstrap: bootstrap;
        /**
         * Gracefully shutdown {@link (Framework:class) | Framework} and registered {@link Service | Service instances}
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
         * Returns a {@link (Framework:class) | Framework instance} from the {@link Framework.children | Framework.children} container
         *
         * @remarks
         * An optional {@link tap} function can be provided to configure the {@link (Framework:class) | Framework} instance.
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
         * Returns a {@link (Framework:namespace).Locations} value as an absolute path
         *
         * @public
         */
        path: path;
        /**
         * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
         *
         * @remarks
         * If no value is provided the value is assumed to be the {@link (Framework:class) | Framework} itself
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
         * Set a {@link (Framework:namespace).Locations | Framework.Locations} value
         *
         * @remarks
         * The {@link (Framework:namespace).Locations.project | `project` directory} should be an absolute path.
         * All other directories should be relative (src, dist, etc.)
         * @see {@link (Framework:namespace).Locations | Framework.Locations}
         *
         * @example
         * ```js
         * bud.setPath('src', 'custom/src')
         * ```
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
        sequence: typeof sequence;
        /**
         * Execute a callback
         *
         * @remarks
         * Callback is provided {@link (Framework:class) | the Framework instance} as a parameter.
         *
         * @example
         * ```js
         * bud.tap(bud => {
         *   // do something with bud
         * })
         * ```
         *
         * @example
         * Lexical scope is bound to {@link (Framework:class) | Framework} where applicable, so it is possible to reference the {@link (Framework:class) | instance} using `this`.
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
         * Log a message
         *
         * @public
         * @decorator `@bind`
         */
        log(message?: any, ...optionalArgs: any[]): void;
        /**
         * Log an `info` level message
         *
         * @public
         * @decorator `@bind`
         */
        info(message?: any, ...optionalArgs: any[]): void;
        /**
         * Log a `success` level message
         *
         * @public
         * @decorator `@bind`
         */
        success(message?: any, ...optionalArgs: any[]): void;
        /**
         * Log a `warning` level message
         *
         * @public
         * @decorator `@bind`
         */
        warn(message?: any, ...optionalArgs: any[]): void;
        /**
         * Log a `debug` level message
         *
         * @public
         * @decorator `@bind`
         */
        debug(message?: any, ...optionalArgs: any[]): void;
        /**
         * Log and display an error.
         *
         * @remarks
         * This error is fatal and will kill the process
         *
         * @public
         * @decorator `@bind`
         */
        error(message?: any, ...optionalArgs: any[]): void;
    }

    /* Excluded declaration from this release type: Framework */

    /**
     * Generic type defining the {@link Service.bindClass} map of
     * classes to {@link (Framework:class) | Framework} property keys
     *
     * @public
     */
    declare interface GenericClassMap {
        [key: string]: Class<any> | [Class<any>, any[]];
    }

    /**
     * Generic type defining the {@link Service.bindMacro} map of
     * callable function interfaces to {@link (Framework:class) | Framework} property keys
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

    /* Excluded declaration from this release type: get */

    /* Excluded declaration from this release type: get */

    /**
     * Retrieves a specific {@link Framework | Framework instance} by name.
     *
     * @public
     */
    export declare const get: get;

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
     *   'build/output/filename',
     *   () => '[name].[hash:4]',
     * )
     * ```
     *
     * @public @core
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
        /* Excluded from this release type: Name */
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
         *
         * @public
         */
        buildDependencies(): string[];
        /**
         * Directory used to store cache files
         *
         * @public
         */
        directory(): string;
        /**
         * Hash of config files and build dependencies
         *
         * @public
         */
        hash(): string;
        /**
         * A short, unique string created from the hashed contents of the project
         * config files and build dependencies.
         *
         * @public
         */
        version(): string;
    }

    /**
     * Peer dependencies interface
     *
     * @public
     */
    declare interface Interface_2 {
        /**
         * Project instance.
         *
         * @public
         */
        project: Project.Interface;
        /**
         * Collect packages.
         *
         * @public
         */
        discover(type: 'dependencies' | 'devDependencies'): this;
        /**
         * Register discovered packages as extensions
         *
         * @public
         */
        registerDiscovered(): void;
        /**
         * Returns path for a module name (if findable)
         *
         * @public
         */
        resolvePeerByName(name: string): string;
        /**
         * Returns manifest for a module from name (if findable)
         *
         * @public
         */
        getPeerManifest(name: string): {
            [key: string]: any;
        };
        /**
         * Returns true if a module is a bud
         *
         * @public
         */
        isExtension(name: string): boolean;
        /**
         * Registers all bud related extensions with bud.extensions
         *
         * @public
         */
        registerDiscovered(): void;
        /**
         * Install packages
         *
         * @public
         */
        install(): void;
    }

    /**
     * Peer service interface
     *
     * @public @core @container
     */
    declare interface Interface_3 extends Service {
        /**
         * Array of paths for webpack to resolve modules from
         *
         * @public
         */
        resolveFrom: string[];
        /**
         * Peer module related utilities
         *
         * @public
         */
        peers: Peers.Interface;
        /**
         * Get aggregated project info
         *
         * @public
         */
        getProjectInfo(): {
            [key: string]: any;
        };
        /**
         * Returns a boolean representing if
         * the project has a given pkg listed as a dependency
         * or devDependency
         *
         * @public
         */
        hasPeerDependency(pkg: string): boolean;
    }

    /**
     * Logger Service interface
     *
     * @public @core @container
     */
    export declare interface Logger extends Service {
        /**
         * {@inheritDoc @roots/bud-framework#Service.name}
         *
         * @public
         */
        name: 'logger';
        /**
         * Logger instance
         *
         * @public
         */
        instance: Signale;
    }

    /**
     * Makes a new {@link Framework} instance
     *
     * @public
     */
    export declare function make(name: string, tap?: Framework.Tapable): Framework;

    /* Excluded declaration from this release type: make */

    /**
     * A {@link Framework} extension
     *
     * @public @core
     */
    export declare interface Module<Plugin = any, Options = any> {
        /**
         * The module name
         *
         * @public
         */
        name?: Module.Name;
        /**
         * Options registered to the extension module
         *
         * @public
         */
        options?: Module.Options<Options>;
        /**
         * General purpose callback. Called first.
         *
         * @public
         */
        register?: Module.Register;
        /**
         * General purpose callback. Called after everything else.
         *
         * @public
         */
        boot?: Module.Boot;
        /**
         * Objects to bind to the framework.
         *
         * @public
         */
        api?: Module.Api;
        /**
         * Returns an instantiated webpack plugin
         *
         * @deprecated Convert this instance to a {@link WebpackPlugin}
         *
         * @public
         */
        make?: Module.Make<Plugin, Options>;
        /**
         * Webpack plugin apply.
         *
         * @deprecated Convert this instance to a {@link WebpackPlugin}
         *
         * @public
         */
        apply?: CallableFunction;
        /**
         * Returns a boolean determining if
         * a webpack plugin should be used in
         * compilation.
         *
         * @public
         */
        when?: Module.When<Options>;
    }

    /* Excluded declaration from this release type: Module */

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
            Abstract_3 as Abstract,
            Interface_2 as Interface
        }
    }
    export { Peers }

    export declare function pipe<T = Framework>(fns: Callback<T>[], value?: T): T;

    export declare interface pipe {
        <T = Framework>(fns: Callback<T>[], value?: T): T;
    }

    /**
     * Util
     */
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

    declare namespace Project {
        export {
            Abstract_2 as Abstract,
            Interface_3 as Interface
        }
    }
    export { Project }

    /**
     * Peer repository
     *
     * @public
     */
    declare interface Repository {
        /**
         * The project name
         *
         * @public
         */
        name: string;
        /**
         * Peers of this peer
         *
         * @public
         */
        peers: {
            [key: string]: Peer;
        };
        /**
         * Extensions of this peer
         *
         * @public
         */
        extensions: {
            [key: string]: Peer;
        };
        /**
         * Dependencies
         *
         * @public
         */
        dependencies: {
            [key: string]: string;
        };
        /**
         * Development dependencies
         *
         * @public
         */
        devDependencies: {
            [key: string]: string;
        };
    }

    export declare function sequence<T = Framework>(this: Framework, fns: Callback_2[], value?: T): Framework;

    export declare interface sequence {
        <T = Framework>(this: Framework, fns: Callback_2[], value?: T): Framework;
    }

    /**
     * Server service interface
     *
     * @public @core @container
     */
    export declare interface Server extends Service {
        /**
         * Registered server middlewares
         *
         * @public
         */
        middleware: Server.Middleware.Inventory;
        /**
         * Assets
         *
         * @public
         */
        assets: string[];
        /**
         * Server instance
         *
         * @public
         */
        application: Server.Application;
        /**
         * Server instance
         *
         * @public
         */
        instance: Server.Instance;
        /**
         * Server configuration
         *
         * @public
         */
        config: Server.Config;
        /**
         * Has files to watch and watch is enabled
         *
         * @public
         */
        isWatchable: boolean;
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
        getWatchedFilesArray(): string[];
        /**
         * Run the server instance
         *
         * @public
         */
        run(): this;
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
        close(): void;
    }

    /* Excluded declaration from this release type: Server */

    /**
     * Atomic unit of {@link (Framework:class) | Framework} functionality.
     *
     * @remarks
     *
     * A {@link Service} extends {@link Bootstrapper}, which provides {@link @roots/container#Container} and {@link (Framework:class) | Framework} access
     *
     * A {@link Service} is tapped through a series of callbacks at different points in the build.
     *
     * All of the callbacks are optional:
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
     * @public @core @container
     */
    export declare abstract class Service<Repository = GenericRepository> extends Bootstrapper<Repository> {
        /**
         * Lifecycle method: bootstrap
         *
         * @remarks
         * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
         *
         * @virtual @public
         */
        bootstrap?(app: Framework): any;
        /**
         * Lifecycle method: bootstrapped
         *
         * @remarks
         * Called once all {@link Service} instances are available.
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @virtual @public
         */
        bootstrapped?(app: Framework): any;
        /**
         * Lifecycle method: register
         *
         * @remarks
         * Intended for {@link Service} instances to register functionalities, modules, and bind functions and classes to the {@link (Framework:class) | Framework}.
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @virtual @public
         */
        register?(app: Framework): any;
        /**
         * Lifecycle method: registered
         *
         * @remarks
         * `registered` is called after all {@link Service.register} callbacks are complete.
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @virtual @public
         */
        registered?(app: Framework): any;
        /**
         * Lifecycle method: boot
         *
         * @remarks
         * `boot` is called once all services are registered. It should be safe for Services to reference one another.
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @virtual @public
         */
        boot?(app: Framework): any;
        /**
         * Lifecycle method: booted
         *
         * @remarks
         * `booted` is called after all {@link Service.boot} callbacks are complete.
         *
         * @param app - {@link (Framework:class) | Framework}
         *
         * @virtual @public @public
         */
        booted?(app: Framework): any;
        /**
         * Class constructor
         *
         * @param app - {@link (Framework:class) | Framework}
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
         * app.service.bindClass({
         *   bindingName: [BindingClass, foo, bar]
         * })
         * ```
         *
         * @typeParam Binding - Map of {@link Framework} keys to classes
         *
         * @decorator `@bind`
         */
        bindClass<ClassMap = GenericClassMap>(properties: ClassMap): void;
    }

    /**
     * Sets a path to a project directory
     *
     * @param this - {@link @roots/bud-framework#Framework}
     * @param args - strings
     *
     * @returns {@link @roots/bud-framework#Framework}
         */
     export declare function setPath(this: Framework, ...args: any[]): Framework;

     /* Excluded declaration from this release type: setPath */

     /**
      * Container store for initial configuration and general options
      *
      * @public @core @config
      */
     export declare class Store<T = Configuration> extends Service<T> {
         /**
          * {@inheritDoc @roots/bud-framework#Service.name}
          *
          * @public
          */
         name: string;
         /**
          * {@inheritDoc @roots/container#Container.get}
          *
          * @override
          */
         get<T = any>(path: keyof Store.Repository): T;
     }

     /* Excluded declaration from this release type: Store */

     export declare interface tap<T = Framework> {
         (fn: Framework.Tapable<T>, bound?: boolean): T;
     }

     export declare const tap: tap<Framework>;

     /**
      * Apply plugin
      *
      * @public
      */
     export declare interface WebpackPlugin<ApplyConstructor = {
         apply: any;
     }, Options = any> extends Module {
         /**
          * Returns an instantiated webpack plugin
          *
          * @public
          */
         make?: Module.Make<ApplyConstructor & {
             apply: any;
         }, Options>;
         /**
          * Webpack plugin apply.
          *
          * @public
          */
         apply?: CallableFunction;
         /**
          * Returns a boolean determining if a webpack plugin should be used in compilation.
          *
          * @public
          */
         when?: Module.When<Options>;
     }

     export declare function when(this: Framework, test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;

     export declare interface when {
         (this: Framework, test: ((app: Framework) => boolean) | boolean, trueCase: (app: Framework) => any, falseCase?: (app: Framework) => any): Framework;
     }

     export { }
