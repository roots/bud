import {useState} from 'react'
import type Webpack from 'webpack'

export const useStats: UseStats.Hook = options => {
  const [stats, setStats]: [
    UseStats.Stats,
    React.Dispatch<UseStats.Stats>,
  ] = useState<UseStats.Stats>(null)

  const [errors, setErrors]: [
    string[],
    React.Dispatch<string[]>,
  ] = useState<string[]>(null)

  const handler: UseStats.Handler = stats => {
    if (stats?.hasErrors()) {
      stats && setErrors(stats.toJson(options.json).errors)
    } else {
      setErrors(null)
    }

    stats && setStats({...stats.toJson(options.json)})
  }

  return [stats, errors, handler]
}

export namespace UseStats {
  /**
   * UseStats interface.
   */
  export interface Hook {
    (options: any): Tuple
  }

  export type Tuple = [Stats, string[], Handler]

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
