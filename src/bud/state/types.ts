import type {Configuration as WebpackConfiguration} from 'webpack'
import type {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin/build-types'
import type {Options as BrowserSyncOptions} from 'browser-sync-webpack-plugin'
import type {TerserPluginOptions as TerserOptions} from 'terser-webpack-plugin'

import type {Container, FileContainer} from '../container'
import type {Bud} from '../types'
export type {Bud}

import type {Plugins} from './plugins/types'

/**
 * Mitch, all together.
 */
export type State = {
  configs: Configs
  features: Features
  options: Options
  paths: Paths
  plugins: Plugins
  flags: Flags
}

/**
 * Plugins
 */
export type {Plugins}

/**
 * Paths
 */
export type Directory = string
export type Paths = Container

/**
 * Options
 */
export type Options = Container

export type BabelConfiguration = {
  plugins: []
  presets: []
}
export type BrowserSync = BrowserSyncOptions
export type Copy = {
  patterns: object[]
}
export {DependencyExtractionOptions as WordPressDependenciesOptions}
export type Dev = any
export type Externals = WebpackConfiguration['externals']
export type PostCssConfiguration = {
  plugins: []
}
export type Target = WebpackConfiguration['target']
export type Typescript = Object
export type Vendor = {
  name: String
}

/**
 * ## bud.state.features
 */
type Features = any
export type {Features}

/**
 * ## bud.state.flags
 */
type Flags = Container
export type {Flags}

/**
 * ## bud.state.config
 */
type Configs = FileContainer
export type {Configs}

/**
 * Env
 */
export type Environment = any
