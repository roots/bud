import {addExtensions} from './addExtensions'
import {alias} from './alias'
import {babel} from './babel'
import {brotli} from './brotli'
import {bundle} from './bundle'
import {compile} from './compile'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {dist} from './dist'
import {distPath} from './distPath'
import {devtool} from './devtool'
import {glob} from './glob'
import {gzip} from './gzip'
import {hash} from './hash'
import {dev} from './dev'
import extend from './extend'
import {mini} from './mini'
import {postcss} from './postcss'
import {project} from './project'
import {projectPath} from './projectPath'
import {provide} from './provide'
import {publicPath} from './publicPath'
import {runtimeManifest} from './runtimeManifest'
import {src} from './src'
import {srcPath} from './srcPath'
import {target} from './target'
import {terser} from './terser'
import {vendor} from './vendor'
import {when} from './when'

const api = {
  addExtensions,
  alias,
  babel,
  brotli,
  bundle,
  compile,
  copy,
  copyAll,
  devtool,
  dist,
  distPath,
  glob,
  gzip,
  hash,
  dev,
  mini,
  postcss,
  project,
  projectPath,
  provide,
  publicPath,
  runtimeManifest,
  src,
  srcPath,
  target,
  terser,
  extend,
  vendor,
  when,
}

export {api as default}
