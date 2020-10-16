import {Stats as WebpackStats} from 'webpack'

export as namespace Compilation

declare interface Build {
  running: Compilation.Running
  watching: Compilation.Watching
  progress: Compilation.Progress
  stats: Compilation.Stats
  errors: Compilation.Stats.Errors
  warnings: Compilation.Stats.Warnings
}

declare interface Dev {
  listening: Compilation.Listening
  progress: Compilation.Progress
  stats: Compilation.Stats
  errors: Compilation.Stats.Errors
  warnings: Compilation.Stats.Warnings
}

export type Compiler = (bud: Framework.Bud) => Build
export type Server = (bud: Framework.Bud) => Dev

export type Progress = {percentage: number, msg: string}
export type Stats = WebpackStats.ToJsonOutput

export type Listening = boolean
export type Running = boolean
export type Watching = boolean

export namespace Stats {
  export type Warnings = WebpackStats.ToJsonOutput['warnings']
  export type Assets = WebpackStats.ToJsonOutput['assets']
  export type Errors = WebpackStats.ToJsonOutput['errors']
}
