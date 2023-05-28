import {bind} from '@roots/bud-support/decorators/bind'
import {InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import logger from '@roots/bud-support/logger'

import {bootstrap} from './lifecycle/bootstrap.js'
import type methods from './methods/index.js'
import type {Module} from './module.js'
import type ConsoleBuffer from './services/console.js'
import type FS from './services/fs.js'
import type * as Options from './types/options/index.js'
import type Hooks from './types/services/hooks/index.js'
import type * as Services from './types/services/index.js'

/**
 * Bud core class
 */
export class Bud {
  /**
   * Label
   * @readonly
   */
  public get label() {
    return this.context?.label
  }

  /**
   * Context
   */
  public context: Options.Context

  /**
   * Implementation
   */
  public implementation: new () => Bud

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
   * True when {@link Bud.mode} is `production`
   * @readonly
   */
  public get isProduction(): boolean {
    return this.mode === `production`
  }

  /**
   * True when {@link Bud.mode} is `development`
   * @readonly
   */
  public get isDevelopment(): boolean {
    return this.mode === `development`
  }

  /**
   * {@link Bud} instances
   */
  public readonly children: Record<string, Bud> = {}

  /**
   * Parent {@link Bud} instance
   * @readonly
   */
  public get root(): Bud {
    return this.context?.root ?? this
  }

  /**
   * True when current instance is the parent instance
   * @readonly
   */
  public get isRoot(): boolean {
    return this.root?.context?.label === this.context?.label
  }

  /**
   * True when current instance is a child instance
   * @readonly
   */
  public get isChild(): boolean {
    return this.root?.context?.label !== this.context?.label
  }

  /**
   * True when child compilers
   * @readonly
   */
  public get hasChildren(): boolean {
    return Object.entries(this.children).length > 0
  }

  public readonly services: Array<`${keyof Services.Registry & string}`> =
    []

  public declare readonly consoleBuffer: ConsoleBuffer

  public declare readonly fs: FS

  public declare readonly module: Module

  public declare readonly api: Services.Api

  public declare readonly build: Services.Build.Service

  public declare readonly cache: Services.Cache.Service

  public declare readonly compiler: Services.Compiler.Service

  public declare readonly dashboard: Services.Dashboard.Service

  public declare readonly env: Services.Env

  public declare readonly extensions: Services.Extensions.Service

  public declare readonly hooks: Hooks

  public declare readonly notifier: Services.Notifier

  public declare readonly project: Services.Project.Service

  public declare readonly server: Services.Server.Service

  public declare readonly after: typeof methods.after

  public declare readonly maybeCall: typeof methods.maybeCall

  public declare readonly close: typeof methods.close

  public declare readonly container: typeof methods.container

  public declare readonly get: typeof methods.get

  public declare readonly glob: typeof methods.glob

  public declare readonly globSync: typeof methods.globSync

  public declare readonly path: typeof methods.path

  public declare readonly pipe: typeof methods.pipe

  public declare readonly processConfigs: typeof methods.processConfigs

  public declare readonly publicPath: typeof methods.publicPath

  public declare readonly relPath: typeof methods.relPath

  public declare readonly run: typeof methods.run

  public declare readonly setPath: typeof methods.setPath

  public declare readonly setPublicPath: typeof methods.setPublicPath

  public declare readonly sequence: typeof methods.sequence

  public declare readonly sequenceSync: typeof methods.sequenceSync

  public declare readonly sh: typeof methods.sh

  public declare readonly tap: typeof methods.tap

  public declare readonly tapAsync: typeof methods.tapAsync

  public declare readonly when: typeof methods.when

  /**
   * @deprecated Use {@link bud.fs.json | bud.fs.json}
   * @readonly
   */
  public readonly json: FS['json']

  /**
   * @deprecated Use {@link bud.fs.yml | bud.fs.yml}
   * @readonly
   */
  public readonly yml: FS['yml']

  /**
   * Set a value on the current instance
   * @param key - key
   * @param value - value
   * @param bind - bind value to current instance (default: true, if bindable)
   */
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
   * Creates a child with `bud.create` but returns the parent instance
   */
  @bind
  public async make(
    request: Partial<Options.Context> | string,
    tap?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot) {
      throw new InputError(
        `bud.make: must be called from the root context`,
      )
    }

    const context: Options.Context = isString(request)
      ? {...this.context, label: request, root: this}
      : {...this.context, ...request, root: this}

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

    if (this.children && this.children[context.label]) {
      this.log(`returning requested child instance:`, context.label)
      return this.get(context.label)
    }

    this.log(`instantiating new bud instance`)
    this.children[context.label] =
      await new this.implementation().lifecycle(context)

    this.get(context.label).hooks.on(
      `build.dependencies`,
      typeof request !== `string` && request.dependsOn
        ? request.dependsOn
        : Object.values(this.children)
            .map(({label}) => label)
            .filter(label => label !== context.label),
    )

    if (tap) await tap(this.get(context.label))

    await this.get(context.label)?.api.processQueue()

    return this
  }

  @bind
  public async lifecycle(context: Options.Context): Promise<Bud> {
    Object.assign(this, {}, {context})
    await bootstrap.bind(this)()

    return this
  }

  /**
   * Bootstrap the application
   */
  @bind
  public async bootstrap() {
    await this.executeServiceCallbacks(`bootstrap`)
  }

  /**
   * Register application services
   */
  @bind
  public async register() {
    await this.executeServiceCallbacks(`register`)
  }

  /**
   * Boot application services
   */
  @bind
  public async boot() {
    await this.executeServiceCallbacks(`boot`)
  }

  /**
   * Execute service callbacks for a given stage
   *
   * @param stage - `bootstrap`, `register`, or `boot`
   * @returns Bud (promise)
   */
  @bind
  public async executeServiceCallbacks(
    stage: `bootstrap` | `register` | `boot`,
  ): Promise<Bud> {
    await this.hooks.fire(stage, this)
    if (this.api?.queue?.length) await this.api.processQueue()
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
   * Log info
   */
  @bind
  public info(...messages: any[]) {
    logger.scope(this.label).info(...messages)
    return this
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

  /**
   * Log error
   */
  @bind
  public error(...messages: Array<any>): Bud {
    logger.scope(this.label).error(...messages)
    return this
  }
}
