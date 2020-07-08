/**
 * Bud - asset management framework.
 *
 * @exports {Bud} bud - build tool
 * @author  Kelly Mears <kelly@roots.io>
 */

import {existsSync} from 'fs-extra'
import {join, resolve} from 'path'

/**
 * Default properties
 */
import {mode, inProduction} from './base/mode'
import {config, configs, hasConfig} from './base/configs'
import {features} from './base/features'
import {options} from './base/options'
import {paths} from './base/paths'

/**
 * API methods
 */
import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {devtool} from './api/devtool'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {dependencyManifest} from './api/dependencyManifest'
import {env} from './api/env'
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
import {vendor} from './api/vendor'

/**
 * Bud - asset management framework
 *
 * @constructor
 */
const Bud = function () {
  /**
   * @name Bud#configs
   * @typedef {typeof import('./base/configs')}
   */
  this.configs = configs

  /**
   * @name Bud#features
   * @typedef {typeof import('./base/features')}
   */
  this.features = features

  /**
   * @name Bud#mode
   * @typedef {typeof import('./base/mode').mode}
    */
  this.mode = mode

  /**
   * @name Bud#inProduction
   * @typedef {typeof import('./base/mode').inProduction}
   */
  this.inProduction = inProduction

  /**
   * @name Bud#options
   * @typedef {typeof import('./base/options)}
   */
  this.options = options

  /**
   * @name Bud#paths
   * @typedef {typeof import('./base/paths)}
   */
  this.paths = paths
}

Bud.prototype.alias = alias
Bud.prototype.auto = auto
Bud.prototype.babel = babel
Bud.prototype.bundle = bundle
Bud.prototype.copy = copy
Bud.prototype.copyAll = copyAll
Bud.prototype.dependencyManifest = dependencyManifest
Bud.prototype.devtool = devtool
Bud.prototype.dist = dist
Bud.prototype.distPath = distPath
Bud.prototype.env = env
Bud.prototype.hash = hash
Bud.prototype.hot = hot
Bud.prototype.inlineManifest = inlineManifest
Bud.prototype.postCss = postCss
Bud.prototype.preset = preset
Bud.prototype.purge = purge
Bud.prototype.project = project
Bud.prototype.setEnv = setEnv
Bud.prototype.src = src
Bud.prototype.srcPath = srcPath
Bud.prototype.sync = sync
Bud.prototype.translate = translate

/**
 * @typedef  {{configs: configs, features: features, inProduction: mode.inProduction, mode: mode.mode, options: options, paths: paths, alias: alias, auto: auto, babel: babel, bundle: bundle, copy: copy, copyAll: copyAll, dependencyManifest: dependencyManifest, devtool: devtool, dist: dist, distPath: distPath, env: env, hash: hash, hot: hot, inlineManifest: inlineManifest, postCss: postCss, project: project, purge: purge, steEnv: setEnv, src: src, srcPath: srcPath, sync: sync, translate: translate, vendor: vendor}} bud
 * @property {configs} configs
 * @property {features} features
 * @property {mode.inProduction} inProduction
 * @property {mode.mode} mode
 * @property {options} options
 * @property {paths} paths
 * @property {alias} alias
 * @property {auto} auto
 * @property {babel} babel
 * @property {bundle} bundle
 * @property {copy} copy
 * @property {copyAll} copyAll
 * @property {dependencyManifest} dependencyManifest
 * @property {devtool} devtool
 * @property {dist} dist
 * @property {distPath} distPath
 * @property {env} env
 * @property {hash} hash
 * @property {hot} hot
 * @property {inlineManifest} inlineManifest
 * @property {postCss} postCss
 * @property {preset} preset
 * @property {project} project
 * @property {purge} purge
 * @property {setEnv} setEnv
 * @property {src} src
 * @property {srcPath} srcPath
 * @property {sync} sync
 * @property {translate} translate
 * @property {vendor} vendor
 */

const bud = new Bud

/**
 * Bud - Asset management framework
 * @exports {Bud} bud
 */

module.exports = bud
