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

  get(name: string): Extension

  set<Extension>(name: string, extension: Extension): this

  use(pkg: string): this

  make(): Webpack.WebpackPluginInstance[]

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
  /**
   * Module
   */
  readonly module: Module

  /**
   * App
   */
  readonly app: Framework

  /**
   * Logging
   */
  readonly logger: Framework['logger']

  /**
   * Name
   */
  name: Module['name']

  /**
   * Options
   */
  options: Module['options']

  /**
   * Development Dependencies
   */
  dependencies: Module['dependencies']

  /**
   * Development Dependencies
   */
  devDependencies: Module['devDependencies']

  /**
   * When
   */
  when: Module['when']

  /**
   * Make
   */
  make: Module['make']

  /**
   * Install package dependencies
   */
  install(): void

  /**
   * Make hook key from module property
   */
  makeKey(key: ModuleKey): Framework.Hooks.Name

  /**
   * Get module properties (hooked)
   */
  get(key: ModuleKey): any

  /**
   * Set module properties (hooked)
   */
  set(key: ModuleKey, value: any): void
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
  export type Name = `${keyof Hooks.Extension.Definitions}`

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
