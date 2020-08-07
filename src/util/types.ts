import {Bud} from './../types'

export type {Bud}
export type Dump = (obj: Object) => void
export type Except = Function
export type ShortCircuit = () => any
export type Fab = {
  false: () => boolean
  true: () => boolean
  undefined: () => undefined
  null: () => null
}
export type ProjectRoot = string
export type Fs = {
  path
  existsSync
}
export type Util = {
  fs: Fs
  dump: Dump
  except: Except
  shortCircuit: ShortCircuit
  fab: Fab
  projectRoot: ProjectRoot
  terminate: (any) => void
  processHandler: any
  usedExt: (any, bud: Bud) => any[],
}
