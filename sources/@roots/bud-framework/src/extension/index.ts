import {bind, lodash as _, Signale} from '@roots/bud-support'

import {Bud} from '../bud'
import {Modules} from '../registry'
import {Options} from './types'

export class Extension<E = any, Plugin = any> {
  public _app?: () => Bud
  public app?: Bud

  protected _options?: Options.FuncMap<E> = {}
  public readonly options?: Options<E>

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
   * Boolean or a function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Extension.options} (if any) as the second parameter.
   *
   * Do note that this is not the same parameter order as {@link Extension.make}. That's because it is more common
   * to check the state of the {@link Bud} in the {@link Extension.when} callback than the {@link Extension.options}
   * (ie Checking the {@link Bud.isProduction} state).
   *
   * @public
   */
  public when?(options: Options<E>, app: Bud): Promise<boolean>

  /**
   * Plugin constructor
   */
  public plugin?: new (options: Options<E>) => Plugin

  @bind
  public async _init?() {
    this.path = await this.app.module.path(this.label)
    if (this.init) {
      this.logger.log('initializing')
      await this.init(this.options ?? {}, this.app)
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
  public async _beforeBuild?() {
    if (this.beforeBuild) {
      this.beforeBuild(this.options ?? {}, this.app)
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

    if (this.plugin) return new this.plugin(this.options ?? {})

    if (this.apply) return this as {apply: any}
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
        function (): Signale {
          return logger.scope(this.label ?? 'anonymous extension')
        }.bind(this))(),
    })

    Object.defineProperty(this, 'options', {
      get: this.getOptions,
    })
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
  public getOptions?(): Options<E> {
    return Object.entries(this._options).reduce(this.fromOptionsMap, {})
  }

  @bind
  public setOptions?(
    value: Options<E> | ((value: Options<E>) => Options<E>),
  ): this {
    this._options = _.isFunction(value) ? value(this.options) : value
    return this
  }

  @bind
  public getOption?<K extends keyof Options<E>>(
    key: K,
  ): Options<E>[K & string] {
    return _.get(this, `options.${key}`)
  }

  @bind
  public setOption?<K extends keyof Options<E>>(
    key: K & string,
    option: Options<E>[K & string],
  ): this {
    _.set(this, `_options.${key}`, option)
    return this
  }

  @bind
  protected toOptionsMap?<K extends keyof Options<E>>(
    funcMap: Options.FuncMap<Options<E>> = {},
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options.FuncMap<Options<E>> {
    return {
      ...funcMap,
      [key]: _.isFunction(value) ? value : () => value,
    }
  }

  @bind
  protected fromOptionsMap?<K extends keyof Options<E>>(
    options: Options<E>,
    [key, value]: [K & string, Options<E>[K & string]],
  ): Options<E> {
    return {
      ...(options ?? {}),
      [key]: _.isFunction(value) ? value(this.app) : value,
    }
  }

  @bind
  public fromObject?(extensionObject: Extension): this {
    Object.entries(extensionObject).map(([k, v]) => {
      this.set(k, v)
    })
    extensionObject.options && this.setOptions(extensionObject.options)

    return this
  }

  @bind
  public has?<K extends keyof Extension>(key: K): boolean {
    return _.has(this, key)
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
