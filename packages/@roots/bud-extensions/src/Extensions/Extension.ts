import {lodash as _} from '@roots/bud-support'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {isBoolean, isEmpty, isFunction} from 'lodash'

/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 */
export default class {
  /**
   * Module
   */
  public module: Module

  /**
   * App.
   */
  public app: Framework

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
    this.app = app
    this.module = extension

    this.register = this.register.bind(this)
    this.boot = this.boot.bind(this)
    this.install = this.install.bind(this)
    this.make = this.make.bind(this)

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

    this.module.api &&
      Object.assign(this.app, this.app.access(this.module.api))

    this.module.publish &&
      this.app.publish(
        this.app.access<{[key: string]: any}>(
          this.module.publish,
        ),
      )

    this.app.publish(
      {
        [`extension/${this.module.name}/options`]: () =>
          this.app.access(this.module.options),
      },
      '@roots/bud-extensions',
    )

    this.app.store.enabled('options.install') && this.install()

    this.logger
      .scope(this.module.name)
      .success('Extension registered')

    return this
  }

  /**
   * Boot extension.
   */
  public boot(): this {
    this.module.boot && this.app.access(this.module.boot)

    this.logger
      .scope(this.module.name)
      .success('Extension booted')

    return this
  }

  /**
   * Install package dependencies
   */
  public install(): void {
    /**
     * Production dependencies
     */
    this.module.dependencies &&
      !isEmpty(this.module.dependencies) &&
      this.app.dependencies.install(
        this.app.access(this.module.dependencies),
        this.module.name,
      )

    /**
     * Development dependencies
     */
    this.module.devDependencies &&
      !isEmpty(this.module.devDependencies) &&
      this.app.dependencies.installDev(
        this.app.access(this.module.devDependencies),
        this.module.name,
      )
  }

  /**
   * module.options getter
   */
  public get options() {
    this.logger.log(
      `Extension options queried: ${this.module.name}`,
      this.app.subscribe(
        `extension/${this.module.name}/options`,
      ),
    )

    return this.app.container(
      this.app.subscribe(
        `extension/${this.module.name}/options`,
      ),
    )
  }

  /**
   * Make plugin.
   */
  public make() {
    if (!this.module.make) return

    const when = isFunction(this.module.when)
      ? this.module.when(this.app, this.options)
      : isBoolean(this.module.when)
      ? this.module.when
      : true

    if (when == false) {
      return
    }

    return this.module.make(this.options, this.app)
  }
}
