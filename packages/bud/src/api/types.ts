import {Bud} from '..'
export {Bud} from '..'

import type {Configuration as WebpackConfiguration} from 'webpack'
export type {WebpackConfiguration}

import {Options as DependencyExtractionOptions} from '@wordpress/dependency-extraction-webpack-plugin'
export type {DependencyExtractionOptions}

export declare type Dist = (path?: string) => string
export declare type Dump = (enabled: boolean) => Bud
export declare type PathGetter = (path: string | undefined) => string
export declare type PathSetter = (path: string) => Bud
export declare type Glob = (
  this: Bud,
  output: string,
  files: string,
) => Bud
export declare type Hash = (this: Bud, {enabled: boolean}) => Bud
export declare type Option = (key: string) => string
export declare type PostCss = (options?: {
  enabled?: boolean
  plugins?: any[]
}) => Bud
export declare type Preset = (path?: string) => any
export declare type Project = (path?: string) => string
export declare type Resolve = (moduleName: string) => string
export declare type SourceMap = (enabled?: boolean) => Bud
export declare type Target = (target: string) => Bud

import type {AddExtensions} from './addExtensions'
export type {AddExtensions}

import type {Alias} from './alias'
export type {Alias}

import type {Provide} from './provide'
export type {Provide}

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

import type {Mini} from './mini'
export type {Mini}

import type {RuntimeManifest} from './runtimeManifest'
export type {RuntimeManifest}

import type {Terser} from './terser'
export type {Terser}

import type {UsePlugin} from './use'
export type {UsePlugin}

import type {Vendor} from './vendor'
export type {Vendor}

import type {When} from './when'
export type {When}

export declare type Fluent = (
  this: Bud,
  options: {
    [key: string]: any
  },
) => Bud

export type Api = {
  addExtensions: AddExtensions
  alias: Alias
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
  provide: Provide
  publicPath: PathSetter
  runtimeManifest: RuntimeManifest
  src: PathGetter
  srcPath: PathSetter
  target: Target
  terser: Terser
  use: UsePlugin
  vendor: Vendor
  when: When
}
