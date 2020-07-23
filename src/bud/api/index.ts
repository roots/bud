import {alias} from './alias'
import {auto} from './auto'
import {babel} from './babel'
import {bundle} from './bundle'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {dashboard} from './dashboard'
import {debug} from './debug'
import {dependencyManifest} from './dependencyManifest'
import {resolve} from './resolve'
import {src} from './src'
import {srcPath} from './srcPath'
import {sync} from './sync'
import {vendor} from './vendor'
import {watch} from './watch'

/**
 * Bud.Bud export
 */
export const api = {
  alias,
  auto,
  babel,
  bundle,
  copy,
  copyAll,
  dashboard,
  debug,
  dependencyManifest,
  resolve,
  src,
  srcPath,
  sync,
  vendor,
  watch,
}

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
  resolve: Resolve
  src: Src
  srcPath: SrcPath
  sync: Sync
  vendor: Vendor
  watch: Watch
}

/**
 * bud.Bud typings
 */
import {Bud} from '..'
export {Bud} from '..'

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
export type InlineManifest = (name?: string) => Bud
export type Resolve = (moduleName: string) => string
export type Src = (relativePath: string) => string
export type SrcPath = (src: string) => Bud
export type Sync = (arg0: SyncOptions) => Bud
export type Watch = (enabled: boolean) => Bud
export type Vendor = (name: string) => Bud

export interface BabelProperties {
  presets: []
  plugins: []
}

export interface SyncOptions {
  enabled?: boolean
  options: BrowserSyncOptions
}
