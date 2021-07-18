import {join} from 'path'

import {Service, Bootstrapper} from '../Service'
import {Store} from '../Store'

import {Container} from '@roots/container'

import {isFunction} from 'lodash'

import type {Api} from '../Api'
import type {Build} from '../Build'
import type {Cache} from '../Cache'
import type {Compiler} from '../Compiler'
import type {Configuration} from '../Configuration'
import type {Dashboard} from '../Dashboard'
import type {Dependencies} from '../Dependencies'
import type {Discovery} from '../Discovery'
import type {Env} from '../Env'
import type {Extensions, Module} from '../Extensions'
import type {Hooks} from '../Hooks'
import type {Logger} from '../Logger'
import type {Mode} from '../Mode'
import type {Server} from '../Server'

import {boundMethod as bind} from 'autobind-decorator'

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
   * If the parent instance, returns null.
   */
  parent: Framework

  /**
   * ## children
   *
   * Compiler instance container.
   */
  children: Container<{[key: string]: Framework}>

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
   * bootstrap
   */
  bootstrap(): Framework

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
   * app.make
   * @note multi-compiler api is experimental
   */
  make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework

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

  public isChild: boolean

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

  public _services: Framework.Services

  public _config: Configuration

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public constructor(options: Framework.Options) {
    this.name = options.name
    this.parent = options.parent ?? null
    this.mode = options.mode

    this._services = {...options.services}
    this._config = {...options.config}

    this.children = options.parent
      ? options.parent.children
      : new Container({})
  }

  @bind
  public bootstrap(): Framework {
    this.store = new Store(this).setStore({
      ...this._config,
    })

    this.logger = new this._services.logger(
      this,
    ) as unknown as Logger

    const keys = this.container({...this._services})
      .getEntries()
      .filter(this.filter.bind(this))
      .map(([name, Service]: [string, any]) => {
        this[name] = new Service(this)
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
  public filter([name, service]): boolean {
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
      this.parent &&
      ['compiler', 'dashboard', 'discovery', 'server'].includes(
        name,
      )
    ) {
      if (this.parent[name]) this[name] = this.parent[name]
      return false
    }

    return true
  }

  @bind
  public make(
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework {
    this.info(`Making child compiler: ${name}`)

    this.children.set(
      name,
      new this.implementation({
        name,
        mode: this.mode,
        services: this._services,
        config: this._config,
        parent: this,
      }).bootstrap(),
    )

    this.info(`Compilers`, this.children.getKeys())

    if (tap && isFunction(tap)) {
      tap(this.children.get(name))
    }

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
  }
}

export {Framework}
