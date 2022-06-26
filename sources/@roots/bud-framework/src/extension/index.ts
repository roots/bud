import {bind} from 'helpful-decorators'
import {has, isBoolean, isFunction, isUndefined} from 'lodash-es'
import type Signale from 'signale'
import type {Compiler} from 'webpack'

import type {Bud} from '../bud.js'
import type {Modules} from '../registry/index.js'
import type {ApplyPluginConstructor} from './decorators/plugin.js'

export type Options<T = any> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export namespace Options {
  export type FuncMap<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: (app?: Bud) => T[K]
  }>

  export type Seed<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: ((app?: Bud) => T[K]) | T[K]
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
  apply: (compiler?: Compiler) => unknown
}

export interface Constructor {
  new (...args: [Bud]): Extension
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
  public readonly options: Options<E> = {}

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
   * Boolean or a function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Extension.options} (if any) as the second parameter.
   *
   * @public
   */
  public when?(options: Options<E>, app: Bud): Promise<boolean>

  /**
   * `init` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async init?(options: Options<E>, app: Bud): Promise<unknown>

  /**
   * `register` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async register?(options: Options<E>, app: Bud): Promise<unknown>

  /**
   * `boot` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async boot?(options?: Options<E>, app?: Bud): Promise<unknown>

  /**
   * `afterConfig` callback
   *
   * @public
   */
  public async afterConfig?(): Promise<unknown>

  /**
   * `beforeBuild` callback
   *
   * @public
   */
  public async beforeBuild?(): Promise<unknown>

  /**
   * `make` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   *
   * @public
   */
  public async make?(options?: Options<E>, app?: Bud): Promise<Plugin>

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

    const logger = _app.logger.makeInstance({
      scope: this.label ?? 'anonymous extension',
    })

    Object.defineProperty(this, 'app', {
      get: (() =>
        function (): Bud {
          return this._app()
        }.bind(this))(),
    })

    Object.defineProperty(this, 'logger', {
      get: (() =>
        function (): Signale.Signale {
          return logger.scope(this.label ?? 'anonymous extension')
        }.bind(this))(),
    })

    const opts = this.options

    Object.defineProperty(this, 'options', {
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
      await this.init(this.options, this.app)
      this.meta['_init'] = true
    } catch (error) {
      this.logger.error('error on init', '\n', error)
      this.app.error('error in', this.label)
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
      if (this.init && !this.meta['_init']) await this._init()
    } catch (err) {
      this.logger.error(this.label, 'register => init error', '\n')
    }
    try {
      await this.register(this.options, this.app)
      this.meta['_register'] = true
    } catch (error) {
      this.logger.error('error on register', '\n', error)
      this.app.error('error in', this.label)
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
      if (this.init && !this.meta['_init']) await this._init()
      if (this.register && !this.meta['_register']) await this._register()
    } catch (err) {
      this.logger.error(this.label, 'register => init error', '\n')
    }
    try {
      await this.boot(this.options, this.app)
      this.meta['_boot'] = true
    } catch (error) {
      this.app.error(this.label, 'boot error', '\n', error)
    }

    await this.app.hooks.fire(`${this.label}/boot/after`)
  }

  /**
   * `beforeBuild` callback handler
   *
   * @public
   */
  @bind
  public async _beforeBuild() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.beforeBuild) || enabled === false) return

    await this.app.hooks.fire(`${this.label}/beforeBuild/before`)
    await this.beforeBuild()
    await this.app.hooks.fire(`${this.label}/beforeBuild/after`)
  }

  /**
   * `beforeBuild` callback handler
   *
   * @public
   */
  @bind
  public async _afterConfig() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.afterConfig) || enabled === false) return

    await this.app.hooks.fire(`${this.label}/afterConfig/before`)
    await this.afterConfig()
    await this.app.hooks.fire(`${this.label}/afterConfig/after`)
  }

  /**
   * `make` callback handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async _make() {
    const enabled = await this.isEnabled()

    if (
      enabled === false ||
      (isUndefined(this.make) &&
        isUndefined(this.apply) &&
        isUndefined(this.plugin))
    )
      return false

    await this.app.hooks.fire(`${this.label}/make/before`)
    if (this.plugin) return new this.plugin(this.options)
    if (this.apply) return this as {apply: any}

    try {
      return await this.make()
    } catch (error) {
      this.app.error(this.label, 'make error', '\n', error)
    }
    await this.app.hooks.fire(`${this.label}/make/after`)
  }

  /**
   * Get extension options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOptions(): Options<E> {
    return Object.entries(this._options).reduce(this.fromOptionsMap, {})
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
    this._options = isFunction(value) ? value(this.options) : value
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
  public async resolve(signifier: string): Promise<string> {
    const modulePath = await this.app.module.resolve(signifier)

    this.logger.log(this.label, 'resolving', signifier, 'to', modulePath)

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
      this.logger.success('imported', signifier)
      return result?.default ?? result ?? null
    } catch (error) {
      this.app.error(error)
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
      return await this.when(this.options ?? {}, this.app)

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
