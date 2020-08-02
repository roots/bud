import {dump} from './dump'
import {except} from './except'
import {fab} from './fab'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {processHandler} from './processHandler'
import {usedExt} from './usedExt'
import {fs} from './fs'
import type {Util} from './types'

export const util: Util = {
  fs,
  dump,
  except,
  shortCircuit,
  fab,
  projectRoot,
  processHandler,
  terminate,
  usedExt,
}

export {nodeExternals} from './nodeExternals'
export {logger} from './logger'
