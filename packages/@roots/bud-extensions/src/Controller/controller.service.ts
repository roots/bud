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
  public module: Extension | Plugin

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(_app: Framework, module: Extension) {
    this._app = () => _app
    this.module = module

    if (!this.module) {
      this.app.error(this.name, 'module not found')
    }
  }

  @bind
  public get(key: string): any {
    return this.module[key]
  }

  /**
   * Overwrite
   */
  @bind
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
   * @public
   */
  @bind
  public filter(key, object) {
    return this.app.hooks.filter(
      `extension.${this.name}.${key}`,
      object,
    )
  }

  /**
   * Extension module options
   *
   * @public
   */
  public get options() {
    if (isUndefined(this.module.options))
      return this.filter('options', this.app.container({}))

    if (isFunction(this.module.options))
      return this.filter(
        'options',
        this.app.container(this.module.options(this.app)),
      )

    if (this.module.options instanceof Container)
      return this.filter('options', this.module.options)

    return this.filter(
      'options',
      this.app.container(this.module.options),
    )
  }

  public set options(options) {
    if (isFunction(options)) {
      this.module.options = this.options(this.app)
      return
    }

    if (options instanceof Container) {
      this.module.options = options
      return
    }

    this.module.options = this.app.container(options)
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  @bind
  public make() {
    if (this.when === false) return false
    if (!this.module.make && !this.module.apply) return false

    if (this.module.apply) {
      return this.module
    }

    return this.module.make(this.options, this.app)
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public get when() {
    if (isUndefined(this.module.when)) return true

    if (isFunction(this.module.when))
      return this.module.when(this.app, this.options)

    return this.module.when
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
  public async register(): Promise<Controller> {
    if (this.registered === true) {
      this.app.warn(this.name, 'already registered')
      return this
    }
    this.registered = true

    await this.mixin()

    await this.api()

    if (isFunction(this.module.register))
      await this.module.register(this.app)

    this.app.success(this.name, 'registered')
    return this
  }

  @bind
  public async api(): Promise<Controller> {
    if (isUndefined(this.module.api)) return this

    const methodMap = isFunction(this.module.api)
      ? this.module.api(this.app)
      : this.module.api

    this.app.bindMethod(methodMap)

    return this
  }

  @bind
  public async mixin(): Promise<this> {
    if (isUndefined(this.module.mixin)) return this
    this.app.info(this.name, 'mixin found')

    const classMap = isFunction(this.module.mixin)
      ? await this.module.mixin(this.app)
      : this.module.mixin

    this.app.mixin(classMap)

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
    this.booted = true

    await this.module.boot(this.app)
    this.app.success(this.name)

    return this
  }
}
