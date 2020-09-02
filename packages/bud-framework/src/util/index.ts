import {fab} from './fab'
import {notify} from './notify'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {processHandler} from './processHandler'

import dd from './dd'
import dump from './dump'
import format from './format'
import {fs} from './fs'
import {logger} from './logger'
import {os} from './os'
import terminate from './terminate'

import _ from 'lodash'

export const util = {
  _,
  format,
  fs,
  dump,
  dd,
  logger,
  shortCircuit,
  fab,
  notify,
  projectRoot,
  processHandler,
  terminate,
  os,
}
