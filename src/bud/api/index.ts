import type {Api} from './types'
import {alias} from './alias'
import {auto} from './auto'
import {babel} from './babel'
import {bundle} from './bundle'
import {compile} from './compile'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {dashboard} from './dashboard'
import {debug} from './debug'
import {dependencyManifest} from './dependencyManifest'
import {dist} from './dist'
import {distPath} from './distPath'
import {dev} from './dev'
import {devtool} from './devtool'
import {dump} from './dump'
import {env} from './env'
import {glob} from './glob'
import {hash} from './hash'
import {hot} from './hot'
import {inlineManifest} from './inlineManifest'
import {map} from './map'
import {mini} from './mini'
import {postCss} from './postcss'
import {preset} from './preset'
import {project} from './project'
import {projectPath} from './projectPath'
import {proxy} from './proxy'
import {publicPath} from './publicPath'
import {purge} from './purge'
import {resolve} from './resolve'
import {setEnv} from './setEnv'
import {splitting} from './splitting'
import {src} from './src'
import {srcPath} from './srcPath'
import {scss} from './scss'
import {sync} from './sync'
import {target} from './target'
import {terser} from './terser'
import {translate} from './translate'
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
  glob,
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
  resolve,
  scss,
  splitting,
  src,
  srcPath,
  sync,
  target,
  terser,
  translate,
  vendor,
  watch,
}
