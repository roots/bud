// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * ⚡️ Bud/Framework - Extensible build tools framework for modern web development
 *
 * @remarks

 * The {@link @roots/bud-framework# | @roots/bud-framework} package defines the abstract {@link Framework} class
 * and provides interfaces for the Framework's essential {@link Service} classes.
 *
 * {@link (Framework:class)} is an abstract class providing contracts for {@link Service} implementations.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @core
 */

import Build, {Item, Loader, Rule} from './Build'
import * as Cache from './Cache'
import {Extensions} from './Extensions'
import * as Extension from './Extensions/Extension'
import {Constructor, Framework, Options} from './Framework'
import * as Peers from './Peers'
import * as Project from './Project'
import {Service} from './Service'

/**
 * Concrete classes
 */

export {Store} from './Store'

/**
 * Concrete fns
 */

export {access} from './Framework/access'
export {bootstrap} from './Framework/bootstrap'
export {close} from './Framework/close'
export {container} from './Framework/container'
export {get} from './Framework/get'
export {make} from './Framework/make'
export {path} from './Framework/path'
export {pipe} from './Framework/pipe'
export {setPath} from './Framework/setPath'
export {sequence} from './Framework/sequence'
export {tap} from './Framework/tap'
export {when} from './Framework/when'

/**
 * Abstract classes
 */

export {Build}
export {Cache}
export {Constructor}
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

export {Bootstrapper} from './Bootstrapper'

/**
 * Types and interfaces
 */

export {Api} from './Api'
export {Compiler} from './Compiler'
export {Configuration} from './Configuration'
export {Dashboard} from './Dashboard'
export {Dependencies} from './Dependencies'
export {Env} from './Env'
export {Hooks} from './Hooks'
export {Logger} from './Logger'
export {Server} from './Server'

/**
 * Util
 */

/**
 * Loosely typed interface
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
 * Callback which accepts Framework as a parameter
 *
 * @public
 */
export interface Tapable<P extends any[] = [Framework], T = any>
  extends Factory<[P], T> {}

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
 */
export type Index<T = any> = {[key: string]: T}

/**
 * Compilation mode
 */
export type Mode = 'production' | 'development'

/**
 * Registered extensions
 */
export interface Modules
  extends Partial<Index<Extension.Module>> {}

/**
 * Registered plugins
 */
export interface Plugins
  extends Partial<Index<Extension.CompilerPlugin>> {}

/**
 * Registered loaders
 */
export interface Loaders
  extends Partial<Index<Loader.Interface>> {}

/**
 * Registered items
 */
export interface Items extends Partial<Index<Item.Interface>> {}

/**
 * Registered rules
 */
export interface Rules extends Partial<Index<Rule.Interface>> {}

/**
 * Registered locations
 */
export interface Locations extends Partial<Index<string>> {}

/**
 * Registered services
 */
export interface Services
  extends Partial<Index<new (app: Framework) => Service>> {}

/**
 * Compiler plugin instance
 *
 * @remarks
 * Compatible with the webpack plugin interface.
 *
 * @public
 */
export interface PluginInstance {
  /**
   * Apply method
   *
   * @public
   */
  apply: CallableFunction
}

/**
 * @deprecated Use {@link Extension.Module} or {@link Extension.CompilerPlugin} instead
 */
export interface Module<P = any, O = any>
  extends Extension.Module<O> {}

/**
 * @deprecated Use {@link Extension.CompilerPlugin} instead
 */
export interface WebpackPlugin<P = any, O = any>
  extends Extension.CompilerPlugin<
    Extension.ApplyPlugin,
    unknown
  > {}
