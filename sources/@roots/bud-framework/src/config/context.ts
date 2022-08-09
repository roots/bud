import type {Readable, Writable} from 'node:stream'

export interface Context {
  label?: string
  basedir?: string
  manifest?: Record<string, any>
  args?: Record<
    string,
    | string
    | boolean
    | undefined
    | number
    | Array<string | boolean | number>
  >
  disk?: {
    config?: Record<string, any>
  }
  application: {
    label: string
    version: string
    basedir: string
  }
  env: Record<string, string | undefined>
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}
