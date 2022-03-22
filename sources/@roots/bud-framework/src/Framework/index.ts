import type {
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
  Context,
  Dashboard,
  Dependencies,
  Env,
  Extension,
  Extensions,
  Hooks,
  Logger,
  Server,
  Services,
  Store,
} from '../'
import {Project} from '../Project'
import * as frameworkProcess from './framework.process'
import {lifecycle} from './lifecycle'
import * as methods from './methods'

const {isFunction, omit} = lodash

/**
 * Base {@link Framework} class
 *
 * @public
 */
export abstract class Framework {
  /**
   * Concrete implementation of the {@link Framework}
   *
   * @internal @virtual
   */
  public abstract implementation: Constructor

  public context: Context

  /**
   * Framework name
   *
   * @remarks
   * The name of the parent compiler is used as a base when sourcing configuration files.
   * So, in an implementation that uses the name `app`, the Framework will be sourcing
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
   * Either `production` or `development`. Unlike webpack, there is no 'none' mode.
   *
   * @defaultValue 'production'
   */
  private _mode: 'production' | 'development'
  public get mode(): 'development' | 'production' {
    return this._mode
  }
  /**
   * Parent {@link Framework} instance
   *
   * @remarks
   * Is `null` if the current instance is the parent instance.
   *
   * @defaultValue null
   */
  public root: Framework | null = this

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
   * {@link @roots/container#Container} of child {@link Framework} instances
   *
   * @remarks
   * Is `null` if the current instance is a child instance.
   *
   * @defaultValue null
   */
  public children: Container<Record<string, Framework>> = null

  /**
   * True when {@link Framework} has children
   *
   * @readonly
   */
  public get hasChildren(): boolean {
    return this.children?.getEntries().length > 0
  }

  /**
   * Framework services
   *
   * @remarks
   * Can be set directly on the child instance or passed as a property in the {@link Options}.
   *
   * @public
   */
  public services: Services

  /**
   * Macros for assisting with common config tasks
   *
   * @public
   */
  public api: Api

  /**
   * Build service
   *
   * @public
   */
  public build: Build

  /**
   * Determines cache validity and generates cache keys.
   *
   * @public
   */
  public cache: Cache

  /**
   * Compiles configuration and stats/errors/progress reporting.
   *
   * @public
   */
  public compiler: Compiler

  /**
   * Presents build progress, stats and errors from {@link Compiler} and {@link Server}
   * over the CLI.
   *
   * @public
   */
  public dashboard: Dashboard

  /**
   * Utilities for interfacing with user package manager software
   *
   * @public
   */
  public dependencies: Dependencies

  /**
   * Project information and peer dependency management utilities
   *
   * @public
   */
  public project: Project

  /**
   * .env container
   *
   * @public
   */
  public env: Env

  /**
   * Container service for {@link Framework} extensions.
   *
   * @remarks
   * Extensions can be defined as a {@link Module}, which is more generic.
   *
   * They can also be defined as a {@link WebpackPlugin} which is a {@link Module}
   * specifically yielding a {@link WebpackPluginInstance}.
   *
   * When adding a {@link Module} or {@link Plugin} to the container
   * with {@link Extensions.add} it is cast to the {@link Extension} type.
   *
   * @public
   */
  public extensions: Extensions

  /**
   * Service allowing for fitering {@link Framework} values through callbacks.
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
  public hooks: Hooks

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

  /**
   * Container service for holding configuration values
   *
   * @public
   */
  public store: Store

  /**
   * True when {@link Framework.mode} is `production`
   *
   * @public
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * True when {@link Framework.mode} is `development`
   *
   * @public
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * True if ts-node has been invoked
   *
   * @public
   */
  public usingTsNode: boolean = false

  /**
   * Initially received options
   *
   * @public
   */
  public options: Options

  /**
   * Class constructor
   *
   * @param options - {@link Framework.Options | Framework constructor options}
   *
   * @public
   */
  public constructor(options: Options) {
    this.options = options

    this.context = options.context

    this._mode = this.options.mode
    this._name = this.options.name

    this.store = new Store(this, options.config)

    frameworkProcess.initialize(this)

    if (!options.childOf) {
      this.children = this.container()
      this.root = this
    } else {
      this.root = options.childOf
    }

    this.lifecycle = lifecycle.bind(this)
    this.services = options.services

    Object.entries(methods).map(([key, method]) => {
      if (!isFunction(method)) {
        this.error(`framework ctor`, `method "${key}" is not a function`)
      }

      this[key] = method.bind(this)
    })

    this.logger = new Logger(this)
  }

  /**
   * @internal
   */
  public lifecycle: lifecycle = lifecycle.bind(this)

  /**
   * Access a value which may or may not be a function.
   *
   * @remarks
   * If a value is a function **access** will call that function and return the result.
   *
   * If the value is not a function **access** will return its value.
   *
   * @example
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * access(isAFunction, true) // => `option value: true`
   * access(isAValue) // => `option value: true`
   * ```
   *
   * @public
   */
  public maybeCall: methods.maybeCall = methods.maybeCall.bind(this)

  /**
   * Gracefully shutdown {@link Framework} and registered {@link @roots/bud-framework#Service | Service instances}
   *
   * @example
   * ```js
   * bud.close()
   * ```
   *
   * @public
   */
  public close: methods.close = methods.close.bind(this)

  /**
   * Create a new {@link Container} instance
   *
   * @example
   * ```js
   * const myContainer = bud.container({key: methods.'value'})
   *
   * myContainer.get('key') // returns 'value'
   * ```
   *
   * @public
   */
  public container: methods.container = methods.container.bind(this)

  /**
   * Returns a {@link Framework | Framework instance} from the {@link Framework.children} container
   *
   * @remarks
   * An optional {@link tap} function can be provided to configure the {@link Framework} instance.
   *
   * @example
   * ```js
   * const name = 'plugin'
   * const tapFn = plugin => plugin.entry('main', 'main.js')
   *
   * bud.get(name, tapFn)
   * ```
   *
   * @public
   */
  public get: methods.get = methods.get.bind(this)

  /**
   * Instantiate a child instance and add to {@link Framework.children} container
   *
   * @remarks
   * **make** takes two parameters:
   *
   * - The **name** of the new compiler
   * - An optional callback to use for configuring the compiler.
   *
   * @example
   * ```js
   * bud.make('scripts', child => child.entry('app', 'app.js'))
   * ```
   *
   * @public
   */
  public make: methods.make = methods.make.bind(this)

  /**
   * Returns a {@link Locations} value as an absolute path
   *
   * @public
   */
  public path: methods.path = methods.path.bind(this)

  /**
   * Pipe a value through an array of functions. The return value of each callback is used as input for the next.
   *
   * @remarks
   * If no value is provided the value is assumed to be the {@link Framework} itself
   *
   * {@link sequence} is a non-mutational version of this method.
   *
   * @example
   * ```js
   * app.pipe(
   *   [
   *     value => value + 1,
   *     value => value + 1,
   *   ],
   *   1, // initial value
   * ) // resulting value is 3
   * ```
   *
   * @public
   */
  public pipe: methods.pipe = methods.pipe.bind(this)

  /**
   * Public path
   *
   * @remarks
   * Path from web root to assets
   *
   * @public
   */
  public publicPath: methods.publicPath = methods.setPublicPath.bind(this)

  /**
   * Set a {@link @roots/bud-framework#Location | Location} value
   *
   * @remarks
   * The {@link Location.project} should be an absolute path.
   * All other directories should be relative (src, dist, etc.)
   * @see {@link Locations}
   *
   * @example
   * ```js
   * bud.setPath('@src', 'custom/src')
   * ```
   *
   * @param this - {@link Framework}
   * @param args - path parts
   *
   * @public
   */
  public setPath: methods.setPath = methods.setPath.bind(this)

  /**
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps served from
   * a subdirectory.
   *
   * @example
   * Set the default path using a string
   *
   * ```js
   * app.setPublicPath('/app/themes/sage/dist')
   * ```
   *
   * @example
   * Set the publicPath using a function.
   *
   * ```js
   * app.setPublicPath(publicPath => {
   *   return `web/assets/${publicPath}`
   * })
   * ```
   *
   * @public
   */
  public setPublicPath: methods.setPublicPath =
    methods.setPublicPath.bind(this)

  /**
   * Run a value through an array of syncronous, non-mutational functions.
   *
   * @remarks
   * Unlike {@link pipe} the value returned from each function is ignored.
   *
   * @public
   */
  public sequence: methods.sequence = methods.sequence.bind(this)

  /**
   * Execute a callback
   *
   * @remarks
   * Callback is provided {@link Framework | the Framework instance} as a parameter.
   *
   * @example
   * ```js
   * bud.tap(bud => {
   *   // do something with bud
   * })
   * ```
   *
   * @example
   * Lexical scope is bound to Framework where applicable, so it
   * is possible to reference the Framework using `this`.
   *
   * ```js
   * bud.tap(function () {
   *  // do something with this
   * })
   * ```
   *
   * @public
   */
  public tap: methods.tap = methods.tap.bind(this)

  /**
   * Executes a function if a given test is `true`.
   *
   * @remarks
   * - The first parameter is the conditional check.
   * - The second parameter is the function to run if `true`.
   * - The third parameter is optional; executed if the conditional is not `true`.
   *
   * @example
   * Only produce a vendor bundle when running in `production` {@link Mode}:
   *
   * ```js
   * bud.when(bud.isProduction, () => bud.vendor())
   * ```
   *
   * @example
   * Use `eval` sourcemap in development mode and `hidden-source-map` in production:
   *
   * ```js
   * bud.when(
   *   bud.isDevelopment,
   *   () => bud.devtool('eval'),
   *   () => bud.devtool('hidden-source-map'),
   * )
   * ```
   *
   * @public
   */
  public when: methods.when = methods.when.bind(this)

  /**
   * Bind method to {@link Framework | Framework instance}
   *
   * @public
   */
  public bindMethod: methods.bindMethod = methods.bindMethod.bind(this)

  /**
   * Adds a class as a property of the Framework
   *
   * @public
   */
  public mixin: typeof methods.mixin

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
  public time(...messages: any[]) {
    this.logger?.instance && this.logger.instance.time(...messages)

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
   * Log a `warning` level message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public timeEnd(...messages: any[]) {
    this.logger?.instance && this.logger.instance.timeEnd(...messages)

    return this
  }

  /**
   * Log and display a debug message.
   *
   * @remarks
   * This error is fatal and will kill the process
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

    process.exit(1)
  }

  /**
   * Log and display an error.
   *
   * @remarks
   * This error is fatal and will kill the process
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public error(...messages: any[]) {
    this.logger.instance.error(...messages)

    process.exitCode = 1
    process.exit()
  }

  @bind
  public dump(
    obj: any,
    options?: PrettyFormatOptions & HighlightOptions & {prefix: string},
  ): Framework {
    if (!this.context.args.verbose) return

    const prettyFormatOptions = omit(options, [
      'prefix',
      'language',
      'ignoreIllegals',
    ])

    // eslint-disable-next-line no-console
    process.stdout.write(
      `${options?.prefix ? `\n${options.prefix}\n` : `\n`}${highlight(
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
      )}`,
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
 * Framework Constructor
 */
export type Constructor = new (options: Options) => Framework

/**
 * Constructor options
 *
 * @public
 */
export interface Options {
  /**
   * Application context
   *
   * @public
   */
  context?: Context

  /**
   * name
   *
   * @defaultValue `bud`
   *
   * @public
   */
  name?: string

  /**
   * Build mode
   *
   * @remarks
   * One of: `production` | `development`
   *
   * @defaultValue `production`
   *
   * @public
   */
  mode?: 'production' | 'development'

  /**
   * The object providing initial configuration values.
   *
   * @remarks
   * It is probable that extensions and services will modify
   * values introduced in this object. If you are looking to simply modify
   * configuration values it is generally a better idea to use the
   * {@link @roots/bud-hooks#Hooks | Hooks class} instead.
   *
   * @public
   */
  config?: Partial<Store.Repository>

  /**
   * Framework services
   * @public
   */
  services?: Services

  /**
   * @internal
   */
  childOf?: Framework

  /**
   * Extensions to be registered
   *
   * @public
   */
  extensions?: () => Record<
    string,
    Extension.Module | Extension.CompilerPlugin
  >
}
