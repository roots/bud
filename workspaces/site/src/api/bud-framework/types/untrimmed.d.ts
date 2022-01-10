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
 * @packageDocumentation
 */

/// <reference types="express-serve-static-core" />
/// <reference types="node" />

import type { Class } from 'type-fest';
import { Compiler as Compiler_2 } from 'webpack';
import { Configuration } from 'webpack';
import { Container } from '@roots/container';
import { DefaultMethods } from 'signale';
import type { HighlightOptions } from '@roots/bud-support';
import { IncomingMessage } from 'http';
import type Ink from 'ink';
import { MultiCompiler } from 'webpack';
import { Options as Options_4 } from 'http-proxy-middleware';
import type { PrettyFormatOptions } from '@roots/bud-support';
import { PrettyFormatOptions as PrettyFormatOptions_2 } from 'pretty-format/build/types';
import { ProgressPlugin } from 'webpack';
import { RuleSetRule } from 'webpack';
import { Server as Server_2 } from 'http';
import { ServerResponse } from 'http';
import { Signale } from '@roots/bud-support';
import { Signale as Signale_2 } from 'signale';
import { SignaleConfig } from 'signale';
import { SignaleOptions } from 'signale';
import { Stats } from 'webpack';
import { StatsCompilation } from 'webpack';
import { StatsError } from 'webpack';
import { URL as URL_2 } from 'url';
import { ValueOf } from 'type-fest';
import * as Webpack from 'webpack';
import { default as Webpack_2 } from 'webpack';

/**
 * @internal
 */
export declare interface Api<T = Record<string, (...args: unknown[]) => Framework>> extends Service<T> {
    /**
     * @internal
     */
    trace: Array<[string, ...any[]]>;
    /**
     * @internal
     */
    queue: Array<[string, ...any[]]>;
    /**
     * @internal
     */
    call: (name: string, ...args: any[]) => Promise<void>;
    /**
     * @internal
     */
    processQueue: () => Promise<void>;
    /**
     * @internal
     */
    bindFacade: (key: `${keyof Api['repository'] & string}`) => void;
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
 * Bind a {@link CallableFunction} to the {@link Framework}
 *
 * @example
 * Bind a function named `fooFn` to `app.foo`
 *
 * ```js
 * app.service.bindClass({foo: fooFn})
 * ```
 *
 * @remarks
 * You should also override the {@link @roots/bud-framework# | '@roots/bud-framework' module} to ensure
 * that your function typings are correctly implemented and exported.
 *
 * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
 *
 * @public
 * @decorator `@bind`
 */
declare function bindMethod<FunctionMap = GenericFunctionMap>(properties: FunctionMap): Framework;

declare interface bindMethod {
    <FunctionMap = GenericFunctionMap>(properties: FunctionMap): Framework;
}

/**
 * Base service class
 *
 * @public
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
 * Generates a compiler config from {@link Build.rules}
 *
 * The most current config is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the webpack entry with `bud.hooks.filter('build.entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Build.loaders} interface
 *
 * - {@link Build.items} should be declared by augmenting the {@link Framework.Items} interface
 *
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
 * bud.hooks.filter('build.entry')
 * ```
 *
 * @public
 */
declare interface Build_2 extends Service {
    /**
     * {@link Build.loader} array
     *
     * @public
     */
    loaders: Loaders;
    /**
     * {@link Build.item} array
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
    config: Webpack.Configuration;
    /**
     * Make the configuration object
     *
     * @public
     */
    make(): Promise<Webpack.Configuration>;
    /**
     * Set a rule
     *
     * @public
     */
    setRule(name: string, constructorProperties?: Partial<Rule.Options>): Rule.Interface;
    /**
     * Make a new rule
     *
     * @public
     */
    makeRule(constructorProperties?: Partial<Rule.Options>): Rule.Interface;
}

/**
 * Build container service interface
 *
 * @remarks
 * Most configuration values are run through {@link Hooks.filter} and {@link Hooks.promised} callbacks.
 *
 * @public
 */
declare abstract class Build_3 extends Service {
    /**
     * {@link Build.loader} array
     *
     * @public
     */
    loaders: Loader.Interface[];
    /**
     * {@link Build.item} array
     *
     * @public
     */
    items: Item.Interface[];
    /**
     * {@link Build.rule} array
     *
     * @public
     */
    rules: Rule.Interface[];
    /**
     * Make the configuration object
     *
     * @public
     */
    abstract make: () => Webpack.Configuration;
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
 * @public
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
    export type Config = Configuration;
    export type Instance = Compiler_2 | MultiCompiler;
    export type Progress = any;
    export namespace Progress {
        export type Handler = ProgressPlugin['handler'];
    }
}

declare interface CompilerConfig extends Partial<Webpack_2.Configuration> {
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
 * Server configuration
 *
 * @public
 */
declare interface Configuration_2 {
    /**
     * Enable middleware
     *
     * @public
     */
    middleware: Record<string, boolean>;
    /**
     * Development server URL
     *
     * @public
     */
    dev: {
        url: URL_2;
    };
    /**
     * Development server URL
     *
     * @public
     */
    proxy: {
        url: URL_2;
    };
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
        files: Array<string>;
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
    options?: Maybe<[Framework], Options_2>;
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
 * @public
 */
export declare interface Dashboard extends Service {
    /**
     * CLI framework
     *
     * @public
     */
    instance: Ink.Instance;
    stdout?: Array<string>;
    stderr?: Array<string>;
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
     * Rerender
     *
     * @param Component - Component or string to render
     * @param title - Title to render
     * @returns void
     *
     * @public
     */
    rerender(): Promise<void>;
}

/**
 * Dependencies service container
 *
 * @public
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
 * @public
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
 *  @public
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
    enqueue(extension: CompilerPlugin | Module_2): Framework;
    /**
     * Auto install and register discovered extensions
     * @public
     */
    injectExtensions(): Promise<void>;
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
    make(): Promise<{
        [key: string]: any;
        apply: CallableFunction;
    }[]>;
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
 * @public
 */
export declare abstract class Framework {
    /**
     * Concrete implementation of the {@link Framework}
     *
     * @internal @virtual
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
    /**
     * True when current instance is a child instance
     *
     * @readonly
     */
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
     * @public
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
     * Compiles configuration and stats/errors/progress reporting.
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
    project: Project;
    /**
     * .env container
     *
     * @public
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
    store: Store;
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
    maybeCall: methods.maybeCall;
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
    close: methods.close;
    /**
     * Create a new {@link Container} instance
     *
     * @example
     * ```js
     * const myContainer = bud.container({key: methods.'value'})
     *
     * myContainer.get('key') // returns 'value'
     * ```
     *
     * @public
     */
    container: methods.container;
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
    get: methods.get;
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
    make: methods.make;
    /**
     * Returns a {@link Locations} value as an absolute path
     *
     * @public
     */
    path: methods.path;
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
    pipe: methods.pipe;
    /**
     * Set a {@link @roots/bud-framework#Location | Location} value
     *
     * @remarks
     * The {@link Location.project} should be an absolute path.
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
     *
     * @public
     */
    setPath: methods.setPath;
    /**
     * Run a value through an array of syncronous, non-mutational functions.
     *
     * @remarks
     * Unlike {@link pipe} the value returned from each function is ignored.
     *
     * @public
     */
    sequence: methods.sequence;
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
    tap: methods.tap;
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
    when: methods.when;
    /**
     * Bind method to {@link Framework | Framework instance}
     *
     * @public
     */
    bindMethod: methods.bindMethod;
    /**
     * Adds a class as a property of the Framework
     *
     * @public
     */
    mixin: typeof methods.mixin;
    /**
     * Read and write json files
     *
     * @public
     */
    json: typeof parser.json;
    /**
     * Read and write yaml files
     *
     * @public
     */
    yml: typeof parser.yml;
    /**
     * Read and write typescript files
     *
     * @public
     */
    ts: typeof parser.ts;
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
    debug(...messages: any[]): void;
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

declare interface GenericFunctionMap {
    [key: string]: CallableFunction;
}

declare interface get {
    (this: Framework, name: string, tap?: (app: Framework) => Framework): Framework;
}

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
 * Assign and filter callback to values.
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
export declare interface Hooks extends Service {
    /**
     * Register a function to modify a filtered value
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
    on<T extends keyof Hooks.Map & string>(id: T, callback?: (param?: Hooks.Map[T]) => Hooks.Map[T]): Framework;
    /**
     * Register an async function to filter a value.
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
    async<T extends keyof Hooks.Map & string>(id: T, callback?: (param?: Hooks.Map[T]) => Promise<Hooks.Map[T]>): Framework;
    /**
     * Filter a value
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
    filter<T extends keyof Hooks.Map & string>(id: T, value?: Hooks.Map[T] | ((value?: Hooks.Map[T]) => Hooks.Map[T])): Hooks.Map[T];
    /**
     * Async version of hook.filter
     *
     * @remarks
     * Hooks are processed as a waterfall.
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
    filterAsync<T extends keyof Hooks.Map & string>(id: T, value?: Hooks.Map[T] | ((param?: Hooks.Map[T]) => Promise<Hooks.Map[T]>)): Promise<Hooks.Map[T]>;
}

/**
 * @public
 */
export declare namespace Hooks {
    /**
     * Bud does not support all the entry types of Webpack
     */
    export type LimitedEntryObject = Record<string, {
        import?: string[];
        dependsOn?: string[];
    }>;
    /**
     * Same with plugins
     */
    export type LimitedPlugin = Array<{
        apply: any;
    }>;
    /**
     * Hook signature
     *
     * @public
     */
    export type Hook<T extends keyof Map & string> = ((value?: T) => Map[T]) | ((value?: T) => Partial<Map[T]>) | Map[T] | Partial<Map[T]>;
    export interface Map {
        [`build`]: Record<string, any>;
        [`build.bail`]: boolean;
        [`build.cache`]: any;
        ['build.cache.buildDependencies']: Record<string, Array<string>>;
        ['build.cache.cacheDirectory']: string;
        [`build.cache.version`]: string;
        ['build.cache.type']: 'memory' | 'filesystem';
        ['build.cache.managedPaths']: Array<string>;
        [`build.context`]: Configuration['context'];
        [`build.devtool`]: Configuration['devtool'];
        [`build.entry`]: LimitedEntryObject;
        [`build.experiments`]: Configuration['experiments'];
        [`build.externals`]: Configuration['externals'];
        [`build.infrastructureLogging`]: Configuration['infrastructureLogging'];
        [`build.mode`]: Configuration['mode'];
        [`build.module`]: Configuration['module'];
        [`build.module.rules`]: Configuration['module']['rules'];
        [`build.module.rules.oneOf`]: Array<RuleSetRule>;
        [`build.module.rules.before`]: Array<RuleSetRule>;
        [`build.module.rules.after`]: Array<RuleSetRule>;
        [`build.name`]: Configuration['name'];
        [`build.node`]: Configuration['node'];
        [`build.optimization`]: Configuration['optimization'];
        [`build.optimization.emitOnErrors`]: Configuration['optimization']['emitOnErrors'];
        [`build.optimization.minimize`]: Configuration['optimization']['minimize'];
        [`build.optimization.minimizer`]: Configuration['optimization']['minimizer'];
        [`build.optimization.moduleIds`]: Configuration['optimization']['moduleIds'];
        [`build.optimization.removeEmptyChunks`]: Configuration['optimization']['removeEmptyChunks'];
        [`build.optimization.runtimeChunk`]: Configuration['optimization']['runtimeChunk'];
        [`build.optimization.splitChunks`]: any;
        [`build.output`]: Configuration['output'];
        [`build.output.assetModuleFilename`]: Configuration['output']['assetModuleFilename'];
        [`build.output.chunkFilename`]: Configuration['output']['chunkFilename'];
        [`build.output.clean`]: Configuration['output']['clean'];
        [`build.output.filename`]: Configuration['output']['filename'];
        [`build.output.path`]: Configuration['output']['path'];
        [`build.output.pathinfo`]: Configuration['output']['pathinfo'];
        [`build.output.publicPath`]: string;
        [`build.parallelism`]: Configuration['parallelism'];
        [`build.performance`]: Configuration['performance'];
        [`build.plugins`]: LimitedPlugin;
        [`build.profile`]: Configuration['profile'];
        [`build.recordsPath`]: Configuration['recordsPath'];
        [`build.resolve`]: Configuration['resolve'];
        [`build.resolve.alias`]: {
            [index: string]: string | false | string[];
        };
        [`build.resolve.extensions`]: Configuration['resolve']['extensions'];
        [`build.resolve.modules`]: Configuration['resolve']['modules'];
        [`build.stats`]: Configuration['stats'];
        [`build.target`]: Configuration['target'];
        [`build.watch`]: Configuration['watch'];
        [`build.watchOptions`]: Configuration['watchOptions'];
        [`extension`]: ValueOf<Plugins> | ValueOf<Modules>;
        [`location.src`]: string;
        [`location.dist`]: string;
        [`location.project`]: string;
        [`location.modules`]: string;
        [`location.storage`]: string;
        [`config.override`]: Configuration[];
        [`event.app.close`]: unknown;
        [`event.build.make.before`]: unknown;
        [`event.build.make.after`]: unknown;
        [`event.build.override`]: Configuration;
        [`event.compiler.before`]: Array<Framework>;
        [`event.compiler.done`]: Stats;
        [`event.compiler.after`]: Framework;
        [`event.compiler.stats`]: StatsCompilation;
        [`event.compiler.error`]: Error;
        [`event.dashboard.done`]: void;
        [`event.dashboard.q`]: void;
        [`event.dashboard.c`]: void;
        [`event.project.write`]: Framework['project'];
        [`event.server.listen`]: Framework['server'];
        [`event.server.before`]: Framework;
        [`event.server.after`]: Framework;
        [`event.run`]: Framework;
        [`proxy.target`]: string;
        [`proxy.interceptor`]: (buffer: Buffer, proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => Promise<Buffer | string>;
        [`proxy.replace`]: Array<[string | RegExp, string]>;
        [`proxy.options`]?: Options_4;
        [`server.inject`]?: Array<(app: Framework) => string>;
        [`server.middleware`]?: Record<string, (app: Framework) => Express.Response>;
        [key: `extension.${string}`]: any;
    }
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

declare interface Interface {
    /**
     * Framework instance
     */
    app: Framework;
    /**
     * Normalize input
     */
    normalizeInput: (input: () => any | any) => any;
    /**
     * Test pattern
     *
     * @public
     */
    test?: (app: Framework) => RegExp;
    /**
     * Get the value of `test`
     *
     * @public
     */
    getTest(): RegExp;
    /**
     * Set the value of `test`
     *
     * @public
     */
    setTest(test: Maybe<[Framework], RegExp>): Rule.Interface;
    /**
     * Use item
     *
     * @public
     */
    use?: (app: Framework) => Item.Interface[];
    /**
     * Get the value of `use`
     *
     * @public
     */
    getUse(): Item.Interface[];
    /**
     * Set the value of `use`
     *
     * @public
     */
    setUse(use: Maybe<[Framework], Item.Interface[]>): Rule.Interface;
    /**
     * Use item
     *
     * @public
     */
    exclude?: (app: Framework) => RegExp;
    /**
     * Get the value of `exclude`
     *
     * @public
     */
    getExclude(): RegExp;
    /**
     * Set the value of `exclude`
     *
     * @public
     */
    setExclude(exclude: Maybe<[Framework], RegExp>): Rule.Interface;
    /**
     * Include paths
     *
     * @public
     */
    include?: (app: Framework) => string;
    /**
     * Get the value of `include`
     *
     * @public
     */
    getInclude(): string;
    /**
     * Set the value of `include`
     *
     * @public
     */
    setInclude(include: Maybe<[Framework], string>): Rule.Interface;
    /**
     * Type
     *
     * @public
     */
    type?: (app: Framework) => string;
    /**
     * Get the value of `type`
     *
     * @public
     */
    getType(): string;
    /**
     * Set the value of `type`
     *
     * @public
     */
    setType(type: Maybe<[Framework], string>): Rule.Interface;
    /**
     * Parser
     *
     * @public
     */
    parser?: (app: Framework) => Parser;
    /**
     * Get the value of `parser`
     *
     * @public
     */
    getParser(): Parser;
    /**
     * Set the value of `parser`
     *
     * @public
     */
    setParser(parser: Maybe<[Framework], Parser>): Rule.Interface;
    /**
     * Generator
     *
     * @public
     */
    generator?: (app: Framework) => any;
    /**
     * Get the value of `generator`
     *
     * @public
     */
    getGenerator(): any;
    /**
     * Set the value of `generator`
     *
     * @public
     */
    setGenerator(Generator: ((app: Framework) => Rule.Interface['generator']) | Rule.Interface['generator']): Rule.Interface;
    /**
     * Returns final RuleSetRule
     *
     * @public
     */
    make(): Output_2;
}

/**
 * Server service interface
 *
 *  @public
 */
declare interface Interface_2 extends Service {
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
    config: Store.Repository['server'];
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
     * Server port
     */
    port: string;
    /**
     * Watcher instance
     *
     * @public
     */
    watcher: {
        getWatchedFiles(): Promise<Array<string>>;
        watch(): Promise<void>;
    };
    /**
     * Run the server instance
     *
     * @public
     */
    run(): Promise<this>;
    /**
     * Close the server connection
     *
     * @public
     */
    close(): any;
}

declare namespace Item {
    export {
        Item_2 as Interface,
        Item_3 as Abstract,
        Options_2 as Options,
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
    options: Options_2;
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
    setOptions(factory: Maybe<[Framework], Options_2>): void;
    /**
     * Merge option
     *
     * @param options - Options to merge
     * @param app - {@link Framework}
     * @returns void
     *
     * @public
     */
    mergeOptions(options: Options_2, app: Framework): void;
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
    abstract options: Factory<[Framework], Options_2>;
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
    abstract setOptions(factory: Maybe<[Framework], Options_2>): void;
    /**
     * Merge option
     *
     * @param options - Options to merge
     * @param app - {@link Framework}
     * @returns void
     *
     * @public
     */
    abstract mergeOptions(options: Options_2, app: Framework): void;
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
        read,
        write
    }
}

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
    instance: Signale;
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
        bindMethod,
        close_2 as close,
        container,
        get,
        make,
        maybeCall,
        mixin,
        path,
        pipe,
        sequence,
        setPath,
        tap,
        when
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
 * @public
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
    api?: ((app: Framework) => Promise<Record<string, CallableFunction>>) | Record<string, CallableFunction>;
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
    config?: Partial<Store['repository']>;
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
declare interface Options_2 {
    [key: string]: any;
}

/**
 * Options interface
 *
 * @public
 */
declare type Options_3 = Partial<{
    test: Maybe<Array<Framework>, RegExp>;
    use: Maybe<Array<Framework>, Array<Item.Interface>>;
    include: Maybe<Array<Framework>, string>;
    exclude: Maybe<Array<Framework>, RegExp>;
    type: Maybe<Array<Framework>, string>;
    parser: Maybe<Array<Framework>, Parser>;
    generator: Maybe<Array<Framework>, any>;
}>;

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
    options?: Options_2;
}

/**
 * Output
 *
 * @public
 */
declare type Output_2 = Partial<{
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
}>;

/**
 * File parser interface
 *
 * @public
 */
declare interface Parser extends Record<string, any> {
}

declare namespace parser {
    export {
        json,
        ts,
        yaml,
        yaml as yml
    }
}

declare interface path {
    (this: Framework, key: keyof Locations & string, ...path: string[]): string;
}

declare interface path {
    (key: `${keyof Locations & string}`, ...path: string[]): string;
}

declare const path: path;

/**
 * Peer dependencies manager
 *
 * @public
 */
export declare interface Peers {
    /**
     * App instance
     *
     * @public
     */
    app: Framework;
    /**
     * Module load order
     *
     * @public
     */
    adjacents: any;
    /**
     * True if project is missing dependencies
     *
     * @public
     */
    hasMissingDependencies: boolean;
    /**
     * Expected project dependencies
     *
     * @public
     */
    peerDependencies: Map<string, string>;
    /**
     * Collect packages.
     *
     * @param type - type of packages to discover (devDependencies or dependencies)
     *
     * @public
     */
    discover(type: 'dependencies' | 'devDependencies'): Promise<this>;
    /**
     * Returns path from a module name
     *
     * @param name - peer module name
     * @returns path to peer module
     *
     * @public
     */
    resolveModulePath(name: string): Promise<string>;
    /**
     * Returns manifest from a module name
     *
     * @param name - peer module name
     * @returns manifest for peer module
     *
     * @public
     */
    getManifest(name: string): Promise<Record<string, any>>;
}

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

/**
 * Peer service interface
 *
 * @public
 */
export declare interface Project extends Service {
    [key: string]: any;
    /**
     * Peer module related utilities
     *
     * @public
     */
    peers: Peers;
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

declare const read: (file: string) => Promise<any>;

declare function read_2(path: string): Promise<any>;

declare const read_3: (file: string) => Promise<any>;

declare namespace Rule {
    export {
        Parser,
        Options_3 as Options,
        Output_2 as Output,
        Interface
    }
}
export { Rule }

/**
 * Registered rules
 *
 * @virtual @public
 */
export declare interface Rules extends Partial<Record<string, Rule.Interface>> {
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
        Options_4 as ProxyOptions,
        Interface_2 as Interface,
        Configuration_2 as Configuration
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
 * @public
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
     *
     * @public
     * @decorator `@bind`
     */
    dump(options?: PrettyFormatOptions_2): void;
    /**
     * Log a message
     *
     * @public
     * @decorator `@bind`
     */
    log(type: string, ...messages: any[]): this;
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
 * The {@link Location.project} should be an absolute path.
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
 * @public
 */
export declare class Store<T = Store.Repository> extends Service<T> {
    /**
     * Service identifier
     *
     * @public
     */
    ident: string;
    /**
     * Store constructor
     *
     * @param app - Framework
     * @param options - Partial framework config
     */
    constructor(app: Framework, options: Partial<Store.Repository>);
    /**
     * Get a store value
     *
     * @override
     */
    get<K extends keyof Store.Map & string, T = Store.Map[K]>(path: K): T;
    /**
     * Set a store value
     *
     * @override
     */
    set<K extends keyof Store.Map & string, T = Store.Map[K]>(path: K, value: T): this;
}

export declare namespace Store {
    /**
     * Framework base configuration
     *
     * @remarks
     * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
     * It is recommended to use {@link @roots/bud-framework#Hooks.on} to extend the
     *
     * @public
     */
    export interface Repository {
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
             * Enable or disable proxy
             */
            proxy?: boolean;
            /**
             * Enable or disable runtime chunk
             *
             * @public
             */
            runtimeChunk?: boolean;
            /**
             * Enable or disable chunk splitting (vendor)
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
    export interface Map extends BuildKeyMap, RepositoryKeyMap, CliKeyMap, CliFlagsKeyMap, FeaturesKeyMap, LocationKeyMap, PatternKeyMap, ServerKeyMap, ThemeKeyMap, ThemeColorsKeyMap {
        ['cache.type']: Repository['cache']['type'];
        ['log.level']: Repository['log']['level'];
    }
    /**
     * @public
     */
    export type TermColor = `#${string}` | `black` | `red` | `green` | `yellow` | `blue` | `magenta` | `cyan` | `white` | `gray` | `grey` | `blackBright` | `redBright` | `greenBright` | `yellowBright` | `blueBright` | `magentaBright` | `cyanBright` | `whiteBright`;
    export type RepositoryKeyMap = {
        [K in keyof Repository as `${K & string}`]: Repository[K];
    };
    export type CliKeyMap = {
        [K in keyof Repository['cli'] as `cli.${K & string}`]: Repository['cli'][K];
    };
    export type CliFlagsKeyMap = {
        [K in keyof Repository['cli']['flags'] as `cli.flags.${K & string}`]: Repository['cli']['flags'][K];
    };
    export type FeaturesKeyMap = {
        [K in keyof Repository['features'] as `features.${K & string}`]: Repository['features'][K];
    };
    export type ThemeKeyMap = {
        [K in keyof Repository['theme'] as `theme.${K & string}`]: Repository['theme'][K];
    };
    export type ThemeColorsKeyMap = {
        [C in keyof Repository['theme']['colors'] as `theme.colors.${C & string}`]: Repository['theme']['colors'][C];
    };
    export type LocationKeyMap = {
        [K in keyof Repository['location'] as `location.${K & string}`]: Repository['location'][K];
    };
    export type PatternKeys = 'js' | 'css' | 'font' | 'image' | 'modules' | 'html' | 'ts' | 'sass' | 'cssModule' | 'sassModule' | 'svg' | 'vue' | 'md' | 'json' | 'json5' | 'toml' | 'yml' | 'xml' | 'csv' | 'webp';
    export type PatternKeyMap = {
        [K in PatternKeys as `patterns.${K & string}`]: Repository['patterns'][K];
    };
    export type BuildKeyMap = {
        ['build.bail']: boolean;
        [`build.cache`]: any;
        ['build.cache.buildDependencies']: Record<string, Array<string>>;
        ['build.cache.cacheDirectory']: string;
        [`build.cache.version`]: string;
        ['build.cache.type']: 'memory' | 'filesystem';
        ['build.cache.managedPaths']: Array<string>;
        [`build.context`]: Repository['build']['context'];
        [`build.devtool`]: Repository['build']['devtool'];
        [`build.entry`]: Repository['build']['entry'];
        [`build.experiments`]: Repository['build']['experiments'];
        [`build.externals`]: Repository['build']['externals'];
        [`build.infrastructureLogging`]: Repository['build']['infrastructureLogging'];
        [`build.mode`]: Repository['build']['mode'];
        [`build.module`]: Repository['build']['module'];
        [`build.name`]: Repository['build']['name'];
        [`build.node`]: Repository['build']['node'];
        [`build.optimization`]: Repository['build']['optimization'];
        [`build.optimization.emitOnErrors`]: Repository['build']['optimization']['emitOnErrors'];
        [`build.optimization.minimize`]: Repository['build']['optimization']['minimize'];
        [`build.optimization.minimizer`]: Repository['build']['optimization']['minimizer'];
        [`build.optimization.moduleIds`]: Repository['build']['optimization']['moduleIds'];
        [`build.optimization.removeEmptyChunks`]: Repository['build']['optimization']['removeEmptyChunks'];
        [`build.optimization.runtimeChunk`]: Repository['build']['optimization']['runtimeChunk'];
        [`build.optimization.splitChunks`]: any;
        [`build.output`]: Repository['build']['output'];
        [`build.output.assetModuleFilename`]: Repository['build']['output']['assetModuleFilename'];
        [`build.output.chunkFilename`]: Repository['build']['output']['chunkFilename'];
        [`build.output.clean`]: Repository['build']['output']['clean'];
        [`build.output.filename`]: Repository['build']['output']['filename'];
        [`build.output.path`]: Repository['build']['output']['path'];
        [`build.output.pathinfo`]: Repository['build']['output']['pathinfo'];
        [`build.output.publicPath`]: string;
        [`build.parallelism`]: Repository['build']['parallelism'];
        [`build.performance`]: Repository['build']['performance'];
        [`build.profile`]: Repository['build']['profile'];
        [`build.recordsPath`]: Repository['build']['recordsPath'];
        [`build.resolve`]: Repository['build']['resolve'];
        [`build.resolve.alias`]: Record<string, string | false | string[]>;
        [`build.resolve.extensions`]: Repository['build']['resolve']['extensions'];
        [`build.resolve.modules`]: Repository['build']['resolve']['modules'];
        [`build.stats`]: Repository['build']['stats'];
        [`build.target`]: Repository['build']['target'];
        [`build.watch`]: Repository['build']['watch'];
        [`build.watchOptions`]: Repository['build']['watchOptions'];
    };
    export type ServerKeyMap = {
        ['server']: Repository['server'];
        ['server.dev']: Repository['server']['dev'];
        ['server.proxy']: Repository['server']['proxy'];
        ['server.watch']: Repository['server']['watch'];
        ['server.middleware']: Repository['server']['middleware'];
        ['server.browser']: Repository['server']['browser'];
        ['server.watch.files']: Repository['server']['watch']['files'];
        ['server.middleware.dev']: Repository['server']['middleware']['dev'];
        ['server.middleware.hot']: Repository['server']['middleware']['hot'];
        ['server.middleware.proxy']: Repository['server']['middleware']['proxy'];
        ['server.browser.indicator']: Repository['server']['browser']['indicator'];
        ['server.browser.overlay']: Repository['server']['browser']['overlay'];
        ['server.browser.log']: Repository['server']['browser']['log'];
        ['server.dev.url']: Repository['server']['dev']['url'];
        ['server.proxy.url']: Repository['server']['proxy']['url'];
    };
        {};
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

declare namespace ts {
    export {
        read_2 as read
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
