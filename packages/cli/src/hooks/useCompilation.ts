import {useState, useEffect} from 'react'
import {Stats} from 'webpack'
import {formatWebpackMessages} from '@roots/bud-support'

import Bud from '@roots/bud-types'

const useCompilation: Bud.CLI.UseCompilation = ({
  compiler,
  server,
}: Bud.CLI.CompileSources) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [running, setRunning] = useState<boolean>(false)
  const [watching, setWatching] = useState<boolean>(false)
  const [listening, setListening] = useState<boolean>(false)
  const [mode, setMode] = useState<Bud.CLI.State.Mode>('none')
  const [stats, setStats] = useState<Bud.CLI.State.Stats>(null)

  /* eslint-disable */
  const [errors, setErrors] = useState<Bud.CLI.State.Errors>(
    null,
  )
  const [warnings, setWarnings] = useState<
    Bud.CLI.State.Warnings
  >(null)
  const [progress, setProgress] = useState<
    Bud.CLI.State.Progress
  >({
    percentage: 0,
    msg: '',
  })
  /* eslint-enable */

  useEffect(() => {
    if (mode) return

    setMode(compiler.getConfig().mode)
  }, [!mode, compiler])

  // Helpers
  const shouldDev = mode == 'development'

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
    if (!shouldDev || !compiler || tapped) return
    compiler.compiler.hooks.done.tap('bud-cli', statsHandler)
    setTapped(true)
  }, [mode, compiler, tapped])

  /**
   * dev listen
   */
  useEffect(() => {
    if (!shouldDev || !tapped || listening) return
    server.listen()
    setListening(true)
  }, [server, tapped, listening])

  /**
   * Compilation
   */
  useEffect(() => {
    if (!mode || shouldDev || running || watching) return

    if (mode == 'production') {
      setRunning(true)

      compiler.run(() => null)
    }

    if (mode == 'none' || mode == 'development') {
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
