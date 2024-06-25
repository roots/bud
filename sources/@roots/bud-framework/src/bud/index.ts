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
import type {FS} from '@roots/bud-framework/fs'
import type {Module} from '@roots/bud-framework/module'
import type {Notifier} from '@roots/bud-framework/notifier'

import {exit} from 'node:process'

import {bootstrap} from '@roots/bud-framework/bootstrap'
import methods from '@roots/bud-framework/methods'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, render as renderError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/isFunction'
import isString from '@roots/bud-support/isString'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'

import type {EventsStore} from '../registry/index.js'

/**
 * Bud core class
 */
export class Bud {
  public declare addConfig: typeof methods.addConfig

  public declare after: typeof methods.after

  public declare api: Api & Service

  public declare bindFacade: typeof methods.bindFacade

  public declare build: Build & Service

  public declare cache: Cache & Service

  public declare children: Record<string, Bud>

  public declare close: typeof methods.close

  public declare compiler: Compiler & Service

  public declare container: typeof methods.container

  public declare context: Context

  public declare dashboard: Dashboard & Service

  public declare env: Env & Service

  public declare extensions: Extensions & Service

  public declare fs: FS

  public declare get: typeof methods.get

  public declare glob: typeof methods.glob

  public declare globSync: typeof methods.globSync

  public declare hooks: Hooks & Service

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

  public declare server?: Server & Service

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
   * Promised tasks
   */
  public promised: Array<(bud: Bud) => Promise<any>> = []

  /**
   * Constructor
   */
  public constructor() {
    if (this.implementation)
      this.set(`implementation`, this.constructor as any)

    Object.entries(methods).map(([prop, value]) =>
      this.set(prop as keyof Bud, value),
    )
  }

  /**
   * Boot application services
   */
  @bind
  public async boot() {
    await this.executeServiceCallbacks(`boot`)
  }

  /**
   * Bootstrap the application
   */
  @bind
  public async bootstrap() {
    await this.executeServiceCallbacks(`bootstrap`)
  }

  /**
   * Error handler
   */
  @bind
  public catch(error: BudError | Error | null | string | undefined) {
    renderError(error)

    if (!this.context.ignoreErrors) {
      exit(1)
    }
  }

  /**
   * Execute service callbacks for a given stage
   * @internal
   */
  @bind
  public async executeServiceCallbacks(
    stage: `${keyof EventsStore & string}`,
  ): Promise<void> {
    await this.resolvePromises()
    await this.hooks.fire(stage, this)
  }

  /**
   * Bud initialize
   */
  @bind
  public async initialize(context?: Context): Promise<Bud> {
    if (!context) this.catch(`context is required`)

    this.context = {...(this.context ?? {}), ...context}

    await bootstrap(this)

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
      this.catch(`bud.make: must be called from the root context`)
    }

    const context: Context = isString(request)
      ? {...this.context, label: request, root: this}
      : {...this.context, ...request, root: this}

    if (isUndefined(context.label)) {
      this.catch(`bud.make: context.label must be a string`)
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
      this.catch(
        `bud.make: child instance ${context.label} already exists`,
      )
    }

    logger.scope(`make`).log(`Instantiating ${context.label}`)

    this.children[context.label] = new this.implementation()
    await this.children[context.label].initialize({...context})

    if (setupFn) {
      await setupFn(this.children[context.label])

      await this.children[context.label].resolvePromises()
    }

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
    const promises = this.promised
    this.promised = []

    await promises.reduce(async (promised, promise) => {
      await promised

      try {
        await promise(this)
      } catch (error) {
        throw error
      }
    }, Promise.resolve())
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

    logger
      .scope(this.label, `set`)
      .log(`Defined:`, key, `=>`, typeof value)

    return this
  }

  /**
   * Log message
   * @deprecated
   */
  @bind
  public log(...messages: Array<any>) {
    logger.scope(this.label).log(...messages)
    return this
  }

  /**
   * Log success
   * @deprecated
   */
  @bind
  public success(...messages: Array<any>) {
    logger.scope(this.label).log(...messages)
    return this
  }
  /**
   * Log warning
   * @deprecated
   */
  @bind
  public warn(...messages: Array<any>) {
    logger.scope(this.label).warn(...messages)
    return this
  }

  /**
   * Log info
   * @deprecated
   */
  @bind
  public info(...messages: Array<any>) {
    logger.scope(this.label).info(...messages)
    return this
  }

  /**
   * Log error
   * @deprecated
   */
  @bind
  public error(error: Error | string) {
    logger.scope(this.label).error(error)
    return this
  }
}
