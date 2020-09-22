import {useState, useEffect} from 'react'
import {Stats} from 'webpack'

import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'

interface Compilation {
  stats?: Stats.ToJsonOutput
  progress: {
    percentage: number
    msg: string
  }
  listening: boolean
  running: boolean
  watching: boolean
}

interface CompilationHook {
  (compiler: Compiler, server: Server): Compilation
}

/**
 * Use Webpack.Stats from either compiler or Express server callbacks
 */
const useCompilation: CompilationHook = (
  compiler: Compiler,
  server: Server,
) => {
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
  // Compilation progress
  const [progress, setProgress] = useState({
    percentage: 0,
    msg: '',
  })

  // Plugins applied
  const [applied, setApplied] = useState(false)

  /** Stats handler */
  const statsHandler = (stats: Stats) => {
    setStats(stats.toJson())
  }

  /** Progress handler */
  const progressHandler = (percentage: number, msg: string) => {
    if (typeof percentage !== 'number') return

    percentage =
      percentage > 0 ? Math.round(percentage * 100) : percentage

    setProgress({
      percentage: percentage,
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

    const isDev = compiler.getConfig().mode == 'development'
    const isWatch = compiler.getConfig().watch

    isWatch && setMode('watch')
    isDev && setMode('dev')
    !isWatch && !isDev && setMode('run')

    setMode(setMode)
  }, [!mode, compiler])

  /**
   * dev tap
   */
  useEffect(() => {
    if (mode !== 'dev' || !compiler || tapped) return

    compiler.compiler.hooks.done.tap('bud-cli', statsHandler)
    setTapped(true)
  }, [mode, compiler, tapped])

  /**
   * dev listen
   */
  useEffect(() => {
    if (mode !== 'dev' || !tapped || listening) return

    server.listen()
    setListening(true)
  }, [server, tapped, listening])

  /**
   * compiler watch
   */
  useEffect(() => {
    if (!mode || mode == 'dev' || running || watching) return

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
  }
}

export {useCompilation as default}
