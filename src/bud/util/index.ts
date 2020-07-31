import {dump} from './dump'
import {except} from './except'
import {fab} from './fab'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import process from './process'
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
  process,
  terminate,
  usedExt,
}
