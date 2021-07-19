/**
 * Abstract
 */

export {Bootstrapper, Service} from './Service'

export {Discovery} from './Discovery'

export {Extension} from './Extension'

export {Framework} from './Framework'

export {Store} from './Store'

/**
 * Interfaces
 */

export type {Api} from './Api'

export type {Build} from './Build'

export type {Cache} from './Cache'

export type {Compiler} from './Compiler'

export type {Configuration} from './Configuration'

export type {Dashboard} from './Dashboard'

export type {Dependencies} from './Dependencies'

export type {Env} from './Env'

export type {Extensions} from './Extensions'

export type {Hooks} from './Hooks'

export type {Logger} from './Logger'

export type {Mode} from './Mode'

export type {Module} from './Module'

export type {Plugin} from './Plugin'

export type {Server} from './Server'

/**
 * Externals
 */

import {Container} from '@roots/container'
import type Webpack from 'webpack/types'

export {Container, Webpack}
