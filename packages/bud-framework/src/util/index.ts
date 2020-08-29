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

import type {Dump} from './dump'
export type {Dump}

import type {Fab} from './fab'
export type {Fab}

import type {Format} from './format'
export type {Format}

import type {ProjectRoot} from './projectRoot'
export type {ProjectRoot}

import type {ShortCircuit} from './shortCircuit'
export type {ShortCircuit}

import type {Terminate} from './terminate'
export type {Terminate}

export type Util = {
  _: typeof _
  fab: Fab
  format: Format
  fs: any
  logger: typeof logger
  os: typeof os
  processHandler: any
  projectRoot: ProjectRoot
  dump: Dump
  notify: any
  shortCircuit: ShortCircuit
  terminate: Terminate
}

export const util: Util = {
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
