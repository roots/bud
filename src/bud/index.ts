import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {mode} from './mode'
import type {
  Mode,
  Hooks,
  Plugin,
  State,
  Util,
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
} from './types'

/**
 * Bud - asset management framework.
 *
 * @see {@link https://roots.io/bud}
 * @copyright Roots {@link https://roots.io}
 */
export type Bud = {
  hooks: Hooks
  util: Util
  plugin: Plugin
  mode: Mode
  state: State | undefined
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  copy: Copy
  copyAll: Copy
  debug: Debug
  dependencyManifest: DependencyManifest
  src: Src
  srcPath: SrcPath
  sync: Sync
  vendor: Vendor
  watch: Watch
}

const bud: Bud = {
  ...api,
  hooks,
  util,
  plugin,
  state,
  mode,
}

export {bud}
