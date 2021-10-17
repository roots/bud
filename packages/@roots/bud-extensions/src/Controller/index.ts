import {
  Extension,
  Framework,
  Hooks,
  Modules,
  Plugins,
} from '@roots/bud-framework'

import {bind, isFunction} from './controller.dependencies'

/**
 * Extension instance controller
 *
 * @public @core
 */
export default class Controller implements Extension.Controller {
  /**
   * @internal
   */
  protected _module: Extension.Module | Extension.CompilerPlugin

  /**
   * @internal
   */
  protected _app: () => Framework

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin}
   *
   * @public @readonly
   */
  public get module(): Extension.Module {
    return this.app.access(this._module)
  }

  /**
   * The {@link @roots/bud-framework#Framework | Framework instance}
   *
   * @public @readonly
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} name
   *
   * @public @readonly
   */
  public get name():
    | (keyof Plugins & string)
    | (keyof Modules & string) {
    return this.module.name
  }

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} options
   *
   * @public
   */
  public get options() {
    return this.app.access(this.get('options'))
  }
  public set options(options: Extension.Module['options']) {
    this.set('options', options)
  }

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `when` property
   *
   * @public
   */
  public get when() {
    if (isFunction(this.get('when'))) {
      return this.get('when')(
        this.app,
        this.app.container(this.options),
      )
    }

    return this.get('when')
  }
  public set when(when: Extension.Module['when']) {
    this.set('when', when)
  }

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `when` property
   *
   * @public
   */
  public get make() {
    if (this.when == false || !this.get('make')) return

    if (isFunction(this.get('make'))) {
      return this.get('make')(
        this.options
          ? this.app.container(this.options)
          : this.app.container({}),
        this.app,
      )
    }

    return this.get('make')
  }
  public set make(make: Extension.CompilerPlugin['make']) {
    this.set('make', make)
  }

  /**
   * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `apply` property
   *
   * @public @readonly
   */
  public get apply() {
    if (this.when == false || !this.get('apply'))
      return undefined

    if (isFunction(this.get('apply'))) {
      return this.get('apply')
    }

    return undefined
  }

  /**
   * The class constructor
   *
   * @param app - The {@link @roots/bud-framework#Framework | Framework instance}
   * @param extension - The {@link @roots/bud-framework#Module | Module instance}
   */
  public constructor(
    app: Framework,
    extension: Extension.Module,
  ) {
    this._app = () => app
    this._module = extension
  }

  /**
   * Make a {@link @roots/bud-hooks#Hooks | Hooks} key from a {@link Extension.name}
   *
   * @remarks
   * This key must be registered with {@link @roots/bud-framework#Framework.Hooks | Framework.Hooks}
   *
   * @param key - The {@link Extension.name}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeKey(
    key: `${
      | (keyof Plugins & string)
      | (keyof Modules & string)}`,
  ): Hooks.Name {
    return `extension/${String(this.name)}/${key}` as Hooks.Name
  }

  /**
   * Get a {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} property value
   * after it has been passed through any {@link @roots/bud-framework#Hooks.filter | filter callbacks}
   *
   * @param key - The {@link Extension.name}
   *
   * @filter
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public get(
    key: `${
      | (keyof Plugins & string)
      | (keyof Modules & string)}`,
  ) {
    const hook = this.makeKey(key)
    const value = this.app.hooks.filter(hook)

    return value
  }

  /**
   * Set a {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} property value
   * after passing it through any {@link @roots/bud-framework#Hooks.on | hooks callbacks}
   *
   * @param key - The {@link Extension.name}
   * @param value - The new value
   *
   * @hook
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set(
    key: `${
      | (keyof Plugins & string)
      | (keyof Modules & string)}`,
    value: any,
  ) {
    this.app.hooks.on(this.makeKey(key), value)
  }

  /**
   * Extension registration event
   *
   * @remarks
   * Calls the {@link @roots/bud-framework#Module.register} callback
   *
   * @returns {@link Extension}
   *
   * @public @core
   * @decorator `@bind`
   */
  @bind
  public register(): Controller {
    this.app.when(this.module.options as any, () =>
      this.set('options', () => this.module.options),
    )

    this.app.when(this.module.hasOwnProperty('api'), () => {
      Object.assign(
        this.app,
        isFunction(this.module.api)
          ? this.module.api(this.app)
          : this.module.api,
      )
    })

    this.app.when(this.module.register as any, () => {
      this.module.register(this.app)
    })

    this.set('when', () => this.module.when)
    this.set('make', () => this.module.make)

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
  public boot(): Controller {
    this.app.when(this.module.boot as any, () => {
      this.module.boot(this.app)
    })

    return this
  }
}
