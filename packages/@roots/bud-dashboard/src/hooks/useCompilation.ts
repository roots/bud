import {
  useState,
  useEffect,
  ProgressPlugin,
} from '@roots/bud-support'
import type {Framework, Compiler} from '@roots/bud-typings'

export type CompilationAsset = {
  name: string
  active: boolean
  size: number
  hot: boolean
  info?: string
}

export interface Compilation {
  progress: {
    percentage: string
    decimal: number
    message: string
  }
  stats: Compiler.Stats.Output['json']
  errors?: string[]
}

/**
 * Use compilation
 */
export const useCompilation = (bud: Framework) => {
  const [stats, setStats] = useState(bud?.compiler?.stats?.json)
  const [errors, setErrors] = useState<string[]>(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    bud.compiler.compile()
  }, [])

  useEffect(() => {
    if (!bud?.compiler?.instance) return

    bud.compiler.instance.hooks.done.tap('bud', stats => {
      setStats(stats.toJson(bud.compiler.statsOptions.json))

      stats.hasErrors()
        ? setErrors(stats?.toJson('errors-only').errors)
        : setErrors(null)
    })

    new ProgressPlugin((percentage, message): void => {
      const decimal =
        percentage && typeof percentage == 'number'
          ? percentage
          : 0

      setProgress({
        decimal,
        percentage: `${Math.floor(decimal * 100)}%`,
        message,
      })
    }).apply(bud.compiler.instance)

    /**
     * Exec
     */
    !bud.isDevelopment
      ? bud.compiler.instance.run((err, stats: any) => {
          stats &&
            setStats(
              stats.toJson(bud.compiler.statsOptions.json),
            )

          stats?.hasErrors()
            ? setErrors(stats?.toJson('errors-only').errors)
            : setErrors(null)
        })
      : bud.server.run(bud.compiler.instance)
  }, [bud])

  return {
    progress,
    stats,
    errors,
    mode: bud.options.get('mode'),
  }
}
