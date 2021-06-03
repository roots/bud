import {useState, useEffect} from 'react'
import {Dashboard} from '@roots/bud-framework'

export const useCompilation: Dashboard.Compilation.Hook =
  app => {
    const [stats, setStats] = useState()

    const [errors, setErrors] = useState<any>(null)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    const [warnings, setWarnings] = useState<any>(null)
    const [hasWarnings, setHasWarnings] =
      useState<boolean>(false)

    const [progress, setProgress] = useState(null)

    useEffect(() => {
      setProgress(app.compiler.progress)
    }, [app.compiler])

    useEffect(() => {
      setErrors(app.compiler.errors)
    }, [app.compiler])

    useEffect(() => {
      setHasErrors(app.compiler.hasErrors)
    }, [app.compiler])

    useEffect(() => {
      setWarnings(app.compiler.warnings)
    }, [app.compiler])

    useEffect(() => {
      setHasWarnings(app.compiler.hasWarnings)
    }, [app.compiler.hasWarnings])

    useEffect(() => {
      setStats(app.compiler.stats)
    }, [app.compiler])

    useEffect(() => {
      if (app.compiler.isCompiled) return

      app.mode == 'development'
        ? app.server.run()
        : (() => {
            app.compiler.compile()
            app.compiler.instance.run(app.compiler.callback)
          })()
    })

    return {
      progress,
      stats,
      errors,
      hasErrors,
      warnings,
      hasWarnings,
    }
  }
