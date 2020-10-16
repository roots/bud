import {useState, useEffect} from 'react'
import {Stats} from 'webpack'
import {formatWebpackMessages} from '@roots/bud-support'

const useDevServer: Hooks.Compilation.Server = ({
  compiler,
  server,
}) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [listening, setListening] = useState<boolean>(false)
  const [stats, setStats] = useState<Compilation.Stats>(null)
  const [warnings, setWarnings] = useState<
    Compilation.Stats.Warnings
  >(null)
  const [errors, setErrors] = useState<Compilation.Stats.Errors>(
    null,
  )
  const [progress, setProgress] = useState<Compilation.Progress>(
    {
      percentage: 0,
      msg: '',
    },
  )

  /**
   * Stats handler
   */
  const statsHandler: (stats: Stats) => void = stats => {
    const allStats = stats.toJson()

    setStats(allStats)

    // Use facebook formatter for error msgs
    const formatted = formatWebpackMessages(allStats)

    setErrors(formatted.errors)
    setWarnings(formatted.warnings)
  }

  /**
   * Progress handler
   */
  const progressHandler = (percentage: number, msg: string) => {
    if (typeof percentage !== 'number') return

    setProgress({
      percentage: Math.round(percentage * 100),
      msg: msg ?? progress.msg,
    })
  }

  /**
   * Apply plugins.
   */
  useEffect(() => {
    if (applied) return
    setApplied(true)
    compiler.applyPlugins(progressHandler)
  }, [compiler])

  /**
   * dev tap
   */
  useEffect(() => {
    if (tapped) return
    setTapped(true)
    compiler.compiler.hooks.done.tap('bud-cli', statsHandler)
  }, [tapped])

  /**
   * dev listen
   */
  useEffect(() => {
    if (listening || !applied || !tapped) return
    setListening(true)
    server.listen()
  }, [applied, tapped, listening])

  return {
    listening,
    progress,
    stats,
    errors,
    warnings,
  }
}

export {useDevServer as default}
