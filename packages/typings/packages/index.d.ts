export as namespace Framework

/**
 * Externals
 */
import Webpack from 'webpack'
export type {Webpack}

import * as Express from 'express'
export type {Express}

/**
 * Utility types.
 */
export * from './utility'

/**
 * @roots/bud
 */
export type {Framework as Bud} from '../../bud-framework/src'

/**
 * @roots/bud-build
 */
export type {Build} from '../../bud-build/src/typings'
export * as Item from './Item'
export type {Loader} from './Loader'
export * as Rule from './Rule'

/**
 * @roots/bud-cache
 */
export type {Cache} from '../../bud-cache/src'

/**
 * @roots/bud-cli
 */
export * as CLI from './CLI'

/**
 * @roots/bud-compiler
 */
export type {Compiler} from '../../bud-compiler/src/Compiler'

/**
 * @roots/container
 */
export type {Container} from '../../container/src/Container'

/**
 * @roots/dependencies
 */
export * as Dependencies from '../../dependencies/src/dependencies'

/**
 * @roots/bud-extensions
 */
export {Extension} from '../../bud-extensions/src/Extension'
export {Extensions} from '../../bud-extensions/src/Extensions'

/**
 * Env
 */
export type {Env} from './Env'

/**
 * @roots/filesystem
 */
export type {FileContainer} from '../../filesystem/src/FileContainer'
export type {FileSystem} from '../../filesystem/src/FileSystem'

/**
 * @roots/bud-hooks
 */
export type {Hooks} from '../../bud-hooks/src/Hooks'

/**
 * Logger
 */
export type {Logger} from './Logger'

/**
 * @roots/bud-server
 */
export * as Server from './Server'
