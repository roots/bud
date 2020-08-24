import {dump} from './dump'
import {fab} from './fab'
import {notify} from './notify'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {processHandler} from './processHandler'
import {fs} from './fs'
import {usedExt} from './usedExt'
import type {Util} from './types'

export const util: Util = {
  fs,
  dump,
  shortCircuit,
  fab,
  notify,
  projectRoot,
  processHandler,
  terminate,
  usedExt,
}

export {logger} from './logger'
