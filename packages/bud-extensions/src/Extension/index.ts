import Framework from '@roots/bud-typings'
import {Container} from '@roots/container'
import {isArray, isFunction} from 'lodash'

export class Extension extends Container
  implements Framework.Extension.Controller {
  public bud: Framework.Bud.Contract

  public initialized = false

  public module: Framework.Extension.Contract

  public builders: [string, CallableFunction][]

  constructor(
    bud: Framework.Bud.Contract,
    extension: Framework.Extension.Contract,
  ) {
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

  public initialize = function(): Framework.Extension.Contract {
    this.module.register && this.register()

    this.module.options && this.setOptions(this.module.options)

    this.setApi()

    this.setBuilders(this.builders)

    this.boot()

    return this
  }

  public callMeMaybe: (
    value: unknown,
    ...args: unknown[]
  ) => unknown = function(value, ...args) {
    return isFunction(value) ? value(...args) : value
  }

  public fromProp: (
    prop: string,
    dep?: unknown[],
  ) => [string, unknown] = function(prop, ...dep) {
    return this.callMeMaybe(this.module[prop], ...dep)
  }

  public hasModuleProp = function(name: string): boolean {
    return this.module[name] ? true : false
  }

  public register = function(
    this: Framework.Extension.Controller,
  ): void {
    this.module.register && this.module.register(this.bud)
  }

  public boot = function(): void {
    this.module.boot && this.module.boot(this.bud)
  }

  public makePlugin = function(): Framework.Webpack.Plugin {
    return this.isPlugin() && this.isPluginEnabled()
      ? this.callMeMaybe(this.module.make, this)
      : false
  }

  public isPlugin = function(): boolean {
    return this.module.make ? true : false
  }

  public isPluginEnabled = function(): boolean {
    return !this.module.when
      ? true
      : this.callMeMaybe(this.module.when, this.bud, this)
  }

  public setApi = function(): void {
    this.module.api &&
      this.bud.mapCallables(
        this.callMeMaybe(this.module.api, this.bud),
      )
  }

  public setOptions = function(
    options: Framework.Container['repository'],
  ): void {
    this.setStore(this.callMeMaybe(options, this.bud))
  }

  public getOptions = function(): Framework.Container['repository'] {
    return this.repository
  }

  public setBuilders = function(
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
