import type {ReadStream, WriteStream} from 'node:tty'

import type {Context} from '@roots/bud-framework/options/context'

export interface CLIContext extends Context {
  stdin: ReadStream
  stdout: WriteStream
  stderr: WriteStream
  colorDepth: number
}

export type {Builtins, Cli, CommandClass} from './app.js'

export {application} from './app.js'
