import {Framework} from './'

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Extensions
  extends Framework.ServiceContainer<Framework> {
  set(
    name: string,
    extension: Framework.MaybeCallable<Module>,
  ): this

  use(pkg: string): Promise<this>

  make(extensions: Framework.Container): void
}

/**
 * ## bud.extension
 *
 * Extends framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Extension
  extends Framework.ServiceContainer<Framework> {
  readonly app: Framework

  initialized: boolean

  module: Module

  init(): void

  callMeMaybe(
    value: CallableFunction | any,
    ...args: unknown[]
  ): unknown

  fromProp(prop: string, dep?: unknown[]): [string, unknown]

  makePlugin(): Framework.MaybeCallable<any> | boolean

  isPlugin(): boolean

  isPluginEnabled(): boolean

  setOptions(options: Framework.Index<any>): void

  setBuilders(builders: [string, CallableFunction][]): void
}

export interface Module {
  options?: Module.RawOptions

  register?: Module.Register

  boot?: Module.Boot

  api?: Module.Api

  registerLoader?: Module.RegisterOne<Framework.Loader>

  registerLoaders?: Module.RegisterMany<Framework.Loader>

  registerRule?: Module.RegisterOne<Framework.Rule.Module>

  registerRules?: Module.RegisterMany<Framework.Rule.Module>

  registerItem?: Module.RegisterOne<Framework.Item.Module>

  registerItems?: Module.RegisterMany<Framework.Item.Module>

  make?: Module.Make

  when?: Module.When
}

/**
 * Extension module
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export namespace Module {
  export type Api =
    | {[key: string]: CallableFunction}
    | ((bud?: Framework) => {[key: string]: CallableFunction})

  export type Register = (bud: Framework) => void

  export type RegisterOne<T> =
    | ((bud?: Framework) => [string, T])
    | [string, T]

  export type RegisterMany<T> =
    | ((bud?: Framework) => {[key: string]: T})
    | {[key: string]: T}

  export type RawOptions<T = any> = T | ((bud?: Framework) => T)

  export type Options = {[key: string]: any}

  export type Make<P = unknown, T = Options> =
    | ((options: Framework.Container<T>, bud?: Framework) => P)
    | P

  export type When = (
    bud: Framework,
    opt?: Framework.Container,
  ) => boolean

  export type Boot = (bud: Framework) => void
}
