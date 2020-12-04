import {useState} from 'react'
import type Webpack from 'webpack'

export const useStats: UseStats.Hook = () => {
  const [stats, setStats]: [
    UseStats.Stats,
    React.Dispatch<UseStats.Stats>,
  ] = useState<UseStats.Stats>(null)

  const handler: UseStats.Handler = stats => {
    if (stats.hasErrors()) {
      console.log(stats.toJson().errors)
      throw Error('Whoops')
    }

    stats && setStats(stats.toJson())
  }

  return [stats, handler]
}

export namespace UseStats {
  /**
   * UseStats interface.
   */
  export interface Hook {
    (): Tuple
  }

  export type Tuple = [Stats, Handler]

  /**
   * Stats JSON
   */
  export type Stats = Webpack.Stats.ToJsonOutput

  /**
   * Process raw webpack stats.
   */
  export type Handler = (stats: Webpack.Stats) => void

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

export default useStats
