import Webpack from 'webpack'
import {SetOptional, ValueOf} from 'type-fest'
import {Framework, Hooks, MappedType, Service} from './'

/**
 * bud.extensions
 *
 * Extensions controller.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export declare interface Extensions extends Service {
  add(extension): void

  set<Extension>(name: string, extension: Extension): this

  use(pkg: string): this

  make(): Webpack.Plugin[]

  discard(pkg: string): Service['app']
}

/**
 * bud.extension
 *
 * Extends framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
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
 * bud.module
 *
 * bud.extension implementation
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export interface Module {
  name: Module.Name

  options?: Module.Options

  dependencies?: string[]

  devDependencies?: string[]

  register?: (app: Framework) => unknown

  boot?: (app: Framework) => unknown

  api?: Module.Api

  make?: Module.Make

  when?: Module.When

  publish?:
    | ((
        app: Framework,
      ) => {[key: `${Hooks.Name}`]: (args?: any) => any})
    | {[key: string]: any}
}

export namespace Module {
  export type Name = `${keyof Framework.Hooks.Extension.Definitions}`

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

  export type When<T = any> =
    | ((app: Framework, opt?: Framework.Container<T>) => boolean)
    | boolean
}
