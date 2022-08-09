import {bind} from 'helpful-decorators'
import {omit} from 'lodash-es'
import {format, PrettyFormatOptions} from 'pretty-format'

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
import {lifecycle} from './lifecycle/index.js'
import type * as methods from './methods/index.js'
import type {Module} from './module.js'
import * as parsers from './parsers/index.js'
import type {Service as Api} from './services/api/index.js'
import type {Service as Build} from './services/build/index.js'

/**
 * Framework abstract
 *
 * @public
 */
export abstract class Bud {
  /**
   * Options
   *
   * @internal
   * @virtual
   */
  public options: Config.Options

  /**
   * Context
   *
   * @public
   */
  public context: Config.Context

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
  public get mode(): 'development' | 'production' {
    return this.options.mode
  }

  /**
   * Name
   *
   * @readonly
   * @public
   */
  public get label() {
    return this.options.label
  }

  /**
   * Parent {@link Bud} instance
   *
   * @readonly
   * @public
   */
  public get root(): Bud {
    return this.options.root ?? this
  }

  /**
   * True when {@link Bud.mode} is `production`
   *
   * @public
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * True when {@link Bud.mode} is `development`
   *
   * @public
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
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
    return Object.values(this.children).length > 0
  }

  public services: Services.Registry

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

  public lifecycle: lifecycle

  public maybeCall: methods.maybeCall

  public close: methods.close

  public container: methods.container

  public get: methods.get

  public glob: methods.glob

  public globSync: methods.globSync

  public make: methods.make

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
   * Class constructor
   *
   * @public
   */
  public constructor(public implementation: Constructor) {
    this.lifecycle = lifecycle.bind(this)
  }

  /**
   * Factory
   *
   * @public
   */
  public async factory(context?: Config.Options): Promise<Bud> {
    return await new this.implementation(this.implementation).lifecycle({
      ...this.context,
      ...(context ?? {}),
    })
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...messages: any[]) {
    this.logger?.instance && this.logger.instance.log(...messages)
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
    this.logger?.instance && this.logger.instance.info(...messages)

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
    this.logger?.instance && this.logger.instance.success(...messages)

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
    this.logger?.instance && this.logger.instance.warn(...messages)

    return this
  }

  /**
   * Log a `warning` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public await(...messages: any[]) {
    this.logger?.instance && this.logger.instance.await(...messages)

    return this
  }

  /**
   * Log a `warning` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public complete(...messages: any[]) {
    this.logger?.instance && this.logger.instance.complete(...messages)

    return this
  }

  /**
   * Log and display a debug message.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public debug(...messages: any[]): this {
    process.stdout.write('\n')

    messages.map(message => {
      process.stdout.write(
        format(message, {
          callToJSON: false,
          maxDepth: 8,
          printFunctionName: false,
          escapeString: false,
        }),
      )
      process.stdout.write('\n')
    })

    return this
  }

  /**
   * Log and display an error.
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
    this.logger.instance.error(...messages)

    if (this.isProduction) {
      process.exitCode = 1
      this.close()
    }
  }

  /**
   * Dump object and return Bud
   */
  @bind
  public dump(
    obj: any,
    options?: PrettyFormatOptions & {prefix: string},
  ): Bud {
    if (!this.context.args.verbose) return

    const prettyFormatOptions = omit(options, [
      'prefix',
      'language',
      'ignoreIllegals',
    ])

    process.stdout.write('\n')
    process.stdout.write(
      format(obj, {
        callToJSON: false,
        maxDepth: 8,
        printFunctionName: false,
        escapeString: false,
        ...prettyFormatOptions,
      }),
    )
    process.stdout.write('\n')

    return this
  }
}

/**
 * Bud Constructor
 */
export type Constructor = new (implementation: Constructor) => Bud
