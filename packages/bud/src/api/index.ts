import addExtensions, {
  AddExtensions as IAddExtensions,
} from './addExtensions'
import alias, {Alias as IAlias} from './alias'
import babel, {Babel as IBabel} from './babel'
import brotli, {Brotli as IBrotli} from './brotli'
import bundle, {Bundle as IBundle} from './bundle'
import compile, {Compile as ICompile} from './compile'
import copy, {Copy as ICopy} from './copy'
import copyAll, {CopyAll as ICopyAll} from './copyAll'
import dev, {Dev as IDev} from './dev'
import devtool, {Devtool as IDevtool} from './devtool'
import dist, {Dist as IDist} from './dist'
import distPath, {DistPath as IDistPath} from './distPath'
import extend, {Extend as IExtend} from './extend'
import hash, {Hash as IHash} from './hash'
import gzip, {Gzip as IGzip} from './gzip'
import glob, {Glob as IGlob} from './glob'
import runtimeManifest, {
  RuntimeManifest as IRuntimeManifest,
} from './runtimeManifest'
import mini, {Mini as IMini} from './mini'
import postcss, {PostCss as IPostCss} from './postcss'
import project, {Project as IProject} from './project'
import projectPath, {
  ProjectPath as IProjectPath,
} from './projectPath'
import provide, {Provide as IProvide} from './provide'
import publicPath, {
  PublicPath as IPublicPath,
} from './publicPath'
import src, {Src as ISrc} from './src'
import srcPath, {SrcPath as ISrcPath} from './srcPath'
import target, {Target as ITarget} from './target'
import terser, {Terser as ITerser} from './terser'
import vendor, {Vendor as IVendor} from './vendor'
import when, {When as IWhen} from './when'

export declare namespace Api {
  export type AddExtensions = IAddExtensions
  export type Alias = IAlias
  export type Babel = IBabel
  export type Brotli = IBrotli
  export type Bundle = IBundle
  export type Compile = ICompile
  export type Copy = ICopy
  export type CopyAll = ICopyAll
  export type Dev = IDev
  export type Devtool = IDevtool
  export type Dist = IDist
  export type DistPath = IDistPath
  export type Extend = IExtend
  export type Hash = IHash
  export type Gzip = IGzip
  export type Glob = IGlob
  export type RuntimeManifest = IRuntimeManifest
  export type Mini = IMini
  export type PostCss = IPostCss
  export type Project = IProject
  export type ProjectPath = IProjectPath
  export type Provide = IProvide
  export type PublicPath = IPublicPath
  export type Src = ISrc
  export type SrcPath = ISrcPath
  export type Target = ITarget
  export type Terser = ITerser
  export type Vendor = IVendor
  export type When = IWhen
}

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
