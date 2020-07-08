/** Path setters */
import {projectPath} from './projectPath'
import {distPath} from './distPath'
import {publicPath} from './publicPath'
import {srcPath} from './srcPath'

/** Path helpers */
import {dist} from './dist'
import {project} from './project'
import {preset} from './preset'
import {src} from './src'

/** Options */
import {alias} from './alias'
import {auto} from './auto'
import {babel} from './babel'
import {bundle} from './bundle'
import {copy} from './copy'
import {copyAll} from './copyAll'
import {dependencyManifest} from './dependencyManifest'
import {hash} from './hash'
import {hot} from './hot'
import {inlineManifest} from './inlineManifest'
import {postCss} from './postcss'
import {purge} from './purge'
import {sync} from './sync'
import {translate} from './translate'

/**
 * Bud API methods
 *
 * @property {alias} alias
 * @property {auto} auto
 * @property {babel} babel
 * @property {bundle} bundle
 * @property {projectPath} projectPath
 */
const api = [
  projectPath,
  distPath,
  publicPath,
  srcPath,
  dist,
  project,
  src,
  preset,
  auto,
  babel,
  bundle,
  copy,
  copyAll,
  dependencyManifest,
  hash,
  hot,
  inlineManifest,
  postCss,
  purge,
  sync,
  translate,
]

export {api}
