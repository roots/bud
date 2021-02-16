import {isFunction, Webpack} from '@roots/bud-support'
import {Container} from '@roots/container'
import {Framework, MaybeCallable} from '@roots/bud-typings'
import {run} from './run'
import {when} from './when'
import {use} from './use'

/**
 * Bud framework base class
 */
export default abstract class<T = any> implements Framework<T> {
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
   * Options
   */
  public options: Framework.Options

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
    this.newService = this.newService.bind(this)
    this.pipe = this.pipe.bind(this)
    this.sequence = this.sequence.bind(this)
    this.register = this.register.bind(this)
    this.run = this.run.bind(this)
    this.use = this.use.bind(this)
    this.when = this.when.bind(this)

    /**
     * Essential containers
     */
    this.api = this.makeContainer(props.api)
    this.providers = this.makeContainer(props.providers)

    this.bootstrap().register().boot()
  }

  /**
   * Lifecycle: bootstrap
   */
  bootstrap(): this {
    this.api.every((name, fn) => {
      this[name] = fn.bind(this)
    })

    this.providers.every(this.newService)

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
    this.providers.every(name => {
      this.logger.info({name}, 'Booting service')

      this[name].boot && this[name].boot()
    })

    return this
  }

  /**
   * Get framework.
   */
  public get<T = any>(
    service?: string,
  ): (T & Framework.Service) | (T & this) {
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
   * ## bud.run  [💁 Fluent]
   *
   * Run the build [🔗 Documentation](#)
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
  public run: Framework.Run = run

  /**
   * ## bud.use [💁 Fluent]
   *
   * Register an extension or set of extensions [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ```js
   * bud.use(['@roots/bud-babel', '@roots/bud-react'])
   * ```
   */
  public use: Framework.Use<T> = use

  /**
   * ## bud.when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`. [🔗 Documentation](#)
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
  public when: Framework.When<T> = when

  /**
   * Pipe functions
   */
  public pipe<T = any, R = any>(
    fns: CallableFunction[],
    value: T,
  ): R {
    return (value = fns.reduce((val, fn) => {
      return fn(val)
    }, value))
  }

  /**
   * Sequence functions
   */
  public sequence(fns: CallableFunction[]): void {
    fns.reduce((_val, fn) => {
      return fn(this)
    }, this)
  }

  /**
   * Create new service
   */
  public newService(
    name: string,
    service: [
      Framework.Providers.Constructor,
      Framework.Providers.Options,
    ],
  ): void {
    const [Service, options] = service

    this[name] &&
      (() => {
        throw Error(
          `${name} is already registered to ${console.dir(
            this.name,
          )}`,
        )
      })()

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
    return this.options.get('mode')
  }
  public set mode(mode: Webpack.Configuration['mode']) {
    this.options.set('mode', mode)
  }

  /**
   * ## bud.isProduction
   *
   * True if Webpack.Configuration['mode'] is 'production'
   */
  public get isProduction(): boolean {
    return this.options.is('mode', 'production')
  }
  /**
   * ## bud.isDevelopment
   *
   * True if Webpack.Configuration['mode'] is 'development'
   */
  public get isDevelopment(): boolean {
    return this.options.is('mode', 'development')
  }
}
