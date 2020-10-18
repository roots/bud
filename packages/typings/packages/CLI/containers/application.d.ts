import {Stats as WebpackStats} from 'webpack'

export as namespace Compilation

declare interface Compilation {
  running: boolean
  watching: boolean
  progress: Progress
  stats: Stats
  errors: Stats.Errors
  warnings: Stats.Warnings
}

declare type Errors = Stats.Errors

declare type Progress = {percentage: number, msg: string}

declare type Hook = (bud: Framework.Bud) => Compilation

declare type Stats = WebpackStats.ToJsonOutput
declare namespace Stats {
  export type Warnings = WebpackStats.ToJsonOutput['warnings']
  export type Assets = WebpackStats.ToJsonOutput['assets']
  export type Errors = WebpackStats.ToJsonOutput['errors']
}
