import {dump} from './dump'
import {fab} from './fab'
import {notify} from './notify'
import {projectRoot} from './projectRoot'
import {shortCircuit} from './shortCircuit'
import {terminate} from './terminate'
import {processHandler} from './processHandler'
import {fs} from './fs'
import {os} from './os'
import {usedExt} from './usedExt'

import type {Dump} from './dump'
export type {Dump}

import type {Fab} from './fab'
export type {Fab}

import type {FS} from './fs'
export type {FS}

import type {ProjectRoot} from './projectRoot'
export type {ProjectRoot}

import type {ShortCircuit} from './shortCircuit'
export type {ShortCircuit}

import type {Terminate} from './terminate'
export type {Terminate}

export type Util = {
  fab: Fab
  fs: FS
  os: typeof os
  processHandler: any
  projectRoot: ProjectRoot
  dump: Dump
  notify: any
  shortCircuit: ShortCircuit
  terminate: Terminate
  usedExt: any
}

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
  os,
}

export {logger} from './logger'
