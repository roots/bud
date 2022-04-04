// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ Bud/Framework - Extensible build tooling for modern web development
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

export {Store} from './Store'

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

export {Api} from './Api'
export {Compiler} from './Compiler'
export {Dashboard} from './Dashboard'
export {Dependencies} from './Dependencies'
export {Env} from './Env'
export {Hooks} from './Hooks'
export {Logger} from './Logger'

/**
 * Framework factory
 * @public
 */
export interface Factory<P extends any[], T> {
  (...args: P): T
}

/**
 * Framework async factory
 * @public
 */
export interface AsyncFactory<P extends any[], T> {
  (...args: P): Promise<T>
}

/**
 * Compilation mode
 * @public
 */
export type Mode = 'production' | 'development'

/**
 * Registered extensions
 * @virtual @public
 */
export interface Plugins extends Record<string, Extension.CompilerPlugin> {}
export interface Modules extends Plugins, Record<string, Extension.Module | Extension.CompilerPlugin> {}

/**
 * Registered loaders
 * @virtual @public
 */
export interface Loaders extends Record<string, Loader> {}

/**
 * Registered items
 * @virtual @public
 */
export interface Items extends Record<string, Item> {}

/**
 * Registered rules
 * @virtual @public
 */
export interface Rules extends Record<string, Rule> {}

/**
 * Registered locations
 * @virtual @public
 */
export interface Locations extends Record<string, string> {
  '@src': string
  '@dist': string
  '@storage': string
  '@modules': string
}

/**
 * Registered services
 * @virtual @public
 */
export interface Services {}
