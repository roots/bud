import {bind} from 'helpful-decorators'
import {isFunction, isNull, isString, isUndefined} from 'lodash-es'

import {bootstrap, LIFECYCLE_EVENT_MAP} from './lifecycle/bootstrap.js'
import {override} from './lifecycle/init.js'
import type {Logger} from './logger'
import type * as methods from './methods/index.js'
import type {Module} from './module'
import * as parsers from './parsers/index.js'
import type * as Service from './service'
import type * as Api from './services/api.js'
import type * as Options from './types/options'
import type * as Registry from './types/registry'
import type * as Services from './types/services'
import Value from './value.js'

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
  public context: Options.Context

  /**
   * Implementation
   *
   * @public
   */
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

  public services: Array<string> = []

  public api: Api.Service

  public build: Services.Build.Service

  public cache: Services.Cache.Service

  public compiler: Services.Compiler.Service

  public dashboard: Services.Dashboard.Service

  public env: Services.Env.Service

  public extensions: Services.Extensions.Service

  public hooks: Services.Hooks.Service

  public project: Services.Project.Service

  public logger: Logger

  public module: Module

  public server: Services.Server.Service

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

  public value = Value

  /**
   * Creates a child with `bud.create` but returns the parent instance
   *
   * @public
   */
  public async make(
    request: Options.Overrides | string,
    tap?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot)
      return this.fatal(
        `Child instances should be produced from the root context`,
      )

    let context: Options.Context

    if (isString(request))
      context = {
        ...this.context,
        label: request,
        root: this,
      }
    else context = {...this.context, ...request, root: this}

    if (this.children && this.children[context.label]) {
      this.log(`returning requested child instance:`, context.label)
      return this.get(context.label)
    }

    this.log(`instantiating bud`, context)
    const child = await new Bud().lifecycle(context)

    if (!this.children) this.children = {[context.label]: child}
    else this.children[context.label] = child

    if (tap) await tap(this.get(context.label))
    await this.get(context.label).hooks.fire(`config.after`)

    return this
  }

  @bind
  public async lifecycle(context: Options.Context): Promise<Bud> {
    await bootstrap.bind(this)({...context})

    const logger = this.logger.instance.scope(
      ...this.logger.scope,
      `bootstrap`,
    )

    Object.entries(LIFECYCLE_EVENT_MAP).map(
      ([eventHandle, callbackName]: [
        keyof Registry.EventsStore,
        keyof Service.Contract,
      ]) =>
        this.services
          .map(service => [service, this[service]])
          .map(([label, service]) => {
            if (!isFunction(service[callbackName])) return

            this.hooks.action(
              eventHandle,
              service[callbackName].bind(service),
            )
            logger.success(
              `registered service callback:`,
              `${label}.${callbackName}`,
            )
          }),
    )

    await [
      `init`,
      `bootstrap`,
      `bootstrapped`,
      `register`,
      `registered`,
      `boot`,
      `booted`,
    ].reduce(async (promised, event: keyof Registry.EventsStore) => {
      await promised
      await this.hooks
        .fire(event)
        .catch(error => logger.error(`error on`, event, error))
        .finally(() => logger.success(event))
    }, Promise.resolve())

    this.hooks.action(`config.after`, override)

    return this
  }

  @bind
  private formatLogMessages(messages: any[]) {
    return messages.map(message =>
      (typeof message !== `string`
        ? this.json.stringify(message)
        : message
      )
        ?.replaceAll(this.context.basedir, `.`)
        .replaceAll(/(.*)\s(.*)\/node_modules\/(.*)/g, `$1 $3`),
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
  public error(...messages: Array<any>): Bud {
    if (this.logger?.instance)
      this.logger.instance.error(...this.formatLogMessages(messages))

    return this
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
  public fatal(error: string) {
    this.logger.instance.error(error)
  }
}

/**
 * Bud Constructor
 */
export type Constructor = new () => Bud
