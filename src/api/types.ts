import {Bud} from '../types'
export {Bud} from '../types'

import type {Options as BrowserSyncOptions} from 'browser-sync'
export type {BrowserSyncOptions}

import type {
  Configuration as WebpackConfiguration,
  Options as WebpackOptions,
} from 'webpack'
export type {WebpackConfiguration, WebpackOptions}

import type {Options as StylelintOptions} from 'stylelint-webpack-plugin/declarations/getOptions'
export type {StylelintOptions}

import {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin'
export type {DependencyExtractionOptions}

export type Use = (this: Bud, plugin: any) => Bud
export type Alias = (arg0: object) => Bud
export type Auto = (options: {[key: string]: string[]}) => Bud
export type BabelCfg = (options: BabelOptions) => Bud
export type Bundle = (name: string, entries: string[]) => Bud
export type Copy = (from: string, to: string) => Bud
export type Debug = (enabled?: boolean) => any
export type DependencyManifest = (settings?: DependencyExtractionOptions) => Bud
export type Dev = (options: object) => Bud
export type Devtool = (devtool: WebpackOptions.Devtool) => Bud
export type Dist = (path?: string) => string
export type Dump = (enabled: boolean) => Bud
export type Eslint = (enabled: boolean) => Bud
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
    headers?: object
    secure?: boolean
  },
) => Bud
export type InlineManifest = (name?: string) => Bud
export type Mini = (enabled?: boolean) => Bud
export type Option = (key: string) => string
export type PostCss = (options?: {enabled?: boolean; plugins?: any[]}) => Bud
export type Preset = (path?: string) => any
export type Project = (path?: string) => string
export type Purge = (any) => Bud
export type Resolve = (moduleName: string) => string
export type Scss = (enabled?: boolean) => Bud
export type SourceMap = (enabled?: boolean) => Bud
export type Splitting = (enabled?: boolean) => Bud
export type Stylelint = (options: {
  enabled?: boolean
  options?: StylelintOptions
}) => Bud
export type Src = (path?: string) => string
export type Sync = (options: SyncOptions) => Bud
export type Target = (target: string) => Bud
export type Terser = (options: {enable?: boolean; terser?: object}) => Bud
export type Watch = (options: {paths: string[]; enabled: boolean}) => Bud
export type Vendor = (name?: string) => Bud

export type Api = {
  use: Use
  alias: Alias
  auto: Auto
  babel: BabelCfg
  bundle: Bundle
  compile: any
  config: any
  copy: Copy
  copyAll: Copy
  debug: Debug
  dependencyManifest: DependencyManifest
  dev: Dev
  devtool: Devtool
  dist: Dist
  distPath: PathSetter
  dump: Dump
  eslint: Eslint
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
  scss: Scss
  src: Src
  srcPath: PathSetter
  stylelint: Stylelint
  sync: Sync
  target: Target
  vendor: Vendor
  watch: Watch
}

import {TransformOptions as BabelOptions} from '@babel/core'
export {BabelOptions}
export interface SyncOptions {
  enabled?: boolean
  options: BrowserSyncOptions
}
