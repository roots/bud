import {Api} from '../Api'
import {Build} from '../Build'
import {Cache} from '../Cache'
import {Compiler} from '../Compiler'
import {Container} from '@roots/container'
import {Dashboard} from '../Dashboard'
import {Dependencies} from '../Dependencies'
import {Discovery} from '../Discovery'
import {Disk} from '../Disk'
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

interface Framework {
  /**
   * Application name
   * @default 'bud'
   */
  name: string

  /**
   * Multi-compiler instances
   * @note multi-compiler api is experimental
   */
  instance: Container<Framework>

  /**
   * API service
   */
  api: Api

  /**
   * Build service
   */
  build: Build

  /**
   * Cache service
   */
  cache: Cache

  /**
   * Compiler service
   */
  compiler: Compiler

  /**
   * Dashboard service
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
   * Disk service
   */
  disk: Disk

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
  get(): Framework

  /**
   * app.getInstance
   * @note multi-compiler api is experimental
   */
  getInstance(key: string): Framework

  /**
   * app.setInstance
   * @note multi-compiler api is experimental
   */
  setInstance(key: string, framework: Framework): void

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
    path?: string,
  ): string

  /**
   * app.pipe
   */
  pipe<I = any, R = any>(fns: CallableFunction[], value: I): R

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
  error(message: any, title: string): void
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
  public name = 'bud'

  public _services: Container<Service>

  public _instance: Container<this>

  public _mode: Mode

  public api: Api

  public build: Build

  public cache: Cache

  public compiler: Compiler

  public dashboard: Dashboard

  public dependencies: Dependencies

  public discovery: Discovery

  public disk: Disk

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

  public getMode(): Mode {
    return this.mode
  }

  public setMode(mode: Mode): void {
    this.mode = mode
  }

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public constructor(config?: Store['repository']) {
    this.mode = (
      process.env.NODE_ENV && process.env.NODE_ENV !== 'test'
        ? process.env.NODE_ENV
        : 'production'
    ) as 'production' | 'development'

    this.store = new Store(this.get).setStore(config ?? {})
  }

  public access<I = any>(value: ((app: this) => I) | I): I {
    return isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  public container(
    repository?: Container['repository'],
  ): Container {
    return new Container(repository ?? {})
  }

  @bind
  public get(): this {
    return this
  }

  @bind
  public getInstance(key: string): Framework {
    return this._instance.get(key)
  }

  @bind
  public setInstance(key: string, app: Framework) {
    Object.assign(this, {
      _instance: {
        [key]: app,
      },
    })
  }

  @bind
  public bootstrap(services: {
    [key: string]: new (app: any) => Service | Bootstrapper
  }): Framework {
    this.services = this.container(services)

    this.services.getEntries().map(([key, Instance]) => {
      this[key] = new Instance(this.get)
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
      this.services.getKeys().forEach(serviceName => {
        const service = this[serviceName]
        service && service[event] && service[event](this)
      })
    })

    return this
  }

  @bind
  public path(
    key: `${keyof Hooks.Locale.Definitions & string}`,
    path?: string,
  ): string {
    return join(
      ...[
        key !== 'project'
          ? this.hooks.filter('location/project')
          : false,
        this.hooks.filter(`location/${key}` as Hooks.Name),
        path ?? false,
      ].filter(Boolean),
    )
  }

  @bind
  public pipe<I = any, R = any>(
    fns: CallableFunction[],
    value: I,
  ): R {
    return (value = fns.reduce((val, fn) => {
      return fn(val)
    }, value))
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
      .scope(this.name)
      .log(message, optionalArgs)
  }

  @bind
  public info(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .info(message, optionalArgs)
  }

  @bind
  public warn(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .warn(message, optionalArgs)
  }

  @bind
  public debug(message?: any, ...optionalArgs: any[]) {
    this.logger.instance
      .scope(this.name)
      .debug(message, optionalArgs)
  }

  @bind
  public error(message: string, title: string) {
    const instance = this.dashboard.renderError(message, title)
    setTimeout(instance.unmount, 2000)
  }
}

export {Framework}
