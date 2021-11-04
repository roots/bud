import {Container} from '@roots/container'

import {bind, isFunction} from './controller.dependencies'
import {
  Extension,
  Framework,
  Plugin,
} from './controller.interface'

/**
 * Extension instance controller
 *
 * @public @core
 */
export class Controller {
  /**
   * @internal
   */
  public _app: () => Framework

  /**
   * The application instance
   *
   * @public @readonly
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Has registered
   *
   * @public
   */
  public registered: boolean = false

  /**
   * Has booted
   *
   * @public
   */
  public booted: boolean = false

  /**
   * @internal
   */
  public module: Extension | Plugin

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(_app: Framework, module: Extension) {
    this._app = () => _app
    this.module = module
  }

  public get(key: string): any {
    return this.module[key]
  }

  /**
   * Overwrite
   */
  public set(key: string, value: any) {
    this.module[key] = value
  }

  /**
   * Extension module name
   *
   * @public
   */
  public get name(): string {
    return this.module.name
  }
  public set name(name: string) {
    this.module.name = name
  }

  /**
   * Extension module options
   *
   * @public
   */
  public get options() {
    return this.app.container(
      isFunction(this.module.options)
        ? this.module.options(this.app)
        : this.module.options,
    )
  }
  public set options(options) {
    if (options instanceof Container) {
      this.module.options = options.all()
      return
    }

    this.module.options = options
  }

  /**
   * Merge an extension option value with the supplied value
   *
   * @public
   */
  public mergeOptions(options: any) {
    this.options.setStore({
      ...this.options.all(),
      ...options,
    })
  }

  /**
   * Merge extension options with supplied values
   *
   * @public
   */
  public mergeOption(key: string, value: any) {
    this.options.set(key, {
      ...this.options.get(key),
      ...value,
    })
  }

  /**
   * Modify an extension module property with a callback
   *
   * @public
   */
  public mutateProp(prop: string, mutator: (prop: any) => any) {
    this.module[prop] = mutator(this.module[prop])
    return this
  }

  /**
   * Modify the extension module with a callback
   *
   * @public
   */
  public mutate(cb: (module: Extension) => Extension) {
    this.module = cb(this.module)
    return this
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public make() {
    if (this.when === false) return false
    if (!this.module.make) return false

    const options = this.app.hooks.filter(
      `extension.${this.name}.options`,
      this.options,
    )

    const value = this.module.make(options, this.app)

    return this.app.hooks.filter(
      `extension.${this.name}.make`,
      value,
    )
  }

  /**
   * The extension name
   *
   * @public
   */
  public apply(): Plugin {
    return this.app.hooks.filter(
      `extension.${this.name}.apply`,
      this.module,
    )
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public get when() {
    if (typeof this.module.when === 'undefined') return true

    if (typeof this.module.when === 'boolean')
      return this.module.when

    const value = isFunction(this.module.when)
      ? this.module.when(this.app, this.options)
      : this.module.when

    return value
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public set when(when) {
    this.module.when = when
  }

  /**
   * Extension registration event
   *
   * @remarks
   * Calls the {@link Extension} callback
   *
   * @public
   */
  @bind
  public async register(): Promise<this> {
    if (this.registered || !this.module.register) return this

    await this.module.register(this.app)
    this.registered = true
    this.app.success(this.name, 'registered')

    return this
  }

  @bind
  public async api(): Promise<this> {
    if (!this.module.api) return this

    const assignment = isFunction(this.module.api)
      ? this.module.api(this.app)
      : this.module.api

    if (!Object.keys(assignment).every(key => !this.app[key])) {
      this.app.error(
        `${this.name} api tried to overwrite a property of ${this.app.name}`,
      )
      return this
    }

    Object.assign(this.app, assignment)
    return this
  }

  @bind
  public async mixin(): Promise<this> {
    if (!this.module.mixin) return this

    try {
      const classMap = await this.module.mixin(this.app)

      this.app.mixin(classMap)
    } catch (err) {}

    return this
  }

  /**
   * Extension boot event
   *
   * @remarks
   * Calls the {@link @roots/bud-framework#Module.boot} callback
   *
   * @returns {@link Extension}
   *
   * @public @core
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<this> {
    if (this.booted || !this.module.boot) return this

    try {
      await this.module.boot(this.app)
    } catch (err) {
      this.app.error(this.module.name, 'boot', err)
      return this
    }

    this.booted = true
    this.app.success(this.name)

    return this
  }
}
