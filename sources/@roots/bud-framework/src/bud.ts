import {bind} from '@roots/bud-support/decorators'
import {
  isFunction,
  isNull,
  isString,
  isUndefined,
} from '@roots/bud-support/lodash-es'

import {bootstrap, LIFECYCLE_EVENT_MAP} from './lifecycle/bootstrap.js'
import type * as methods from './methods/index.js'
import type {Module} from './module.js'
import type {Service} from './service.js'
import type ConsoleBuffer from './services/console.js'
import type FS from './services/fs.js'
import type * as Options from './types/options/index.js'
import type * as Registry from './types/registry/index.js'
import type Hooks from './types/services/hooks/index.js'
import type * as Services from './types/services/index.js'
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
  public implementation: new () => Bud

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
  public get root() {
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
  public children?: Record<string, Bud>

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

  public consoleBuffer: ConsoleBuffer

  public fs: FS

  public module: Module

  public services: Array<string> = []

  public api: Services.Api

  public build: Services.Build.Service

  public cache: Services.Cache.Service

  public compiler: Services.Compiler.Service

  public dashboard: Services.Dashboard.Service

  public env: Services.Env

  public extensions: Services.Extensions.Service

  public hooks: Hooks

  public project: Services.Project.Service

  public server: Services.Server.Service

  public declare after: methods.after

  public declare maybeCall: methods.maybeCall

  public declare close: methods.close

  public declare container: methods.container

  public declare get: methods.get

  public declare glob: methods.glob

  public declare globSync: methods.globSync

  public declare path: methods.path

  public declare pipe: methods.pipe

  public declare processConfigs: methods.processConfigs

  public declare publicPath: methods.publicPath

  public declare relPath: methods.relPath

  public declare run: methods.run

  public declare setPath: methods.setPath

  public declare setPublicPath: methods.setPublicPath

  public declare sequence: methods.sequence

  public declare sequenceSync: methods.sequenceSync

  public declare sh: methods.sh

  public declare tap: methods.tap

  public declare tapAsync: methods.tapAsync

  public declare when: methods.when

  public declare bindMethod: methods.bindMethod

  /**
   * @deprecated - use {@link bud.fs.json | bud.fs.json}
   */
  public json: FS['json']

  /**
   * @deprecated - use {@link bud.fs.yml | bud.fs.yml}
   */
  public yml: FS['yml']

  /**
   * Value helper
   *
   * @public
   */
  public value = Value

  /**
   * Creates a child with `bud.create` but returns the parent instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(
    request: Partial<Options.Context> | string,
    tap?: (app: Bud) => Promise<unknown>,
  ) {
    if (!this.isRoot)
      return this.fatal(
        new Error(
          `Child instances should be produced from the root context`,
        ),
      )

    const context: Options.Context = isString(request)
      ? {...this.context, label: request, root: this}
      : {...this.context, ...request, root: this}

    if (this.children && this.children[context.label]) {
      this.log(`returning requested child instance:`, context.label)
      return this.get(context.label)
    }

    this.log(`instantiating new bud instance`)
    const child = await new Bud().lifecycle(context)

    if (!this.children) this.children = {[context.label]: child}
    else this.children[context.label] = child

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
    await bootstrap.bind(this)({...context})

    Object.entries(LIFECYCLE_EVENT_MAP).map(
      ([eventHandle, callbackName]: [
        keyof Registry.EventsStore,
        keyof Service,
      ]) =>
        this.services
          .map(service => [service, this[service]])
          .map(([label, service]) => {
            if (!service) {
              this.error(`service not found: ${label}`, this.services)
            }

            if (!isFunction(service[callbackName])) return

            this.hooks.action(
              eventHandle,
              service[callbackName].bind(service),
            )
            this.success(
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
      await this.hooks.fire(event)
    }, Promise.resolve())

    return this
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...messages: any[]) {
    this.context.logger.log(...messages)

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
    this.context.logger.info(...messages)

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
    this.context.logger.success(...messages)
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
    this.context.logger.warn(...messages)

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
    this.context.logger.error(...messages)
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
  public fatal(error: Error) {
    this.context.logger.fatal(error)
    return this
  }
}
