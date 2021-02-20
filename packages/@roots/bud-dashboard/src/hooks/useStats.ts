import {webpack} from '@roots/bud-support'

export namespace UseStats {
  /**
   * UseStats interface.
   */
  export interface Hook {
    (options: any): {
      stats: Stats
      errors: string[]
      handler: Handler
    }
  }

  /**
   * Stats JSON
   */
  export type Stats = webpack.Stats.ToJsonOutput

  /**
   * Process raw webpack stats.
   */
  export type Handler = (stats: webpack.Stats) => void

  /**
   * Reported assets.
   */
  export type Assets = Stats['assets']

  /**
   * Reported warnings.
   */
  export type Warnings = Stats['warnings']

  /**
   * Reported errors.
   */
  export type Errors = Stats['errors']
}
