/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The {@link @roots/bud-framework#} package defines the
 * central abstract {@link Framework} class and provides
 * interfaces for the Framework's essential {@link Service}
 * classes.
 *
 * {@link Framework} is to be extended by a class providing implementations
 * for the service interfaces exported herein.
 *
 * @packageDocumentation
 */

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

export * as Cache from './Cache'
export * as Peers from './Peers'
export * as Project from './Project'
export {Framework} from './Framework'
export {Bootstrapper} from './Bootstrapper'
export {Extension} from './Extension'
export {Service} from './Service'

/**
 * Types and interfaces
 */

export type {Api} from './Api'
export type {Build} from './Build'
export type {Compiler} from './Compiler'
export type {Configuration} from './Configuration'
export type {Dashboard} from './Dashboard'
export type {Dependencies} from './Dependencies'
export type {Env} from './Env'
export type {Extensions} from './Extensions'
export type {Hooks} from './Hooks'
export type {Logger} from './Logger'
export type {Module} from './Module'
export type {Server} from './Server'
export type {WebpackPlugin} from './WebpackPlugin'
