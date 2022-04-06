// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

export * as Api from './services/api'
export * as Build from './services/build'
export * as Cache from './services/cache'
export * as Compiler from './services/compiler'
export * as Dashboard from './services/dashboard'
export * as Env from './services/env'
export * as Extension from './services/extensions'
export * as Extensions from './services/extensions'
export * as Hooks from './services/hooks'
export * as Peers from './services/peers'
export * as Project from './services/project'
export * as Server from './services/server'
export * as Services from './services'

export * as Config from './config'

export {Bud} from './bud'
export {ContainerService, Service} from './service'
export {Logger} from './logger'
export {Store} from './store'

import {Module, Plugin} from './services/extensions'

/**
 * Compilation mode
 *
 * @public
 */
export type Mode = 'production' | 'development'

/**
 * Registered locations
 *
 * @virtual @public
 */
export interface Locations extends Partial<Record<string, string>> {
  '@src': string
  '@dist': string
  '@storage': string
  '@modules': string
}

/**
 * Registered modules
 *
 * @virtual @public
 */
export interface Modules extends Partial<Record<string, Module>> {}
export {Module}

/**
 * Registered plugins
 *
 * @virtual @public
 */
export interface Plugins extends Partial<Record<string, Plugin>> {}
export {Plugin}

/**
 * Loosely typed interface
 *
 * @public
 */
export interface Loose {
  [key: string]: any
}

/**
 * Bud factory
 *
 * @public
 */
export interface Factory<P extends any[], T> {
  (...args: P): T
}

/**
 * Bud async factory
 *
 * @public
 */
export interface AsyncFactory<P extends any[], T> {
  (...args: P): Promise<T>
}

/**
 * At least one parameter is required
 *
 * @public
 */
export type AtLeastOne<Type = unknown> = Type | Type[]

/**
 * Maybe
 *
 * @remarks
 * If T is a function, and it is passed a value of type A, it returns T.
 * If it is not a function, it returns T.
 *
 * @typeParam A - Arguments to be passed when T is a function and it is invoked
 * @typeParam T - Type to be returned
 *
 * @public
 */
export type Maybe<A extends any[], T> = T | Factory<A, T>

/**
 * Hash of a given object type
 *
 * @public
 */
export type Index<T = any> = {[key: string]: T}
