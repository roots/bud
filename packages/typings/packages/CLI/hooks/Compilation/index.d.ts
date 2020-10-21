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
  progress: Compilation.Progress
  stats: Compilation.Stats
  errors: Compilation.Stats.Errors
  warnings: Compilation.Stats.Warnings
}

export type Compiler = (bud: Framework.Bud) => Build
export type Server = (bud: Framework.Bud) => Dev

export type Progress = {percentage: number, msg: string}
export type Stats = Framework.Webpack.Stats.ToJsonOutput

export type Listening = boolean
export type Running = boolean
export type Watching = boolean

export namespace Stats {
  export type Warnings = Framework.Webpack.Stats.ToJsonOutput['warnings']
  export type Errors = Framework.Webpack.Stats.ToJsonOutput['errors']
}
