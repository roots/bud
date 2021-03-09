import {isFunction, Webpack} from '@roots/bud-support'
import {Container} from '@roots/container'
import {Framework, MaybeCallable} from '@roots/bud-typings'
import {run} from './run'
import {when} from './when'
import {use} from './use'

/**
 * Bud framework base class
 */
export default abstract class implements Framework {
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
   * FS
   */
  public fs: Framework.FS

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
   * Stdout
   */
  public stdout: string[]

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
    providers: Framework.Providers.Definition
    api: Framework.Index<any>
  }) {
    // Bindings
    this.access = this.access.bind(this)
    this.boot = this.boot.bind(this)
    this.bootstrap = this.bootstrap.bind(this)
    this.get = this.get.bind(this)
    this.makeContainer = this.makeContainer.bind(this)
    this.makeService = this.makeService.bind(this)
    this.pipe = this.pipe.bind(this)
    this.sequence = this.sequence.bind(this)
    this.register = this.register.bind(this)

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
   * Lifecycle boot.
   */
  public boot(): this {
    /**
     * Set node env
     */
    process.env.NODE_ENV = this.mode
    process.env.BABEL_ENV = this.mode

    this.logger.info({
      msg: 'boot process env/mode',
      nodeEnv: process.env.NODE_ENV,
      babelEnv: process.env.BABEL_ENV,
      budEnv: this.mode,
    })

    this.providers.every(name => {
      this.logger.info({name}, 'Booting service')
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

    options?.onInit && options?.onInit.bind(this)()
  }

  /**
   * Mode
   */
  public get mode(): Webpack.Configuration['mode'] {
    return this.store.get('options.mode')
  }

  /**
   * Mode setter
   */
  public set mode(mode: Webpack.Configuration['mode']) {
    this.store.set('options.mode', mode)
  }

  /**
   * ## bud.isProduction
   *
   * True if Webpack.Configuration['mode'] is 'production'
   */
  public get isProduction(): boolean {
    return this.store.is('options.mode', 'production')
  }
  /**
   * ## bud.isDevelopment
   *
   * True if Webpack.Configuration['mode'] is 'development'
   */
  public get isDevelopment(): boolean {
    return this.store.is('options.mode', 'development')
  }
}
