import {
  boxen,
  HighlightOptions,
  PrettyFormatOptions,
} from '@roots/bud-support'
import {bind, format, highlight, lodash, parsers} from '@roots/bud-support'
import {Container} from '@roots/container'

import {
  Api,
  Build,
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
} from '.'
import {lifecycle} from './lifecycle'
import * as methods from './methods'
import {Module} from './module'
import * as Process from './process'

const {isFunction, omit} = lodash

/**
 * {@link Bud} abstract class
 *
 * @remarks
 * See `@roots/bud` for an example implementation
 *
 * @public
 */
export abstract class Bud {
  /**
   * {@link Bud} constructor
   *
   * @internal
   * @virtual
   */
  public abstract implementation: Constructor

  /**
   * Context
   *
   * @public
   */
  public context: Config.Context

  /**
   * Name
   *
   * @remarks
   * The name of the parent compiler is used as a base when sourcing configuration files.
   * So, in an implementation that uses the name `app`, {@link Bud} will be sourcing
   * `app.config.js`, `app.development.config.js`, etc.
   *
   * @public
   */
  private _name: string
  public get name() {
    return this._name
  }

  /**
   * Compilation mode
   *
   * @remarks
   * Either `production` or `development`.
   *
   * @defaultValue 'production'
   */
  private _mode: 'production' | 'development'
  public get mode(): 'development' | 'production' {
    return this._mode
  }

  /**
   * Parent {@link Bud} instance
   *
   * @remarks
   * Is `null` if the current instance is the parent instance.
   *
   * @defaultValue null
   */
  public root: Bud | null = this

  /**
   * True when current instance is the parent instance
   *
   * @readonly
   */
  public get isRoot(): boolean {
    return this.name === this.root.name
  }

  /**
   * True when current instance is a child instance
   *
   * @readonly
   */
  public get isChild(): boolean {
    return this.name !== this.root.name
  }

  /**
   * {@link Container} of {@link Bud} instances
   *
   * @remarks
   * Is `null` if the current instance is a child instance.
   *
   * @defaultValue null
   */
  public children: Container<Record<string, Bud>> = null

  /**
   * True when {@link Bud} has children
   *
   * @readonly
   */
  public get hasChildren(): boolean {
    return this.children?.getEntries().length > 0
  }

  /**
   * Bud services
   *
   * @remarks
   * Can be set directly on the child instance or passed as a property in the {@link Options}.
   *
   * @public
   */
  public services: Services.Registry

  /**
   * Macros for assisting with common config tasks
   *
   * @public
   */
  public api: Api.Service

  /**
   * Build service
   *
   * @public
   */
  public build: Build.Service

  /**
   * Determines cache validity and generates cache keys.
   *
   * @public
   */
  public cache: Cache.Service

  /**
   * Compiles configuration and stats/errors/progress reporting.
   *
   * @public
   */
  public compiler: Compiler.Service

  /**
   * Presents build progress, stats and errors from {@link Compiler} and {@link Server}
   * over the CLI.
   *
   * @public
   */
  public dashboard: Dashboard.Service

  /**
   * Project information and peer dependency management utilities
   *
   * @public
   */
  public project: Project.Service

  public env: Env.Service

  public extensions: Extensions.Service

  /**
   * Service allowing for fitering {@link Bud} values through callbacks.
   *
   * @example Add a new entry to the `webpack.externals` configuration:
   * ```ts
   * hooks.on(
   *   'build/externals',
   *   externals => ({
   *     ...externals,
   *     $: 'jquery',
   *   })
   * )
   * ```
   *
   * @example Change the `webpack.output.filename` format:
   * ```ts
   * hooks.on(
   *   'build.output.filename',
   *   () => '[name].[hash:4]',
   * )
   * ```
   *
   * @public
   */
  public hooks: Hooks.Service

  /**
   * Logging service
   *
   * @public
   */
  public logger: Logger

  /**
   * Development server
   *
   * @public
   */
  public server: Server.Service

  public module: Module

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
   * Constructor options
   *
   * @public
   */
  public options: Config.Options

  /**
   * Class constructor
   *
   * @param options - {@link Config.Options}
   *
   * @public
   */
  public constructor(options: Config.Options) {
    this.options = options

    this.context = options.context

    this._mode = this.options.mode
    this._name = this.options.name

    this.module = new Module(this)

    Process.initialize(this)

    if (!options.childOf) {
      this.children = this.container()
      this.root = this
    } else {
      this.root = options.childOf
    }

    this.lifecycle = lifecycle.bind(this)

    Object.entries(methods).map(([key, method]) => {
      if (!isFunction(method)) {
        this.error(`Bud ctor`, `method "${key}" is not a function`)
      }

      this[key] = method.bind(this)
    })

    this.logger = new Logger(this)
  }

  public lifecycle: lifecycle = lifecycle.bind(this)

  public maybeCall: methods.maybeCall = methods.maybeCall.bind(this)

  public close: methods.close = methods.close.bind(this)

  public container: methods.container = methods.container.bind(this)

  public get: methods.get = methods.get.bind(this)

  public make: methods.make = methods.make.bind(this)

  public path: methods.path = methods.path.bind(this)

  public pipe: methods.pipe = methods.pipe.bind(this)

  public publicPath: methods.publicPath = methods.setPublicPath.bind(this)

  public relPath: methods.relPath = methods.relPath.bind(this)

  public setPath: methods.setPath = methods.setPath.bind(this)

  public setPublicPath: methods.setPublicPath =
    methods.setPublicPath.bind(this)

  public sequence: methods.sequence = methods.sequence.bind(this)

  public sequenceSync: methods.sequenceSync =
    methods.sequenceSync.bind(this)

  public tap: methods.tap = methods.tap.bind(this)

  public tapAsync: methods.tapAsync = methods.tapAsync.bind(this)

  public when: methods.when = methods.when.bind(this)

  public bindMethod: methods.bindMethod = methods.bindMethod.bind(this)

  /**
   * Read and write json files
   *
   * @public
   */
  public json: typeof parsers.json5 = parsers.json5

  /**
   * Read and write yaml files
   *
   * @public
   */
  public yml: typeof parsers.yml = parsers.yml

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
  public debug(...messages: any[]) {
    // eslint-disable-next-line no-console
    this.context.stdout.write(
      `${highlight(
        format(messages, {
          callToJSON: false,
          maxDepth: 8,
          printFunctionName: false,
          escapeString: false,
        }),
      )}`,
    )
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
      process.exit()
    }
  }

  /**
   * Dump object and return Bud
   */
  @bind
  public dump(
    obj: any,
    options?: PrettyFormatOptions & HighlightOptions & {prefix: string},
  ): Bud {
    if (!this.context.args.verbose) return

    const prettyFormatOptions = omit(options, [
      'prefix',
      'language',
      'ignoreIllegals',
    ])

    this.context.stdout.write(
      boxen(
        highlight(
          format(obj, {
            callToJSON: false,
            maxDepth: 8,
            printFunctionName: false,
            escapeString: false,
            ...prettyFormatOptions,
          }),
          {
            language: options?.language ?? 'typescript',
            ignoreIllegals: options?.ignoreIllegals ?? true,
          },
        ),
        {
          title: options.prefix ?? 'object dump',
          borderStyle: 'round',
        },
      ),
    )

    return this
  }

  /**
   * timer util
   *
   * @public
   */
  public _hrtime: [number, number] = process.hrtime()
  public _hrdiff() {
    const diff = process.hrtime(this._hrtime)
    return diff[0] * 1000 + diff[1] / 1000000
  }
  public _hrdone: number
}

/**
 * Bud Constructor
 */
export type Constructor = new (options: Config.Options) => Bud
