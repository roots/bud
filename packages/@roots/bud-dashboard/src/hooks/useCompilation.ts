import {
  useState,
  useEffect,
  ProgressPlugin,
} from '@roots/bud-support'
import {Framework} from '@roots/bud-framework'
import {Compiler} from '@roots/bud-typings'

export type CompilationAsset = {
  name: string
  active: boolean
  size: number
  hot: boolean
  info?: string
}

interface WebpackMessage {
  moduleIdentifier: string
  moduleName: string
  message: string
}

export interface Compilation {
  progress: {
    percentage: string
    decimal: number
    message: string
  }
  stats: Compiler.Stats.Output['json']
  errors?: WebpackMessage[]
  warnings?: WebpackMessage[]
}

/**
 * Use compilation
 */
export const useCompilation = (bud: Framework) => {
  const [stats, setStats] = useState(bud?.compiler?.stats?.json)
  const [errors, setErrors] = useState<WebpackMessage[]>(null)
  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [warnings, setWarnings] = useState<WebpackMessage[]>(
    null,
  )
  const [hasWarnings, setHasWarnings] = useState<boolean>(false)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    bud.compiler.compile(bud.build.make())
  }, [])

  useEffect(() => {
    if (!bud?.compiler?.instance) return

    bud.compiler.instance.hooks.done.tap('bud', stats => {
      if (!stats) return

      setStats(stats.toJson(bud.compiler.statsOptions.json))

      if (!stats?.hasErrors) return

      setHasErrors(stats.hasErrors())

      stats.hasErrors()
        ? setErrors(stats.toJson('errors-only').errors)
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
          if (!stats) return

          stats = stats.toJson(bud.compiler.statsOptions.json)

          setStats(stats)

          if (stats?.hasErrors) {
            setHasErrors(stats.hasErrors())
            stats.hasErrors()
              ? setErrors(stats.errors)
              : setErrors(null)
          }
          if (stats?.hasWarnings) {
            setHasWarnings(stats.hasWarnings())
            stats.hasWarnings()
              ? setWarnings(stats.warnings)
              : setWarnings(null)
          }
        })
      : bud.server.run(bud.compiler.instance)
  }, [bud])

  return {
    progress,
    stats,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  }
}
