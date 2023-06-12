import {bind} from '@roots/bud-support/decorators/bind'
import {InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import logger from '@roots/bud-support/logger'

import type methods from './methods/index.js'
import type {Module} from './module.js'
import type ConsoleBuffer from './services/console.js'
import type FS from './services/fs.js'
import type * as Options from './types/options/index.js'
import type Hooks from './types/services/hooks/index.js'
import type * as Services from './types/services/index.js'

import {bootstrap} from './lifecycle/bootstrap.js'

/**
 * Bud core class
 */
export class Bud {
  public declare after: typeof methods.after

  public declare api: Services.Api

  public declare build: Services.Build.Service

  public declare cache: Services.Cache.Service

  /**
   * {@link Bud} instances
   */
  public declare children: Record<string, Bud>

  public declare close: typeof methods.close

  public declare compiler: Services.Compiler.Service

  public declare consoleBuffer: ConsoleBuffer

  public declare container: typeof methods.container

  /**
   * Context
   */
  public declare context: Options.Context

  public declare dashboard: Services.Dashboard.Service

  public declare env: Services.Env

  public declare extensions: Services.Extensions.Service

  public declare fs: FS

  public declare get: typeof methods.get

  public declare glob: typeof methods.glob

  public declare globSync: typeof methods.globSync

  public declare hooks: Hooks

  /**
   * Implementation
   */
  public declare implementation: new () => Bud

  /**
   * @deprecated Use {@link bud.fs.json | bud.fs.json}
   * @readonly
   */
  public declare json: FS['json']

  public declare maybeCall: typeof methods.maybeCall

  public declare module: Module

  public declare notifier: Services.Notifier

  public declare path: typeof methods.path

  public declare pipe: typeof methods.pipe

  public declare processConfigs: typeof methods.processConfigs

  public declare project: Services.Project.Service

  public declare publicPath: typeof methods.publicPath

  public declare relPath: typeof methods.relPath

  public declare run: typeof methods.run

  public declare sequence: typeof methods.sequence

  public declare sequenceSync: typeof methods.sequenceSync

  public declare server: Services.Server.Service

  public declare services: Array<`${keyof Services.Registry & string}`>

  public declare setPath: typeof methods.setPath

  public declare setPublicPath: typeof methods.setPublicPath

  public declare sh: typeof methods.sh

  public declare tap: typeof methods.tap

  public declare tapAsync: typeof methods.tapAsync

  public declare when: typeof methods.when

  /**
   * @deprecated Use {@link bud.fs.yml | bud.fs.yml}
   * @readonly
   */
  public declare yml: FS['yml']

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
   * Log error
   */
  @bind
  public error(...messages: Array<any>): Bud {
    logger.scope(this.label).error(...messages)
    return this
  }

  /**
   * Execute service callbacks for a given stage
   *
   * @param stage - `bootstrap`, `register`, or `boot`
   * @returns Bud (promise)
   */
  @bind
  public async executeServiceCallbacks(
    stage: `boot` | `bootstrap` | `register`,
  ): Promise<Bud> {
    await this.hooks.fire(stage, this)
    if (this.api?.queue?.length) await this.api.processQueue()
    return this
  }

  /**
   * True when child compilers
   * @readonly
   */
  public get hasChildren(): boolean {
    return this.children && Object.entries(this.children).length > 0
  }

  /**
   * Log info
   */
  @bind
  public info(...messages: any[]) {
    logger.scope(this.label).info(...messages)
    return this
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
    return this.context?.label
  }

  @bind
  public async lifecycle(context: Options.Context): Promise<Bud> {
    Object.assign(this, {}, {context: {...context}})
    await bootstrap.bind(this)()
    return this
  }

  /**
   * Log message
   */
  @bind
  public log(...messages: any[]) {
    logger.scope(this.label).log(...messages)
    return this
  }

  /**
   * Creates a child with `bud.create` but returns the parent instance
   */
  @bind
  public async make(
    request: Partial<Options.Context> | string,
    setupFn?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot) {
      throw new InputError(
        `bud.make: must be called from the root context`,
      )
    }

    const context: Options.Context = isString(request)
      ? {...this.context, label: request, root: this}
      : {...this.context, ...request, root: this}

    if (isUndefined(context.label)) {
      throw new InputError(`bud.make: context.label must be a string`)
    }

    if (
      !isUndefined(this.context.filter) &&
      !this.context.filter.includes(context.label)
    ) {
      this.log(
        `skipping child instance based on --filter flag:`,
        context.label,
      )
      return this
    }

    if (!this.children) {
      this.children = {}
    }

    if (this.children[context.label]) {
      throw new InputError(
        `bud.make: child instance ${context.label} already exists`,
      )
    }

    this.log(`instantiating new bud instance`)
    this.children[context.label] =
      await new this.implementation().lifecycle({
        ...context,
      })
    if (setupFn) await setupFn(this.children[context.label])

    await this.children[context.label].api.processQueue()

    this.get(context.label).hooks.on(
      `build.dependencies`,
      typeof request !== `string` && request.dependsOn
        ? request.dependsOn
        : Object.values(this.children)
            .map(({label}) => label)
            .filter(label => label !== context.label),
    )

    return this
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
    return this.context.mode ?? `production`
  }

  /**
   * Register application services
   */
  @bind
  public async register() {
    await this.executeServiceCallbacks(`register`)
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
    value: Bud[K],
    bind: boolean = true,
  ): Bud {
    if (bind && isFunction(value) && `bind` in value) {
      return Object.assign(this, {[key]: value.bind(this)})
    }

    return Object.assign(this, {[key]: value})
  }

  /**
   * Log success
   */
  @bind
  public success(...messages: any[]) {
    logger.scope(this.label).success(...messages)
    return this
  }

  /**
   * Log warning
   */
  @bind
  public warn(...messages: any[]) {
    logger.scope(this.label).warn(...messages)
    return this
  }
}
