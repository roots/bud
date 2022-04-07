// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
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

export * as Extension from './extension'

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
//
import {Module} from './services/extensions'
export interface Modules extends Partial<Record<string, Module>> {}
export {Module}

/**
 * Registered plugins
 *
 * @virtual @public
 */
//
import {Plugin} from './services/extensions'
export interface Plugins extends Partial<Record<string, Plugin>> {}
export {Plugin}

