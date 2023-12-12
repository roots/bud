import type {Modules} from '@roots/bud-framework'
import type {Compiler} from '@roots/bud-framework/config'
import type {ApplyPluginConstructor} from '@roots/bud-framework/extension/decorators/plugin'

import {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, ExtensionError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/get'
import isFunction from '@roots/bud-support/isFunction'
import isObject from '@roots/bud-support/isObject'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'
import set from '@roots/bud-support/set'
import DynamicOption from '@roots/bud-support/value'

export type Options<T = Record<string, any>> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export type InternalOptionsValues<T extends Options> = {
  [K in keyof T as `${K & string}`]:
    | DynamicOption<(app: Bud) => T[K]>
    | T[K]
}

export type OptionCallback<
  T extends Options,
  K extends `${keyof Options & string}`,
> = ((value: T[K]) => T[K]) | T[K]

export type OptionCallbackValue<
  T extends Options,
  K extends `${keyof Options & string}`,
> = ((value: T[K]) => T[K]) | InternalOptionsValues<T>[K]

export type OptionSetter<
  Extension,
  Options,
  Property extends `${keyof Options & string}`,
> = (value: OptionCallbackValue<Options, Property>) => Extension

export type OptionGetter<
  Options extends Record<string, any>,
  Property extends `${keyof Options & string}`,
> = () => Options[Property]

export type OptionAccessor<
  Options extends Record<string, any>,
  Property extends `${keyof Options & string}`,
> = Options[Property]

export type Option<
  Extension,
  Options extends Record<string, any>,
  Property extends `${keyof Options & string}`,
> = {
  get: OptionGetter<Options, Property>
  set: OptionSetter<Extension, Options, Property>
  value: OptionAccessor<Options, Property>
}

export interface Meta {
  boot: boolean
  buildAfter: boolean
  buildBefore: boolean
  compilerDone: boolean
  configAfter: boolean
  register: boolean
}

/**
 * Webpack plugin.
 */
export interface ApplyPlugin {
  /**
   * @see {@link https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture}
   */
  apply(...args: any[]): unknown
}

export interface Constructor {
  new (...args: any[]): Extension
}

export type WithOptions<Context, Options> = {
  [Prop in keyof Options as `get${Capitalize<
    Prop & string
  >}`]: () => Options[Prop]
} & {
  [Prop in keyof Options as `set${Capitalize<Prop & string>}`]: (
    value: OptionCallbackValue<Options, `${Prop & string}`>,
  ) => Context
} & {
  [K in keyof Options as `${K & string}`]: Options[K]
}

/**
 * Public extension interface
 */
export type PublicExtensionApi<
  ExtensionImplementation extends Extension = Extension,
> = {
  /**
   * ## Extension.app
   *
   * {@link Bud} instance
   */
  app: ExtensionImplementation[`app`]

  /**
   * ## Extension.done
   *
   * {@link ExtensionImplementation.done}
   *
   * @remarks
   * Returns the {@link Bud} instance from the extension. This is useful
   * for chaining method calls.
   *
   * @example
   * ```js
   * app
   *  .extensions
   *    .get('@roots/bud-postcss')
   *    .set('plugins', [])
   *    .done()
   *
   *  .entry('app', 'src/index.js')
   * ```
   */
  done: ExtensionImplementation[`done`]

  /**
   * ## Extension.enable
   *
   * Enable or disable extension
   *
   * @remarks
   * The following methods are skipped if `enabled` is false:
   * - {@link Extension.buildBefore}
   * - {@link Extension.buildAfter}
   * - {@link Extension.make}
   *
   * @example
   * Enable extension:
   * ```js
   * app.extensions.get('@roots/bud-postcss').enable()
   * ```
   *
   * @example
   * Disable extension:
   * ```js
   * app.extensions.get('@roots/bud-postcss').enable(false)
   * ```
   *
   * @example
   * Functional callback:
   * ```js
   * app.when(app.isProduction, app.extensions.get('@roots/bud-postcss').enable)
   * ```
   */
  enable: ExtensionImplementation['enable']

  /**
   * ## Extension.enabled
   *
   * Property indicating if the extension is enabled
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').enabled
   * ```
   */
  enabled: ExtensionImplementation['enabled']

  /**
   * ## Extension.get
   *
   * Get the value of an option record by key
   *
   * @remarks
   * Alias for {@link Extension.getOption}
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').get('plugins')
   * ```
   */
  get: ExtensionImplementation[`getOption`]

  /**
   * ## Extension.getOption
   *
   * Get the value of an option record by key
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').getOption('plugins')
   * ```
   */
  getOption: ExtensionImplementation[`getOption`]

  /**
   * ## Extension.getOptions
   *
   * Get all options records
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').getOptions()
   * ```
   */
  getOptions: ExtensionImplementation[`getOptions`]

  /**
   * ## Extension.logger
   *
   * @remarks
   * This logger is scoped to the extension
   */
  logger: ExtensionImplementation[`logger`]

  /**
   * ## Extension.options
   *
   * Options accessor
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').options
   * ```
   */
  options: ExtensionImplementation['options']

  /**
   * ## Extension.set
   *
   * Set an option value
   *
   * @remarks
   * Alias for {@link Extension.setOption}
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').set('plugins', [])
   * ```
   */
  set: ExtensionImplementation[`set`]

  /**
   * ## Extension.setOption
   *
   * Set an option value
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').setOption('plugins', [])
   * ```
   */
  setOption: ExtensionImplementation[`setOption`]

  /**
   * ## Extension.setOptions
   *
   * Overwrite existing options
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').setOptions({plugins: []})
   * ```
   */
  setOptions: ExtensionImplementation[`setOptions`]
}

export type StrictPublicExtensionApi<
  Context,
  OptionsRecords extends Options,
> = {
  /**
   * ## Extension.app
   *
   * {@link Bud} instance
   */
  app: PublicExtensionApi[`app`]

  /**
   * ## Extension.done
   *
   * Returns the {@link Bud} instance from the extension.
   *
   * @remarks
   * This is useful for chaining method calls.
   *
   * @example
   * ```js
   * app
   *  .extensions
   *    .get('@roots/bud-postcss')
   *    .set('plugins', [])
   *    .done()
   *
   *  .entry('app', 'src/index.js')
   * ```
   */
  done: PublicExtensionApi[`done`]

  /**
   * ## Extension.enable
   *
   * Enable or disable extension
   *
   * @remarks
   * The following methods are skipped if `enabled` is false:
   * - {@link Extension.buildBefore}
   * - {@link Extension.buildAfter}
   * - {@link Extension.make}
   *
   * @example
   * Enable extension:
   * ```js
   * app.extensions.get('@roots/bud-postcss').enable()
   * ```
   *
   * @example
   * Disable extension:
   * ```js
   * app.extensions.get('@roots/bud-postcss').enable(false)
   * ```
   *
   * @example
   * Functional callback:
   * ```js
   * app.when(app.isProduction, app.extensions.get('@roots/bud-postcss').enable)
   * ```
   */
  enable: PublicExtensionApi[`enable`]

  /**
   * ## Extension.enabled
   *
   * Property indicating if the extension is enabled
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').enabled
   * ```
   */
  enabled: PublicExtensionApi[`enabled`]

  /**
   * ## Extension.get
   *
   * Get the value of an option record by key
   *
   * @remarks
   * Alias for {@link Extension.getOption}
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').get('plugins')
   * ```
   */
  get: <K extends `${keyof OptionsRecords & string}`>(
    key: K,
  ) => OptionsRecords[K]

  /**
   * ## Extension.getOptions
   *
   * Get all options records
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').getOptions()
   * ```
   */
  getOptions: () => OptionsRecords

  /**
   * ## Extension.logger
   *
   * @remarks
   * This logger is scoped to the extension
   */
  logger: typeof logger

  /**
   * ## Extension.options
   *
   * Options records accessor
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').options
   * ```
   */
  options: OptionsRecords

  /**
   * ## Extension.set
   *
   * Set an option value
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').set('plugins', [])
   * ```
   */
  set: <K extends `${keyof OptionsRecords & string}`>(
    key: K,
    value:
      | ((value: OptionsRecords[K]) => OptionsRecords[K])
      | OptionsRecords[K],
  ) => Context

  /**
   * ## Extension.setOptions
   *
   * Overwrite existing options
   *
   * @example
   * ```js
   * app.extensions.get('@roots/bud-postcss').setOptions({plugins: []})
   * ```
   */
  setOptions: (
    O: Partial<InternalOptionsValues<OptionsRecords>>,
  ) => Context
} & WithOptions<Context, OptionsRecords>

export type ExtensionLiteral = Partial<Extension>

export type * as Logger from '@roots/bud-support/logger'

/**
 * Bud extension
 */
export class Extension<
  ExtensionOptions extends Options = Options,
  Plugin extends {apply: (...args: any[]) => unknown} = ApplyPlugin,
> {
  /**
   * {@link Bud} instance get fn
   */
  private _app: () => Bud

  /**
   * Extension options
   */
  public declare _options: Partial<InternalOptionsValues<ExtensionOptions>>

  /**
   * Depends on
   */
  public declare dependsOn?: Set<keyof Modules & string>
  /**
   * Depends on (optional)
   */
  public declare dependsOnOptional?: Set<`${keyof Modules & string}`>

  /**
   * The module name
   */
  public declare label?: `${keyof Modules & string}`

  /**
   * Extension options
   *
   * @readonly
   */
  public options: ExtensionOptions

  /**
   * {@link ApplyPlugin.apply} callback
   */
  public apply?(compiler: Compiler): unknown | void

  /**
   * `boot` callback
   */
  public boot?(app: Bud): Promise<unknown | void>

  /**
   * `buildAfter` callback
   */
  public buildAfter?(app: Bud): Promise<unknown | void>

  /**
   * `buildBefore` callback
   */
  public buildBefore?(app: Bud): Promise<unknown | void>

  /**
   * `configAfter` callback
   */
  public configAfter?(app: Bud): Promise<unknown | void>

  /**
   * Plugin constructor
   */
  public declare plugin?: ApplyPluginConstructor

  /**
   * Function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * If set this takes precedence over {@link Extension.enabled}.
   */
  public when?(bud: Bud, options?: ExtensionOptions): boolean

  public get app(): Bud {
    return this._app()
  }

  public enabled: boolean = true

  /**
   * ## Extension.meta
   *
   * @remarks
   * Tracks which extension methods have been executed to prevent
   * duplicate execution in race conditions, etc.
   */
  public meta: Meta = {
    boot: false,
    buildAfter: false,
    buildBefore: false,
    compilerDone: false,
    configAfter: false,
    register: false,
  }

  /**
   * Class constructor
   */
  public constructor(app: Bud) {
    this._app = () => app

    this._options = this.options ? {...this.options} : {}
    delete this.options

    Object.defineProperty(this, `options`, {
      get: this.getOptions.bind(this),
    })
  }

  /**
   * Error handler
   */
  @bind
  public catch(error: Error | string): never {
    const label =
      this.label ?? this.constructor?.name ?? `unknown_extension`

    if (error instanceof BudError) {
      throw error
    }

    throw ExtensionError.normalize(error, {
      docs: new URL(`https://bud.js.org/docs/extensions`),
      issue: new URL(
        `https://github.com/roots/bud/search?q=is:issue+${label} in:title`,
      ),
      thrownBy: import.meta.url,
    })
  }

  /**
   * Disable extension
   * @deprecated pass `false` to {@link Extension.enable}
   */
  @bind
  public disable() {
    this.enabled = false
  }

  /**
   * Return to bud instance from extension
   */
  @bind
  public done(): Bud {
    return this.app
  }

  /**
   * Enable extension
   */
  @bind
  public enable(enabled: boolean | Bud = true) {
    this.logger.log(enabled ? `enabled` : `disabled`)

    if (enabled instanceof Bud) {
      this.enabled = true
      return this
    }

    this.enabled = enabled
    return this
  }

  /**
   * Get option
   */
  @bind
  public getOption<K extends string>(key: K): ExtensionOptions[K] {
    return get(this.getOptions(), key)
  }
  /**
   * Get an option value
   */
  public get = this.getOption

  /**
   * Get options
   */
  @bind
  public getOptions(): ExtensionOptions {
    return Object.entries(this._options).reduce((acc, [key, value]) => {
      if (isUndefined(value)) return acc
      if (!isObject(value)) return {...acc, [key]: value}

      const isDynamicOption = (
        value: any,
      ): value is DynamicOption<any> => {
        return (
          value instanceof DynamicOption ||
          (`isBudValue` in value && value.isBudValue)
        )
      }

      const isDynamic = isDynamicOption(value)
      const unwrapped = isDynamic ? value.get()(this.app) : value

      this.logger.info(
        key,
        `has value:`,
        isDynamic ? `${typeof unwrapped} (dynamic)` : typeof unwrapped,
      )

      if (isUndefined(unwrapped)) return acc
      return {...acc, [key]: unwrapped}
    }, {} as ExtensionOptions)
  }

  /**
   * Import ESM module
   */
  @bind
  public async import<T = any>(
    signifier: string,
    context: string,
    options: {bustCache?: boolean; raw?: boolean} = {
      bustCache: false,
      raw: false,
    },
  ): Promise<T | undefined> {
    return await this.app.module
      .import(signifier, context, options)
      .catch(this.catch)
  }

  /**
   * Is extension enabled?
   */
  @bind
  public isEnabled(): boolean {
    return `when` in this
      ? this.when(this.app, this.getOptions())
      : this.enabled
  }

  /**
   * Logger instance
   */
  public get logger(): any {
    const scopes = []

    this.app.isChild && scopes.push(this.app.label)
    this.label && scopes.push(this.label)

    return logger.scope(...scopes)
  }

  /**
   * `make` callback
   */
  public async make?(app: Bud, options?: ExtensionOptions): Promise<Plugin>

  /**
   * {@link Extension.register}
   */
  public async register?(app: Bud): Promise<any>

  /**
   * Resolve module using `import.meta.resolve` api
   */
  @bind
  public async resolve(
    signifier: string,
    context: string,
  ): Promise<string> {
    return await this.app.module.resolve(signifier, context)
  }

  /**
   * Set option
   */
  @bind
  public setOption<K extends string>(
    key: K,
    valueOrCallback: OptionCallbackValue<ExtensionOptions, K>,
  ): this {
    if (isFunction(valueOrCallback)) {
      const resolved = valueOrCallback(this.get(key))
      set(this._options, key, resolved)
      this.logger.info(`set`, key, `=>`, resolved)
      return this
    }

    set(this._options, key, valueOrCallback)
    this.logger.info(`set`, key, `=>`, valueOrCallback)
    return this
  }

  /**
   * Set option
   */
  public set = this.setOption

  /**
   * Set options
   */
  @bind
  public setOptions(
    value: Partial<InternalOptionsValues<ExtensionOptions>>,
  ): this {
    this.logger.info(`set options`, value)
    this._options = value
    return this
  }

  @bind
  public async execute(key: `${keyof Meta & string}` | `make`) {
    await this.app.resolvePromises()

    if (key === `make`) {
      if (!this.isEnabled()) return false

      if (!isUndefined(this.apply)) {
        this.logger.success(`produced hybrid compiler/bud plugin`)
        this.logger.info(this)
        return this
      }

      if (!isUndefined(this.plugin)) {
        const plugin = new this.plugin({...this.getOptions()})
        this.logger.success(`produced compiler plugin`)
        this.logger.info(plugin)
        return plugin
      }

      if (!isUndefined(this.make)) {
        const plugin = await this.make(this.app, {...this.getOptions()})
        this.logger.success(`produced make plugin`)
        this.logger.info(plugin)
        return plugin
      }

      return false
    }

    if (isUndefined(this[key])) return

    if (this.meta[key] === true) return
    this.meta[key] = true

    if ([`buildAfter`, `buildBefore`].includes(key) && !this.isEnabled())
      return

    this.logger.log(`executing`, key)

    await this[key](this.app)
    await this.app.resolvePromises()
  }
}

export {DynamicOption}
