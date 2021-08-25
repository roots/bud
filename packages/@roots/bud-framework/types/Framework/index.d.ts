import { Container } from '@roots/container';
import type { Api, Build, Cache, Compiler, Configuration, Dashboard, Dependencies, Discovery, Env, Extensions, Hooks, Logger, Module, Server, WebpackPlugin } from '../';
import { access, bootstrap, close, container, get, make, path, pipe, sequence, Service, setPath, Store, tap, when } from '../';
/**
 * The base class of a {@link Framework Framework instance}
 *
 * @remarks
 * Implementations must provide a {@link Framework.implementation} property
 * conforming to the {@link Framework.Constructor} interface
 *
 * This is in addition to all required {@link Framework.Options constructor parameters}.
 */
declare abstract class Framework {
    /**
     * Concrete implementation of the {@link Framework Framework interface}
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
     */
    name: string;
    /**
     * Compilation mode
     *
     * @remarks
     * Unlike webpack, there is no 'none' mode.
     *
     * @default 'production'
     */
    mode: Framework.Mode;
    /**
     * Parent {@link Framework} instance
     *
     * @remarks
     * Is `null` if the current instance is the parent instance.
     *
     * @default null
     */
    parent: Framework | null;
    /**
     * Is parent
     *
     * @readonly
     */
    get isParent(): boolean;
    /**
     * Child {@link Framework} instances
     *
     * @remarks
     * Is `null` if the current instance is a child instance.
     *
     * @default null
     */
    children: Container<Framework.Instances> | null;
    /**
     * Has children
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
    /**
     * Macros for assisting with common config tasks
     *
     * @internal
     * @virtual
     */
    api: Api;
    /**
     * Build configuration container
     *
     * @example
     * {@link Build.config} property contains the build config object:
     *
     * ```js
     * build.config
     * ```
     *
     * @example
     * Rebuild the configuration:
     *
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
    cache: Cache;
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
    discovery: Discovery;
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
     * @example
     * Add a new entry to the `webpack.externals` configuration:
     *
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
     * @example
     * Change the `webpack.output.filename` format:
     *
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
     *
     * @sealed
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
    /**
     * Bind method to {@link Framework}
     *
     * @internal
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
    close: close;
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
     *
     * @example
     * This function returns the parent bud instance for further chaining.
     *
     * It is also possible to reference the parent instance using {@link Framework.parent}.
     *
     * ```js
     * make('scripts', child => {
     *   child.entry('app', 'app.js')
     *   child.parent.dev({
     *     // ...
     *   })
     * })
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
declare namespace Framework {
    /**
     * Hash of a given object type
     */
    type Index<T = any> = {
        [key: string]: T;
    };
    /**
     * Compilation mode
     */
    type Mode = 'production' | 'development';
    /**
     * Registered loaders
     */
    interface Loaders extends Framework.Index<Build.Loader> {
    }
    /**
     * Registered items
     */
    interface Items extends Framework.Index<Build.Item> {
    }
    /**
     * Registered rules
     */
    interface Rules extends Framework.Index<Build.Rule> {
    }
    /**
     * Registered locations
     */
    interface Locations extends Framework.Index<string> {
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
    interface Services extends Index<new (app: Framework) => Service> {
    }
    /**
     * Registered compilers
     */
    interface Instances extends Index<Framework> {
    }
    /**
     * Registered extensions
     */
    interface Extensions extends Index<Module | WebpackPlugin> {
    }
    /**
     * Framework Constructor
     */
    type Constructor = new (options: Options) => Framework;
    interface Options {
        name: string;
        mode?: Framework.Mode;
        config?: Configuration;
        services?: Framework.Services;
        parent?: Framework;
    }
    /**
     * Callback which accepts Framework as a parameter
     */
    interface Tapable<T = Framework> {
        (value?: T): any;
    }
}
export { Framework };
//# sourceMappingURL=index.d.ts.map