import {Container} from '@roots/container'
import {bind, isEqual, isFunction} from '@roots/bud-support'
import type {
  Build,
  Cache,
  CLI,
  Compiler,
  Dependencies,
  Discovery,
  Disk,
  Env,
  Error,
  Extension,
  Extensions,
  Express,
  FileContainer,
  Hooks,
  Index,
  Logger,
  Module,
  Server,
  Service,
  Store,
  MaybeCallable,
  Bootstrapper,
  Webpack,
} from '@roots/bud-typings'

export {Framework}

declare namespace Framework {
  export {
    Build,
    Cache,
    CLI,
    Compiler,
    Container,
    Dependencies,
    Discovery,
    Disk,
    Env,
    Error,
    Extension,
    Extensions,
    Express,
    FileContainer,
    Hooks,
    Index,
    Logger,
    Module,
    Server,
    Service,
    Store,
    MaybeCallable,
    Bootstrapper,
    Webpack,
  }
}

/**
 * Framework abstract
 */
abstract class Framework {
  [key: string]: any

  public name = 'bud'

  public services: Container

  public abstract build: Build

  public abstract cache: Cache

  public abstract compiler: Compiler

  public abstract dependencies: Dependencies

  public abstract discovery: Discovery

  public abstract disk: Disk

  public abstract env: Env

  public abstract extensions: Extensions

  public abstract hooks: Hooks

  public abstract server: Server

  public abstract logger: Logger

  public abstract store: Store

  /**
   * Constructor
   */
  public constructor(services: {
    [key: string]: new (app: Framework['get']) =>
      | Service
      | Bootstrapper
  }) {
    this.services = this.container(services)
  }

  /**
   * Webpack.Configuration['mode'] accessor
   */
  public get mode() {
    return process.argv.includes('development') ||
      process.argv.includes('dev')
      ? 'development'
      : 'production'
  }

  /**
   * Production check
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * Dev check
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * Lifecycle: bootstrap
   */
  @bind
  public bootstrap(): this {
    /**
     * NODE_ENV & BABEL_ENV
     */
    process.env.NODE_ENV = this.mode
    process.env.BABEL_ENV = this.mode

    /**
     * Instantiate services
     */
    this.services.mutateStoreEntries(
      (name: string, Instance) =>
        (this[name] = new Instance(this.get)),
    )

    /**
     * Call end of lifecycle method
     */
    this.services.every((service: string | number) =>
      this.get<Service>(service).bootstrapped(this),
    )

    /**
     * Boot
     */
    this.register().boot()

    return this
  }

  /**
   * Lifecycle: registration
   */
  @bind
  public register(): this {
    this.services.every(service => {
      this.log(`Registering ${service}`)
      this.get<Service>(service).register()
    })

    this.services.every(service => {
      this.get<Service>(service).registered(this)
    })

    return this
  }

  /**
   * Lifecycle boot
   */
  @bind
  public boot(): this {
    this.services.every(service => {
      this.log(`Booting ${service}`)
      this.get<Service>(service).boot()
    })

    this.services.every(service => {
      this.get<Service>(service).booted(this)
    })

    return this
  }

  /**
   * Get framework.
   */
  @bind
  public get<T = this>(service?: string | number): T {
    return service ? this[service] : this
  }

  /**
   * Subscribe
   */
  @bind
  public subscribe<T = any>(
    name: `${Hooks.Name}`,
    caller?: string,
  ): T {
    return this.hooks.filter<T>(caller ? [caller, name] : name)
  }

  /**
   * Publish
   */
  @bind
  public publish(
    pubs: Hooks.PublishDict,
    caller?: string,
  ): this {
    Object.entries(pubs).map(
      ([name, pub]: [`${Hooks.Name}`, any]) => {
        this.hooks.on(caller ? [caller, name] : name, pub)
      },
    )

    return this
  }

  /**
   * ## access
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * access(isAFunction, true)
   * // => `option value: true`
   *
   * access(isAValue)
   * // => `option value: true`
   * ```
   */
  @bind
  public access<I = unknown>(value: MaybeCallable<I>): I {
    return isFunction(value) ? value(this) : value
  }

  /**
   * ## container
   *
   * Make a new container
   *
   * ### Usage
   *
   * ```js
   * const container = app.container({data: 'stuff'})
   * container.get('data') // => 'stuff'
   * ```
   */
  @bind
  public container(repository?: any): Container {
    return new Container(repository ?? {})
  }

  /**
   * ## pipe [💁 Fluent]
   *
   * Execute an array of functions. The first is passed the
   * bud object Each will be the result of
   * the one preceeding it.
   *
   * Returns the final result.
   *
   * ### Usage
   *
   * ```js
   * app.pipe([
   *   bud => app.srcPath('resources'),
   *   bud => app.proxy(),
   * ])
   * ```
   */
  @bind
  public pipe<I = any, R = any>(
    fns: CallableFunction[],
    value: I,
  ): R {
    return (value = fns.reduce((val, fn) => {
      return fn(val)
    }, value))
  }

  /**
   * Sequence functions
   */
  @bind
  public sequence(fns: Array<(app: this) => any>): this {
    fns.reduce((_val, fn) => {
      return fn.bind(this)(this)
    }, this)

    return this
  }

  /**
   * ## when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`.
   *
   * - The first parameter is the conditional check.
   *     - It can be a boolean statement (app.inDevelopment)
   *     - It can be a fn, which is passed the app and returns the boolean
   *
   * - The second parameter is the function to be run if `true`.
   *
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * app.when(app.mode.is('production'), () => app.vendor())
   * ```
   */
  @bind
  public when(
    test: ((app: Framework) => boolean) | boolean,
    isTrue: (app: Framework) => any,
    isFalse?: (app: Framework) => any,
  ): Framework {
    isEqual(this.access(test), true)
      ? isFunction(isTrue) && isTrue.bind(this)(this)
      : isFunction(isFalse) && isFalse.bind(this)(this)

    return this
  }

  /**
   * Log message
   */
  @bind
  public log(...args) {
    this.logger.instance.scope(this.name).log(...args)
  }

  /**
   * Log info message
   */
  @bind
  public info(...args) {
    this.logger.instance.scope(this.name).info(...args)
  }

  /**
   * Log warning message
   */
  @bind
  public warning(...args) {
    this.logger.instance.scope(this.name).warning(...args)
  }

  /**
   * Log warning message
   */
  @bind
  public debug(...args) {
    this.logger.instance.scope(this.name).debug(...args)
  }

  /**
   * Log error message
   */
  @bind
  public error(...args) {
    this.logger.instance.scope(this.name).error(...args)
  }
}
