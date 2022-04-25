import {bind, lodash as _, Signale} from '@roots/bud-support'

import {ModuleDefinitions} from '../'
import {Bud} from '../bud'
import {Controllers, Modules} from '../registry'
import {Options} from './types'

export class Extension<E = any, Plugin = any> {
  public _app?: () => Bud
  public app?: Bud

  protected _options?: Options.FuncMap<E>
  public options?: Options<E>

  @bind
  public async _init?() {
    this.path = await this.app.module.path(this.label)
    if (this.init) {
      this.logger.log('initializing')
      await this.init(this.options, this.app)
    }
  }
  public async init?(options: Options<E>, app: Bud): Promise<unknown>

  @bind
  public async _register?() {
    if (this.register) {
      this.logger.log('registering')
      await this.register(this.options ?? {}, this.app)
    }
  }
  public async register?(options: Options<E>, app: Bud): Promise<unknown>

  @bind
  public async _boot?() {
    if (this.boot) {
      this.logger.log('booting')
      await this.boot(this.options ?? {}, this.app)
    }
  }
  public async boot?(options?: Options<E>, app?: Bud): Promise<unknown>

  @bind
  public async _make?() {
    if (this.make) {
      this.logger.log('making')
      return await this.make(this.options ?? {}, this.app)
    }

    return false
  }
  public async make?(options?: Options<E>, app?: Bud): Promise<Plugin>

  /**
   * The module name
   *
   * @public
   */
  public label?: (
    | keyof Modules
    | keyof Controllers
    | keyof ModuleDefinitions
  ) &
    string

  /**
   * Depends on
   *
   * @public
   */
  public dependsOn?: Set<`${keyof Modules & string}`>

  /**
   * Boolean or a function returning a boolean indicating if the {@link Module} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Module.options} (if any) as the second parameter.
   *
   * Do note that this is not the same parameter order as {@link Module.make}. That's because it is more common
   * to check the state of the {@link Bud} in the {@link Module.when} callback than the {@link Module.options}
   * (ie Checking the {@link Bud.isProduction} state).
   *
   * @public
   */
  public when?(options: Options<E>, app: Bud): Promise<boolean>

  /**
   * Plugin constructor
   */
  public plugin?: new (options: Options<E>) => Plugin

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

    const logger = (() =>
      _app.logger.makeInstance({
        scope: this.label ?? 'anonymous extension',
      }))()

    Object.defineProperty(this, 'app', {
      get: (() =>
        function (): Bud {
          return this._app()
        }.bind(this))(),
    })

    Object.defineProperty(this, 'logger', {
      get: (() =>
        function (): Signale {
          return logger.scope(this.label)
        }.bind(this))(),
    })

    Object.defineProperty(this, 'options', {
      get: (() =>
        function (): Options<E> {
          if (!this._options) this._options = {}
          return Object.entries(this._options).reduce(
            this.fromOptionsMap,
            {},
          )
        }.bind(this))(),

      set: (() =>
        function (value: Options.FuncMap<Options<E>>) {
          this._options = Object.entries(value).reduce(
            this.toOptionsMap,
            {},
          )
        }.bind(this))(),
    })
  }

  @bind
  public fromObject?(extensionObject: Extension): this {
    Object.entries(extensionObject).map(([k, v]) => {
      this.set(k, v)
    })
    return this
  }

  @bind
  public toOptionsMap?<K extends `${keyof Extension['options'] & string}`>(
    funcMap: Options.FuncMap<Options<E>> = {},
    [key, value]: [K, Extension['options'][K] | Extension['_options'][K]],
  ): Options.FuncMap<Options<E>> {
    return {
      ...funcMap,
      [key]: _.isFunction(value) ? value : () => value,
    }
  }

  @bind
  public fromOptionsMap?<K extends `${Extension['_options'] & string}`>(
    options: Options<E>,
    [key, value]: [K, Extension['_options'][K]],
  ): Options<E> {
    return {
      ...(options ?? {}),
      [key]: _.isFunction(value) ? value(this.app) : value,
    }
  }

  @bind
  public get?<K extends string, T = any>(key: K) {
    return _.get(this, key) as T
  }

  @bind
  public set?<K extends string, T = any>(key: K, value: T) {
    _.set(this, key, value)
    return this
  }

  @bind
  public has?<K extends keyof Extension>(key: K): boolean {
    return this[key] ? true : false
  }

  @bind
  public isFunction?<K extends keyof Extension>(key: K): boolean {
    return _.isFunction(this[key]) ? true : false
  }

  /**
   * @public
   */
  @bind
  public resolve?(packageName: string): string {
    const result = this.app.module.resolvePreferred(packageName, this.path)
    this.logger.info('resolved', packageName, 'to', result)
    return result
  }

  /**
   * @public
   */
  @bind
  public async import?<T = any>(packageName: string): Promise<T> {
    try {
      const result = await import(this.resolve(packageName))
      this.logger.info('imported', packageName)
      return result
    } catch (error) {
      this.app.error(error)
    }
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
