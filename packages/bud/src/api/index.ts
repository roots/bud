export {AddExtensions} from './addExtensions'
export {Alias} from './alias'
export {Babel} from './babel'
export {Brotli} from './brotli'
export {Bundle} from './bundle'
export {Compile} from './compile'
export {Copy} from './copy'
export {CopyAll} from './copyAll'
export {Dev} from './dev'
export {Devtool} from './devtool'
export {Dist} from './dist'
export {DistPath} from './distPath'
export {Extend} from './extend'
export {Hash} from './hash'
export {Gzip} from './gzip'
export {Glob} from './glob'
export {RuntimeManifest} from './runtimeManifest'
export {Mini} from './mini'
export {PostCss} from './postcss'
export {Project} from './project'
export {ProjectPath} from './projectPath'
export {Provide} from './provide'
export {PublicPath} from './publicPath'
export {Src} from './src'
export {SrcPath} from './srcPath'
export {Target} from './target'
export {Terser} from './terser'
export {Vendor} from './vendor'
export {When} from './when'

import addExtensions from './addExtensions'
import alias from './alias'
import babel from './babel'
import brotli from './brotli'
import bundle from './bundle'
import compile from './compile'
import copy from './copy'
import copyAll from './copyAll'
import dev from './dev'
import devtool from './devtool'
import dist from './dist'
import distPath from './distPath'
import extend from './extend'
import hash from './hash'
import gzip from './gzip'
import glob from './glob'
import runtimeManifest from './runtimeManifest'
import mini from './mini'
import postcss from './postcss'
import project from './project'
import projectPath from './projectPath'
import provide from './provide'
import publicPath from './publicPath'
import src from './src'
import srcPath from './srcPath'
import target from './target'
import terser from './terser'
import vendor from './vendor'
import when from './when'

const api: {[key: string]: any} = {
  addExtensions,
  alias,
  babel,
  brotli,
  bundle,
  compile,
  copy,
  copyAll,
  dev,
  devtool,
  dist,
  distPath,
  extend,
  hash,
  gzip,
  glob,
  runtimeManifest,
  mini,
  postcss,
  project,
  projectPath,
  provide,
  publicPath,
  src,
  srcPath,
  target,
  terser,
  vendor,
  when,
}

export {api as default}
