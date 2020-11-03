export as namespace Compilation

declare interface Build {
  progress: Progress
  stats: Compilation.Stats
}

declare interface Dev {
  progress: Progress
  stats: Compilation.Stats
}

export type Compiler = (bud: Framework.Bud) => Build
export type Server = (bud: Framework.Bud) => Dev

export type Progress = {
  percentage: {display: string; decimal: number}
  msg: string
}
export type Stats = Framework.Webpack.Stats.ToJsonOutput

export type Listening = boolean
export type Running = boolean
export type Watching = boolean

export namespace Stats {
  export type Warnings = Framework.Webpack.Stats.ToJsonOutput['warnings']
  export type Errors = Framework.Webpack.Stats.ToJsonOutput['errors']
}
