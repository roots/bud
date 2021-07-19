import {join} from 'path'

import {Container, Service, Bootstrapper, Store} from '../'

import {isFunction, isNull} from 'lodash'

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
  Mode,
  Server,
} from '../'

import {boundMethod as bind} from 'autobind-decorator'

interface Framework {
  /**
   * Application name
   */
  name: string

  /**
   * If a child instance, returns the parent ({@link Framework}).
   * If the parent instance, returns null.
   */
  parent: Framework

  /**
   * Compiler container {@link Container}.
   */
  children: Container<{[key: string]: Framework}>

  /**
   * api
   *
   * Service providing config api methods
   */
  api: Api

  /**
   * Build
   *
   * Service handling config compilation
   */
  build: Build

  /**
   * Cache
   *
   * Service handling compiler cache
   */
  cache: Cache

  /**
   * Compiler
   *
   * Handles build compilation
   */
  compiler: Compiler

  /**
   * Dashboard
   */
  dashboard: Dashboard

  /**
   * Dependencies
   */
  dependencies: Dependencies

  /**
   * Discovery
   */
  discovery: Discovery

  /**
   * Env
   */
  env: Env

  /**
   * Extensions
   */
  extensions: Extensions

  /**
   * Hooks
   */
  hooks: Hooks

  /**
   * Logger
   */
  logger: Logger

  /**
   * Server
   */
  server: Server

  /**
   * Store
   */
  store: Store

  /**
   * bootstrap
   */
  bootstrap(): Framework

  /**
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
   * container
   */
  container(repository?: Container['repository']): Container

  /**
   * make
   */
  make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework

  /**
   * path
   */
  path(
    key: `${keyof Hooks.Locale.Definitions & string}`,
    ...path: string[]
  ): string

  /**
   * pipe
   */
  pipe(
    fns: ((input: Framework) => Framework)[],
    value?: Framework,
  ): Framework

  /**
   * sequence
   */
  sequence(fns: Array<(app: Framework) => any>): Framework

  /**
   * tap
   */
  tap(
    fn:
      | ((app?: Framework) => any)
      | ((this: Framework, app?: Framework) => any),
    bound?: boolean,
  ): Framework

  /**
   * when
   */
  when(
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework

  /**
   * log
   */
  log(message?: any, ...optionalArgs: any[]): void

  /**
   * log (log level: success)
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
   * error handler
   */
  error(message: any, ...optionalArgs: any[]): void
}

namespace Framework {
  export interface Services {
    [key: string]: new (app: Framework) => Service | Bootstrapper
  }

  export interface Options {
    name: string
    mode: 'production' | 'development'
    services: Services
    config: Configuration
    parent?: Framework
  }

  export type Tapable =
    | ((app: Framework) => any)
    | ((this: Framework, app?: Framework) => any)

  export interface Extensions {
    [key: string]: Module
  }

  export interface Rules {
    [key: string]: Build.Rule
  }

  export interface Items {
    [key: string]: Build.Item
  }

  export interface Loaders {
    [key: string]: Build.Loader
  }
}

abstract class Framework {
  public abstract implementation: new (
    options: Framework.Options,
  ) => Framework

  public name = 'bud'

  public parent: Framework

  public children: Container<{[key: string]: Framework}>

  public mode: Mode

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

  /**
   * Cloned from {@link Framework.Options} on instantiation.
   *
   * Stored so {@link Framework.make} can utilize as base for child compilers.
   */
  public options: {
    /**
     * {@link Framework.name}
     */
    name: string
    /**
     * {@link Framework.mode}
     */
    mode: Mode
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

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public constructor(options: Framework.Options) {
    this.options = {...options}

    this.name = this.options.name
    this.parent = this.options.parent ?? null
    this.mode = this.options.mode

    if (isNull(this.parent)) {
      this.children = new Container({})
    }

    this.store = new Store(this).setStore({
      ...this.options.config,
    })

    this.logger = new this.options.services.logger(
      this,
    ) as unknown as Logger
  }

  @bind
  public bootstrap(): Framework {
    const keys = this.container({...this.options.services})
      .getEntries()
      .filter(([name, service]): boolean => {
        /**
         * No reason to boot an extension that isn't well written
         */
        if (!service?.name) {
          this.warn(
            'service must include name property. none found; skipping.',
            service,
          )

          return false
        }

        /**
         * No reason to start server for prod
         */
        if (name == 'server' && this.isProduction) return false

        /**
         * No reason to boot expensive parent services
         * for child compilation instantances
         */
        if (
          !isNull(this.parent) &&
          [
            'compiler',
            'dashboard',
            'discovery',
            'server',
          ].includes(name)
        ) {
          return false
        }

        return true
      })
      .map(([name, Service]: [string, any]) => {
        Object.assign(this, {[name]: new Service(this)})

        return name
      })

    ;[
      'bootstrap',
      'register',
      'registered',
      'boot',
      'booted',
    ].forEach(event => {
      this.log(event)

      keys.forEach(key => {
        const service = this[key]
        if (!service || !service[event]) return

        this.log(service.name, event)

        service[event](this)
      })
    })

    return this
  }

  @bind
  public make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework {
    if (!isNull(this.parent)) {
      this.error(
        `\`${this.name}\` is a child compiler but you tried to call make from it. Try \`${this.name}.parent.make\` instead.`,
        `${this.name}.make`,
      )

      process.exit(1)
    }

    this.info(`Making child compiler: ${name}`)

    this.children.set(
      name,
      new this.implementation({
        name,
        mode: this.mode,
        services: this.options.services,
        config: this.options.config,
        parent: this,
      }).bootstrap(),
    )

    this.info(`Compilers`, this.children.getKeys())
    this.get(name, tap)

    return this
  }

  @bind
  public get(name: string, tap?: (app: Framework) => Framework) {
    this.log('get request', name)

    const compiler = this.children.get(name)

    if (tap && isFunction(tap)) {
      tap(compiler)
    }

    return compiler
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
  public tap(fn: Framework.Tapable, bound: boolean = true) {
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
      .scope(this.name)
      .log(message, ...optionalArgs)
  }

  @bind
  public info(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .info(message, ...optionalArgs)
  }

  @bind
  public success(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .success(message, ...optionalArgs)
  }

  @bind
  public warn(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .warn(message, ...optionalArgs)
  }

  @bind
  public debug(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .debug(message, ...optionalArgs)
  }

  @bind
  public error(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .error(message, ...optionalArgs)

    this.dashboard.renderError(message, optionalArgs.pop())
  }
}

export {Framework}
