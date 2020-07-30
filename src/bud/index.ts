import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {state} from './state'
import {compiler} from './compiler'

/**
 * Bud framework
 */
const framework = function () {
  this.configs = state.configs
  this.hooks = hooks().init(this)
  this.util = util
  this.state = state
  this.plugins = state.plugins
  this.options = state.options
  this.features = state.features
  this.mode = state.flags.get('mode')
  this.inDevelopment = state.flags.is('mode', 'development')
  this.inProduction = state.flags.is('mode', 'production')
  this.compiler = compiler
  this.alias = api.alias
  this.auto = api.auto
  this.babel = api.babel
  this.bundle = api.bundle
  this.compile = api.compile
  this.copy = api.copy
  this.copyAll = api.copyAll
  this.dashboard = api.dashboard
  this.devtool = api.devtool
  this.dist = api.dist
  this.distPath = api.distPath
  this.debug = api.debug
  this.dependencyManifest = api.dependencyManifest
  this.dev = api.dev
  this.dump = api.dump
  this.glob = api.glob
  this.hash = api.hash
  this.hot = api.hot
  this.inlineManifest = api.inlineManifest
  this.map = api.map
  this.mini = api.mini
  this.postCss = api.postCss
  this.preset = api.preset
  this.project = api.project
  this.projectPath = api.projectPath
  this.publicPath = api.publicPath
  this.purge = api.purge
  this.resolve = api.resolve
  this.scss = api.scss
  this.splitting = api.splitting
  this.src = api.src
  this.srcPath = api.srcPath
  this.stylelint = api.stylelint
  this.sync = api.sync
  this.target = api.target
  this.terser = api.terser
  this.translate = api.translate
  this.vendor = api.vendor
  this.vue = api.vue
  this.watch = api.watch
}

export {framework}
