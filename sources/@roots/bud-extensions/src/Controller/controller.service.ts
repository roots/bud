import {Modules} from '@roots/bud-framework'
import {Container} from '@roots/container'

import {
  bind,
  chalk,
  isFunction,
  isObject,
  isUndefined,
  omit,
} from './controller.dependencies'
import {Extension, Framework, Plugin} from './controller.interface'

/**
 * Extension instance controller
 *
 * @public
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
    bound: boolean
    mixed: boolean
    registered: boolean
    booted: boolean
  } = {
    instance: null,
    bound: false,
    mixed: false,
    registered: false,
    booted: false,
  }

  public log(...messages: any[]) {
    this.app.log(`[${this.name}]`, ...messages)
  }

  /**
   * @internal
   */
  public _module: Extension | Plugin = {}

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(_app: Framework, extension: Extension) {
    this._app = () => _app
    this.log = this.app.log
    this.meta.instance = this.app.name

    if (!extension) {
      throw Error(`extension controller constructor: missing module`)
    }

    if (!extension.name) {
      this.app.dump(extension)
      throw Error(`name is a required property for extensions`)
    }

    this.name = extension.name
    this.options = extension.options

    Object.assign(this._module, omit(extension, ['name', 'options']))
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public get(key: string): any {
    return this._module[key]
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public set(key: string, value: any) {
    this._module[key] = value
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
    if (isUndefined(this._module.options)) {
      return this.app.container()
    }

    if (isFunction(this._module.options)) {
      return this.app.container(this._module.options(this.app))
    }

    if (this._module.options instanceof Container) {
      return this.app.hooks.filter(
        `extension.${this._module.name as keyof Modules & string}.options`,
        () => this._module.options,
      )
    }

    if (!isObject(this._module.options))
      throw new Error(
        `${this.name} options must be an object or Container instance`,
      )

    return this.app.hooks.filter(
      `extension.${this._module.name as keyof Modules & string}.options`,
      () => this.app.container(this._module.options),
    )
  }

  /**
   * @public
   */
  public set options(options) {
    this._module.options = options
  }

  /**
   * Mutate options
   *
   * @remarks
   * mutation fn receives a container of existing options and returns
   * an object or container of mutated options
   *
   * @param options - mutation fn
   * @public
   */
  @bind
  public mutateOptions(options) {
    if (!isFunction(options)) {
      throw new Error(
        `mutation must be a function that receives a container and returns an object or container`,
      )
    }

    const result = options(this.options)

    if (!(result instanceof Container) || !isObject(result)) {
      throw new Error(`mutation must return an object or container`)
    }

    this.options = result
  }

  /**
   * Merge options
   *
   * @remarks
   * Supplied options must be an object or container of options to merge
   *
   * @param options - options to merge
   * @public
   */
  @bind
  public mergeOptions(options) {
    if (options instanceof Container) {
      const optionsContainer = this.options
      optionsContainer.mergeStore(options.all())
      this.options = optionsContainer
    }

    if (!isObject(options)) {
      throw new Error(`merged options must be an object or container`)
    }

    const optionsContainer = this.options
    optionsContainer.mergeStore(options)
    this.options = optionsContainer
  }

  /**
   * Merge option
   *
   * @remarks
   * Supplied options must be an object or container of options to merge
   *
   * @param key - option key
   * @param options - value to merge
   * @public
   */
  @bind
  public mergeOption(key, options) {
    if (!this.options.has(key)) {
      this.app.error(`[${this.name}] key ${key} does not exist`)
      throw new Error(`[${this.name}] key ${key} does not exist`)
    }

    const optionsContainer = this.options
    optionsContainer.merge(key, options)
    this.options = optionsContainer
  }

  /**
   * Set an extension option
   *
   * @param key - option key
   * @param value - options value
   * @public
   */
  @bind
  public setOptions(value): Controller {
    if (value instanceof Container) {
      this.options = value
      return this
    }

    if (isObject(value)) {
      this.options = this.app.container(value)
      return this
    }

    this.app.error(
      `[${this.name}] options must be a container or an object`,
    )
  }

  /**
   * Set an extension option
   *
   * @param key - option key
   * @param value - options value
   * @public
   */
  @bind
  public setOption(key, value) {
    const optionsContainer = this.options
    optionsContainer.set(key, value)
    this.options = optionsContainer
  }

  /**
   * Get an extension option
   *
   * @param key - option key
   * @public
   */
  @bind
  public getOption(key) {
    if (!this.options.has(key)) {
      throw new Error(`key ${key} does not exist`)
    }

    return this.options.get(key)
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
    if (!this._module.register) {
      this.meta.registered = true
      return this
    }
    if (this.meta.registered) return this
    this.meta.registered = true

    this.app.project.has(`project.peers.${this.name}.requires`) &&
      (await Promise.all(
        this.app.project
          .get(`project.peers.${this.name}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.registered) {
              await this.app.extensions.get(name).register()
            }
          }),
      ))

    await this.mixin()
    await this.api()

    if (isFunction(this._module.register)) {
      await this._module.register(this.app, this.app.logger.instance)

      await this.app.api.processQueue()

      this.log({
        message: `register called`,
        suffix: chalk.dim`${this.name}`,
      })
    }

    return this
  }

  /**
   * @public
   */
  @bind
  public async api(): Promise<Controller> {
    if (!this._module.api) {
      this.meta.bound = true
      return this
    }
    if (this.meta.bound) return this
    this.meta.bound = true
    this.app.project.has(`project.peers.${this.name}.requires`) &&
      (await Promise.all(
        this.app.project
          .get(`project.peers.${this.name}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.bound) {
              await this.app.extensions.get(name).api()
            }
          }),
      ))

    const methodMap: Record<string, CallableFunction> = isFunction(
      this._module.api,
    )
      ? await this._module.api(this.app)
      : this._module.api

    if (!isObject(methodMap))
      throw new Error(
        `${this.name}] api must be an object or return an object`,
      )

    Object.entries(methodMap).forEach(([name, method]) => {
      if (!isFunction(method))
        throw new Error(`${name} must be a function`)

      this.app.api.set(name, method.bind ? method.bind(this.app) : method)

      this.app.api.bindFacade(name)

      if (isUndefined(this.app[name]) || !isFunction(this.app[name]))
        throw new Error(
          `there was a problem binding the ${name} fn to bud (${this.name})`,
        )
    })

    return this
  }

  /**
   * @public
   */
  @bind
  public async mixin(): Promise<this> {
    if (!this._module.mixin) {
      this.meta.mixed = true
      return this
    }
    if (this.meta.mixed) return this
    this.meta.mixed = true
    this.app.project.has(`project.peers.${this.name}.requires`) &&
      (await Promise.all(
        this.app.project
          .get(`project.peers.${this.name}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.mixed) {
              await this.app.extensions.get(name).mixin()
            }
          }),
      ))

    let classMap: Record<string, any>

    if (isFunction(this._module.mixin)) {
      classMap = await this._module.mixin(this.app)
    } else {
      classMap = this._module.mixin
    }

    if (!isObject(classMap)) return

    this.app.mixin(classMap)

    Object.entries(classMap).forEach(([k, v]) => {
      this.log({
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
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<this> {
    if (!this._module.boot) {
      this.meta.booted = true
      return this
    }
    if (this.meta.booted) return this
    this.meta.booted = true
    this.app.project.has(`project.peers.${this.name}.requires`) &&
      (await Promise.all(
        this.app.project
          .get(`project.peers.${this.name}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.boot) {
              await this.app.extensions.get(name).boot()
            }
          }),
      ))

    if (isFunction(this._module.boot)) {
      await this._module.boot(this.app, this.app.logger.instance)

      await this.app.api.processQueue()

      this.log({message: `${this.name} booted`})
    }

    return this
  }
}
