import type {Configuration as WebpackConfiguration} from 'webpack'
import type {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin/build-types'
import type {Options as BrowserSyncOptions} from 'browser-sync-webpack-plugin'
import type {TerserPluginOptions as TerserOptions} from 'terser-webpack-plugin'
/**
 * Mitch, all together.
 */
export type State = {
  configs: Configs
  features: Features
  options: Options
  paths: Paths
  plugins: any
}

/**
 * Paths
 */
export type Directory = string
export type Paths = {
  project: Directory
  framework: Directory
  src: Directory
  dist: Directory
  public: Directory
}

/**
 * Options
 */
export type Options = {
  alias: any
  auto: any
  babel: BabelConfiguration
  copy: Copy
  dev: any
  devtool: any
  entry: any
  env: any
  inlineManifest: any
  node: any
  splitting: any
  uglify: any
  browserSync: any
  externals: Externals
  postCss: PostCssConfiguration
  target: WebpackConfiguration['target']
  terser: TerserOptions
  typescript: Typescript
  dependencyManifest: DependencyExtractionOptions
  vendor: Vendor
  watch: any
}

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
 * Features
 */
type Entry = boolean
type Repository = {[key: string]: Entry}
interface Enable {(feature: string): void}
interface Enabled {(feature: string): boolean}
interface Disable {(feature: string): void}
interface Disabled {(feature: string): boolean}
interface Get {(feature: string): boolean}
interface Set {(Repository): void}
interface Has {(feature: string): boolean}

/**
 * ## bud.state.features
 */
type Features = {
  /**
   * Feature store
   */
  repository: Repository

  /**
   * Enable a feature
   */
  enable: Enable

  /**
   * Boolean check if feature is enabled.
   */
  enabled: Enabled

  /**
   * Disable a feature
   */
  disable: Disable

  /**
   * Boolean check if feature is disabled.
   */
  disabled: Disabled

  /**
   * Get the value of a feature.
   */
  get: Get

  /**
   * Set the value of a feature.
   */
  set: Set

  /**
   * Check if a feature exists
   */
  has: Has
}

export type {Features}

/**
 * Configs
 */
export type Configs = {
  babel: string | null
  eslint: string | null
  postCss: string | null
  typescript: string | null
}

/**
 * Env
 */
export type Environment = any
