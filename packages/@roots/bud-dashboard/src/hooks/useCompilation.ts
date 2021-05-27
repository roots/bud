import {useState, useEffect} from 'react'
import webpack from 'webpack'
import {Dashboard} from '@roots/bud-framework'

/**
 * Use compilation
 */
export const useCompilation: Dashboard.Compilation.Hook =
  app => {
    const [stats, setStats] = useState(
      app?.compiler?.stats?.json,
    )
    const [errors, setErrors] =
      useState<Dashboard.Compilation.WebpackMessage[]>(null)
    const [hasErrors, setHasErrors] = useState<boolean>(false)
    const [warnings, setWarnings] =
      useState<Dashboard.Compilation.WebpackMessage[]>(null)
    const [hasWarnings, setHasWarnings] =
      useState<boolean>(false)
    const [progress, setProgress] = useState(null)
    const [closed, setClosed] = useState(false)

    /**
     * Compilation callback
     * production mode callback takes two parameters (webpack err and stats)
     * however, the done hook used in development just takes one (stats)
     *
     * here we parse the callback args so that we dont have to
     * duplicate the callback.
     */
    const callback = (...args: any[]) => {
      const [err, stats] =
        args.length > 1 ? args : [null, args.pop()]

      app.when(err, () => console.error(err))

      const json = stats?.toJson(app.compiler.statsOptions)

      if (json) {
        setStats(json)
        setErrors(json.errors)
        setWarnings(json.errors)

        app
          .when(
            json?.hasErrors,
            () => setHasErrors(true),
            () => setErrors(null),
          )
          .when(
            json?.hasWarnings,
            () => setHasWarnings(true),
            () => setWarnings(null),
          )
      }
    }

    useEffect(() => {
      if (app.compiler.isCompiled) return

      app.compiler.compile(app.hooks.filter('after'))

      app.compiler.instance.hooks.done.tap(app.name, () =>
        app.compiler.instance.close(err => {
          err && setErrors([...(errors ?? []), err])
          setClosed(true)
          app.isProduction && setTimeout(process.exit, 1000)
        }),
      )

      new webpack.ProgressPlugin((percentage, message): void => {
        const decimal =
          percentage && typeof percentage === 'number'
            ? percentage
            : 0

        setProgress({
          decimal,
          percentage: `${Math.floor(decimal * 100)}%`,
          message,
        })
      }).apply(app.compiler.instance)

      app.when(
        !app.isDevelopment,
        () => {
          app.compiler.instance.run(callback)
        },
        ({server}) => {
          server.run(app.compiler.instance)
        },
      )
    })

    return {
      closed,
      progress,
      stats,
      errors,
      hasErrors,
      warnings,
      hasWarnings,
    }
  }
