import {dump} from './dump'
import {except} from './except'
import {fab} from './fab'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {setProcess} from './setProcess'
import type {Util} from './types'

export const util: Util = {
  dump,
  except,
  shortCircuit,
  fab,
  setProcess,
  terminate,
}
