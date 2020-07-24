import {Bud} from '../Types'
export {Bud} from '../Types'
export {RegisteredPlugin} from './../plugin/types'
import type {Options as BrowserSyncOptions} from 'browser-sync'

export type Alias = (arg0: object) => Bud
export type Auto = (options: {
  [key: string]: string[]
}) => Bud
export type Babel = (arg0: BabelProperties) => Bud
export type Bundle = (name: string, entries: Object) => Bud
export type Copy = (from: string, to: string) => Bud
export type Dashboard = (enabled: boolean) => Bud
export type Debug = (enabled: boolean) => any
export type DependencyManifest = (settings?: object) => Bud
export type Dev = (options: object) => Bud
export type Devtool = (devtool: string) => Bud
export type InlineManifest = (name?: string) => Bud
export type Mini = (enabled?: boolean) => Bud
export type PostCss = (options?: {
  enabled?: boolean
  plugins?: any[]
}) => Bud
export type Preset = (relativePath: string) => any
export type Resolve = (moduleName: string) => string
export type Register = (name: string, plugin: any) => Bud
export type SourceMap = (enabled: boolean) => Bud
export type Src = (relativePath: string) => string
export type SrcPath = (src: string) => Bud
export type Sync = (arg0: SyncOptions) => Bud
export type Target = (target: string) => Bud
export type Translate = (output: string) => Bud
export type Watch = (enabled: boolean) => Bud
export type Vendor = (name: string) => Bud
export type Api = {
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  copy: Copy
  copyAll: Copy
  dashboard: Dashboard
  debug: Debug
  dependencyManifest: DependencyManifest
  dev: Dev
  devtool: Devtool
  inlineManifest: InlineManifest
  map: SourceMap
  mini: Mini
  postCss: PostCss
  preset: Preset
  resolve: Resolve
  register: Register
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
