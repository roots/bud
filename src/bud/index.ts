import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {inProduction, mode} from './mode'
import type {Configuration} from 'webpack'
import type {Hooks} from './hooks/types'
import type {Plugin} from './plugin/types'
import type {State} from './state/types'
import type {Util} from './util/types'
import type * as Api from './api/types'

export type Mode = Configuration['mode']
export type Production = boolean
export type Bud = {
  hooks: Hooks
  util: Util
  plugin: Plugin
  mode: Mode
  inProduction: Production
  state: State
  alias: Api.Alias
  auto: Api.Auto
  babel: Api.Babel
  bundle: Api.Bundle
  copy: Api.Copy
  copyAll: Api.Copy
  dashboard: Api.Dashboard
  debug: Api.Debug
  dependencyManifest: Api.DependencyManifest
  dev: Api.Dev
  devtool: Api.Devtool
  dist: Api.Dist
  distPath: Api.DistPath
  env: any
  hash: any
  inlineManifest: Api.InlineManifest
  map: Api.SourceMap
  mini: Api.Mini
  postCss: Api.PostCss
  preset: Api.Preset
  project: Api.Project
  purge: Api.Purge
  register: Api.Register
  resolve: any
  src: Api.Src
  srcPath: Api.SrcPath
  sync: Api.Sync
  target: Api.Target
  translate: Api.Translate
  vendor: Api.Vendor
  watch: Api.Watch
}

/**
 * Bud - asset management framework.
 */
const bud: Bud = {
  hooks,
  util,
  plugin,
  state,
  mode,
  inProduction,
  alias: api.alias,
  auto: api.auto,
  babel: api.babel,
  bundle: api.bundle,
  copy: api.copy,
  copyAll: api.copyAll,
  dashboard: api.dashboard,
  dist: api.dist,
  distPath: api.distPath,
  debug: api.debug,
  dependencyManifest: api.dependencyManifest,
  dev: api.dev,
  devtool: api.devtool,
  env: api.env,
  hash: api.hash,
  inlineManifest: api.inlineManifest,
  map: api.map,
  mini: api.mini,
  postCss: api.postCss,
  preset: api.preset,
  project: api.project,
  purge: api.purge,
  resolve: api.resolve,
  register: api.register,
  src: api.src,
  srcPath: api.srcPath,
  sync: api.sync,
  target: api.target,
  translate: api.translate,
  vendor: api.vendor,
  watch: api.watch,
}

export {bud}
