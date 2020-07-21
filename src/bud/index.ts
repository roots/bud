import {mode, inProduction} from './base/mode'
import {configs} from './base/configs'
import {features} from './base/features'
import {hooks} from './base/hooks'
import {options} from './base/options'
import {paths} from './base/paths'
import {webpackPlugins} from './base/webpackPlugins'
import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {dashboard} from './api/dashboard'
import {debug} from './api/debug'
import {dev} from './api/dev'
import {devtool} from './api/devtool'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {dependencyManifest} from './api/dependencyManifest'
import {dump} from './api/dump'
import {env} from './api/env'
import {hash} from './api/hash'
import {hot} from './api/hot'
import {inlineManifest} from './api/inlineManifest'
import {map} from './api/map'
import {mini} from './api/mini'
import {postCss} from './api/postcss'
import {preset} from './api/preset'
import {project} from './api/project'
import {projectPath} from './api/projectPath'
import {publicPath} from './api/publicPath'
import {purge} from './api/purge'
import {register} from './api/register'
import {setEnv} from './api/setEnv'
import {src} from './api/src'
import {srcPath} from './api/srcPath'
import {sync} from './api/sync'
import {target} from './api/target'
import {translate} from './api/translate'
import {vendor} from './api/vendor'
import {watch} from './api/watch'

const bud: bud = {
  alias,
  auto,
  babel,
  bundle,
  copy,
  copyAll,
  dashboard,
  debug,
  dependencyManifest,
  dev,
  devtool,
  dist,
  distPath,
  dump,
  env,
  hash,
  hot,
  inlineManifest,
  map,
  mini,
  postCss,
  preset,
  project,
  projectPath,
  publicPath,
  purge,
  register,
  setEnv,
  src,
  srcPath,
  sync,
  target,
  translate,
  vendor,
  watch,
  configs,
  features,
  hooks,
  mode,
  inProduction,
  options,
  paths,
  webpackPlugins,
}

module.exports = bud

import type {Paths} from './base/paths'
import type {Alias} from './api/alias'
import type {Auto} from './api/auto'
import type {Babel} from './api/babel'
import type {Bundle} from './api/bundle'
import type {Copy} from './api/copy'
import type {CopyAll} from './api/copyAll'
import type {Dashboard} from './api/dashboard'
import type {Debug} from './api/debug'
import type {DependencyManifest} from './api/dependencyManifest'
import type {Features} from './base/features'
import type {Hooks} from './base/hooks'
import type {InlineManifest} from './api/inlineManifest'
import type {Map} from './api/map'
import type {Preset} from './api/preset'
import type {Register} from './api/register'
import type {Mode, Production} from './base/mode'
import type {Configs} from './base/configs'
import type {Options} from './base/options'
import type {WebpackPluginAdapters} from './base/webpackPlugins'

export declare type bud = {
  alias: Alias,
  auto: Auto,
  babel: Babel,
  bundle: Bundle,
  configs: Configs,
  copy: Copy,
  copyAll: CopyAll,
  dashboard: Dashboard,
  debug: Debug,
  dependencyManifest: DependencyManifest,
  inlineManifest: InlineManifest,
  map: Map,
  mini: any,
  postCss: any,
  preset: Preset,
  webpackPlugins: WebpackPluginAdapters,
  dev: any,
  devtool: any,
  dist: any,
  distPath: any,
  dump: any,
  env: any,
  hash: any,
  hooks: Hooks,
  hot: any,
  project: any,
  projectPath: any,
  publicPath: any,
  purge: any,
  register: Register,
  setEnv: any,
  src: any,
  srcPath: any,
  sync: any,
  target: any,
  translate: any,
  vendor: any,
  watch: any,
  features: Features,
  mode: Mode,
  inProduction: Production,
  options: Options,
  paths: Paths,
}

export declare type BudConstructor = (any: any) => any
