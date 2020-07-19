/**
 * Bud - asset management framework.
 * @exports {Bud} bud - build tool
 * @author  Kelly Mears <kelly@roots.io>
 */

/** Constructor props */
import {mode, inProduction} from './base/mode'
import {configs} from './base/configs'
import {features} from './base/features'
import {hooks} from './base/hooks'
import {options} from './base/options'
import {paths} from './base/paths'

/** Prototypal methods */
import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {dashboard} from './api/dashboard'
import {debug} from './api/debug'
import {dev} from './api/dev'
import {devtool} from './api/devtool'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {dependencyManifest} from './api/dependencyManifest'
import {dump} from './api/dump'
import {env} from './api/env'
import {hash} from './api/hash'
import {hot} from './api/hot'
import {inlineManifest} from './api/inlineManifest'
import {map} from './api/map'
import {mini} from './api/mini'
import {postCss} from './api/postcss'
import {preset} from './api/preset'
import {project} from './api/project'
import {projectPath} from './api/projectPath'
import {publicPath} from './api/publicPath'
import {purge} from './api/purge'
import {register} from './api/register'
import {setEnv} from './api/setEnv'
import {src} from './api/src'
import {srcPath} from './api/srcPath'
import {sync} from './api/sync'
import {target} from './api/target'
import {translate} from './api/translate'
import {vendor} from './api/vendor'
import {watch} from './api/watch'

/**
 * @constructor
 */
const Bud = function () {
  this.hooks = hooks.init()
  this.configs = configs
  this.features = features
  this.mode = mode
  this.inProduction = inProduction
  this.options = options
  this.paths = paths
}

Bud.prototype.alias = alias
Bud.prototype.auto = auto
Bud.prototype.babel = babel
Bud.prototype.bundle = bundle
Bud.prototype.copy = copy
Bud.prototype.copyAll = copyAll
Bud.prototype.dashboard = dashboard
Bud.prototype.debug = debug
Bud.prototype.dependencyManifest = dependencyManifest
Bud.prototype.dev = dev
Bud.prototype.devtool = devtool
Bud.prototype.dist = dist
Bud.prototype.distPath = distPath
Bud.prototype.dump = dump
Bud.prototype.env = env
Bud.prototype.hash = hash
Bud.prototype.hot = hot
Bud.prototype.inlineManifest = inlineManifest
Bud.prototype.map = map
Bud.prototype.mini = mini
Bud.prototype.postCss = postCss
Bud.prototype.preset = preset
Bud.prototype.project = project
Bud.prototype.projectPath = projectPath
Bud.prototype.publicPath = publicPath
Bud.prototype.purge = purge
Bud.prototype.register = register
Bud.prototype.setEnv = setEnv
Bud.prototype.src = src
Bud.prototype.srcPath = srcPath
Bud.prototype.sync = sync
Bud.prototype.targete = target
Bud.prototype.translate = translate
Bud.prototype.vendor = vendor
Bud.prototype.watch = watch

/**
 * @typedef  {object}  bud
 * @property {configs} configs
 * @property {features} features
 * @property {hooks} hooks
 * @property {inProduction} inProduction
 * @property {mode} mode
 * @property {options} options
 * @property {paths} paths
 * @property {alias} alias
 * @property {auto} auto
 * @property {babel} babel
 * @property {bundle} bundle
 * @property {copy} copy
 * @property {copyAll} copyAll
 * @property {dashboard} dashboard
 * @property {debug} debug
 * @property {dependencyManifest} dependencyManifest
 * @property {dev} dev
 * @property {devtool} devtool
 * @property {dist} dist
 * @property {distPath} distPath
 * @property {dump} dump
 * @property {env} env
 * @property {hash} hash
 * @property {hot} hot
 * @property {inlineManifest} inlineManifest
 * @property {map} map
 * @property {mini} mini
 * @property {plugins} plugins
 * @property {postCss} postCss
 * @property {preset} preset
 * @property {project} project
 * @property {projectPath} projectPath
 * @property {publicPath} publicPath
 * @property {purge} purge
 * @property {register} register
 * @property {setEnv} setEnv
 * @property {src} src
 * @property {srcPath} srcPath
 * @property {sync} sync
 * @property {target} target
 * @property {translate} translate
 * @property {vendor} vendor
 * @property {watch} watch
 */
const bud = new Bud()

/**
 * Bud - Asset management framework
 * @exports {Bud} bud
 */
module.exports = bud
