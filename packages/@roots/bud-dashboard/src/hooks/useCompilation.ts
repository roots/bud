import {useState, useEffect, webpack} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'

/**
 * Use compilation
 */
export const useCompilation: Dashboard.Compilation.Hook = app => {
  const [stats, setStats] = useState(app?.compiler?.stats?.json)
  const [errors, setErrors] = useState<
    Dashboard.Compilation.WebpackMessage[]
  >(null)
  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [warnings, setWarnings] = useState<
    Dashboard.Compilation.WebpackMessage[]
  >(null)
  const [hasWarnings, setHasWarnings] = useState<boolean>(false)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    app.compiler.compile(app.build.make())
  }, [])

  useEffect(() => {
    if (!app?.compiler?.instance) return

    app.compiler.instance.hooks.done.tap('app', stats => {
      if (!stats) return

      setStats(stats.toJson(app.compiler.statsOptions.json))

      if (!stats?.hasErrors) return

      setHasErrors(stats.hasErrors())

      stats.hasErrors()
        ? setErrors(stats.toJson('errors-only').errors)
        : setErrors(null)
    })

    new webpack.ProgressPlugin((percentage, message): void => {
      const decimal =
        percentage && typeof percentage == 'number'
          ? percentage
          : 0

      setProgress({
        decimal,
        percentage: `${Math.floor(decimal * 100)}%`,
        message,
      })
    }).apply(app.compiler.instance)

    const compilerCallback = (err, stats: any) => {
      if (!stats) return

      stats = stats.toJson(app.compiler.statsOptions.json)

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
    }

    /**
     * Exec
     */
    !app.isDevelopment
      ? app.compiler.instance.run(compilerCallback)
      : app.server.run(app.compiler.instance)
  }, [app])

  return {
    progress,
    stats,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  }
}
