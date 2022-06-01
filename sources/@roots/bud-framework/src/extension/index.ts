import {bind} from 'helpful-decorators'
import {has, isFunction} from 'lodash-es'
import Signale from 'signale'

import {Bud} from '../bud.js'
import {Modules} from '../registry/index.js'
import {Options} from './types.js'

/**
 * Bud extension
 *
 * @public
 */
export class Extension<E = any, Plugin = any> {
  /**
   * Application
   *
   * @internal
   */
  public _app?: () => Bud

  /**
   * Application accessor
   *
   * @public
   */
  public app?: Bud

  /**
   * Extension options
   *
   * @internal
   */
  public _options?: Options.FuncMap<E> = {}

  /**
   * Extension options
   *
   * @readonly
   * @public
   */
  public readonly options?: Options<E> = {}

  /**
   * Extension meta
   *
   * @public
   */
  public meta? = {}

  /**
   * The module name
   *
   * @public
   */
  public label?: keyof Modules & string

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
   * Plugin constructor
   *
   * @public
   */
  public plugin?: new (options: Options<E>) => Plugin

  @bind
  public async _init?() {
    this.path = await this.app.module.path(this.label)
    if (this.init) {
      try {
        await this.init(this.options, this.app)
      } catch (error) {
        this.app.error(this.label, 'init error', '\n', error)
      }
    }
  }
  public async init?(options: Options<E>, app: Bud): Promise<unknown>

  @bind
  public async _register?() {
    if (this.register) {
      try {
        await this.register(this.options, this.app)
      } catch (error) {
        this.app.error(this.label, 'register error', '\n', error)
      }
    }
  }
  public async register?(options: Options<E>, app: Bud): Promise<unknown>

  @bind
  public async _boot?() {
    if (this.boot) {
      try {
        await this.boot(this.options, this.app)
      } catch (error) {
        this.app.error(this.label, 'boot error', '\n', error)
      }
    }
  }
  public async boot?(options?: Options<E>, app?: Bud): Promise<unknown>

  @bind
  public async _beforeBuild?() {
    if (this.beforeBuild) {
      this.app.hooks.action(
        'event.build.before',
        async () => await this.beforeBuild(this.options, this.app),
      )
    }
  }
  public async beforeBuild?(
    options: Options<E>,
    app?: Bud,
  ): Promise<unknown>

  @bind
  public async _make?() {
    const enabled = await this.isEnabled()

    if (enabled === false || (!this.make && !this.apply && !this.plugin))
      return false

    if (this.plugin) return new this.plugin(this.options)
    if (this.apply) return this as {apply: any}

    try {
      return await this.make()
    } catch (error) {
      this.app.error(this.label, 'make error', '\n', error)
    }
  }
  public async make?(options?: Options<E>, app?: Bud): Promise<Plugin>

  /**
   * Compiler plugin `apply` method
   *
   * @public
   */
  public apply?: Extension.PluginInstance['apply']

  /**
   * @public
   */
  public path?: string

  /**
   * @public
   */
  public logger?: Bud['logger']['instance']

  /**
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

  @bind
  public getOptions?(): Options<E> {
    return Object.entries(this._options).reduce(this.fromOptionsMap, {})
  }

  @bind
  public setOptions?(
    value: Options<E> | ((value: Options<E>) => Options<E>),
  ): this {
    this._options = isFunction(value) ? value(this.options) : value
    return this
  }

  @bind
  public getOption?<K extends keyof Options<E> & string>(
    key: K,
  ): Options<E>[K] {
    return this.options[key]
  }

  @bind
  public setOption?<K extends keyof Options.FuncMap<E>>(
    key: K & string,
    value: Options<E>[K & string],
  ): this {
    this._options[key] = isFunction(value)
      ? value(this.options[key])
      : () => value
    return this
  }

  @bind
  protected toOptionsMap?<K extends keyof Options<E> & string>(
    funcMap: Options.FuncMap<Options<E>> = {},
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options.FuncMap<Options<E>> {
    return {
      ...funcMap,
      [key]: isFunction(value) ? value : () => value,
    }
  }

  @bind
  protected fromOptionsMap?<K extends keyof Options<E>>(
    options: Options<E>,
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options<E> {
    return {
      ...(options ?? {}),
      [key]: isFunction(value) ? value(this.app) : value,
    }
  }

  @bind
  public fromObject?(extensionObject: Extension): this {
    Object.entries(extensionObject).map(([k, v]) => {
      this[k] = v
    })

    return this
  }

  @bind
  public has?<K extends `${keyof Extension}`>(key: K): boolean {
    return has(this, key)
  }

  @bind
  public isFunction?<K extends `${keyof Extension}`>(key: K): boolean {
    return isFunction(this[key]) ? true : false
  }

  /**
   * @public
   */
  @bind
  public resolve?(packageName: string): string {
    const result = this.app.module.resolvePreferred(packageName, this.path)
    this.logger.log('resolved', packageName, 'to', result)
    return result
  }

  /**
   * @public
   */
  @bind
  public async import?<T = any>(packageName: string): Promise<T> {
    try {
      const result = await import(this.resolve(packageName))
      this.logger.log('imported', packageName)
      return result
    } catch (error) {
      this.app.error(error)
    }
  }

  @bind
  public disable?() {
    this.when = async () => false
  }

  @bind
  public enable?() {
    this.when = async () => true
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  @bind
  public async isEnabled?(): Promise<boolean> {
    if (this.when) return await this.when(this.options ?? {}, this.app)
    return true
  }

  @bind
  public done?(): Bud {
    return this.app
  }
}

export namespace Extension {
  export interface Constructor {
    new (...args: any[]): Extension
  }

  export type Definition = Constructor

  /**
   * Compiler plugin interface
   *
   * @public
   */
  export interface PluginInstance {
    [key: string]: any

    /**
     * Apply method
     *
     * @public
     */
    apply?: CallableFunction
  }
}
