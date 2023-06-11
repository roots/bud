import type {Bud} from '../index.js'

import {after} from './after/after.js'
import {close} from './close.js'
import {container} from './container.js'
import {get} from './get.js'
import {glob, globSync} from './glob/glob.js'
import {maybeCall} from './maybeCall.js'
import {path} from './path/path.js'
import {pipe} from './pipe/pipe.js'
import {processConfigs} from './processConfigs.js'
import {publicPath} from './publicPath.js'
import {relPath} from './relPath.js'
import {run} from './run.js'
import {sequence, sequenceSync} from './sequence.js'
import {setPath} from './setPath/setPath.js'
import {setPublicPath} from './setPublicPath.js'
import {sh} from './sh.js'
import {tap, tapAsync} from './tap.js'
import {when} from './when.js'

type methods = Partial<{
  [K in keyof Bud as `${K & string}`]: Bud[K]
}>

const methods = {
  after,
  close,
  container,
  get,
  glob,
  globSync,
  maybeCall,
  path,
  pipe,
  processConfigs,
  publicPath,
  relPath,
  run,
  sequence,
  sequenceSync,
  setPath,
  setPublicPath,
  sh,
  tap,
  tapAsync,
  when,
}

export default methods
