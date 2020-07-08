/**
 * Bud - asset management framework.
 *
 * @exports {bud} bud - build tool
 * @author  Kelly Mears <kelly@roots.io>
 */

import {existsSync} from 'fs-extra'
import {join, resolve} from 'path'

import {mode, inProduction} from './base/mode'
import {configs} from './base/configs'
import {features} from './base/features'
import {options} from './base/options'
import {paths} from './base/paths'

import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {dependencyManifest} from './api/dependencyManifest'
import {hash} from './api/hash'
import {hot} from './api/hot'
import {inlineManifest} from './api/inlineManifest'
import {postCss} from './api/postcss'
import {preset} from './api/preset'
import {project} from './api/project'
import {projectPath} from './api/projectPath'
import {publicPath} from './api/publicPath'
import {purge} from './api/purge'
import {setEnv} from './api/setEnv'
import {src} from './api/src'
import {srcPath} from './api/srcPath'
import {sync} from './api/sync'
import {translate} from './api/translate'

/**
 * @constructor
 */
const bud = function () {
  this.configs = configs
  this.features = features
  this.mode = mode
  this.inProduction = inProduction
  this.options = options
  this.paths = paths
}

bud.prototype.alias = alias
bud.prototype.auto = auto
bud.prototype.babel = babel
bud.prototype.bundle = bundle
bud.prototype.copy = copy
bud.prototype.copyAll = copyAll
bud.prototype.dependencyManifest = dependencyManifest
bud.prototype.dist = dist
bud.prototype.distPath = distPath
bud.prototype.env = env
bud.prototype.hash = hash
bud.prototype.hot = hot
bud.prototype.inlineManifest = inlineManifest
bud.prototype.postCss = postCss
bud.prototype.preset = preset
bud.prototype.purge = purge
bud.prototype.project = project
bud.prototype.setEnv = setEnv
bud.prototype.src = src
bud.prototype.srcPath = srcPath
bud.prototype.sync = sync
bud.prototype.translate = translate

/**
 * Bud - Asset Management Framework
 *
 * @typedef  {object} bud
 * @property {configs} configs
 * @property {features} features
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
 * @property {dependencyManifest} dependencyManifest
 * @property {dist} dist
 * @property {distPath} distPath
 * @property {hash} hash
 * @property {hot} hot
 * @property {inlineManifest} inlineManifest
 * @property {postCss} postCss
 * @property {preset} preset
 * @property {project} project
 * @property {purge} purge
 * @property {src} src
 * @property {srcPath} srcPath
 * @property {sync} sync
 * @property {translate} translate
 */
module.exports = new bud()
