import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction, isNull} from 'lodash'
import {join} from 'path'

import type {
  Api,
  Build,
  Cache,
  Compiler,
  Configuration,
  Dashboard,
  Dependencies,
  Discovery,
  Env,
  Extensions,
  Hooks,
  Logger,
  Module,
  Plugin,
  Server,
} from '../'
import {
  access,
  bootstrap,
  make,
  pipe,
  Service,
  Store,
  when,
} from '../'

/**
 * The core Framework interface
 */
abstract class Framework {
  /**
   * Concrete implementation of the {@link Framework} interface
   *
   * @virtual
   */
  public abstract implementation: Framework.Constructor

  /**
   * Framework name
   *
   * @remarks
   * In multi-compiler usages of the class, each instance has a unique name.
   */
  public name: string

  /**
   * Parent compiler.
   *
   * @remarks
   * Returns `null` if the current instance is the parent instance.
   */
  public parent: Framework

  /**
   * Child {@link Framework} instances
   */
  public children: Container<Framework.Instances>

  /**
   * Compilation mode
   */
  public mode: Framework.Mode

  /**
   * {@inheritDoc Api}
   * @virtual
   */
  public api: Api

  /**
   * {@inheritDoc Build}
   * @virtual
   */
  public build: Build

  /**
   * {@inheritDoc Cache}
   * @virtual
   */
  public cache: Cache

  /**
   * {@inheritDoc Compiler}
   * @virtual
   */
  public compiler: Compiler

  /**
   * {@inheritDoc Dashboard}
   * @virtual
   */
  public dashboard: Dashboard

  /**
   * {@inheritDoc Dependencies}
   * @virtual
   */
  public dependencies: Dependencies

  /**
   * {@inheritDoc Discovery}
   * @virtual
   */
  public discovery: Discovery

  /**
   * {@inheritDoc Env}
   * @virtual
   */
  public env: Env

  /**
   * Container service for {@link Framework} extensions.
   *
   * @remarks
   * Extensions can be defined as a {@link Module}, which is more generic.
   * They can also be defined as a {@link Plugin} which is a {@link Module}
   * specifically yielding a {@link WebpackPluginInstance}.
   *
   * @public
   * @virtual
   */
  public extensions: Extensions

  /**
   * {@inheritDoc Hooks}
   * @virtual
   */
  public hooks: Hooks

  /**
   * {@inheritDoc Logger}
   * @virtual
   */
  public logger: Logger

  /**
   * {@inheritDoc Server}
   * @virtual
   */
  public server: Server

  /**
   * Options container service
   *
   * @sealed
   */
  public store: Store

  /**
   * True when {@link Framework.mode} is `production`
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * True when {@link Framework.mode} is `development`
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * Access a value which may or may not be a function.
   *
   * @remarks
   * If a value is a function **access** will call that
   * function and return the result.
   *
   * If the value is not a function **access** will return its value.
   *
   * @example
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   * ```
   *
   * @example
   * ```js
   * access(isAFunction, true) // => `option value: true`
   * ```
   *
   * @example
   * ```js
   * access(isAValue) // => `option value: true`
   * ```
   */
  public access: access = access

  /**
   * Make a child compiler.
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
  public make: make = make

  /**
   * Executes a function if a given test is `true`.
   *
   * @remarks
   * - The first parameter is the conditional check.
   * - The second parameter is the function to run if `true`.
   * - The third parameter is optional; executed if the conditional is not `true`.
   *
   * @example
   * Only produce a vendor bundle when running in `production` mode:
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
  public when: when = when

  /**
   * Pipe a value through an array of functions
   *
   * @remarks
   * If no value is provided the value is assumed to be the {@link Framework} itself
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
  public pipe: pipe = pipe

  /**
   * Initializes and binds {@link Framework.services}
   */
  public bootstrap: bootstrap = bootstrap

  /**
   * Framework constructor options
   *
   * @remarks
   * Saved as a property from the constructor so options
   * can be referenced from child instances.
   */
  public options: Framework.Options

  /**
   * Class constructor
   */
  public constructor(options: Framework.Options) {
    // Clone options parameter so as to not mutate other instances
    this.options = {...options}

    this.name = this.options.name
    this.parent = this.options.parent ?? null
    this.mode = this.options.mode

    if (isNull(this.parent)) {
      this.children = new Container({})
    }

    /** Instantiate {@link Framework.store} service early */
    this.store = new Store(this).setStore({
      ...this.options.config,
    })

    /** Instantiate {@link Framework.logger} service early */
    this.logger = new this.options.services.logger(
      this,
    ) as unknown as Logger

    // Bindings
    this.access = this.access.bind(this)
    this.bootstrap = this.bootstrap.bind(this)
    this.make = this.make.bind(this)
    this.pipe = this.pipe.bind(this)
    this.when = this.when.bind(this)
  }

  /**
   * Returns a {@link Framework} instance from the {@link Framework.children} container
   *
   * @decorator `@bind`
   */
  @bind
  public get(name: string, tap?: (app: Framework) => Framework) {
    this.log('get request', name)

    const compiler = this.children.get(name)

    if (tap && isFunction(tap)) {
      tap(compiler)
    }

    return compiler
  }

  /**
   * Create a new {@link Container} instance
   *
   * @decorator `@bind`
   */
  @bind
  public container<T = any>(repository?: T): Container {
    return new Container<T>(repository)
  }

  /**
   * Returns a {@link Framework.Location} as an absolute path
   *
   * @decorator `@bind`
   */
  @bind
  public path(
    key: keyof Framework.Locations,
    ...path: string[]
  ): string {
    return join(
      ...[
        key !== 'project'
          ? this.hooks.filter('location/project')
          : false,
        this.hooks.filter(`location/${key}`),
        ...(path ?? []),
      ].filter(Boolean),
    )
  }

  @bind
  public sequence(fns: Array<(app: this) => any>): Framework {
    fns.reduce((_val, fn) => this.tap(fn), this)

    return this
  }

  @bind
  public tap(fn: Framework.Tapable, bound: boolean = true) {
    fn.call(bound ? this : null, this)

    return this
  }

  /**
   * Log a message
   *
   * @decorator `@bind`
   */
  @bind
  public log(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .log(message, ...optionalArgs)
  }

  /**
   * Log an `info` level message
   *
   * @decorator `@bind`
   */
  @bind
  public info(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .info(message, ...optionalArgs)
  }

  /**
   * Log a `success` level message
   *
   * @decorator `@bind`
   */
  @bind
  public success(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .success(message, ...optionalArgs)
  }

  /**
   * Log a `warning` level message
   *
   * @decorator `@bind`
   */
  @bind
  public warn(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .warn(message, ...optionalArgs)
  }

  /**
   * Log a `debug` level message
   *
   * @decorator `@bind`
   */
  @bind
  public debug(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .debug(message, ...optionalArgs)
  }

  /**
   * Log and display an error.
   *
   * @remark
   * This error is fatal and will kill the process
   *
   * @decorator `@bind`
   */
  @bind
  public error(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .error(message, ...optionalArgs)

    this.dashboard.renderError(message, optionalArgs.pop())
  }
}

namespace Framework {
  /**
   * Utility: Returns hash of a given object type
   */
  export type Index<T = any> = {[key: string]: T}

  export type Mode = 'production' | 'development'

  /**
   * Registered loaders
   */
  export interface Loaders
    extends Framework.Index<Build.Loader> {
    css: Build.Loader
    csv: Build.Loader
    html: Build.Loader
    md: Build.Loader
    raw: Build.Loader
    style: Build.Loader
    file: Build.Loader
    url: Build.Loader
    minicss: Build.Loader
    'resolve-url': Build.Loader
    xml: Build.Loader
  }

  /**
   * Registered items
   */
  export interface Items extends Framework.Index<Build.Item> {
    css: Build.Item
    csv: Build.Item
    file: Build.Item
    image: Build.Item
    font: Build.Item
    html: Build.Item
    js: Build.Item
    md: Build.Item
    minicss: Build.Item
    'resolve-url': Build.Item
    raw: Build.Item
    style: Build.Item
    svg: Build.Item
    xml: Build.Item
  }

  /**
   * Registered rules
   */
  export interface Rules extends Framework.Index<Build.Rule> {
    js: Build.Rule
    css: Build.Rule
    html: Build.Rule
    svg: Build.Rule
    image: Build.Rule
    font: Build.Rule
    xml: Build.Rule
    json5: Build.Rule
    csv: Build.Rule
    yml: Build.Rule
    toml: Build.Rule
  }

  /**
   * Registered locations
   */
  export interface Locations extends Framework.Index<string> {
    project: string
    src: string
    dist: string
    publicPath: string
    storage: string
    modules: string
  }

  /**
   * Registered modules
   */
  export interface Modules extends Index<Module | Plugin> {}

  /**
   * Registered services
   */
  export interface Services
    extends Index<new (app: Framework) => Service> {}

  /**
   * Registered compilers
   */
  export interface Instances extends Index<Framework> {}

  /**
   * Registered extensions
   */
  export interface Extensions extends Index<Module | Plugin> {}

  /**
   * Framework Constructor
   */
  export type Constructor = new (options: Options) => Framework

  /*
   * Constructor options (bound to {@link Framework.options})
   */
  export interface Options {
    /**
     * {@link Framework.name}
     */
    name: string

    /**
     * {@link Framework.mode}
     */
    mode: Framework.Mode

    /**
     * {@link Configuration}
     */
    config: Configuration

    /**
     * {@link Framework.Services}
     */
    services: Framework.Services

    /**
     * {@link Framework}
     */
    parent?: Framework
  }

  /**
   * Callback which accepts Framework as a parameter
   */
  export type Tapable<I = any> =
    | ((app: Framework) => I)
    | ((this: Framework, app?: Framework) => I)
}

export {Framework}
