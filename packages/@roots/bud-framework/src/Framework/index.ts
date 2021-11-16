import {Container} from '@roots/container'
import {highlight, HighlightOptions} from 'cli-highlight'
import {omit} from 'lodash'
import {format} from 'pretty-format'
import {PrettyFormatOptions} from 'pretty-format/build/types'

import {
  Api,
  Build,
  Compiler,
  Configuration,
  Dashboard,
  Dependencies,
  Env,
  Extension,
  Hooks,
  Mode,
  Server,
  Services,
} from '../'
import * as Cache from '../Cache'
import {Extensions} from '../Extensions'
import {Logger} from '../Logger'
import * as Project from '../Project'
import {access} from './access'
import {bindMethod} from './bindMethod'
import {close} from './close'
import {container} from './container'
import {bind} from './framework.dependencies'
import {get} from './get'
import {lifecycle} from './lifecycle'
import {make} from './make'
import * as methods from './methods'
import {mixin} from './mixin'
import {path} from './path'
import {pipe} from './pipe'
import {sequence} from './sequence'
import {setPath} from './setPath'
import {tap} from './tap'
import {when} from './when'

/**
 * Base {@link Framework} class
 *
 * @core @public
 */
export abstract class Framework {
  /**
   * Concrete implementation of the {@link Framework}
   *
   * @public
   */
  public abstract implementation: Constructor

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
  public get name(): string {
    return (
      this.store?.get('name') ??
      this.options.config.name ??
      'bud'
    )
  }
  public set name(name: string) {
    this.store.set('name', name)
  }

  /**
   * Compilation mode
   *
   * @remarks
   * Either `production` or `development`. Unlike webpack, there is no 'none' mode.
   *
   * @defaultValue 'production'
   */
  public get mode(): Mode {
    return this.store.get('mode')
  }
  public set mode(mode: Mode) {
    this.store.set('mode', mode)
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
    return this.root.name === this.name
  }

  public get isChild(): boolean {
    return this.root.name !== this.name
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
   * @public @container
   */
  public api: Api

  /**
   * Build service
   *
   * @public
   */
  public build: Build.Interface

  /**
   * Determines cache validity and generates cache keys.
   *
   * @public
   */
  public cache: Cache.Interface

  /**
   * Compiles {@link @roots/bud-framework#Build | Build} configuration and stats/errors/progress reporting.
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
  public project: Project.Interface

  /**
   * .env container
   *
   * @public @container
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
   * Development server and browser devtools
   *
   * @public
   */
  public _server: Server.Interface
  public get server(): Server.Interface {
    return this.root._server
  }
  public set server(server: Server.Interface) {
    this.root._server = server
  }

  /**
   * Container service for holding configuration values
   *
   * @public
   */
  public store: Container

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
    this.logger = new Logger(this)
    this.store = this.container(options.config)

    if (!options.childOf) {
      // Parent & child instance exclusive settings
      this.children = this.container()
      this.root = this
    } else {
      this.root = options.childOf
    }

    // Assign to instance
    this.services = options.services

    this.access = access.bind(this)
    this.bindMethod = bindMethod.bind(this)
    this.close = close.bind(this)
    this.get = get.bind(this)
    this.lifecycle = lifecycle.bind(this)
    this.make = make.bind(this)
    this.mixin = mixin.bind(this)
    this.path = path.bind(this)
    this.pipe = pipe.bind(this)
    this.setPath = setPath.bind(this)
    this.tap = tap.bind(this)
    this.when = when.bind(this)
  }

  /**
   * @internal
   */
  public lifecycle: lifecycle

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
  public access: access

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
  public close: close

  /**
   * Create a new {@link Container} instance
   *
   * @example
   * ```js
   * const myContainer = bud.container({key: 'value'})
   *
   * myContainer.get('key') // returns 'value'
   * ```
   *
   * @public @container
   */
  public container: container = container

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
  public get: get

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
  public make: make = make

  /**
   * Returns a {@link Locations} value as an absolute path
   *
   * @public
   */
  public path: path

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
  public pipe: pipe

  /**
   * Set a {@link @roots/bud-framework#Location | Location} value
   *
   * @remarks
   * The {@link Locations.project} should be an absolute path.
   * All other directories should be relative (src, dist, etc.)
   * @see {@link Locations}
   *
   * @example
   * ```js
   * bud.setPath('src', 'custom/src')
   * ```
   *
   * @param this - {@link Framework}
   * @param args - path parts
   * @returns {@link Framework}
   *
   * @public
   */
  public setPath: setPath

  /**
   * Run a value through an array of syncronous, non-mutational functions.
   *
   * @remarks
   * Unlike {@link pipe} the value returned from each function is ignored.
   *
   * @public
   */
  public sequence: sequence = sequence.bind(this)

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
  public tap: tap

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
  public when: when

  /**
   * Bind method to {@link Framework | Framework instance}
   *
   * @public
   */
  public bindMethod = bindMethod.bind(this)

  /**
   * Adds a class as a property of the Framework
   *
   * @public
   */
  public mixin: typeof mixin

  /**
   * Read and write json files
   *
   * @public
   */
  public json: typeof methods.json = methods.json

  /**
   * Read and write yaml files
   *
   * @public
   */
  public yml: typeof methods.yaml = methods.yaml

  /**
   * Read and write typescript files
   *
   * @public
   */
  public ts: typeof methods.ts = {
    read: methods.ts.read.bind(this),
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(...messages: any[]) {
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .log(...messages)

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
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .info(...messages)

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
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .success(...messages)

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
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .warn(...messages)

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
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .time(...messages)

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
    this.logger?.instance &&
      this.logger.instance
        .scope(...this.logger.context)
        .await(...messages)

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
    this.logger.instance
      .scope(...this.logger.context)
      .complete(...messages)

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
    this.logger.instance
      .scope(...this.logger.context)
      .timeEnd(...messages)

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
    this.logger.instance
      .scope(...this.logger.context)
      .debug(...messages)

    return this
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
    this.logger.instance
      .scope(...this.logger.context)
      .error(...messages)

    return this
  }

  @bind
  public dump(
    obj: any,
    options?: PrettyFormatOptions &
      HighlightOptions & {prefix: string},
  ): Framework {
    if (this.logger.level !== 'info') return

    const prettyFormatOptions = omit(options, [
      'prefix',
      'language',
      'ignoreIllegals',
    ])

    // eslint-disable-next-line no-console
    console.log(
      options?.prefix ?? '',
      highlight(
        format(obj, {
          callToJSON: false,
          maxDepth: 8,
          printFunctionName: false,
          escapeString: false,
          min: this.options.config.cli.flags['log.min'],
          ...prettyFormatOptions,
        }),
        {
          language: options?.language ?? 'typescript',
          ignoreIllegals: options?.ignoreIllegals ?? true,
        },
      ),
    )

    return this
  }
}

/**
 * Framework Constructor
 */
export type Constructor = new (options: Options) => Framework

/*
 * Constructor options
 */
export interface Options {
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
  config?: Partial<Configuration>

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
