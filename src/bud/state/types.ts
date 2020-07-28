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
export type Features = {
  babel: boolean
  browserSync: boolean
  clean: boolean
  css: boolean
  cssModules: boolean
  debug: boolean
  dashboard: boolean
  dependencyManifest: boolean
  dump: boolean
  eslint: boolean
  font: boolean
  hash: boolean
  image: boolean
  hot: boolean
  inlineManifest: boolean
  js: boolean
  manifest: boolean
  minify: boolean
  optimize: boolean
  overlay: boolean
  postCss: boolean
  scss: boolean
  scssModules: boolean
  svg: boolean
  terser: boolean
  uglify: boolean
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

/**
 * Env
 */
export type Environment = any
