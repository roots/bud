import {Service} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {isUndefined} from 'lodash'

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

  public meta: {
    instance: string
    registered: boolean
    booted: boolean
  }

  /**
   * Has registered
   *
   * @public
   */
  public registered: boolean

  /**
   * Has booted
   *
   * @public
   */
  public booted: boolean

  /**
   * @internal
   */
  public _module: Extension | Plugin

  public log: typeof Service.prototype.log

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(_app: Framework, _module: Extension) {
    this._app = () => _app
    this._module = _module
    this.log = this.app.extensions.log

    this.meta = {
      instance: this.app.name,
      registered: false,
      booted: false,
    }

    if (!this._module) {
      throw Error(
        `extension controller constructor: missing module`,
      )
    }

    if (!this._module.name) {
      this.app.dump(this._module)
      throw Error(`name is a required property for extensions`)
    }
  }

  /**
   * @public
   */
  @bind
  public get(key: string): any {
    return this._module[key]
  }

  /**
   * @public
   */
  @bind
  public set(key: string, value: any) {
    this._module[key] = value
  }

  /**
   * @public
   */
  @bind
  public filter(key: string, object: any) {
    return this.app.hooks.filter(
      `extension.${this._module.name}.${key}`,
      object,
    )
  }

  /**
   * Extension module name
   *
   * @public
   */
  public get name(): string {
    return this._module.name
  }
  public set name(name: string) {
    this._module.name = name
  }

  /**
   * Extension module options
   *
   * @public
   */
  public get options() {
    if (isUndefined(this._module.options))
      return this.filter('options', this.app.container({}))

    if (isFunction(this._module.options))
      return this.filter(
        'options',
        this.app.container(this._module.options(this.app)),
      )

    if (this._module.options instanceof Container)
      return this.filter('options', this._module.options)

    return this.filter(
      'options',
      this.app.container(this._module.options),
    )
  }

  /**
   * @public
   */
  public set options(options) {
    if (isFunction(options)) {
      this._module.options = this.options(this.app)
      return
    }

    if (options instanceof Container) {
      this._module.options = options
      return
    }

    this._module.options = this.app.container(options)
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  @bind
  public make() {
    if (this.when === false) return false
    if (!this._module.make && !this._module.apply) return false

    if (this._module.apply) {
      return this._module
    }

    return isFunction(this._module.make)
      ? this._module.make(this.options, this.app)
      : this._module.make
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public get when() {
    if (isUndefined(this._module.when)) return true

    if (isFunction(this._module.when))
      return this._module.when(this.app, this.options)

    return this._module.when
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public set when(when) {
    this._module.when = when
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
  public async register(): Promise<Controller> {
    if (this.registered === true) {
      this.log('warn', this._module.name, 'already registered')
      return this
    }
    this.registered = true

    await this.mixin()

    await this.api()

    if (isFunction(this._module.register))
      await this._module.register(this.app)

    return this
  }

  /**
   * @public
   */
  @bind
  public async api(): Promise<Controller> {
    if (!this._module.api) return this

    const methodMap = isFunction(this._module.api)
      ? this._module.api(this.app)
      : this._module.api

    this.app.bindMethod(methodMap)

    return this
  }

  /**
   * @public
   */
  @bind
  public async mixin(): Promise<this> {
    if (!this._module.mixin) return this

    let classMap
    if (isFunction(this._module.mixin)) {
      classMap = await this._module.mixin(this.app)
    } else {
      classMap = this._module.mixin
    }

    this.app.mixin(classMap)

    Object.entries(classMap).forEach(([k, v]) => {
      this.log(
        'success',
        `${this.app.name}.${k}`,
        'registered by',
        this._module.name,
      )
    })
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
    if (this.booted || !this._module.boot) return this
    this.booted = true

    if (isFunction(this._module.boot)) {
      await this._module.boot(this.app)
      this.log('success', this._module.name)
    }

    return this
  }
}
