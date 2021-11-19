import {alias} from './alias'
import {assets, copy, facade as assetsFacade} from './assets'
import {config} from './config'
import {define} from './define'
import {devtool} from './devtool'
import {entry, facade as entryFacade} from './entry'
import {experiments} from './experiments'
import {externals} from './externals'
import {hash} from './hash'
import {minimize} from './minimize'
import {persist} from './persist'
import {provide} from './provide'
import {proxy} from './proxy'
import {publicPath} from './publicPath'
import {run} from './run'
import {runtime} from './runtime'
import {serve} from './serve'
import {setPublicPath} from './setPublicPath'
import {splitChunks} from './splitChunks'
import {facade as templateFacade, template} from './template'
import {use} from './use'
import {watch} from './watch'

export interface Repository {
  alias: alias

  assets: assetsFacade
  copy: assetsFacade

  config: config
  webpackConfig: config
  override: config

  devtool: devtool

  splitChunks: splitChunks
  extract: splitChunks

  entry: entryFacade
  js: entryFacade
  css: entryFacade

  experiments: experiments
  externals: externals

  hash: hash
  version: hash

  define: define
  autoload: define

  minimize: minimize
  persist: persist
  provide: provide
  proxy: proxy
  publicPath: publicPath
  run: run
  runtime: runtime
  serve: serve
  setPublicPath: setPublicPath
  template: templateFacade
  use: use
  watch: watch
}

export const repository: Repository = {
  alias,

  assets: assets as unknown as assetsFacade,
  copy: copy as unknown as assetsFacade,

  config,
  webpackConfig: config,
  override: config,

  entry: entry as unknown as entryFacade,
  css: entry as unknown as entryFacade,
  js: entry as unknown as entryFacade,

  hash,
  version: hash,

  splitChunks,
  extract: splitChunks,

  define,
  autoload: define,

  devtool,
  experiments,
  externals,
  minimize,
  persist,
  provide,
  proxy,
  publicPath,
  run,
  runtime,
  serve,
  setPublicPath,
  template: template as unknown as templateFacade,
  use,
  watch,
}

export interface ImmediateExecution {
  publicPath: publicPath
}

export const immediateExecution = {
  publicPath,
}
