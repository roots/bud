import {Bud} from '..'
export {Bud} from '..'
import type {BrowserSyncOptions} from '@roots/bud-typings'

import type {
  Configuration as WebpackConfiguration,
  Options as WebpackOptions,
} from 'webpack'
export type {WebpackConfiguration, WebpackOptions}

import {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin'
export type {DependencyExtractionOptions}

export type Devtool = (devtool: WebpackOptions.Devtool) => Bud
export type Dist = (path?: string) => string
export type Dump = (enabled: boolean) => Bud
export type PathSetter = (path: string) => Bud
export type Glob = (this: Bud, output: string, files: string) => Bud
export type Hash = (this: Bud, enabled?: boolean) => Bud
export type Hot = (
  this: Bud,
  options: {
    enabled: boolean
    host: string
    port?: number
    watch?: string[]
    open?: boolean
    headers?: any
    secure?: boolean
  },
) => Bud
export type Mini = (enabled?: boolean) => Bud
export type Option = (key: string) => string
export type PostCss = (options?: {enabled?: boolean; plugins?: any[]}) => Bud
export type Preset = (path?: string) => any
export type Project = (path?: string) => string
export type Resolve = (moduleName: string) => string
export type SourceMap = (enabled?: boolean) => Bud
export type Splitting = (enabled?: boolean) => Bud
export type Src = (path?: string) => string
export type Sync = (options: SyncOptions) => Bud
export type Target = (target: string) => Bud
export type Terser = (options: {enable?: boolean; terser?: any}) => Bud
export type Watch = (options: {paths: string[]; enabled: boolean}) => Bud

import type {Alias} from './alias'
export type {Alias}

import type {Auto} from './auto'
export type {Auto}

import type {Babel} from './babel'
export type {Babel}

import type {Bundle} from './bundle'
export type {Bundle}

import type {Compile} from './compile'
export type {Compile}

import type {Config} from './config'
export type {Config}

import type {Copy} from './copy'
export type {Copy}

import type {InlineManifest} from './inlineManifest'
export type {InlineManifest}

import type {UseExtension} from './use'
export type {UseExtension}

import type {Vendor} from './vendor'
export type {Vendor}

export type Api = {
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  compile: Compile
  config: Config
  copy: Copy
  copyAll: Copy
  devtool: Devtool
  dist: Dist
  distPath: PathSetter
  glob: Glob
  hash: Hash
  hot: Hot
  project: Project
  publicPath: PathSetter
  splitting: Splitting
  terser: Terser
  inlineManifest: InlineManifest
  map: SourceMap
  mini: Mini
  postCss: PostCss
  preset: Preset
  projectPath: PathSetter
  src: Src
  srcPath: PathSetter
  sync: Sync
  target: Target
  use: UseExtension
  vendor: Vendor
  watch: Watch
}
export interface SyncOptions {
  enabled?: boolean
  options: BrowserSyncOptions
}
