import {Container} from '@roots/container'
import {isArray, isFunction} from 'lodash'

import type {Bud, Index, Webpack} from '@roots/bud-typings'
import type {Module} from './Module'

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
class Extension extends Container {
  /**
   * Bud reference
   */
  public bud: Bud.Ref

  /**
   * Flag tracking if the controlled extension has
   * been initialized
   */
  public initialized = false

  /**
   * The controlled extension
   */
  public module: Extension.Module

  /**
   * Builders.
   */
  public builders: [string, CallableFunction][]

  /**
   * Class constructor.
   */
  constructor(bud: Bud, extension: Extension.Module) {
    super({})

    this.bud = bud.get

    this.module = extension

    this.register = this.register.bind(this)

    this.initialize = this.initialize.bind(this)

    this.callMeMaybe = this.callMeMaybe.bind(this)

    this.setBuilders = this.setBuilders.bind(this)

    this.builders = [
      ['registerLoader', bud.build.setLoader.bind(bud.build)],
      ['registerLoaders', bud.build.setLoader.bind(bud.build)],
      ['registerItem', bud.build.setItem.bind(bud.build)],
      ['registerItems', bud.build.setItem.bind(bud.build)],
      ['registerRule', bud.build.setRule.bind(bud.build)],
      ['registerRules', bud.build.setRule.bind(bud.build)],
    ]
  }

  /**
   * Initialize extension.
   */
  public initialize = function (): Extension.Module {
    this.module.register && this.register()

    this.module.options && this.setOptions(this.module.options)

    this.setApi()

    this.setBuilders(this.builders)

    this.boot()

    return this
  }

  public callMeMaybe: (
    value: CallableFunction | any,
    ...args: unknown[]
  ) => unknown = function (value, ...args) {
    return isFunction(value) ? value(...args) : value
  }

  public fromProp: (
    prop: string,
    dep?: unknown[],
  ) => [string, unknown] = function (prop, ...dep) {
    return this.callMeMaybe(this.module[prop], ...dep)
  }

  public hasProp = function (name: string): boolean {
    return this.module[name] ? true : false
  }

  public register = function (): void {
    this.module.register && this.module.register(this.bud())
  }

  public boot = function (): void {
    this.module.boot && this.module.boot(this.bud())
  }

  public makePlugin = function (): Webpack.Plugin {
    return this.isPlugin() && this.isPluginEnabled()
      ? this.callMeMaybe(this.module.make, this, this.bud())
      : false
  }

  public isPlugin = function (): boolean {
    return this.module.make ? true : false
  }

  public isPluginEnabled = function (): boolean {
    return !this.module.when
      ? true
      : this.callMeMaybe(this.module.when, this.bud(), this)
  }

  /**
   * ## extension.setApi
   */
  public setApi = function (): void {
    this.module.api &&
      Object.assign(
        this.bud(),
        this.callMeMaybe(this.module.api, this.bud()),
      )
  }

  /**
   * ## extension.setOptions
   *
   * Set extension instance options.
   *
   * ```js
   * bud.extensions.get('my-extension').setOptions({
   *   optionalValue: true,
   * })
   * ```
   */
  public setOptions = function (options: Index<any>): void {
    this.setStore(this.callMeMaybe(options, this.bud()))
  }

  /**
   * ## extension.getOptions
   *
   * Get extension instance options.
   *
   * ```js
   * bud.extensions.get('my-extension').getOptions()
   * ```
   */
  public getOptions = function (): Container {
    return this.repository
  }

  /**
   * ## extension.setBuilders
   */
  public setBuilders = function (
    builders: [string, CallableFunction][],
  ): void {
    builders.map(([name, handler]) => {
      if (!this.hasProp(name)) return

      isArray(this.fromProp(name, this.bud()))
        ? handler(
            ...(this.fromProp(name, this.bud()) as [
              string,
              unknown,
            ]),
          )
        : Object.entries(this.fromProp(name, this.bud())).map(
            ([k, v]) => {
              handler(k, this.callMeMaybe(v, this.bud()))
            },
          )
    })
  }
}

declare namespace Extension {
  export {Module}
}

export {Extension}
