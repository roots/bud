import type {Context} from '@roots/bud-framework/context'

export interface CLIContext extends Context {
  colorDepth: number
}

export type {Builtins, Cli, CommandClass} from './app.js'

export {application} from './app.js'
