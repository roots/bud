import type {Context} from '@roots/bud-framework/options/context'
import type {ReadStream, WriteStream} from 'node:tty'

export interface CLIContext extends Context {
  colorDepth: number
  stderr: WriteStream
  stdin: ReadStream
  stdout: WriteStream
}

export type {Builtins, Cli, CommandClass} from './app.js'

export {application} from './app.js'
