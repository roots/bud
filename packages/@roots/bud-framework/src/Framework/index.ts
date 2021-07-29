/**
 * @module @roots/bud-framework
 */

import {boundMethod as bind} from 'autobind-decorator'
import {isFunction, isNull} from 'lodash'
import {join} from 'path'

import type {
  Access,
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
  Make,
  Module,
  Plugin,
  Server,
  When,
} from '../'
import {
  access,
  Bootstrapper,
  Container,
  make,
  Service,
  Store,
  when,
} from '../'

/**
 * @namespace Framework
 */
namespace Framework {
  /**
   * Utility: Returns hash of a given object type
   */
  export type Index<T = any> = {[key: string]: T}

  /**
   * Compilation mode
   */
  export type Mode = 'production' | 'development'

  /**
   * Registered services
   */
  export interface Services
    extends Index<
      new (app: Framework) => Service | Bootstrapper
    > {}

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
   * Constructor props
   *
   * Cloned to {@link Framework.options} on instantiation so that {@link Framework.make}
   * has reference when instantiating child compilers
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

/**
 * @abstract Framework
 */
abstract class Framework {
  public implementation: Framework.Constructor

  public name: string

  public parent: Framework

  public children: Container<Framework.Instances>

  public mode: Framework.Mode

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

  public options: Framework.Options

  public access: Access

  public make: Make

  public when: When

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

    this.access = access.bind(this)
    this.when = when.bind(this)
    this.make = make.bind(this)
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
  public get(name: string, tap?: (app: Framework) => Framework) {
    this.log('get request', name)

    const compiler = this.children.get(name)

    if (tap && isFunction(tap)) {
      tap(compiler)
    }

    return compiler
  }

  @bind
  public container<T = any>(
    repository?: Container<T>['repository'],
  ): Container {
    return new Container<T>(repository ?? {})
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
    value?: Framework,
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
