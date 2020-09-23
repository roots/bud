import {useState, useEffect} from 'react'
import {Stats} from 'webpack'

import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'
import {formatWebpackMessages} from '@roots/bud-support'

export interface Compilation {
  /**
   * All stats data
   */
  stats?: Stats.ToJsonOutput

  /**
   * Formatted error messages
   */
  errors?: Stats.ToJsonOutput['errors']

  /**
   * Formatted warning messages
   */
  warnings?: Stats.ToJsonOutput['warnings']

  /**
   * Compile progress
   */
  progress: {
    percentage: number
    msg: string
  }

  /**
   * Is server listening?
   */
  listening: boolean

  /**
   * Is server running?
   */
  running: boolean

  /**
   * Is compiler in watch mode?
   */
  watching: boolean
}

export interface CompileSources {
  compiler: Compiler
  server: Server
}

export interface UseCompilation {
  (props: CompileSources): Compilation
}

const useCompilation: UseCompilation = ({
  compiler,
  server,
}: CompileSources): Compilation => {
  // Use dev server or compiler?
  const [mode, setMode] = useState(null)
  // Stats already tapped
  const [tapped, setTapped] = useState(null)
  // Compiler running
  const [running, setRunning] = useState(false)
  // Compiler watching
  const [watching, setWatching] = useState(false)
  // Server already listening
  const [listening, setListening] = useState(false)
  // Stats state
  const [stats, setStats] = useState(null)
  // Errors state
  const [errors, setErrors] = useState(null)
  // Warnings state
  const [warnings, setWarnings] = useState(null)
  // Compilation progress
  const [progress, setProgress] = useState({
    percentage: 0,
    msg: '',
  })
  // Plugins applied
  const [applied, setApplied] = useState(false)

  // Helpers
  const shouldDev = compiler.getConfig().mode == 'development'
  const shouldWatch = compiler.getConfig().watch

  /** Stats handler */
  const statsHandler = (stats: Stats) => {
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
   * Run mode
   */
  useEffect(() => {
    if (mode) return

    if (shouldWatch) setMode('watch')
    else if (shouldDev) setMode('dev')
    else if (!shouldWatch) !shouldDev && setMode('run')
  }, [!mode, compiler])

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
   * compiler watch
   */
  useEffect(() => {
    if (!mode || shouldDev || running || watching) return

    mode == 'run' && setRunning(true)
    mode == 'watch' && setWatching(true)

    compiler[mode]((err: Error, stats: Stats) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      statsHandler(stats)
    })
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
