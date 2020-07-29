import {Bud} from '../types'
export {Bud} from '../types'
export {RegisteredPlugin} from '../plugin/types'
import type {Options as BrowserSyncOptions} from 'browser-sync'
import type {Options as WebpackOptions} from 'webpack'
export type {WebpackOptions}

import {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin'
export type {DependencyExtractionOptions}

export type Alias = (arg0: object) => Bud
export type Auto = (options: {[key: string]: string[]}) => Bud
export type Babel = (arg0: BabelProperties) => Bud
export type Bundle = (name: string, entries: string[]) => Bud
export type Copy = (from: string, to: string) => Bud
export type Dashboard = (enabled: boolean) => Bud
export type Debug = (enabled?: boolean) => any
export type DependencyManifest = (settings?: DependencyExtractionOptions) => Bud
export type Dev = (options: object) => Bud
export type Devtool = (devtool: WebpackOptions.Devtool) => Bud
export type Dist = (path?: string) => string
export type Dump = (enabled: boolean) => Bud
export type PathSetter = (path: string) => Bud
export type Glob = (
  this: Bud,
  output: string,
  files: string,
) => Bud
export type Hash = (this: Bud, enabled?: boolean) => Bud
export type Hot = (this: Bud, options: {
  enabled: boolean
  host: string
  port?: number
  watch?: string[]
  open?: boolean
  headers?: object
  secure?: boolean
}) => Bud
export type InlineManifest = (name?: string) => Bud
export type Mini = (enabled?: boolean) => Bud
export type Option = (key: string) => string
export type PostCss = (options?: {enabled?: boolean, plugins?: any[]}) => Bud
export type Preset = (path?: string) => any
export type Project = (path?: string) => string
export type Purge = (any) => Bud
export type Resolve = (moduleName: string) => string
export type Scss = (enabled?: boolean) => Bud
export type SourceMap = (enabled?: boolean) => Bud
export type Splitting = (enabled?: boolean) => Bud
export type Src = (path?: string) => string
export type Sync = (options: SyncOptions) => Bud
export type Target = (target: string) => Bud
export type Terser = (options: {
  enable?: boolean
  terser?: object
}) => Bud
export type Translate = (output: string) => Bud
export type Watch = (options: {
  paths: string[]
  enabled: boolean
}) => Bud
export type Vendor = (name?: string) => Bud

export type Api = {
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  compile: any
  copy: Copy
  copyAll: Copy
  dashboard: Dashboard
  debug: Debug
  dependencyManifest: DependencyManifest
  dev: Dev
  devtool: Devtool
  dist: Dist
  distPath: PathSetter
  dump: Dump
  glob: Glob
  hash: Hash
  hot: Hot
  project: Project
  publicPath: PathSetter
  purge: Purge
  splitting: Splitting
  terser: Terser
  inlineManifest: InlineManifest
  map: SourceMap
  mini: Mini
  postCss: PostCss
  preset: Preset
  projectPath: PathSetter
  resolve: Resolve
  scss: any
  src: Src
  srcPath: PathSetter
  sync: Sync
  target: Target
  translate: Translate
  vendor: Vendor
  watch: Watch
}

export interface BabelProperties {
  presets: []
  plugins: []
}
export interface SyncOptions {
  enabled?: boolean
  options: BrowserSyncOptions
}
