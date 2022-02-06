import {Extension, Framework} from '@roots/bud-framework'
import {bind, chalk, lodash, Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

const {isFunction, isObject, isUndefined} = lodash

export type LifecycleMethod = 'register' | 'boot' | 'api' | 'mixin'

export interface ControllerMeta {
  instance: string
  peers: Array<string>
  called: {
    api: boolean
    mixin: boolean
    register: boolean
    boot: boolean
  }
}

/**
 * Extension.Module instance controller
 *
 * @public
 */
export class Controller {
  /* @internal */
  private _app: () => Framework

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
  public meta: ControllerMeta = {
    instance: null,
    peers: [],
    called: {
      api: false,
      mixin: false,
      register: false,
      boot: false,
    },
  }

  /**
   * @public
   */
  public module: Extension.Module = {}

  /**
   * @public
   */
  public get logger(): Signale {
    let logger = new Signale().scope(
      ...this.app.logger.context,
      this.module.name,
    )
    this.app.store.is('features.log', false) && logger.disable()

    return logger
  }

  /**
   * Controller constructor
   *
   * @public
   */
  public constructor(
    _app: Framework,
    extension: Extension.Module,
    peers?: string[],
  ) {
    this._app = () => _app
    this.meta.instance = this.app.name
    this.meta.peers = peers ?? []

    if (!extension) {
      throw Error(`extension controller constructor: missing module`)
    }

    if (extension.options) {
      extension.options = this.app.container(
        this.app.maybeCall(extension.options),
      )
    }

    this.module = extension
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public get(key: string): any {
    return this.module[key]
  }

  /**
   * @public
   * @decorator `@bind`
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
   * Extension module options
   *
   * @public
   */
  public get options() {
    if (isUndefined(this.module.options)) {
      return this.app.container()
    }

    if (isFunction(this.module.options)) {
      return this.app.container(this.module.options(this.app))
    }

    if (this.module.options instanceof Container) {
      return this.app.hooks.filter(
        `extension.${this.module.name}.options`,
        () => this.module.options,
      )
    }

    if (!isObject(this.module.options))
      throw new Error(
        `${this.name} options must be an object or Container instance`,
      )

    return this.app.hooks.filter(
      `extension.${this.module.name}.options`,
      () => this.app.container(this.module.options),
    )
  }

  /**
   * @public
   */
  public set options(options) {
    this.module.options = options
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
    throw new Error(
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
  public getOption(key: string) {
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
    if (!this.module.make && !this.module.apply) return false

    if (this.module.apply) {
      return this.module
    }

    if (!this.options.isEmpty())
      this.app.dump(this.options.all(), {
        prefix: `${chalk.bgBlue(`${this.app.name}`)} ${
          this.name
        } ctor options`,
      })

    return isFunction(this.module.make)
      ? this.module.make(this.options, this.app)
      : this.module.make
  }

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  public get when() {
    if (isUndefined(this.module.when)) return true
    if (isFunction(this.module.when))
      return this.module.when(this.app, this.module.options)

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
   * @public
   * @decorator `@bind`
   */
  @bind
  public async prepMethodCall(fn: LifecycleMethod): Promise<Controller> {
    if (this.meta.called[fn]) return this
    this.meta.called[fn] = true

    if (this.meta.peers.length) {
      await Promise.all(
        this.meta.peers.map(async name => {
          const req = this.app.extensions.get(name)
          if (req[fn] && isFunction(req[fn]) && !req.meta?.called[fn])
            await req[fn](this.app, this.logger)
        }),
      )
    }

    return this
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
    if (!this.module.register) return this
    ;(await this.prepMethodCall('register')).module.register(
      this.app,
      this.logger,
    )
    return this
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
  public async boot(): Promise<Controller> {
    if (!this.module.boot) return this
    ;(await this.prepMethodCall('boot')).module.boot(this.app, this.logger)
    return this
  }

  /**
   * {@link Extension.api} registers functions
   * and facades to Bud properties
   *
   * @remarks
   * Calls the {@link Extension} callback
   *
   * @public
   */
  @bind
  public async api(): Promise<Controller> {
    if (!this.module.api) return this
    await this.prepMethodCall('api')

    const methodMap = isFunction(this.module.api)
      ? await this.module.api(this.app)
      : this.module.api

    this.logger.log(methodMap)

    Object.entries(methodMap).forEach(([name, method]) => {
      this.app.api.set(name, method.bind ? method.bind(this.app) : method)
      this.app.api.bindFacade(name)
    })

    return this
  }

  /**
   * @public
   */
  @bind
  public async mixin(): Promise<this> {
    if (!this.module.mixin) return this
    await this.prepMethodCall('mixin')

    const classMap: Record<string, any> = isFunction(this.module.mixin)
      ? await this.module.mixin(this.app)
      : this.module.mixin

    this.app.mixin(classMap)

    Object.entries(classMap).forEach(([k, v]) => {
      this.logger.success(`registered ${this.app.name}.${k}`)
    })

    return this
  }
}
