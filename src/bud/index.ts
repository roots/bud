import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {mode} from './mode'

import type {Hooks} from './hooks'
import type {Mode} from './mode'
import type {Plugin} from './plugin'
import type {Util} from './util'
import type {State} from './state'
import type {
  Alias,
  Auto,
  Babel,
  Bundle,
  Copy,
  Src,
  SrcPath,
  Sync,
  Watch,
} from './api'

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
  src: Src,
  srcPath: SrcPath
  sync: Sync
  watch: Watch
}

export const bud: Bud = {
  alias: api.alias,
  auto: api.auto,
  babel: api.babel,
  bundle: api.bundle,
  copy: api.copy,
  src: api.src,
  srcPath: api.srcPath,
  sync: api.sync,
  watch: api.watch,
  hooks,
  util,
  plugin,
  mode,
  state,
}
