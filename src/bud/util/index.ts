import {dump} from './dump'
import {except} from './except'
import {fab} from './fab'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {setProcess} from './setProcess'
import {usedExt} from './usedExt'
import type {Util} from './types'

export const util: Util = {
  dump,
  except,
  shortCircuit,
  fab,
  projectRoot,
  setProcess,
  terminate,
  usedExt,
}
