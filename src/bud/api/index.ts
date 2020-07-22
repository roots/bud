import {alias} from './alias'
import {auto} from './auto'
import {babel} from './babel'
import {bundle} from './bundle'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {src} from './src'
import {srcPath} from './srcPath'
import {sync} from './sync'
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
  src,
  srcPath,
  sync,
  watch,
}

export type Api = {
  alias: Alias,
  auto: Auto,
  babel: Babel,
  bundle: Bundle,
  copy: Copy,
  copyAll: CopyAll,
  src: Src,
  srcPath: SrcPath,
  sync: Sync,
  watch: Watch,
}

/**
 * bud.Bud typings
 */
import {Bud} from '..'
export {Bud} from '..'

import type {Options as BrowserSyncOptions} from 'browser-sync'

export type Alias = (object) => Bud;
export type Auto = (options: {[key: string]: string[]}) => Bud
export type Babel = (arg0: BabelOptions) => Bud
export type Bundle = (name: string, entries: Object) => Bud
export type Copy = (from: string, to: string) => Bud
export type CopyAll = (from: string, to: string) => Bud
export type Debug = (enabled: boolean) => any
export type Src = (relativePath: string) => string
export type SrcPath = (src: string) => Bud
export type Sync = (arg0: SyncOptions) => Bud
export type Watch = (enabled: boolean) => Bud

export interface BabelOptions {
  presets: [],
  plugins: [],
}
export interface SyncOptions {
  enabled?: boolean;
  options: BrowserSyncOptions;
}