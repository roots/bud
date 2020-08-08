import type {Configuration as WebpackConfiguration} from 'webpack'
import type {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin/build-types'
import type {Options as BrowserSyncOptions} from 'browser-sync-webpack-plugin'

import type {Container, FileContainer} from '../container'
import type {Bud} from '../types'
export type {Bud}

/**
 * Mitch, all together.
 */
export type State = {
  configs: Configs
  features: Features
  options: Options
  paths: Paths
  flags: Flags
}

export type Directory = string
export type Paths = Container

export type Options = Container

export type BabelConfiguration = {
  plugins: []
  presets: []
}
export type BrowserSync = BrowserSyncOptions
export type Copy = {
  patterns: any[]
}
export {DependencyExtractionOptions as WordPressDependenciesOptions}
export type Dev = any
export type Externals = WebpackConfiguration['externals']
export type PostCssConfiguration = {
  plugins: []
}
export type Target = WebpackConfiguration['target']
export type Typescript = any
export type Vendor = {
  name: string
}

type Features = any
export type {Features}

type Flags = Container
export type {Flags}

type Args = Container
export type {Args}

type Configs = FileContainer
export type {Configs}

export type Environment = any
