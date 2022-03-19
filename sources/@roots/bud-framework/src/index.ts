// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ Bud/Framework - Extensible build tooling for modern web development
 *
 * @remarks
 * The {@link @roots/bud-framework# | @roots/bud-framework} package defines the
 * abstract {@link Framework} class and provides interfaces for the Framework's
 * essential {@link Service} classes.
 *
 * The overarching design goal of this architecture is to make it as simple as
 * possible to swap out the underlying {@link Service} implementations without
 * having to modify the core framework code.
 *
 * To that effect, interoperability with other build tools is possible through
 * extending the {@link Framework} class and adding or modifying {@link Service}
 * classes.
 *
 * The original implementation uses Webpack as the underlying
 * build tool, but this is not a requirement for future implementations and
 * we've done our best to maintain a separation of core code from
 * the build tool we are currently leveraging.
 *
 * We sincerely hope that these efforts will help you build a better web.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Build, Item, Loader, Rule} from './Build'
import {Cache} from './Cache'
import {Context} from './Context'
import {Extensions} from './Extensions'
import * as Extension from './Extensions/Extension'
import {Constructor, Framework, Options} from './Framework'
import {Peers} from './Peers'
import {Project} from './Project'
import * as Server from './Server'
import {Service} from './Service'

/**
 * Concrete classes
 */
//

export {Store} from './Store'

/**
 * Abstract classes
 */
//

export {Build}
export {Cache}
export {Constructor}
export {Context}
export {Extension}
export {Extensions}
export {Framework}
export {Item}
export {Loader}
export {Options}
export {Peers}
export {Project}
export {Rule}
export {Service}
export {Server}

/**
 * Types and interfaces
 */
//

export {Api} from './Api'
export {Compiler} from './Compiler'
export {Dashboard} from './Dashboard'
export {Dependencies} from './Dependencies'
export {Env} from './Env'
export {Hooks} from './Hooks'
export {Logger} from './Logger'

/**
 * Loosely typed interface
 *
 * @public
 */
export interface Loose {
  [key: string]: any
}

/**
 * Framework factory
 *
 * @public
 */
export interface Factory<P extends any[], T> {
  (...args: P): T
}

/**
 * Framework async factory
 *
 * @public
 */
export interface AsyncFactory<P extends any[], T> {
  (...args: P): Promise<T>
}

/**
 * Callback which accepts Framework as a parameter
 *
 * @public
 */
export interface Tapable<P extends any[] = [Framework], T = any>
  extends Factory<[P], T> {
  (this: P, ...args: P): T
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

/**
 * Compilation mode
 *
 * @public
 */
export type Mode = 'production' | 'development'

/**
 * Registered extensions
 *
 * @virtual @public
 */
export interface Modules extends Partial<Index<Extension.Module>> {}

/**
 * Registered plugins
 *
 * @virtual @public
 */
export interface Plugins
  extends Partial<Index<Extension.CompilerPlugin>> {}

/**
 * Registered loaders
 *
 * @virtual @public
 */
export interface Loaders extends Partial<Index<Loader>> {}

/**
 * Registered items
 *
 * @virtual @public
 */
export interface Items extends Partial<Index<Item>> {}

/**
 * Registered rules
 *
 * @virtual @public
 */
export interface Rules extends Partial<Record<string, Rule>> {}

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
 * Registered services
 *
 * @virtual @public
 */
export interface Services
  extends Partial<Record<string, new (app: Framework) => Service>> {}

/**
 * Module
 *
 * @deprecated Use {@link Extension.Module} or {@link Extension.CompilerPlugin} instead
 *
 * @public
 */
export interface Module<P = any, O = any> extends Extension.Module<O> {}
