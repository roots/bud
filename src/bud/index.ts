import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugins} from './state/plugins'
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
  plugins,
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

bud.hooks.on('adapters_init', bud => {
  bud.plugins.repository.adapters = bud.plugins.repository.adapters
    .map(function ([name, adapter]) {
      return [name, bud.plugins.controller(bud).initController([name, adapter])]
    })
})

bud.hooks.on('adapters_build', bud => {
  bud.plugins.repository.adapters = bud.plugins.repository.adapters
    .map(function ([name, controller]) {
      return [name, controller.buildPlugin()]
    })
})

bud.hooks.on('adapters_yield', bud =>
  bud.plugins.repository.adapters = bud.plugins.repository.adapters
    .filter(([name, adapter]) => adapter)
    .map(([name, adapter]) => adapter)
)

export {bud}
