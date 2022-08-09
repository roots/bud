import type {Readable, Writable} from 'node:stream'

import type {Bud} from '../bud.js'

export interface Context {
  label?: string
  root?: Bud
  basedir?: string
  bud?: Record<string, any>
  manifest?: Record<string, any>
  mode?: 'development' | 'production'
  args?: Record<
    string,
    | string
    | boolean
    | undefined
    | number
    | Array<string | boolean | number>
  >
  config?: Record<string, any>
  extensions?: Array<string>
  services?: Record<string, any>
  seed?: Record<string, any>
  env?: Record<string, string | undefined>
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}
