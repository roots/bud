import {useState, useEffect} from 'react'
import Webpack, {Stats} from 'webpack'
import {formatWebpackMessages} from '@roots/bud-support'

const useCompilation = ({compiler, server}) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [running, setRunning] = useState<boolean>(false)
  const [watching, setWatching] = useState<boolean>(false)
  const [listening, setListening] = useState<boolean>(false)
  const [stats, setStats] = useState<Stats.ToJsonOutput>(null)
  const [mode, setMode] = useState<
    Webpack.Configuration['mode']
  >('none')

  const [errors, setErrors] = useState<
    Webpack.Stats['compilation']['errors']
  >(null)

  const [warnings, setWarnings] = useState<
    Webpack.Stats['compilation']['warnings']
  >(null)

  const [progress, setProgress] = useState<{
    percentage: number
    msg: string
  }>({
    percentage: 0,
    msg: '',
  })

  useEffect(() => {
    if (mode) return

    setMode(compiler.getConfig().mode)
  }, [!mode, compiler])

  // Stats handler
  const statsHandler: (stats: Stats) => void = stats => {
    const allStats = stats.toJson()

    setStats(allStats)

    // Use facebook formatter for error msgs
    const formatted = formatWebpackMessages(allStats)

    setErrors(formatted.errors)
    setWarnings(formatted.warnings)
  }

  /** Progress handler */
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

    compiler.applyPlugins(progressHandler)
    setApplied(true)
  }, [compiler])

  /**
   * dev tap
   */
  useEffect(() => {
    if (mode == 'development' || !compiler || tapped) return

    compiler.compiler.hooks.done.tap('bud-cli', statsHandler)
    setTapped(true)
  }, [mode, compiler, tapped])

  /**
   * dev listen
   */
  useEffect(() => {
    if (mode !== 'development' || !tapped || listening) return

    server.listen()
    setListening(true)
  }, [server, tapped, listening])

  /**
   * Compilation
   */
  useEffect(() => {
    if (mode == 'development' || running || watching) return

    if (mode == 'production') {
      setRunning(true)

      compiler.run(() => null)
    }

    if (mode == 'none') {
      setWatching(true)
      compiler.watch(() => null)
    }
  }, [compiler, mode, watching, running])

  return {
    listening,
    running,
    watching,
    progress,
    stats,
    errors,
    warnings,
  }
}

export {useCompilation as default}
