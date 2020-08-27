import {Bud} from '..'
export {Bud} from '..'

import type {Configuration as WebpackConfiguration} from 'webpack'
export type {WebpackConfiguration}

import {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin'
export type {DependencyExtractionOptions}

export type Dist = (path?: string) => string
export type Dump = (enabled: boolean) => Bud
export type PathSetter = (path: string) => Bud
export type Glob = (this: Bud, output: string, files: string) => Bud
export type Hash = (this: Bud, enabled?: boolean) => Bud
export type Mini = (enabled?: boolean) => Bud
export type Option = (key: string) => string
export type PostCss = (options?: {
  enabled?: boolean
  plugins?: any[]
}) => Bud
export type Preset = (path?: string) => any
export type Project = (path?: string) => string
export type Resolve = (moduleName: string) => string
export type SourceMap = (enabled?: boolean) => Bud
export type Src = (path?: string) => string
export type Target = (target: string) => Bud

import type {AddExtensions} from './addExtensions'
export type {AddExtensions}

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

import type {Copy} from './copy'
export type {Copy}

import type {Dev} from './dev'
export type {Dev}

import type {Devtool} from './devtool'
export type {Devtool}

import type {Manifest} from './manifest'
export type {Manifest}

import type {RuntimeManifest} from './runtimeManifest'
export type {RuntimeManifest}

import type {Terser} from './terser'
export type {Terser}

import type {UseExtension} from './use'
export type {UseExtension}

import type {Vendor} from './vendor'
export type {Vendor}

export type Api = {
  addExtensions: AddExtensions
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  compile: Compile
  copy: Copy
  copyAll: Copy
  dev: Dev
  devtool: Devtool
  dist: Dist
  distPath: PathSetter
  glob: Glob
  hash: Hash
  manifest: Manifest
  map: SourceMap
  mini: Mini
  postcss: PostCss
  preset: Preset
  projectPath: PathSetter
  project: Project
  publicPath: PathSetter
  runtimeManifest: RuntimeManifest
  src: Src
  srcPath: PathSetter
  target: Target
  terser: Terser
  use: UseExtension
  vendor: Vendor
}
