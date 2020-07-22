import {configs} from './configs'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'

/**
 * bud.state
 */
export const state: State = {
  configs,
  features,
  options,
  paths,
}

/**
 * Mitch, all together.
 */
export type State = {
  configs: Configs,
  features: Features,
  options: Options,
  paths: Paths,
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
import type {Configuration as WebpackConfiguration} from 'webpack'
import type {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin/build-types'
import type {Options as BrowserSyncOptions} from 'browser-sync-webpack-plugin'
export type Options = {
  auto: any
  babel: BabelConfiguration
  copy: Copy
  dev: any
  devtool: any
  entry: any
  env: any
  inlineManifest: Object
  splitting: Object
  uglify: Object
  browserSync: Object
  externals: Externals
  postCss: PostCssConfiguration
  svg: Svg
  target: WebpackConfiguration['target']
  typescript: Typescript
  dependencyManifest: DependencyExtractionOptions
  vendor: Vendor
}
export type BabelConfiguration = {
  plugins: []
  presets: []
}
export type BrowserSync = BrowserSyncOptions
export type Copy = {
  patterns: []
}
export {DependencyExtractionOptions as WordPressDependenciesOptions}
export type Dev = any
export type Externals = WebpackConfiguration['externals']
export type PostCssConfiguration = {
  plugins: []
}
export type Svg = any
export type Target = WebpackConfiguration['target']
export type Typescript = Object
export type Vendor = {
  name: String
}

/**
 * Features
 */
export type Features = {
  babel: boolean
  browserSync: boolean
  debug: boolean
  dashboard: boolean
  dependencyManifest: boolean
  dump: boolean
  eslint: boolean
  hash: boolean
  hot: boolean
  inlineManifest: boolean
  minified: boolean
  overlay: boolean
  postCss: boolean
  purge: boolean
  sourceMap: boolean
  splitting: boolean
  translate: boolean
  typescript: boolean
  vendor: boolean
  watch: boolean
}

/**
 * Configs
 */
export type Configs = {
  babel: string | null
  eslint: string | null
  postCss: string | null
  typescript: string | null
}
