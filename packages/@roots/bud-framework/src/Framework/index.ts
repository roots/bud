import {Api} from '../Api'
import {Build} from '../Build'
import {Cache} from '../Cache'
import {Compiler} from '../Compiler'
import {Container} from '@roots/container'
import {Dashboard} from '../Dashboard'
import {Dependencies} from '../Dependencies'
import {Discovery} from '../Discovery'
import {Env} from '../Env'
import {Extensions} from '../Extensions'
import {Hooks} from '../Hooks'
import {Item} from '../Build/Item'
import {Loader} from '../Build/Loader'
import {Logger} from '../Logger'
import {Mode} from '../Mode'
import {Module} from '../Extensions/Module'
import {Rule} from '../Build/Rule'
import {Server} from '../Server'
import {Service, Bootstrapper} from '../Service'
import {Store} from '../Store'

import {isFunction} from 'lodash'
import {join} from 'path'
import {boundMethod as bind} from 'autobind-decorator'
import {Configuration} from '../Configuration'

interface Framework {
  /**
   * ## name
   *
   * Application name
   */
  name: string

  /**
   * ## parent
   *
   * If a child instance, returns the parent.
   *
   * If the parent instance, returns {Framework}
   */
  parent: Framework

  /**
   * ## children
   *
   * Compiler instance container.
   */
  children: Container<Framework>

  /**
   * ## isChild
   *
   * Returns true if current compiler is a child compiler
   */
  isChild: boolean

  /**
   * ## api
   *
   * Service providing config api methods
   */
  api: Api

  /**
   * ## build
   *
   * Service handling config compilation
   */
  build: Build

  /**
   * ## cache
   *
   * Service handling compiler cache
   */
  cache: Cache

  /**
   * ## compiler
   *
   * Service handling build compilation
   */
  compiler: Compiler

  /**
   * ## dashboard
   *
   * Service providing CLI interface
   */
  dashboard: Dashboard

  /**
   * Dependencies service
   */
  dependencies: Dependencies

  /**
   * Discovery service
   */
  discovery: Discovery

  /**
   * Envvar service
   */
  env: Env

  /**
   * Extensions service
   */
  extensions: Extensions

  /**
   * Hooks service
   */
  hooks: Hooks

  /**
   * Logger service
   */
  logger: Logger

  /**
   * Dev server service
   */
  server: Server

  /**
   * Key Value store service
   */
  store: Store

  /**
   * app.access
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
  access<I = any>(value: ((app: this) => I) | I): I

  /**
   * app.container
   */
  container(repository?: Container['repository']): Container

  /**
   * app.get
   */
  get(name?: string): Framework

  /**
   * app.make
   * @note multi-compiler api is experimental
   */
  make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework

  /**
   * Get the compiler mode
   */
  getMode(): Mode

  /**
   * Set the compiler mode
   */
  setMode(mode: Mode): void

  /**
   * app.bootstrap
   */
  bootstrap(services: {
    [key: string]: new (app: any) => Service | Bootstrapper
  }): Framework

  /**
   * app.lifecycle
   */
  lifecycle(): Framework

  /**
   * app.path
   */
  path(
    key: `${keyof Hooks.Locale.Definitions & string}`,
    ...path: string[]
  ): string

  /**
   * app.pipe
   */
  pipe(
    fns: ((input: Framework) => Framework)[],
    value?: Framework,
  ): Framework

  /**
   * app.sequence
   */
  sequence(fns: Array<(app: Framework) => any>): Framework

  /**
   * app.tap
   */
  tap(
    fn:
      | ((app?: Framework) => any)
      | ((this: Framework, app?: Framework) => any),
    bound?: boolean,
  ): Framework

  /**
   * app.when
   */
  when(
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework

  /**
   * log a message
   */
  log(message?: any, ...optionalArgs: any[]): void

  /**
   * log a message
   */
  success(message?: any, ...optionalArgs: any[]): void

  /**
   * log (log level: warn)
   */
  warn(message?: any, ...optionalArgs: any[]): void

  /**
   * log (log level: info)
   */
  info(message?: any, ...optionalArgs: any[]): void

  /**
   * log (log level: debug)
   */
  debug(message?: any, ...optionalArgs: any[]): void

  /**
   * log (log level: error)
   */
  error(message: any, ...optionalArgs: any[]): void
}

namespace Framework {
  export interface Extensions {
    [key: string]: Module
  }

  export interface Rules {
    [key: string]: Rule
  }

  export interface Items {
    [key: string]: Item
  }

  export interface Loaders {
    [key: string]: Loader
  }
}

abstract class Framework {
  public abstract implementation: new (options: {
    config: Configuration
    name?: string
    parent?: Framework
    mode?: 'production' | 'development'
  }) => Framework

  public name = 'bud'

  public _services: Container<Service>

  public parent: Framework = this

  public isChild: boolean = false

  public children: Container<Framework>

  public proto: {
    config: Configuration
    services: Store['repository']
  } = {
    config: null,
    services: null,
  }

  public _mode: Mode

  public api: Api

  public build: Build

  public cache: Cache

  public compiler: Compiler

  public dashboard: Dashboard

  public dependencies: Dependencies

  public discovery: Discovery

  public env: Env

  public extensions: Extensions

  public hooks: Hooks

  public logger: Logger

  public server: Server

  public store: Store

  public get services(): Container<Service> {
    return this._services
  }

  public set services(services: Container<Service>) {
    this._services = services
  }

  public get mode(): Mode {
    return this._mode
  }

  public set mode(mode: Mode) {
    this._mode = mode
  }

  @bind
  public getMode(): Mode {
    return this.mode
  }

  @bind
  public setMode(mode: Mode): void {
    this.mode = mode
  }

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public constructor(options: {
    name?: string
    mode?: 'production' | 'development'
    config?: Configuration
    parent?: Framework
  }) {
    this.proto = {...this.proto, config: options.config}
    this.name = options.name ?? this.name
    this.parent = options.parent ?? this.parent

    this.mode =
      options.mode ??
      ((process.env.NODE_ENV && process.env.NODE_ENV !== 'test'
        ? process.env.NODE_ENV
        : 'production') as 'production' | 'development')

    this.children = new Container<Framework>()
  }

  @bind
  public get(child?: string): Framework {
    return child ? this.parent.children.get(child) : this
  }

  @bind
  public set(name: string, instance: Framework): void {
    this.parent.children.set(name, instance)
  }

  @bind
  public make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework {
    const compiler = new this.implementation({
      config: this.proto.config,
      name,
      parent: this,
      mode: this.mode,
    })
      .bootstrap(this.proto.services)
      .lifecycle()

    compiler.isChild = true

    this.set(name, isFunction(tap) ? tap(compiler) : compiler)

    return this
  }

  @bind
  public bootstrap(services: {
    [key: string]: new (app: Framework) => Service | Bootstrapper
  }): Framework {
    this.proto.services = services

    this.store = new Store(this).setStore({
      ...(this.proto.config ?? {}),
    })

    this.services = this.container({...this.proto.services})

    /**
     * Build the logger early
     */
    const LoggerConstructor =
      this.services.get<new (app: Framework) => Logger>('logger')

    this.logger = new LoggerConstructor(this)

    this.services
      .getEntries()
      .filter(([k, v]) => {
        /**
         * No reason to boot an extension that isn't well written
         */
        if (!v.name) return false

        /**
         * No reason to start server for prod
         */
        if (k == 'server' && this.isProduction) return false

        /**
         * No reason to boot expensive parent services
         * for child compilation instantances
         */
        if (
          this.isChild &&
          [
            'compiler',
            'discovery',
            'dashboard',
            'server',
          ].includes(k)
        )
          return false

        return true
      })

      /**
       * Instantiate the services
       */
      .map(([key, Instance]) => {
        this[key] = new Instance(this)
      })

    return this
  }

  @bind
  public lifecycle(): Framework {
    const events = [
      'bootstrap',
      'bootstrapped',
      'register',
      'registered',
      'boot',
      'booted',
    ]

    events.forEach(event => {
      this.logger.instance.scope(event).time(event)

      this.services.getKeys().forEach(serviceName => {
        const service = this[serviceName]
        if (!service || !service[event]) return

        this.logger.instance
          .scope(service.name, event)
          .time(event)

        service[event](this)

        this.logger.instance
          .scope(service.name, event)
          .timeEnd(event)
      })

      this.logger.instance.scope(event).timeEnd(event)
    })

    return this
  }

  @bind
  public access<I = any>(value: ((app: this) => I) | I): I {
    return isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  @bind
  public container(
    repository?: Container['repository'],
  ): Container {
    return new Container(repository ?? {})
  }

  @bind
  public path(
    key: `${keyof Hooks.Locale.Definitions & string}`,
    ...path: string[]
  ): string {
    return join(
      ...[
        key !== 'project'
          ? this.hooks.filter('location/project')
          : false,
        this.hooks.filter(`location/${key}` as Hooks.Name),
        ...(path ?? []),
      ].filter(Boolean),
    )
  }

  @bind
  public pipe(
    fns: ((input: Framework) => Framework)[],
    value: Framework,
  ): Framework {
    return fns.reduce(
      (val: Framework, fn: (input: Framework) => Framework) => {
        return fn(val)
      },
      value ?? this,
    )
  }

  @bind
  public sequence(fns: Array<(app: this) => any>): Framework {
    fns.reduce((_val, fn) => this.tap(fn), this)

    return this
  }

  @bind
  public tap(
    fn:
      | ((app: Framework) => any)
      | ((this: Framework, app?: Framework) => any),
    bound: boolean = true,
  ) {
    fn.call(bound ? this : null, this)

    return this
  }

  @bind
  public when(
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework {
    this.access(test)
      ? trueCase && isFunction(trueCase) && trueCase(this)
      : falseCase && isFunction(falseCase) && falseCase(this)

    return this
  }

  @bind
  public log(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .log(message, ...optionalArgs)
  }

  @bind
  public info(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .info(message, ...optionalArgs)
  }

  @bind
  public success(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .success(message, ...optionalArgs)
  }

  @bind
  public warn(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .warn(message, ...optionalArgs)
  }

  @bind
  public debug(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .debug(message, ...optionalArgs)
  }

  @bind
  public error(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(
        this.parent.name,
        this.name == 'bud' ? 'global' : this.name,
      )
      .error(message, ...optionalArgs)
  }
}

export {Framework}
