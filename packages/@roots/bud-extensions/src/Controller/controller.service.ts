import {Service} from '@roots/bud-framework'
import {Container} from '@roots/container'

import {
  bind,
  chalk,
  isFunction,
  isObject,
  isUndefined,
  Signale,
} from './controller.dependencies'
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
   * @public
   */
  public meta: {
    instance: string
    registered: boolean
    booted: boolean
  } = {
    instance: null,
    registered: false,
    booted: false,
  }

  public get moduleLogger(): Signale {
    return this.app.extensions.logger
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

  /**
   * @public
   */
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
    this.meta.instance = this.app.name

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

    const options = this.app.maybeCall(this._module.options)

    if (isUndefined(options))
      return this.filter('options', this.app.container({}))

    if (options instanceof Container)
      return this.filter('options', options)

    if (!isObject(options))
      throw new Error(
        `${this.name} options must be an object or Container instance`,
      )

    return this.filter('options', this.app.container(options))
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

    if (!this.options.isEmpty())
      this.app.dump(this.options.all(), {
        prefix: `${chalk.bgBlue(`${this.app.name}`)} ${
          this.name
        } ctor options`,
      })

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
    if (this.meta.registered === true) {
      this.log('warn', this._module.name, 'already registered')
      return this
    }
    this.meta.registered = true

    await this.mixin()
    await this.api()

    if (isFunction(this._module.register))
      await this._module.register(this.app, this.moduleLogger)

    this.moduleLogger.success({
      message: `register called`,
      suffix: chalk.dim`${this.name}`,
    })

    return this
  }

  /**
   * @public
   */
  @bind
  public async api(): Promise<Controller> {
    if (!this._module.api) return this

    const methodMap: Record<string, CallableFunction> =
      isFunction(this._module.api)
        ? await this._module.api(this.app)
        : this._module.api

    await this.app.api.processQueue()

    if (!isObject(methodMap))
      throw new Error(
        `${this.name}] api must be an object or return an object`,
      )

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

    if (!isObject(classMap)) return

    this.app.mixin(classMap)

    Object.entries(classMap).forEach(([k, v]) => {
      this.moduleLogger.success({
        message: `registered ${this.app.name}.${k}`,
        suffix: chalk.dim`${this.name}`,
      })
    })
  }

  /**
   * Extension boot event
   *
   * @remarks
   * Calls the {@link @roots/bud-framework#Module.boot} callback
   *
   * @public @core
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<this> {
    if (this.meta.booted || !this._module.boot) return this
    this.meta.booted = true

    if (isFunction(this._module.boot)) {
      await this._module.boot(this.app, this.moduleLogger)

      this.moduleLogger.success({
        message: `${this.name} booted`,
      })
    }

    return this
  }
}
