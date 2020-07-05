/** Path setters */
import {makeProjectPath} from './projectPath'
import {makeDistPath} from './distPath'
import {makeSrcPath} from './srcPath'
import {makePublicPath} from './publicPath'

/** Path helpers */
import {makeDist} from './dist'
import {makeProject} from './project'
import {makeSrc} from './src'
import {makePreset} from './preset'

/** Options */
import {makeAlias} from './alias'
import {makeAuto} from './auto'
import {makeBabel} from './babel'
import {makeBundle} from './bundle'
import {makeCopy} from './copy'
import {makeCopyAll} from './copyAll'
import {makeDependencyManifest} from './dependencyManifest'
import {makeHash} from './hash'
import {makeHot} from './hot'
import {makeInlineManifest} from './inlineManifest'
import {makePostCss} from './postcss'
import {makePurge} from './purge'
import {makeSync} from './sync'
import {makeTranslate} from './translate'

/**
 * Bud API builder methods
 */
const generators = [
  makeProjectPath,
  makeDistPath,
  makeSrcPath,
  makePublicPath,
  makeDist,
  makeProject,
  makeSrc,
  makePreset,
  makeAlias,
  makeAuto,
  makeBabel,
  makeBundle,
  makeCopy,
  makeCopyAll,
  makeDependencyManifest,
  makeHash,
  makeHot,
  makeInlineManifest,
  makePostCss,
  makePurge,
  makeSync,
  makeTranslate,
]

export default generators
