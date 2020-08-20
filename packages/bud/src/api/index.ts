import type {Api} from './types'
import {alias} from './alias'
import {auto} from './auto'
import {babel} from './babel'
import {bundle} from './bundle'
import {compile} from './compile'
import {config} from './config'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {dist} from './dist'
import {distPath} from './distPath'
import {devtool} from './devtool'
import {glob} from './glob'
import {hash} from './hash'
import {hot} from './hot'
import {manifest} from './manifest'
import {runtimeManifest} from './runtimeManifest'
import {map} from './map'
import {mini} from './mini'
import {postCss} from './postcss'
import {preset} from './preset'
import {project} from './project'
import {projectPath} from './projectPath'
import {publicPath} from './publicPath'
import {splitting} from './splitting'
import {src} from './src'
import {srcPath} from './srcPath'
import {sync} from './sync'
import {target} from './target'
import {terser} from './terser'
import {use} from './use'
import {vendor} from './vendor'
import {watch} from './watch'

/**
 * Bud.Bud export
 */
export const api: Api = {
  alias,
  auto,
  babel,
  bundle,
  compile,
  config,
  copy,
  copyAll,
  devtool,
  dist,
  distPath,
  glob,
  hash,
  hot,
  manifest,
  map,
  mini,
  postCss,
  preset,
  project,
  projectPath,
  publicPath,
  runtimeManifest,
  splitting,
  src,
  srcPath,
  sync,
  target,
  terser,
  use,
  vendor,
  watch,
}
