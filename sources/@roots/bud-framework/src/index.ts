/* eslint-disable simple-import-sort/imports */
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

import {Bud} from './bud'
import * as Config from './config'
import {Logger} from './logger'
import {ContainerService, Service} from './service'
import * as Services from './services'
import * as Api from './services/api'
import * as Build from './services/build'
import * as Cache from './services/cache'
import * as Compiler from './services/compiler'
import * as Dashboard from './services/dashboard'
import * as Env from './services/env'
import * as Extensions from './services/extensions'
import * as Hooks from './services/hooks'
import * as Peers from './services/peers'
import * as Project from './services/project'
import * as Server from './services/server'
import {Store} from './store'

import * as Extension from './extension'
import {Plugin} from './extension/plugin'
import {Module} from './extension/module'

export {Bud, ContainerService, Extension, Service, Store}

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
 * Registered extension modules
 *
 * @virtual @public
 */
export interface Modules extends Partial<Record<string, Extension.Module | Extension.Extension>> {}

/**
 * Registered plugins
 *
 * @virtual @public
 */
export interface Plugins extends Partial<Record<string, Plugin>> {}

export {
  Api,
  Build,
  Cache,
  Compiler,
  Config,
  Dashboard,
  Env,
  Extensions,
  Hooks,
  Logger,
  Module,
  Plugin,
  Peers,
  Project,
  Server,
  Services,
}