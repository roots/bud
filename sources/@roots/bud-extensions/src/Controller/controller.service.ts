import {Bud, Extension, Extensions} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {isFunction} = lodash

/**
 * Extension instance controller
 *
 * @public
 */
export class Controller<
  Ext extends Extension = Extension<any, any>,
  Constructor extends {new (...args: any[]): Ext} = {
    new (...args: any[]): Ext
  },
> implements Extensions.Controller<Ext, Constructor>
{
  public readonly _app: () => Bud

  /**
   * The Bud instance
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * @public
   */
  public meta = {
    init: false,
    register: false,
    boot: false,
  }

  public module: Ext

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    this._app = () => app
  }

  @bind
  public setModule(extension: Ext | Constructor): this {
    this.module =
      typeof extension === 'function'
        ? new extension(this.app)
        : !(extension instanceof Extension)
        ? (new Extension(this.app).fromObject(extension) as Ext)
        : extension

    return this
  }

  @bind
  public has<T extends keyof Ext>(key: T & string): boolean {
    return this.module[key] ? true : false
  }

  @bind
  public get<T extends keyof Ext>(key: T & string): Ext[T & string] {
    return this.module[key]
  }

  @bind
  public set<T extends keyof Ext>(
    key: T & string,
    value: Ext[T & string],
  ): this {
    this.module[key] = value
    return this
  }

  @bind
  public getOption<T extends keyof Ext['options']>(
    key: T & string,
  ): Ext['options'][T & string] {
    if (!this.module.options) this.module.options = {}
    return this.module.options[key]
  }

  @bind
  public setOption<T extends keyof Ext['options']>(
    key: T & string,
    value:
      | Ext['options'][T & string]
      | ((
          value: Ext['options'][T & string],
        ) => Ext['options'][T & string]),
  ): this {
    if (!this.module.options) this.module.options = {}
    this.module.options[key] = isFunction(value)
      ? value(this.module.options[key])
      : value

    return this
  }

  @bind
  public getOptions(): Ext['options'] {
    return this.module.options ?? {}
  }

  @bind
  public setOptions(
    value: Ext['options'] | ((value: Ext['options']) => Ext['options']),
  ): this {
    this.module.options = isFunction(value)
      ? value(this.module.options)
      : value
    return this
  }

  @bind
  public async ensureDependenciesRanFirst(
    method: 'init' | 'register' | 'boot',
  ): Promise<void> {
    if (this.has('dependsOn')) {
      Array.from(this.get('dependsOn')).map(async pkgName => {
        if (!this.app.extensions.has(pkgName))
          await this.app.extensions.import(pkgName)

        if (this.app.extensions.has(pkgName)) {
          await this.app.extensions.get(pkgName)[method]()
        }
      })
    }
  }

  @bind
  public async init(): Promise<this> {
    await this.ensureDependenciesRanFirst('init')

    if (!this.module.init) this.meta.init = true
    if (this.meta.init) return this
    else this.meta.init = true

    await this.module._init()
    await this.app.api.processQueue()

    return this
  }

  @bind
  public async register(): Promise<this> {
    await this.ensureDependenciesRanFirst('register')

    if (this.meta.register) return this
    else this.meta.register = true

    await this.module._register()
    await this.app.api.processQueue()

    return this
  }

  /**
   * Extension boot event
   *
   * @remarks
   * Calls the {@link Module.boot} callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<this> {
    await this.ensureDependenciesRanFirst('boot')

    if (this.meta.boot) return this
    else this.meta.boot = true

    await this.module._boot()
    await this.app.api.processQueue()

    return this
  }

  @bind
  public async make(): Promise<{apply: any} | false> {
    const enabled = await this.isEnabled()

    if (
      enabled === false ||
      (!this.module.make && !this.module.apply && !this.module.plugin)
    )
      return false

    if (this.module.plugin)
      return new this.module.plugin(this.module.options ?? {})

    if (this.module.apply) return this.module as {apply: any}

    return await this.module._make()
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  @bind
  public async isEnabled(): Promise<boolean> {
    if (this.module.when)
      return await this.module.when(this.module.options ?? {}, this.app)
    return true
  }
}
