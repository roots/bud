import {useState, useEffect} from 'react'
import webpack from 'webpack'
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

  /**
   * Compilation callback
   */
  const callback = (...args: any[]) => {
    /**
     * production mode callback takes two parameters (webpack err and stats)
     * however, the done hook used in development just takes one (stats)
     *
     * here we parse the callback args so that we dont have to
     * duplicate the callback.
     */
    const [err, stats] =
      args.length > 1 ? args : [null, args.pop()]

    app.when(err, () => {
      app.error(err, 'Webpack error (pre-compile)')
      process.exit()
    })

    if (!stats) return

    const jsonStats = stats.toJson(
      app.compiler.statsOptions.json,
    )

    setStats(jsonStats)

    if (jsonStats?.hasErrors) {
      setHasErrors(jsonStats.hasErrors())
      setErrors(jsonStats.errors)
    } else {
      setErrors(null)
    }

    if (jsonStats?.hasWarnings) {
      setHasWarnings(jsonStats.hasWarnings())
      setWarnings(jsonStats.warnings)
    } else {
      setWarnings(null)
    }
  }

  /**
   * Update data when app.compiler diffs
   */
  useEffect(() => {
    if (app.compiler.instance) return

    app.when(
      !app.isDevelopment,
      ({compiler}) =>
        compiler.compile(app.build.make()).run(callback),
      ({server}) => {
        // Compile
        const instance = app.compiler.compile(app.build.make())

        // Callback
        instance.hooks.done.tap(`${app.name}`, callback)

        // Progress
        new webpack.ProgressPlugin(
          (percentage, message): void => {
            const decimal =
              percentage && typeof percentage == 'number'
                ? percentage
                : 0

            setProgress({
              decimal,
              percentage: `${Math.floor(decimal * 100)}%`,
              message,
            })
          },
        ).apply(instance)

        // Run dev server
        server.run(instance)
      },
    )
  }, [app.compiler])

  return {
    progress,
    stats,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  }
}
