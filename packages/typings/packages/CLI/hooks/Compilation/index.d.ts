export as namespace Compilation
/**
 * Compiler hook
 */
export type Compiler = (bud: Framework.Bud) => Build

/**
 * Compiler hook product
 */
declare interface Build {
  progress: Progress
  stats: Compilation.Stats
}

/**
 * Server hook
 */
export type Server = (bud: Framework.Bud) => Dev

/**
 * Server hook product
 */
declare interface Dev {
  progress: Progress
  stats: Compilation.Stats
}

/**
 * Compiler progress
 */
export type Progress = {
  percentage: {display: string; decimal: number}
  msg: string
}

/**
 * Compiler stats
 */
export type Stats = Framework.Webpack.Stats.ToJsonOutput
export namespace Stats {
  /**
   * Reported assets.
   */
  export type Assets = Framework.Webpack.Stats.ToJsonOutput['assets']

  /**
   * Reported warnings.
   */
  export type Warnings = Framework.Webpack.Stats.ToJsonOutput['warnings']

  /**
   * Reported errors.
   */
  export type Errors = Framework.Webpack.Stats.ToJsonOutput['errors']
}
