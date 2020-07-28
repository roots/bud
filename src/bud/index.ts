import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {inProduction, mode} from './flags'
import {compiler} from './compiler'
import type {Bud} from './types'

/**
 * Bud - asset management framework.
 *
 * @type {Bud}
 */
const bud: Bud = {
  hooks,
  util,
  state,
  mode,
  inProduction,
  plugin,
  compiler,
  alias: api.alias,
  auto: api.auto,
  babel: api.babel,
  bundle: api.bundle,
  compile: api.compile,
  copy: api.copy,
  copyAll: api.copyAll,
  dashboard: api.dashboard,
  dist: api.dist,
  distPath: api.distPath,
  debug: api.debug,
  dependencyManifest: api.dependencyManifest,
  dev: api.dev,
  devtool: api.devtool,
  dump: api.dump,
  env: api.env,
  featureEnabled: api.featureEnabled,
  features: api.features,
  glob: api.glob,
  hash: api.hash,
  hot: api.hot,
  inlineManifest: api.inlineManifest,
  map: api.map,
  mini: api.mini,
  option: api.option,
  postCss: api.postCss,
  preset: api.preset,
  project: api.project,
  projectPath: api.projectPath,
  proxy: api.proxy,
  publicPath: api.publicPath,
  purge: api.purge,
  resolve: api.resolve,
  scss: api.scss,
  splitting: api.splitting,
  src: api.src,
  srcPath: api.srcPath,
  sync: api.sync,
  target: api.target,
  terser: api.terser,
  translate: api.translate,
  vendor: api.vendor,
  watch: api.watch,
}

bud.plugin.init(bud)

export {bud}
