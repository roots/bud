import {bind} from '@roots/bud-support/decorators'
import {
  has,
  isBoolean,
  isFunction,
  isUndefined,
} from '@roots/bud-support/lodash-es'
import type {Signale} from 'signale'
import type {Compiler} from 'webpack'

import type {Bud} from '../bud.js'
import type {Modules} from '../types/registry/modules'
import type {ApplyPluginConstructor} from './decorators/plugin.js'

export type Options<T = Record<string, any>> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export type OptionsMap<MappedOptions extends Options> = {
  [K in keyof MappedOptions as `${K & string}`]?:
    | ((app: Bud) => MappedOptions[K])
    | MappedOptions[K]
}

/**
 * Webpack plugin.
 *
 * @public
 */
export interface ApplyPlugin {
  /**
   * Loose defined
   *
   * @public
   */
  [key: string]: any

  /**
   * Apply callback
   *
   * @see {@link https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture}
   *
   * @public
   */
  apply: (...args: any[]) => unknown
}

export interface Constructor {
  new (...args: [Bud]): Extension | ApplyPlugin
}

export type ExtensionLiteral = {
  [K in keyof Extension]?: Extension[K]
}

/**
 * Bud extension
 *
 * @public
 */
export class Extension<
  ExtensionOptions extends Options = Options,
  Plugin extends ApplyPlugin = ApplyPlugin,
> {
  /**
   * Application
   *
   * @internal
   */
  public _app: () => Bud

  /**
   * Application accessor
   *
   * @public
   */
  public app: Bud

  /**
   * Extension options
   *
   * @internal
   */
  public optionsMap: OptionsMap<ExtensionOptions> = {}

  /**
   * Extension options
   *
   * @readonly
   * @public
   */
  public readonly options: ExtensionOptions
  /**
   * Extension meta
   *
   * @public
   */
  public meta: {
    init: boolean
    register: boolean
    boot: boolean
    configAfter: boolean
    buildBefore: boolean
    buildAfter: boolean
  } = {
    init: false,
    register: false,
    boot: false,
    configAfter: false,
    buildBefore: false,
    buildAfter: false,
  }

  /**
   * The module name
   *
   * @public
   */
  public label: keyof Modules & string

  /**
   * @public
   */
  public logger: Signale

  /**
   * Depends on
   *
   * @public
   */
  public dependsOn?: Set<`${keyof Modules & string}`>

  /**
   * Depends on (optional)
   *
   * @public
   */
  public dependsOnOptional?: Set<`${keyof Modules & string}`>

  /**
   * Depends on (optional)
   *
   * @public
   */
  public optIn?: Set<`${keyof Modules & string}`>

  /**
   * Boolean or a function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Extension.options} (if any) as the second parameter.
   *
   * @public
   */
  public when?(app: Bud, options?: ExtensionOptions): Promise<boolean>

  /**
   * `init` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async init?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `register` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async register?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `boot` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async boot?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `configAfter` callback
   *
   * @public
   */
  public async configAfter?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `buildBefore` callback
   *
   * @public
   */
  public async buildBefore?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `buildAfter` callback
   *
   * @public
   */
  public async buildAfter?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  public async compilerBefore?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  public async compilerAfter?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `make` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async make?(app: Bud, options?: ExtensionOptions): Promise<Plugin>

  /**
   * Plugin constructor
   *
   * @public
   */
  public plugin?: ApplyPluginConstructor

  /**
   * Compiler plugin `apply` method
   *
   * @public
   */
  public apply?(compiler: Compiler): unknown

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    this._app = () => app
    Object.defineProperty(this, `app`, {
      get: (): Bud => this._app(),
    })

    Object.defineProperty(this, `logger`, {
      get: () =>
        app.logger.instance.scope(
          ...this.app.logger.scope,
          this.label ?? `anonymous extension`,
        ),
    })

    const opts = this.options ?? {}

    Object.defineProperty(this, `options`, {
      get: this.getOptions,
      set: this.setOptions,
    })

    this.setOptions(opts as any)
  }

  /**
   * `init` callback handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _init() {
    if (isUndefined(this.init)) return
    this.logger.log(`initialized`)

    try {
      await this.init(this.app, this.options)
      this.meta[`init`] = true
    } catch (error) {
      this.logger.error(error)
      this.app.fatal(`error in ${this.label}`)
    }
  }

  /**
   * `register` callback handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _register() {
    if (isUndefined(this.register)) return
    this.logger.log(`registered`)

    if (this.init && !this.meta[`init`]) await this._init()
    this.meta[`register`] = true

    try {
      await this.register(this.app, this.options)
    } catch (error) {
      this.logger.error(`error on register`, `\n`, error)
      this.app.error(`error in`, this.label)
    }
  }

  /**
   * `boot` callback handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _boot() {
    if (isUndefined(this.boot)) return

    if (this.init && !this.meta[`init`]) await this._init()
    if (this.register && !this.meta[`register`]) await this._register()

    this.logger.log(`booted`)

    try {
      await this.boot(this.app, this.options)
      this.meta[`boot`] = true
    } catch (error) {
      this.app.error(this.label, `boot error`, `\n`, error)
    }
  }

  /**
   * `buildBefore` callback handler
   *
   * @public
   */
  @bind
  public async _buildBefore() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.buildBefore) || enabled === false) return
    this.logger.log(`buildBefore`)
    this.meta[`buildBefore`] = true

    await this.buildBefore(this.app, this.options)
  }

  /**
   * `buildAfter` callback handler
   *
   * @public
   */
  @bind
  public async _buildAfter() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.buildAfter) || enabled === false) return
    this.logger.log(`buildAfter`)
    this.meta[`buildAfter`] = true

    await this.buildAfter(this.app, this.options)
  }

  public isConfigAfter: boolean = false

  /**
   * `configAfter` callback handler
   *
   * @public
   */
  @bind
  public async _configAfter() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.configAfter) || enabled === false) return
    this.isConfigAfter = true

    await this.configAfter(this.app, this.options)
  }

  /**
   * `make` callback handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _make() {
    this.logger.info(`trying to make`, this.label)

    if (
      isUndefined(this.make) &&
      isUndefined(this.apply) &&
      isUndefined(this.plugin)
    ) {
      this.logger.info(`no make, apply or plugin prop found. skipping.`)
      return false
    }

    const enabled = await this.isEnabled()

    if (enabled === false) {
      this.logger.info(`${this.label} is disabled. skipping.`)
      return false
    }

    try {
      if (!isUndefined(this.apply)) {
        this.logger.info(`apply prop found. return extension instance`)
        return this
      }
    } catch (error) {
      this.logger.error(`error instantiating plugin`, error)
    }

    try {
      if (!isUndefined(this.plugin)) {
        const plugin = new this.plugin(this.options)
        this.logger.success(`produced webpack plugin`)
        return plugin
      }
    } catch (err) {
      this.logger.error(`error instantiating plugin`, err)
    }

    try {
      if (!isUndefined(this.make)) {
        const plugin = await this.make(this.app, this.options)
        this.logger.success(`produced webpack plugin`)
        return plugin
      }
    } catch (err) {
      this.logger.error(`error calling make`, err)
    }
  }

  /**
   * Get extension options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOptions(): ExtensionOptions {
    return Object.entries(this.optionsMap ?? {}).reduce(
      this.fromOptionsMap,
      {} as ExtensionOptions,
    )
  }

  /**
   * Set extension options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOptions(
    value:
      | ExtensionOptions
      | ((options: ExtensionOptions) => ExtensionOptions),
  ): this {
    this.optionsMap = isFunction(value)
      ? value(this.options ?? ({} as ExtensionOptions))
      : value

    return this
  }

  /**
   * Get extension option
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOption<K extends keyof ExtensionOptions & string>(
    key: K,
  ): ExtensionOptions[K] {
    return this.options[key]
  }

  /**
   * Set extension option
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOption<K extends keyof ExtensionOptions & string>(
    key: K,
    value: ExtensionOptions[K],
  ): this {
    if (!this.optionsMap) this.optionsMap = {}

    this.optionsMap[key] = isFunction(value)
      ? value(this.options[key])
      : () => value

    return this
  }

  /**
   * Normalize options to functions
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public toOptionsMap<K extends keyof ExtensionOptions & string>(
    funcMap: OptionsMap<ExtensionOptions> = {},
    [key, value]: [K & string, ExtensionOptions[K & string]],
  ): OptionsMap<ExtensionOptions> {
    return {
      ...funcMap,
      [key]: isFunction(value) ? value : () => value,
    }
  }

  /**
   * Get options from function map
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public fromOptionsMap<K extends keyof OptionsMap<ExtensionOptions>>(
    options: ExtensionOptions,
    [key, value]: [K, OptionsMap<ExtensionOptions>[K]],
  ): ExtensionOptions {
    return {
      ...(options ?? {}),
      [key]: isFunction(value) ? value(this.app) : value,
    } as ExtensionOptions
  }

  /**
   * Assign properties from an object
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public fromObject(extensionObject: ExtensionLiteral): this {
    Object.entries(extensionObject).map(([k, v]) => {
      this[k] = v
    })

    return this
  }

  /**
   * Returns true if extension property is set
   *
   * @param key - property name
   * @returns true if property exists on extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public has<K extends `${keyof Extension}`>(key: K): boolean {
    return has(this, key)
  }

  /**
   * Returns true if extension property is set and is a function
   *
   * @param key - property name
   * @returns true if property exists on extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public isFunction<K extends `${keyof Extension}`>(key: K): boolean {
    return this.has(key) && isFunction(this[key]) ? true : false
  }

  /**
   * Resolve module using `import.meta.resolve` api
   *
   * @remarks
   * Uses `import-meta-resolve` (npm package).
   * Will transition to node `import.meta.resolve` api when it is marked
   * non-experimental. It currently requires a flag to enable.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolve(
    signifier: string,
    context?: string,
  ): Promise<string> {
    let modulePath: string

    modulePath = await this.app.module.resolve(signifier)

    if (!modulePath) {
      modulePath = await this.app.module.resolve(signifier, context)
    }
    if (!modulePath) {
      this.logger.error(`unresolvable:`, signifier)
      this.app.fatal(`unresolvable: ${signifier}`)
    }

    return modulePath
  }

  /**
   * Import ESM module
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import<T = any>(signifier: string): Promise<T> {
    try {
      const path = await this.resolve(signifier)

      if (!path) {
        this.logger.error(`could not import`, signifier)
        return
      }

      const result = await import(path)

      this.logger.success(`imported`, signifier)
      return result?.default ?? result ?? null
    } catch (error) {
      this.logger.error(`error importing`, signifier)
      this.app.fatal(error)
    }
  }

  /**
   * Disable extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public disable() {
    this.when = async () => false
  }

  /**
   * Enable extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public enable() {
    this.when = async () => true
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async isEnabled(): Promise<boolean> {
    if (isUndefined(this.when)) return true
    if (isBoolean(this.when)) return this.when as unknown as boolean
    if (isFunction(this.when))
      return await this.when(this.app, this.options)

    return true
  }

  /**
   * Alias for `.app`
   *
   * @remarks
   * Utility to make it easier to chain config fn calls
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public done(): Bud {
    return this.app
  }
}
