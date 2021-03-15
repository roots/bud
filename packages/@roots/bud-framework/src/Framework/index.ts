import {isFunction} from '@roots/bud-support'
import {Container} from '@roots/container'
import {Framework, MaybeCallable} from '@roots/bud-typings'
import {run} from './run'
import {when} from './when'
import {use} from './use'
import {noop} from 'lodash'

/**
 * Bud framework base class
 */
export default abstract class implements Framework {
  public _mode: 'development' | 'production'

  /**
   * Name
   */
  public name = '@roots/bud'

  /**
   * API
   */
  public api: Framework.Index<any>

  /**
   * Build
   */
  public build: Framework.Build

  /**
   * Cache
   */
  public cache: Framework.Cache

  /**
   * CLI
   */
  public cli: Framework.CLI

  /**
   * CLI Dashboard
   */
  public dashboard: Framework.Dashboard

  /**
   * Compiler
   */
  public compiler: Framework.Compiler

  /**
   * Discovery
   */
  public discovery: Framework.Discovery

  /**
   * Dependencies
   */
  public dependencies: Framework.Dependencies

  /**
   * Disk
   */
  public disk: Framework.Disk

  /**
   * Env
   */
  public env: Framework.Env

  /**
   * Extensions
   */
  public extensions: Framework.Extensions

  /**
   * Hooks
   */
  public hooks: Framework.Hooks

  /**
   * Logger
   */
  public logger: Framework.Logger

  /**
   * Providers
   */
  public providers: Framework.Container

  /**
   * Services
   */
  public services: Framework.Container

  /**
   * Server
   */
  public server: Framework.Server

  /**
   * Store
   */
  public store: Framework.Store

  /**
   * ## bud.run  [💁 Fluent]
   *
   * Run the build
   *
   * ### Usage
   *
   * ```js
   * bud.run()
   * ```
   *
   * Disable the custom dashboard (use webpack default output)
   *
   * ```js
   * bud.run(true)
   * ```
   */
  public run: () => void

  /**
   * ## bud.when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`.
   *
   * - The first parameter is the conditional check.
   * - The second parameter is the function to be run if `true`.
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * bud.when(bud.mode.is('production'), () => bud.vendor())
   * ```
   */
  public when: (
    test: boolean | ((app: this) => boolean),
    isTrue: (app: this) => unknown,
    isFalse?: (app: this) => unknown,
  ) => this

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  public use: (
    source: Framework.Module | Framework.Module[],
  ) => this

  /**
   * Constructor
   */
  constructor(props: {
    mode: 'production' | 'development'
    providers: Framework.Providers.Definition
    api: Framework.Index<any>
  }) {
    /**
     * Mode
     */
    this.mode = props?.mode
    process.env.NODE_ENV = this.mode
    process.env.BABEL_ENV = this.mode

    /**
     * Bind
     */
    this.access = this.access.bind(this)
    this.boot = this.boot.bind(this)
    this.bootstrap = this.bootstrap.bind(this)
    this.get = this.get.bind(this)
    this.makeContainer = this.makeContainer.bind(this)
    this.makeService = this.makeService.bind(this)
    this.pipe = this.pipe.bind(this)
    this.sequence = this.sequence.bind(this)
    this.register = this.register.bind(this)
    this.publish = this.publish.bind(this)
    this.subscribe = this.subscribe.bind(this)

    this.run = run.bind(this)
    this.use = use.bind(this)
    this.when = when.bind(this)

    /**
     * Essential containers
     */
    this.api = this.makeContainer(props.api)
    this.providers = this.makeContainer(props.providers)
  }

  /**
   * Lifecycle: bootstrap
   */
  bootstrap(): this {
    this.api.every((name, fn) => {
      this[name] = fn.bind(this)
    })

    this.providers.every(this.makeService)

    return this
  }

  /**
   * Lifecycle: registration
   */
  register(): this {
    this.providers.every(name => {
      this[name].register && this[name].register()
    })

    return this
  }

  /**
   * Lifecycle boot
   */
  public boot(): this {
    this.providers.every(name => {
      this.log(`Booting ${name}`)
      this[name].boot && this[name].boot()
    })

    return this
  }

  /**
   * Get framework.
   */
  public get<T = this>(service?: string): T {
    return service ? this[service] : this
  }

  /**
   * Access
   *
   * Access a Framework component or datatype
   * that might be a function taking a single app parameter
   */
  public access<I = unknown>(value: MaybeCallable<I>): I {
    return isFunction(value) ? value(this) : value
  }

  /**
   * ## bud.makeContainer
   *
   * Make a new container
   *
   * ### Usage
   *
   * ```js
   * const container = bud.makeContainer({data: 'stuff'})
   * container.get('data') // => 'stuff'
   * ```
   */
  public makeContainer(repository?: any): Container {
    return new Container(repository ?? {})
  }

  /**
   * Pipe functions
   */
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
  public sequence(fns: Array<(app: this) => any>): this {
    fns.reduce((_val, fn) => {
      return fn.bind(this)(this)
    }, this)

    return this
  }

  /**
   * Create new service
   */
  public makeService(
    name: string,
    service: [
      Framework.Providers.Constructor,
      Framework.Providers.Options,
    ],
  ): void {
    const [Service, options] = service

    this[name] = new Service(
      this.get,
      options?.containers ?? null,
      options?.dependencies ?? null,
    )
  }

  /**
   * Topics
   */
  public topics(topics: string[], caller?: string) {
    topics.map(topic => this.hooks.set(topic, [noop]))
  }

  /**
   * Subscriptions
   */
  public subscribe(name: string, caller?: string) {
    return this.hooks.filter(caller ? [caller, name] : name)
  }

  /**
   * Publish
   */
  public publish<T = any>(
    pubs: {[key: string]: any},
    caller?: string,
  ) {
    Object.entries(pubs).map(([name, pub]: [string, any]) => {
      this.hooks.on(caller ? [caller, name] : name, pub)
    })
  }

  /**
   * Mode
   */
  public get mode(): 'production' | 'development' {
    return this._mode
  }

  /**
   * Mode
   */
  public set mode(mode: 'production' | 'development') {
    this._mode = mode
  }

  /**
   * ## bud.isProduction
   *
   * True if Webpack.Configuration['mode'] is 'production'
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }
  /**
   * ## bud.isDevelopment
   *
   * True if Webpack.Configuration['mode'] is 'development'
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public log(...args) {
    this.logger.instance.scope(this.name).log(...args)
  }

  /**
   * Log info message
   */
  public info(...args) {
    this.logger.instance.scope(this.name).info(...args)
  }

  /**
   * Log warning message
   */
  public warning(...args) {
    this.logger.instance.scope(this.name).warning(...args)
  }

  /**
   * Log warning message
   */
  public debug(...args) {
    this.logger.instance.scope(this.name).debug(...args)
  }

  /**
   * Log error message
   */
  public error(obj: {[key: string]: any}) {
    this.logger.instance.scope(this.name).error(obj, this.name)
  }
}
