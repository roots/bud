import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {compiler} from './compiler'
import type {Bud} from './types'

/**
 * Bud - asset management framework.
 *
 * @const {Bud} bud
 */
const bud: Bud = {
  hooks,
  util,
  state,
  options: state.options,
  configs: state.configs,
  features: state.features,
  mode: state.flags.get('mode'),
  inDevelopment: state.flags.is('mode', 'development'),
  inProduction: state.flags.is('mode', 'production'),
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
  devtool: api.devtool,
  dist: api.dist,
  distPath: api.distPath,
  debug: api.debug,
  dependencyManifest: api.dependencyManifest,
  dev: api.dev,
  dump: api.dump,
  glob: api.glob,
  hash: api.hash,
  hot: api.hot,
  inlineManifest: api.inlineManifest,
  map: api.map,
  mini: api.mini,
  postCss: api.postCss,
  preset: api.preset,
  project: api.project,
  projectPath: api.projectPath,
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
