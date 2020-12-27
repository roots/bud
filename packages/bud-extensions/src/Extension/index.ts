import {
  Framework,
  Extension,
  Module,
  Index,
  MaybeCallable,
} from '@roots/bud-typings'
import {
  ServiceContainer,
  isArray,
  isFunction,
} from '@roots/bud-support'

/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export default class
  extends ServiceContainer<Framework>
  implements Extension {
  /**
   * Flag tracking if the controlled extension has
   * been initialized
   */
  public initialized = false

  /**
   * The controlled extension
   */
  public module: Module

  /**
   * Initialize extension.
   */
  public init(): void {
    this.callMeMaybe = this.callMeMaybe.bind(this)
    this.setBuilders = this.setBuilders.bind(this)

    this.hasProp('module.register') &&
      this.module.register(this.app)

    this.hasProp('module.options') &&
      this.setOptions(this.module.options)

    this.hasProp('module.api') && this.setApp(this.module.api)

    this.setBuilders([
      [
        'registerLoader',
        this.app.build.setLoader.bind(this.app.build),
      ],
      [
        'registerLoaders',
        this.app.build.setLoader.bind(this.app.build),
      ],
      [
        'registerItem',
        this.app.build.setItem.bind(this.app.build),
      ],
      [
        'registerItems',
        this.app.build.setItem.bind(this.app.build),
      ],
      [
        'registerRule',
        this.app.build.setRule.bind(this.app.build),
      ],
      [
        'registerRules',
        this.app.build.setRule.bind(this.app.build),
      ],
    ])

    this.hasProp('module.boot') && this.module.boot(this.app)
  }

  public fromProp(
    prop: string,
    dep?: unknown[],
  ): [string, unknown] {
    return this.callMeMaybe(this.module[prop], ...dep)
  }

  public callMeMaybe<T = any>(
    value: CallableFunction | any,
    ...args: unknown[]
  ): T {
    return isFunction(value) ? value(...args) : value
  }

  /**
   * Make plugin.
   */
  public makePlugin(): MaybeCallable<any> | boolean {
    return this.isPlugin() && this.isPluginEnabled()
      ? this.callMeMaybe(this.module.make, this, this.app)
      : false
  }

  /**
   * Is this extension a plugin?
   */
  public isPlugin(): boolean {
    return this.hasProp(`module.make`)
  }

  /**
   * Is plugin enabled?
   */
  public isPluginEnabled(): boolean {
    return !this.hasProp(`module.when`)
      ? true
      : this.callMeMaybe(this.module.when, this.app, this)
  }

  /**
   * ## extension.setApi
   */
  public setApp(set: Index<any>): void {
    Object.assign(this.app, this.callMeMaybe(set, this.app))
  }

  /**
   * ## extension.setOptions
   *
   * Set extension instance options.
   *
   * ```js
   * this.app.extensions.get('my-extension').setOptions({
   *   optionalValue: true,
   * })
   * ```
   */
  public setOptions(options: Index<any>): void {
    this.setStore(this.callMeMaybe(options, this.app))
  }

  /**
   * ## extension.setBuilders
   */
  public setBuilders(
    builders: [string, CallableFunction][],
  ): void {
    builders.map(([name, handler]) => {
      if (!this.hasProp(`module.${name}`)) return

      isArray(this.fromProp(name, [this.app]))
        ? handler(
            ...(this.fromProp(name, [this.app]) as [
              string,
              unknown,
            ]),
          )
        : Object.entries(this.fromProp(name, [this.app])).map(
            ([k, v]) => {
              handler(k, this.callMeMaybe(v, this.app))
            },
          )
    })
  }
}
