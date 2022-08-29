import {bind} from 'helpful-decorators'
import {has, isBoolean, isFunction, isUndefined} from 'lodash-es'
import type {Compiler} from 'webpack'

import type {Bud} from '../bud.js'
import type {Modules} from '../registry/index.js'
import type {ApplyPluginConstructor} from './decorators/plugin.js'

export type Options<T = any> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export namespace Options {
  export type FuncMap<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: (app: Bud) => T[K]
  }>

  export type Seed<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: ((app: Bud) => T[K]) | T[K]
  }>
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
  apply: (compiler: Compiler) => unknown
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
export class Extension<E = any, Plugin extends ApplyPlugin = any> {
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
  public _options: Options.FuncMap<E> = {}

  /**
   * Extension options
   *
   * @readonly
   * @public
   */
  public readonly options: Options<E>

  /**
   * Extension meta
   *
   * @public
   */
  public meta = {}

  /**
   * The module name
   *
   * @public
   */
  public label: keyof Modules & string

  /**
   * @public
   */
  public logger: Bud['logger']['instance']

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
  public when?(app: Bud, options?: Options<E>): Promise<boolean>

  /**
   * `init` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async init?(app: Bud, options?: Options<E>): Promise<unknown>

  /**
   * `register` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async register?(app: Bud, options?: Options<E>): Promise<unknown>

  /**
   * `boot` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async boot?(app: Bud, options?: Options<E>): Promise<unknown>

  /**
   * `configAfter` callback
   *
   * @public
   */
  public async configAfter?(
    app: Bud,
    options?: Options<E>,
  ): Promise<unknown>

  /**
   * `buildBefore` callback
   *
   * @public
   */
  public async buildBefore?(
    app: Bud,
    options?: Options<E>,
  ): Promise<unknown>

  /**
   * `buildAfter` callback
   *
   * @public
   */
  public async buildAfter?(
    app: Bud,
    options?: Options<E>,
  ): Promise<unknown>

  public async compilerBefore?(
    app: Bud,
    options?: Options<E>,
  ): Promise<unknown>

  public async compilerAfter?(
    app: Bud,
    options?: Options<E>,
  ): Promise<unknown>

  /**
   * `make` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async make?(app: Bud, options?: Options<E>): Promise<Plugin>

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
  public apply?: ApplyPlugin['apply']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: Bud) {
    this._app = () => _app

    Object.defineProperty(this, `app`, {
      get: (): Bud => this._app(),
    })
    Object.defineProperty(this, `logger`, {
      get: () =>
        _app.logger
          .makeInstance()
          .scope(
            ...this.app.logger.scope,
            this.label ?? `anonymous extension`,
          ),
    })

    const opts = this.options ?? {}

    Object.defineProperty(this, `options`, {
      get: this.getOptions,
      set: this.setOptions,
    })

    this.setOptions(opts)
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

    await this.app.hooks.fire(`${this.label}/init/before`)

    try {
      await this.init(this.app, this.options)
      this.meta[`_init`] = true
    } catch (error) {
      this.logger.error(error)
      this.app.error(`error in`, this.label)
    }

    await this.app.hooks.fire(`${this.label}/init/after`)
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

    await this.app.hooks.fire(`${this.label}/register/before`)

    try {
      if (this.init && !this.meta[`_init`]) await this._init()
    } catch (err) {
      this.logger.error(this.label, `register => init error`, `\n`)
    }
    try {
      await this.register(this.app, this.options)
      this.meta[`_register`] = true
    } catch (error) {
      this.logger.error(`error on register`, `\n`, error)
      this.app.error(`error in`, this.label)
    }

    await this.app.hooks.fire(`${this.label}/register/after`)
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

    await this.app.hooks.fire(`${this.label}/boot/before`)

    try {
      if (this.init && !this.meta[`_init`]) await this._init()
      if (this.register && !this.meta[`_register`]) await this._register()
    } catch (err) {
      this.logger.error(this.label, `register => init error`, `\n`)
    }
    try {
      await this.boot(this.app, this.options)
      this.meta[`_boot`] = true
    } catch (error) {
      this.app.error(this.label, `boot error`, `\n`, error)
    }

    await this.app.hooks.fire(`${this.label}/boot/after`)
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

    await this.app.hooks.fire(`${this.label}/buildBefore/before`)
    await this.buildBefore(this.app, this.options)
    await this.app.hooks.fire(`${this.label}/buildBefore/after`)
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

    await this.app.hooks.fire(`${this.label}/buildAfter/after`)
    await this.buildAfter(this.app, this.options)
    await this.app.hooks.fire(`${this.label}/buildAfter/after`)
  }

  /**
   * `configAfter` callback handler
   *
   * @public
   */
  @bind
  public async _configAfter() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.configAfter) || enabled === false) return

    await this.app.hooks.fire(`${this.label}/configAfter/before`)
    await this.configAfter(this.app, this.options)
    await this.app.hooks.fire(`${this.label}/configAfter/after`)
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
      return false
    }

    const enabled = await this.isEnabled()
    if (enabled === false) {
      this.logger.info(`${this.label} is disabled`)
      return false
    }

    try {
      await this.app.hooks.fire(`${this.label}/make/before`)
    } catch (err) {
      this.logger.error(`error on`, `${this.label}/make/before`, err)
    }

    try {
      if (this.plugin) return new this.plugin(this.options)
    } catch (err) {
      this.logger.error(`error instantiating plugin`, err)
    }

    try {
      let value: ApplyPlugin
      if (this.apply) value = this as {apply: any}
      else value = await this.make(this.app, this.options)
      await this.app.hooks.fire(`${this.label}/make/after`)
      return value
    } catch (error) {
      this.app.error(this.label, `make error`, `\n`, error)
    }
  }

  /**
   * Get extension options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOptions(): Options<E> {
    return Object.entries(this._options ?? {}).reduce(
      this.fromOptionsMap,
      {},
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
    value: Options<E> | ((value: Options<E>) => Options<E>),
  ): this {
    this._options = isFunction(value) ? value(this.options ?? {}) : value
    return this
  }

  /**
   * Get extension option
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOption<K extends keyof Options<E> & string>(
    key: K,
  ): Options<E>[K] {
    return this.options[key]
  }

  /**
   * Set extension option
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOption<K extends keyof Options.FuncMap<E>>(
    key: K & string,
    value: Options<E>[K & string],
  ): this {
    if (!this._options) this._options = {}
    this._options[key] = isFunction(value)
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
  public toOptionsMap<K extends keyof Options<E> & string>(
    funcMap: Options.FuncMap<Options<E>> = {},
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options.FuncMap<Options<E>> {
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
  public fromOptionsMap<K extends keyof Options<E>>(
    options: Options<E>,
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options<E> {
    return {
      ...(options ?? {}),
      [key]: isFunction(value) ? value(this.app) : value,
    }
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
    parent?: string,
  ): Promise<string> {
    let modulePath: string

    modulePath = await this.app.module.resolve(signifier)

    if (!modulePath) {
      modulePath = await this.app.module.resolve(signifier, parent)
    }
    if (!modulePath) {
      this.app.error(this.label, `unresolvable:`, signifier)
    }

    this.logger.log(
      `resolved`,
      signifier,
      `=>`,
      modulePath
        ?.replace(this.app.path(), `.`)
        .replace(/(.*)\/node_modules\/(.*)/, `$2`),
    )

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
      const result = await import(signifier)
      this.logger.success(`imported`, signifier)
      return result?.default ?? result ?? null
    } catch (error) {
      throw new Error(error)
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
    if (this.when && isFunction(this.when))
      return await this.when(this.app, this.options)

    if (this.when && isBoolean(this.when))
      return this.when as unknown as boolean

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
