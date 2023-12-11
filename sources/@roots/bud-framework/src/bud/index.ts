import type {
  Api,
  Build,
  Cache,
  Compiler,
  Context,
  Dashboard,
  Env,
  Extensions,
  Hooks,
  Project,
  Server,
  Service,
} from '@roots/bud-framework'

import methods from '@roots/bud-framework/methods'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/isFunction'
import isString from '@roots/bud-support/isString'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'

import type {FS} from '../fs.js'
import type {Module} from '../module.js'
import type {Notifier} from '../notifier.js'
import type {EventsStore} from '../registry/index.js'

import {bootstrap} from '../bootstrap.js'

/**
 * Bud core class
 */
export class Bud {
  /**
   * Promised tasks
   */
  public promised: Array<(bud: Bud) => Promise<any>> = []

  public declare addConfig: typeof methods.addConfig

  public declare after: typeof methods.after

  public declare api: Service & Api

  public declare bindFacade: typeof methods.bindFacade

  public declare build: Service & Build

  public declare cache: Service & Cache

  /**
   * {@link Bud} instances
   */
  public declare children: Record<string, Bud>

  public declare close: typeof methods.close

  public declare compiler?: Service & Compiler

  public declare container: typeof methods.container

  public declare context: Context

  public declare dashboard: Service & Dashboard

  public declare env: Service & Env

  public declare extensions: Service & Extensions

  public declare fs: FS

  public declare get: typeof methods.get

  public declare glob: typeof methods.glob

  public declare globSync: typeof methods.globSync

  public declare hooks: Service & Hooks

  /**
   * {@link Bud} Implementation
   * @internal
   */
  public declare implementation: new () => Bud

  /**
   * @deprecated Use {@link bud.fs}
   * @readonly
   */
  public declare json: FS['json']

  public declare maybeCall: typeof methods.maybeCall

  public declare module: Module

  public declare notifier: Notifier

  public declare path: typeof methods.path

  public declare pipe: typeof methods.pipe

  public declare processConfigs: typeof methods.processConfigs

  public declare project: Project

  public declare publicPath: typeof methods.publicPath

  public declare relPath: typeof methods.relPath

  public declare run: typeof methods.run

  public declare sequence: typeof methods.sequence

  public declare sequenceSync: typeof methods.sequenceSync

  public declare server?: Service & Server

  public declare setPath: typeof methods.setPath

  public declare setPublicPath: typeof methods.setPublicPath

  public declare sh: typeof methods.sh

  public declare tap: typeof methods.tap

  public declare tapAsync: typeof methods.tapAsync

  public declare when: typeof methods.when

  /**
   * @deprecated Use {@link Bud.fs}
   * @readonly
   */
  public declare yml: FS['yml']

  /**
   * True when child compilers
   * @readonly
   */
  public get hasChildren(): boolean {
    return this.children && Object.entries(this.children).length > 0
  }

  /**
   * True when current instance is a child instance
   * @readonly
   */
  public get isChild(): boolean {
    return this.root?.context?.label !== this.context?.label
  }

  /**
   * True when {@link Bud.mode} is `development`
   * @readonly
   */
  public get isDevelopment(): boolean {
    return this.mode === `development`
  }

  /**
   * True when {@link Bud.mode} is `production`
   * @readonly
   */
  public get isProduction(): boolean {
    return this.mode === `production`
  }

  /**
   * True when current instance is the parent instance
   * @readonly
   */
  public get isRoot(): boolean {
    return this.root?.context?.label === this.context?.label
  }

  /**
   * Label
   * @readonly
   */
  public get label() {
    return this.context?.label ?? `bud`
  }

  /**
   * Compilation mode
   *
   * @remarks
   * Either `production` or `development`.
   *
   * @readonly
   * @defaultValue `production`
   */
  public get mode(): `development` | `production` {
    return this.context?.mode ?? `production`
  }

  /**
   * Constructor
   */
  public constructor(context?: Context) {
    if (context) this.context = {...context}

    this.set(`implementation`, this.constructor as any)

    Object.entries(methods).map(([k, v]) =>
      this.set(k as any, v.bind(this)),
    )
  }

  /**
   * Boot application services
   */
  @bind
  public async boot() {
    await this.executeServiceCallbacks(`boot`).catch(this.catch)
  }

  /**
   * Bootstrap the application
   */
  @bind
  public async bootstrap() {
    await this.executeServiceCallbacks(`bootstrap`).catch(this.catch)
  }

  /**
   * Error handler
   */
  @bind
  public catch(error: Error): never {
    const normalizedError = BudError.normalize(error)
    if (!normalizedError.instance && this?.isChild)
      normalizedError.instance = this.label
    throw normalizedError
  }

  /**
   * Execute service callbacks for a given stage
   * @internal
   */
  @bind
  public async executeServiceCallbacks(
    stage: `${keyof EventsStore & string}`,
  ): Promise<void> {
    await this.resolvePromises().catch(this.catch)
    await this.hooks.fire(stage, this)
  }

  /**
   * Bud initialize
   */
  @bind
  public async initialize(context?: Context): Promise<Bud> {
    if (context) this.context = {...(this.context ?? {}), ...context}

    await bootstrap(this).catch(this.catch)

    await this.bootstrap().catch(this.catch)
    await this.register().catch(this.catch)
    await this.boot().catch(this.catch)
    await this.executeServiceCallbacks(`config.before`).catch(this.catch)

    return this
  }

  /**
   * Creates a child and returns the parent instance
   */
  @bind
  public async make(
    request: Partial<Context> | string,
    setupFn?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot) {
      return this.catch(
        InputError.normalize(
          `bud.make: must be called from the root context`,
        ),
      )
    }

    const context: Context = isString(request)
      ? {...this.context, label: request, root: this}
      : {...this.context, ...request, root: this}

    if (isUndefined(context.label)) {
      return this.catch(
        InputError.normalize(`bud.make: context.label must be a string`),
      )
    }

    if (
      !isUndefined(this.context.filter) &&
      !this.context.filter.includes(context.label)
    ) {
      logger
        .scope(`make`)
        .log(
          `skipping child instance based on --filter flag:`,
          context.label,
        )

      return this
    }

    if (!this.children) this.children = {}

    if (this.children[context.label]) {
      return this.catch(
        InputError.normalize(
          `bud.make: child instance ${context.label} already exists`,
        ),
      )
    }

    logger.scope(`make`).log(`instantiating ${context.label}`)

    this.children[context.label] =
      await new this.implementation().initialize({
        ...context,
      })
    if (setupFn) await setupFn(this.children[context.label])

    await this.children[context.label].resolvePromises().catch(this.catch)

    if (typeof request !== `string` && request.dependsOn) {
      this.get(context.label)?.hooks.on(
        `build.dependencies`,
        request.dependsOn,
      )
    }

    return this
  }

  /**
   * Await all promised tasks
   */
  @bind
  public promise(promise: (bud: Bud) => Promise<unknown>): Bud {
    this.promised.push(promise)
    return this
  }

  @bind
  public async resolvePromises() {
    if (this.promised.length === 0) return

    const promises = this.promised

    this.promised = []

    await promises.reduce(async (promised, promise) => {
      await promised
      await promise(this)
    }, Promise.resolve())
  }

  /**
   * Register application services
   */
  @bind
  public async register() {
    await this.executeServiceCallbacks(`register`).catch(this.catch)
  }

  /**
   * Parent {@link Bud} instance
   * @readonly
   */
  public get root(): Bud {
    return this.context?.root ?? this
  }

  /**
   * Set a value on the current instance
   * @param key - key
   * @param value - value
   * @param bind - bind value to current instance (default: true, if bindable)
   */
  @bind
  public set<K extends `${keyof Bud & string}`>(
    key: K,
    input: Bud[K],
    bind: boolean = true,
  ): Bud {
    const toBind = bind && isFunction(input) && `bind` in input

    const value = toBind ? input.bind(this) : input

    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    })

    return this
  }

  /**
   * Log message
   * @deprecated Import logger instance from `@roots/bud-support/logger`
   */
  @bind
  public log(...messages: Array<any>) {
    logger.scope(this.label).log(...messages)
    return this
  }

  /**
   * Log success
   * @deprecated Import logger instance from `@roots/bud-support/logger`
   */
  @bind
  public success(...messages: Array<any>) {
    logger.scope(this.label).log(...messages)
    return this
  }
  /**
   * Log warning
   * @deprecated Import logger instance from `@roots/bud-support/logger`
   */
  @bind
  public warn(...messages: Array<any>) {
    logger.scope(this.label).warn(...messages)
    return this
  }

  /**
   * Log info
   * @deprecated Import logger instance from `@roots/bud-support/logger`
   */
  @bind
  public info(...messages: Array<any>) {
    logger.scope(this.label).info(...messages)
    return this
  }

  /**
   * Log error
   * @deprecated Import logger instance from `@roots/bud-support/logger`
   */
  @bind
  public error(...messages: Array<any>) {
    logger.scope(this.label).error(...messages)
    return this
  }
}
