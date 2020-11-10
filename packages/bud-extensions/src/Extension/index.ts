import {Bud, Build, Rule, Item} from '@roots/bud-typings'
import * as Webpack from 'webpack'
import {Indexed} from '@roots/container'
import {isArray, isFunction} from 'lodash'

export {Extension}

class Extension extends Indexed implements Extension.Controller {
  public bud: Bud

  public initialized = false

  public module: Extension.Interface

  public builders: [string, CallableFunction][]

  constructor(bud: Bud, extension: Extension.Interface) {
    super({})

    this.bud = bud
    this.module = extension

    this.register = this.register.bind(this)
    this.initialize = this.initialize.bind(this)
    this.callMeMaybe = this.callMeMaybe.bind(this)
    this.setBuilders = this.setBuilders.bind(this)

    this.builders = [
      [
        'registerLoader',
        this.bud.build.setLoader.bind(this.bud.build),
      ],
      [
        'registerLoaders',
        this.bud.build.setLoader.bind(this.bud.build),
      ],
      [
        'registerItem',
        this.bud.build.setItem.bind(this.bud.build),
      ],
      [
        'registerItems',
        this.bud.build.setItem.bind(this.bud.build),
      ],
      [
        'registerRule',
        this.bud.build.setRule.bind(this.bud.build),
      ],
      [
        'registerRules',
        this.bud.build.setRule.bind(this.bud.build),
      ],
    ]
  }

  public initialize = function (): Extension.Interface {
    this.module.register && this.register()

    this.module.options && this.setOptions()

    this.setApi()

    this.setBuilders(this.builders)

    this.boot()

    return this
  }

  public callMeMaybe: (
    value: unknown,
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

  public hasModuleProp = function (name: string): boolean {
    return this.module[name] ? true : false
  }

  public register = function (this: Extension.Controller): void {
    this.module.register && this.module.register(this.bud)
  }

  public boot = function (): void {
    this.module.boot && this.module.boot(this.bud)
  }

  public makePlugin = function (): Webpack.Plugin {
    return this.isPlugin() && this.isPluginEnabled()
      ? this.callMeMaybe(this.module.make, this)
      : false
  }

  public isPlugin = function (): boolean {
    return this.module.make ? true : false
  }

  public isPluginEnabled = function (): boolean {
    return !this.module.when
      ? true
      : this.callMeMaybe(this.module.when, this.bud, this)
  }

  public setApi = function (): void {
    this.module.api &&
      this.bud.mapCallables(
        this.callMeMaybe(this.module.api, this.bud),
      )
  }

  public setOptions = function (): void {
    this.module.options &&
      this.setRepository(
        this.callMeMaybe(this.module.options, this.bud),
      )
  }

  public getOptions = function (): void {
    return this.repository
  }

  public setBuilders = function (
    builders: [string, CallableFunction][],
  ): void {
    builders.map(([name, handler]) => {
      if (!this.hasModuleProp(name)) return

      isArray(this.fromProp(name, this.bud))
        ? handler(
            ...(this.fromProp(name, this.bud) as [
              string,
              unknown,
            ]),
          )
        : Object.entries(this.fromProp(name, this.bud)).map(
            ([k, v]) => {
              handler(k, this.callMeMaybe(v, this.bud))
            },
          )
    })
  }
}

namespace Extension {
  /**
   * Extension
   */
  export interface Interface {
    bud?: Bud

    initialized?: boolean

    options?: {[key: string]: any}

    register?: (bud: Bud) => void

    boot?: (bud: Bud) => void

    api?: (bud: Bud) => void

    registerLoader?:
      | ((bud?: Bud) => [string, Build.Loader])
      | [string, Build.Loader]

    registerLoaders?:
      | ((bud?: Bud) => {[key: string]: Build.Loader})
      | {[key: string]: Build.Loader}

    registerRule?:
      | ((bud?: Bud) => [string, Rule.Module])
      | [string, Rule.Module]

    registerRules?:
      | ((bud?: Bud) => {[key: string]: Rule.Module})
      | {[key: string]: Rule.Module}

    registerItem?:
      | ((bud?: Bud) => [string, Item.Module])
      | [string, Item.Module]

    registerItems?:
      | ((bud?: Bud) => {[key: string]: Item.Module})
      | {[key: string]: Item.Module}

    make?: Extension.Make

    when?: Extension.When
  }

  export interface Controller
    extends Extension.Interface,
      Indexed {
    module?: Extension.Interface

    initialize?: () => Extension.Interface

    callMeMaybe?: (value: unknown, args: unknown[]) => unknown

    fromProp?: (prop: string, dep?: any) => [string, unknown]

    hasModuleProp?: (name: string) => boolean

    setApi?: () => void

    makePlugin?: () => Webpack.Plugin

    setOptions?: () => void

    getOptions?: () => void

    setBuilders?: (
      builders: [string, CallableFunction][],
    ) => void
  }

  export type Register = (bud: Bud) => void

  /**
   * Raw Extension options
   */
  export type RawOptions<T = any> = T | ((bud?: Bud) => T)

  export type Options<T = unknown> = Indexed<T>

  /**
   * Possible extension products
   */
  export type Product = Webpack.Plugin

  /**
   * Plugin make
   */
  export type Make<P = unknown, T = Options> =
    | ((options: Options<T>) => P)
    | P

  /**
   * Plugin make when
   */
  export type When<T = unknown> =
    | ((bud: Bud, options: T) => boolean)
    | boolean

  /**
   * Plugin conditional
   */
  export type Conditional = ((bud?: Bud) => boolean) | boolean

  /**
   * Do stuff after registration
   */
  export type Boot = (bud: Bud) => void
}
