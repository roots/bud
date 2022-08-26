import {highlight} from 'cli-highlight'
import {bind} from 'helpful-decorators'
import {isFunction, isNull, isString, isUndefined} from 'lodash-es'
import {format} from 'pretty-format'

import type {
  Cache,
  Compiler,
  Config,
  Dashboard,
  Env,
  Extensions,
  Hooks,
  Logger,
  Project,
  Server,
  Services,
} from './index.js'
import {bootstrap, LIFECYCLE_EVENT_MAP} from './lifecycle/bootstrap.js'
import {override} from './lifecycle/init.js'
import type * as methods from './methods/index.js'
import type {Module} from './module.js'
import * as parsers from './parsers/index.js'
import type {EventsStore} from './registry/index.js'
import type {Service as Api} from './services/api/index.js'
import type {Service as Build} from './services/build/index.js'

/**
 * Framework abstract
 *
 * @public
 */
export class Bud {
  /**
   * Context
   *
   * @public
   */
  public context: Config.Context

  public implementation: Constructor

  /**
   * Compilation mode
   *
   * @remarks
   * Either `production` or `development`.
   *
   * @readonly
   * @defaultValue `production`
   * @public
   */
  public get mode(): `development` | `production` {
    return this.context.mode ?? `production`
  }

  /**
   * Name
   *
   * @readonly
   * @public
   */
  public get label() {
    return this.context.label
  }

  /**
   * Parent {@link Bud} instance
   *
   * @readonly
   * @public
   */
  public get root(): Bud {
    return this.context.root ?? this
  }

  /**
   * True when {@link Bud.mode} is `production`
   *
   * @public
   */
  public get isProduction(): boolean {
    return this.mode == `production`
  }

  /**
   * True when {@link Bud.mode} is `development`
   *
   * @public
   */
  public get isDevelopment(): boolean {
    return this.mode == `development`
  }

  /**
   * True when current instance is the parent instance
   *
   * @readonly
   * @public
   */
  public get isRoot(): boolean {
    return this.root.label === this.label
  }

  /**
   * True when current instance is a child instance
   *
   * @readonly
   * @public
   */
  public get isChild(): boolean {
    return this.root.label !== this.label
  }

  /**
   * {@link Bud} instances
   *
   * @public
   */
  public children: Record<string, Bud>

  /**
   * True when child compilers
   *
   * @readonly
   * @public
   */
  public get hasChildren(): boolean {
    return (
      !isUndefined(this.children) &&
      !isNull(this.children) &&
      Object.entries(this.children).length > 0
    )
  }

  public services: Array<keyof Services.Registry> = []

  public api: Api

  public build: Build

  public cache: Cache.Service

  public compiler: Compiler.Service

  public dashboard: Dashboard.Service

  public env: Env.Service

  public extensions: Extensions.Service

  public hooks: Hooks.Service

  public project: Project.Service

  public logger: Logger

  public module: Module

  public server: Server.Service

  public maybeCall: methods.maybeCall

  public close: methods.close

  public container: methods.container

  public get: methods.get

  public glob: methods.glob

  public globSync: methods.globSync

  public path: methods.path

  public pipe: methods.pipe

  public publicPath: methods.publicPath

  public relPath: methods.relPath

  public run: methods.run

  public setPath: methods.setPath

  public setPublicPath: methods.setPublicPath

  public sequence: methods.sequence

  public sequenceSync: methods.sequenceSync

  public tap: methods.tap

  public tapAsync: methods.tapAsync

  public when: methods.when

  public bindMethod: methods.bindMethod

  public json: typeof parsers.json5 = parsers.json5

  public yml: typeof parsers.yml = parsers.yml

  /**
   * Creates a child with `bud.create` but returns the parent instance
   *
   * @public
   */
  public async make(
    request: Config.Overrides | string,
    tap?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot)
      return this.fatal(
        `Child instances should be produced from the root context`,
      )

    let context: Config.Context

    if (isString(request))
      context = {
        ...this.context,
        label: request,
        root: this,
      }
    else context = {...this.context, ...request, root: this}

    if (this.children && this.children[context.label]) {
      this.log(`returning requested child instance:`, context.label)
      return this.children[context.label]
    }

    this.log(`instantiating bud`, context)
    const child = await new Bud().lifecycle(context)

    if (!this.children) this.children = {[context.label]: child}
    else this.children[context.label] = child

    if (tap) await tap(this.children[context.label])
    await this.children[context.label].hooks.fire(`config.after`)

    return this
  }

  @bind
  public async lifecycle(context: Config.Context): Promise<Bud> {
    await bootstrap.bind(this)({...context})

    Object.entries(LIFECYCLE_EVENT_MAP).map(
      ([eventHandle, callbackName]) =>
        this.services
          .map(service => [service, this[service]])
          .map(([label, service]) => {
            if (!isFunction(service[callbackName])) return
            this.hooks.action(
              eventHandle as keyof EventsStore,
              service[callbackName].bind(service),
            )
            this.success(
              `registered service callback:`,
              `${label}.${callbackName}`,
            ).info(service[callbackName])
          }),
    )

    await [
      `bootstrap`,
      `bootstrapped`,
      `register`,
      `registered`,
      `boot`,
      `booted`,
    ].reduce(async (promised, event: keyof EventsStore) => {
      await promised
      await this.hooks
        .fire(event)
        .catch(error => this.error(`error on`, event, error))
        .finally(() =>
          this.success(
            `called all events registered to`,
            `'${event}'`,
            `lifecycle event`,
          ),
        )
    }, Promise.resolve())

    this.hooks.action(`config.after`, override)

    return this
  }

  @bind
  private formatLogMessages(messages: any[]) {
    return messages.map(message =>
      typeof message !== `string`
        ? highlight(format(message))
        : message.replace(this.context.basedir, `.`),
    )
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...messages: any[]) {
    if (
      !this.logger?.instance ||
      this.context.args.level?.length < 3 ||
      this.context.args.log === false
    )
      return this
    this.logger.instance.log(...this.formatLogMessages(messages))
    return this
  }

  /**
   * Log an `info` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public info(...messages: any[]) {
    if (
      !this.logger?.instance ||
      this.context.args.level?.length < 4 ||
      this.context.args.log === false
    )
      return this
    this.logger.instance.info(...this.formatLogMessages(messages))
    return this
  }

  /**
   * Log a `success` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public success(...messages: any[]) {
    if (
      !this.logger?.instance ||
      this.context.args.level?.length < 3 ||
      this.context.args.log === false
    )
      return this
    this.logger.instance.success(...this.formatLogMessages(messages))
    return this
  }

  /**
   * Log a `warning` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public warn(...messages: any[]) {
    if (!this.logger?.instance) return this
    this.logger.instance.warn(...this.formatLogMessages(messages))
    return this
  }

  /**
   * Log an error.
   *
   * @remarks
   * In `production` this error is treated as fatal
   * and will kill the process.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public error(...messages: any[]) {
    if (!this.logger?.instance) return this
    this.logger.instance.error(...this.formatLogMessages(messages))

    if (this.isProduction) {
      process.exitCode = 1
      this.close()
    }
  }

  /**
   * Log and display an error.
   *
   * @remarks
   * This will always kill the process
   *
   * @public
   * @decorator `@bind`
   * @throws fatal error
   */
  @bind
  public fatal(...messages: any[]) {
    if (!this.logger?.instance) return this

    this.logger.instance.error(...this.formatLogMessages(messages))
    process.exitCode = 1
    process.exit()
  }
}

/**
 * Bud Constructor
 */
export type Constructor = new () => Bud
