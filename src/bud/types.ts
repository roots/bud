import type {Configuration} from 'webpack'
export type Mode = Configuration['mode']
export type Production = boolean

export type {Hooks} from './hooks'
export type {Plugin} from './plugin'
export type {State} from './state'
export type {Util} from './util'

export type {
  Alias,
  Auto,
  Babel,
  Bundle,
  Copy,
  Debug,
  DependencyManifest,
  Src,
  SrcPath,
  Sync,
  Vendor,
  Watch,
} from './api'
