import {lodash as _} from '@roots/bud-support'
import {Framework, Hooks, Module} from '@roots/bud-framework'
import {isEmpty, isFunction} from 'lodash'

type ModuleKey = `${keyof Module & string}`

/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export default class {
  /**
   * Accessor stores
   */
  protected _module: Module
  protected _app: Framework['get']

  /**
   * Module
   */
  public get module(): Module {
    return this.app.access(this._module)
  }

  /**
   * App
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Logging
   */
  public get logger() {
    return this.app.extensions.logger
  }

  /**
   * Constructor.
   */
  public constructor(app: Framework, extension: Module) {
    this._app = app.get
    this._module = extension

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.makeKey = this.makeKey.bind(this)
    this.register = this.register.bind(this)
    this.boot = this.boot.bind(this)
    this.install = this.install.bind(this)

    this.logger
      .scope(this.module.name)
      .success('Extension instantiated')
  }

  /**
   * Register extension
   */
  public register(): this {
    if (this.module.register) {
      this.app.access(this.module.register)

      this.app.extensions.log(`Register method found`)
    }

    if (this.module.api) {
      Object.assign(this.app, this.app.access(this.module.api))
    }

    if (this.module.publish) {
      this.app.publish(
        this.app.access<{[key: string]: any}>(
          this.module.publish,
        ),
      )
    }

    if (this.module.options) {
      this.set('options', () => this.module.options)
    }

    if (this.module.dependencies) {
      this.set('dependencies', () => this.module.dependencies)
    }

    if (this.module.devDependencies) {
      this.set(
        'devDependencies',
        () => this.module.devDependencies,
      )
    }

    if (this.module.when) {
      this.set('when', () => this.module.when)
    }

    if (this.module.make) {
      this.set('make', () => this.module.make)
    }

    this.app.store.enabled('options.install') && this.install()
    this.logger.scope(this.name).success('Extension registered')

    return this
  }

  /**
   * Boot extension.
   */
  public boot(): this {
    this.module.boot && this.app.access(this.module.boot)
    this.logger.scope(this.name).success('Extension booted')

    return this
  }

  /**
   * Install package dependencies
   */
  public install(): void {
    /**
     * Production dependencies
     */
    this.dependencies &&
      !isEmpty(this.dependencies) &&
      this.app.dependencies.install(this.dependencies, this.name)

    /**
     * Development dependencies
     */
    this.devDependencies &&
      !isEmpty(this.devDependencies) &&
      this.app.dependencies.installDev(
        this.devDependencies,
        this.name,
      )
  }

  /**
   * Make hook key from module property
   */
  public makeKey(key: ModuleKey): Framework.Hooks.Name {
    return `extension/${this.name}/${key}` as Framework.Hooks.Name
  }

  /**
   * Get module properties (hooked)
   */
  public get(key: ModuleKey) {
    const hook = this.makeKey(key)
    const value = this.app.subscribe(hook, this.name)

    this.logger.log({
      message: `get ${hook}: ${value}`,
    })

    return value
  }

  /**
   * Set module properties (hooked)
   */
  public set(key: ModuleKey, value: any) {
    const hook = this.makeKey(key)

    this.app.publish({[hook]: value}, this.name)

    this.logger.log({
      message: `set ${hook}: ${value}`,
    })
  }

  /**
   * Name
   */
  public get name(): keyof Hooks.Extension.Definitions {
    return this.module.name
  }

  /**
   * Options
   */
  public get options() {
    return this.app.access(this.get('options'))
  }

  public set options(options: Module['options']) {
    this.set('options', options)
  }

  /**
   * Dependencies
   */
  public get dependencies() {
    return this.app.access(this.get('dependencies'))
  }

  public set dependencies(dependencies: Module['dependencies']) {
    this.set('dependencies', dependencies)
  }

  /**
   * Development Dependencies
   */
  public get devDependencies() {
    return this.app.access(this.get('devDependencies'))
  }

  public set devDependencies(
    devDependencies: Module['devDependencies'],
  ) {
    this.set('devDependencies', devDependencies)
  }

  /**
   * When
   */
  public get when() {
    const value = this.get('when')

    if (isFunction(value)) {
      return value(this.app, this.app.container(this.options))
    }

    return value
  }

  public set when(when: Module['when']) {
    this.set('when', when)
  }

  /**
   * Make
   */
  public get make() {
    const when = this.when

    if (when == false) {
      const hook = this.makeKey('make')

      this.logger.log({
        message: `${hook} not set for inclusion. skipping.`,
        affix: this.when,
      })

      return
    }

    const value = this.get('make')

    if (!value) {
      return
    }

    if (isFunction(value)) {
      return value(
        this.options
          ? this.app.container(this.options)
          : this.app.container({}),
        this.app,
      )
    }

    return value
  }

  public set make(make: Module['make']) {
    this.set('make', make)
  }
}
