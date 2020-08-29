import {
  Container,
  FileContainer,
  PluginContainer,
} from '@roots/bud-framework'

export type Options = Container

import type {
  BrowserSyncOptions,
  WebpackExternals,
} from '@roots/bud-typings'

export type BrowserSync = BrowserSyncOptions

export type Copy = {
  patterns: any[]
}
export type Dev = any

export type Externals = WebpackExternals

export type PostCssConfiguration = {
  plugins: any[]
}

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
