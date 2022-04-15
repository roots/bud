import {Extension, Logger, Modules} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud} from './controller.interface'

const {isFunction, isObject, isUndefined} = lodash

/**
 * Extension instance controller
 *
 * @public
 */
export class Controller {
  /** @internal @readonly */
  private readonly _app: () => Bud

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
  public meta: {
    register: boolean
    boot: boolean
  } = {
    register: false,
    boot: false,
  }

  public logger: Logger['instance']

  /**
   * @internal
   */
  public _module: (Extension.Module | Extension.Extension) & {
    logger: Logger['instance']
  }

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(
    _app: Bud,
    extension: Extension.Module | (new () => Extension.Extension),
  ) {
    this._app = () => _app

    if (!extension) {
      this.app.info(this.app.extensions.all())
      this.app.error(`extension controller: missing module`)
    }

    if (isFunction(extension)) {
      this._module = new (extension as any)(() => _app)
    } else this._module = Object.assign(extension, {logger: this.logger})

    this.logger = new Logger(_app).instance.scope(
      this.label ?? '[unknown extension]',
    )

    !this.app.hooks.filter('feature.log') && this.logger.disable()
    this._module.logger = this.logger

    this.logger.success('constructed')
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
  public get label(): `${keyof Modules & string}` {
    return this._module.label
  }

  public set label(label: `${keyof Modules & string}`) {
    this._module.label = label
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
        `extension.${this.label}.options` as any,
        () => this._module.options,
      )
    }

    if (!isObject(this._module.options)) {
      this.app.error(
        `${this.label} options must be an object or Container instance`,
      )
    }

    return this.app.hooks.filter(
      `extension.${this.label as keyof Modules & string}.options` as any,
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
      this.app.error(
        `mutation must be a function that receives a container and returns an object or container`,
      )
    }

    const result = options(this.options)

    if (!(result instanceof Container) || !isObject(result)) {
      this.app.error(`mutation must return an object or container`)
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
      this.app.error(`merged options must be an object or container`)
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
      this.app.error(`[${this.label}] key ${key} does not exist`)
    }

    const optionsContainer = this.options
    optionsContainer.merge(key, options)
    this.options = optionsContainer
  }

  /**
   * Set options
   *
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
      `[${this.label}] options must be a container or an object`,
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
      this.app.error(`key ${key} does not exist`)
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

    if (this._module.apply) return this._module

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
      this.meta.register = true
    }
    if (this.meta.register) return this

    this.meta.register = true

    this.logger.info(`registering`)

    if (this.app.project.has(`project.peers.${this.label}.requires`)) {
      await Promise.all(
        this.app.project
          .get(`project.peers.${this.label}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.register) {
              await this.app.extensions.get(name).register()
            }
          }),
      )
    }

    if (isFunction(this._module.register)) {
      await this._module.register(this.app, this.logger)
    }

    await this.app.api.processQueue()

    this.logger.success(`registered`)

    return this
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
      this.meta.boot = true
      return this
    }
    if (this.meta.boot) return this
    this.meta.boot = true

    this.logger.info(`registering`)

    if (this.app.project.has(`project.peers.${this.label}.requires`)) {
      await Promise.all(
        this.app.project
          .get(`project.peers.${this.label}.requires`)
          .map(async ([name]) => {
            if (!this.app.extensions.get(name).meta.boot) {
              await this.app.extensions.get(name).boot()
            }
          }),
      )
    }

    if (isFunction(this._module.boot)) {
      await this._module.boot(this.app, this.logger)
    }

    await this.app.api.processQueue()

    this.logger.success(`booted`)

    return this
  }
}
