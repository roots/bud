import {Loose} from '../base'

export interface Dump {
  function(obj: any, prettierOptions?: any): void
}

export interface Fab {
  false: () => boolean
  true: () => boolean
  undefined: () => undefined
  null: () => null
}

export type Format = {
  [key: string]: Formatter
}
export type Formatter = (any) => string

interface TerminateOptions extends Loose {
  dump?: boolean
  timeout?: number
}

export type Terminate = (
  options?: TerminateOptions,
) => () => (err: Error) => void

export interface Util extends Loose {
  Terminate
  Formatter
  Fab
}
