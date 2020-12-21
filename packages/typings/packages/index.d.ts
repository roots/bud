/**
 * Externals
 */
import type Webpack from 'webpack'
export type {Webpack}

import type Express from 'express'
export type {Express}

/**
 * Utility types.
 */
export * from './utility'

/**
 * @roots/bud-framework
 */
export type {Framework} from '../../bud-framework/src'

/**
 * Env
 */
import type Env from '../../bud-framework/src/Env'
export type {Env}

/**
 * Logger
 */
import type Logger from '../../bud-framework/src/Logger'
export type {Logger}

/**
 * @roots/bud-build
 */
import type Build from '../../bud-build/src/Build'
import type Item from '../../bud-build/src/Item'
import type Rule from '../../bud-build/src/Rule'
import type Loader from '../../bud-build/src/Loader'
export type {Build, Item, Loader, Rule}

/**
 * @roots/bud-cache
 */
export type {Cache} from '../../bud-cache/src'

/**
 * @roots/bud-cli
 */
import type {Error} from '../../bud-cli/src/Error'
import type {Runner} from '../../bud-cli/src/Runner'

export namespace CLI {
  export type {Error, Runner}
}

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
import type Dependencies from '../../dependencies/src/dependencies'
export type {Dependencies}

/**
 * @roots/bud-extensions
 */
import type Extension from '../../bud-extensions/src/Extension'
import type Extensions from '../../bud-extensions/src/Extensions'
import type Module from '../../bud-extensions/src/Module'
export type {Extension, Extensions, Module}

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
 * @roots/bud-server
 */
export type {Server} from '../../bud-server/src'
