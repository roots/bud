import {Services} from './Services'
import {Lifecycle} from './Lifecycle'
import {Service, Bootstrapper} from '../Service'
import {Store} from '../Store'

import {Container} from '@roots/container'

import {isFunction} from 'lodash'
import {join} from 'path'
import {boundMethod as bind} from 'autobind-decorator'

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

  export interface ServiceConstructor {
    [key: string]: new (app: Framework) => Service | Bootstrapper
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
    this.mode = options.mode ?? 'production'
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

    this.set(
      name,
      tap && isFunction(tap) ? tap(compiler) : compiler,
    )

    return this
  }

  @bind
  public bootstrap(services: {
    [key: string]: new (app: Framework) => Service | Bootstrapper
  }): Framework {
    this.proto.services = services

    this.services = new Container()

    this.services.set(
      'logger',
      new services.logger(this) as unknown as Logger,
    )

    this.services.set(
      'store',
      new Store(this).setStore({
        ...(this.proto.config ?? {}),
      }),
    )

    Services.make(this, services)

    return this
  }

  @bind
  public lifecycle(): Framework {
    Lifecycle.doEvents(this)

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
