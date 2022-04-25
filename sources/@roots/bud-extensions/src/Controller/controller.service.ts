import {Bud, Extension, Extensions, Modules} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {isFunction} = lodash

/**
 * Extension instance controller
 *
 * @public
 */
export class Controller<K extends `${keyof Modules & string}` = any>
  implements Extensions.Controller<K>
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

  public module: Modules[K]

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    this._app = () => app
  }

  @bind
  public setModule(
    extension: (Extension | Extension.Constructor) & Modules[K],
  ): this {
    this.module =
      typeof extension === 'function'
        ? new extension(this.app)
        : !(extension instanceof Extension)
        ? new Extension(this.app).fromObject(extension)
        : extension

    return this
  }

  @bind
  public get<T extends `${keyof Modules[K] & string}`>(
    key: T,
  ): Modules[K][T] {
    return this.module[key]
  }

  @bind
  public set<T extends `${keyof Modules[K] & string}`>(
    key: T,
    value: Modules[K][T],
  ): this {
    this.module[key] = value
    return this
  }

  @bind
  public getOption<T extends `${keyof Modules[K]['options'] & string}`>(
    key: T,
  ): Modules[K]['options'][T] {
    if (!this.module.options) this.module.options = {}
    return this.module.options[key]
  }

  @bind
  public setOption<T extends `${keyof Modules[K]['options'] & string}`>(
    key: T,
    value:
      | Modules[K]['options'][T]
      | ((value: Modules[K]['options'][T]) => Modules[K]['options'][T]),
  ): this {
    if (!this.module.options) this.module.options = {}
    this.module.options[key] = isFunction(value)
      ? value(this.module.options[key])
      : value

    return this
  }

  @bind
  public getOptions(): Modules[K]['options'] {
    return this.module.options ?? {}
  }

  @bind
  public setOptions(
    value:
      | Modules[K]['options']
      | ((value: Modules[K]['options']) => Modules[K]['options']),
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
    if (this.module.dependsOn?.size > 0) {
      for (const name in this.module.dependsOn) {
        if (this.app.extensions.has(name)) {
          await this.app.extensions.get(name)[method]()
        }
      }
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
