import {Bud} from '../types'
export {Bud} from '../types'
export {RegisteredPlugin} from '../plugin/types'
import type {Options as BrowserSyncOptions} from 'browser-sync'

export type Alias = (arg0: object) => Bud
export type Auto = (options: {[key: string]: string[]}) => Bud
export type Babel = (arg0: BabelProperties) => Bud
export type Bundle = (name: string, entries: Object) => Bud
export type Copy = (from: string, to: string) => Bud
export type Dashboard = (enabled: boolean) => Bud
export type Debug = (enabled: boolean) => any
export type DependencyManifest = (settings?: object) => Bud
export type Dev = (options: object) => Bud
export type Devtool = (devtool: string) => Bud
export type Dist = (path?: string) => string
export type DistPath = (src: string) => Bud
export type InlineManifest = (name?: string) => Bud
export type Mini = (enabled?: boolean) => Bud
export type PostCss = (options?: {
  enabled?: boolean
  plugins?: any[]
}) => Bud
export type Preset = (path?: string) => any
export type Project = (path?: string) => string
export type ProjectPath = (path: string) => Bud
export type Purge = (any) => Bud
export type Resolve = (moduleName: string) => string
export type Register = (name: string, plugin: any) => Bud
export type SourceMap = (enabled?: boolean) => Bud
export type Src = (path?: string) => string

/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src') // default unless specified
 * ```
 */
export type SrcPath = (src: string) => Bud

export type Sync = (arg0: SyncOptions) => Bud
export type Target = (target: string) => Bud
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
  features: any
  inlineManifest: InlineManifest
  map: SourceMap
  mini: Mini
  postCss: PostCss
  preset: Preset
  projectPath: ProjectPath
  resolve: Resolve
  register: Register
  scss: any
  src: Src
  srcPath: SrcPath
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
