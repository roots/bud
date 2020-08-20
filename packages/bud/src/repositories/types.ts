import type {
  BrowserSyncOptions,
  WebpackExternals,
  WebpackTarget,
} from '@roots/bud-typings'

import type {Container, FileContainer} from '../container'
import type {Bud} from '..'
export type {Bud}

export type Options = Container

export type BabelConfiguration = {
  plugins: []
  presets: []
}
export type BrowserSync = BrowserSyncOptions
export type Copy = {
  patterns: any[]
}
export type Dev = any
export type Externals = WebpackExternals
export type PostCssConfiguration = {
  plugins: []
}
export type Target = WebpackTarget
export type Vendor = {name: string}

type Features = any
export type {Features}

type Flags = Container
export type {Flags}

type Args = Container
export type {Args}

type Configs = FileContainer
export type {Configs}

import type {Directory, Paths} from './paths'
export type {Directory, Paths}

export type Environment = any
