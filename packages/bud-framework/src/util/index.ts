import {dump} from './dump'
import {fab} from './fab'
import {format} from './format'
import {notify} from './notify'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {processHandler} from './processHandler'
import {fs} from './fs'
import {os} from './os'
import {logger} from './logger'

import _ from 'lodash'

export const util = {
  _,
  format,
  fs,
  dump,
  logger,
  shortCircuit,
  fab,
  notify,
  projectRoot,
  processHandler,
  terminate,
  os,
}
