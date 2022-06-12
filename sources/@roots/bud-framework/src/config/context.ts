import type {Readable, Writable} from 'node:stream'

export interface Context {
  name: string
  cwd: string
  projectDir: string
  manifest: Record<string, any>
  application: {
    name: string
    label: string
    version: string
    dir: string
  }
  args: Record<
    string,
    | string
    | boolean
    | undefined
    | number
    | Array<string | boolean | number>
  >
  disk: {
    config: Record<string, any>
  }
  env: Record<string, string | undefined>
  stdin: Readable
  stdout: Writable
  stderr: Writable
  colorDepth: number
}
