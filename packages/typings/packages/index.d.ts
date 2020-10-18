/**
 * Bud Framework core typings.
 *
 * Type extensions (including @roots/bud-babel, etc.)
 * are sourced from those packages. These types are
 * fundamental to Bud itself. They are included separately
 * to allow for bi-directional referencing without causing
 * build issues w/r/t cyclical dependencies, etc.
 *
 * Includes:
 *  - @roots/container
 *  - @roots/filesystem
 *  - @roots/bud-api
 *  - @roots/bud-compiler
 *  - @roots/bud-framework
 *  - @roots/bud-server
 */

export as namespace Framework

/**
 * Common utility types.
 */
export * from './utility'

/**
 * Framework.Container
 *
 * @package @roots/container
 */
export {Container} from '@roots/container'

/**
 * Framework.FileContainer
 * Framework.FileSystem
 *
 * @package @roots/filesystem
 */
export {
  FileContainer,
  FileSystem,
} from '@roots/filesystem'

/**
 * Framework.API
 *
 * @package @roots/bud-api
 */
export * from './API'

/**
 * Framework.Bud
 *
 * @package @roots/bud-framework
 */
export * from './Bud'

/**
 * Framework.Build
 *
 * @package @roots/bud-framework
 */
export * from './Build'

/**
 * Framework.CLI
 *
 * @package @roots/bud-cli
 */
export * from './CLI'

/**
 * Framework.Compiler
 *
 * @package @roots/bud-compiler
 */
export * from './Compiler'

/**
 * Framework.Dependencies
 *
 * @packages @roots/bud-dependencies
 */
export * from '@roots/dependencies'

/**
 * Framework.Env
 *
 * @package @roots/bud-framework
 */
export * from './Env'

/**
 * Framework.Extension
 *
 * @package @roots/bud-framework
 */
export * from './Extension'

/**
 * Framework.Extensions
 *
 * @package @roots/bud-framework
 */
export * from './Extensions'

/**
 * Framework.Features
 *
 * @package @roots/bud-framework
 */
export * from './Features'

/**
 * Framework.Hooks
 *
 * @package @roots/bud-framework
 */
export * from './Hooks'

/**
 * Framework.Item
 *
 * @package @roots/bud-framework
 */
export * from './Item'

/**
 * Framework.Mode
 *
 * @package @roots/bud-framework
 */
export * from './Mode'

/**
 * Framework.Rule
 *
 * @package @roots/bud-framework
 */
export * from './Rule'

/**
 * Framework.Server
 *
 * @package @roots/bud-framework
 */
export * from './Server'

/**
 * Framework.Express
 * @see express
 */
export * from './Express'

/**
 * Framework.Webpack
 * @see webpack
 */
export * from './Webpack'

/**
 * Framework.Logger
 * @see pino
 */
export {Logger} from 'pino'
