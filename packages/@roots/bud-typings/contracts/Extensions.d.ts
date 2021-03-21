import Webpack from 'webpack'
import {SetOptional, ValueOf} from 'type-fest'
import {Framework, MappedType, Service} from './'

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
export declare interface Extensions extends Service {
  add(extension): void

  set<Extension>(name: string, extension: Extension): this

  use(pkg: string): this

  make(): Webpack.Plugin[]

  discard(pkg: string): Service['app']
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
export interface Extension extends Framework.Service {
  readonly app: Framework

  make(): Webpack.Plugin

  isPlugin(): boolean

  isPluginEnabled(): boolean

  setOptions(options: Framework.Index<any>): void

  setBuilders(builders: [string, CallableFunction][]): void
}

/**
 * Extension module (source)
 */
export interface Module {
  name: string

  register?: (app: Framework) => unknown

  options?: Module.Options

  boot?: (app: Framework) => unknown

  api?: Module.Api

  setLoaders?: Module.Registrable.Source.Value

  setItems?: Module.Registrable.Source.Value

  setRules?: Module.Registrable.Source.Value

  make?: Module.Make

  when?: Module.When

  dependencies?: string[]

  devDependencies?: string[]

  topics?: ((app: Framework) => string[]) | string[]

  publish?:
    | ((app: Framework) => {[key: string]: any})
    | {[key: string]: any}
}

export namespace Module {
  export type Registrable = {
    setItems: Framework.Item.Module
    setRules: Framework.Rule.Module
    setLoaders: Framework.Loader.Module | string
  }

  export namespace Registrable {
    /**
     * Base keys
     */
    export type Key = 'setItems' | 'setRules' | 'setLoaders'

    /**
     * Base values
     */
    export type Value =
      | Framework.Item.Module
      | Framework.Rule.Module
      | Framework.Loader.Module

    export namespace Source {
      export type Value =
        | [string, Registrable.Value]
        | Array<[string, Registrable.Value]>
        | {[key: string]: Registrable.Value}
    }

    export type Tuple = [string, Value]

    export namespace Entries {}
  }

  export type Api =
    | {[key: string]: any}
    | ((app?: Framework) => {[key: string]: any})

  export type Boot = (app: Framework) => any | void

  export type Options<T = any> =
    | T
    | ((app: Framework) => T)
    | any

  export type Make<P = unknown, T = Options> = (
    options: Framework.Container<T>,
    app?: Framework,
  ) => P

  export type When =
    | ((app: Framework, opt?: Framework.Container) => boolean)
    | boolean
}
