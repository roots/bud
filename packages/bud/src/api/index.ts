import addExtensions, {AddExtensions} from './addExtensions'
import alias, {Alias} from './alias'
import {babel, Babel} from './babel'
import brotli, {Brotli} from './brotli'
import bundle, {Bundle} from './bundle'
import compile, {Compile} from './compile'
import copy, {Copy} from './copy'
import copyAll, {CopyAll} from './copyAll'
import dev, {Dev} from './dev'
import devtool, {Devtool} from './devtool'
import dist, {Dist} from './dist'
import distPath, {DistPath} from './distPath'
import extend, {Extend} from './extend'
import hash, {Hash} from './hash'
import gzip, {Gzip} from './gzip'
import glob, {Glob} from './glob'
import runtimeManifest, {
  RuntimeManifest,
} from './runtimeManifest'
import template, {Template} from './template'
import minify, {Minify} from './minify'
import postcss, {PostCss} from './postcss'
import project, {Project} from './project'
import projectPath, {ProjectPath} from './projectPath'
import provide, {Provide} from './provide'
import publicPath, {PublicPath} from './publicPath'
import src, {Src} from './src'
import srcPath, {SrcPath} from './srcPath'
import target, {Target} from './target'
import terser, {Terser} from './terser'
import vendor, {Vendor} from './vendor'
import when, {When} from './when'

export type {
  AddExtensions,
  Alias,
  Babel,
  Brotli,
  Bundle,
  Compile,
  Copy,
  CopyAll,
  Dev,
  Devtool,
  Dist,
  DistPath,
  Extend,
  Hash,
  Gzip,
  Glob,
  RuntimeManifest,
  Minify,
  PostCss,
  Project,
  ProjectPath,
  Provide,
  PublicPath,
  Src,
  SrcPath,
  Target,
  Template,
  Terser,
  Vendor,
  When,
}

export {
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
  minify,
  postcss,
  project,
  projectPath,
  provide,
  publicPath,
  src,
  srcPath,
  target,
  template,
  terser,
  vendor,
  when,
}
