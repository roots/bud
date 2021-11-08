import {alias} from './alias'
import {assets} from './assets'
import {config} from './config'
import {define} from './define'
import {devtool} from './devtool'
import {entry} from './entry'
import {experiments} from './experiments'
import externals from './externals'
import {hash} from './hash'
import {minimize} from './minimize'
import {persist} from './persist'
import provide from './provide'
import {proxy} from './proxy'
import {publicPath} from './publicPath'
import {run} from './run'
import {runtime} from './runtime'
import {serve} from './serve'
import setPublicPath from './setPublicPath'
import {splitChunks} from './splitChunks'
import {template} from './template'
import {use} from './use'
import {watch} from './watch'

export interface Repository {
  alias: alias
  assets: assets
  config: config
  define: define
  devtool: devtool
  entry: entry
  experiments: experiments
  externals: externals
  hash: hash
  minimize: minimize
  persist: persist
  provide: provide
  proxy: proxy
  publicPath: publicPath
  run: run
  runtime: runtime
  serve: serve
  setPublicPath: setPublicPath
  splitChunks: splitChunks
  template: template
  use: use
  watch: watch
}

export const Repository: Repository = {
  alias,
  assets,
  config,
  define,
  devtool,
  entry,
  experiments,
  externals,
  hash,
  minimize,
  persist,
  provide,
  proxy,
  publicPath,
  run,
  runtime,
  serve,
  setPublicPath,
  splitChunks,
  template,
  use,
  watch,
}
