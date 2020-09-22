import {useState, useEffect} from 'react'
import {Stats} from 'webpack'

import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'

/**
 * Use Webpack.Stats from either compiler or Express server callbacks
 */
const useStats = (
  compiler: Compiler,
  server: Server,
): {
  stats: Stats.ToJsonOutput
  progress: any
  listening: boolean
  running: boolean
} => {
  /** Stats already tapped */
  const [tapped, setTapped] = useState(null)

  /** Compiler already running */
  const [running, setRunning] = useState(false)

  /** Server already listening */
  const [listening, setListening] = useState(false)

  /** Stats state */
  const [stats, setStats] = useState(null)

  /** Compilation progress */
  const [progress, setProgress] = useState(null)

  /** Plugins applied */
  const [applied, setApplied] = useState(false)

  /** Stats handler */
  const statsHandler = (stats: Stats) => {
    setStats(stats.toJson())
  }

  /** Progress handler */
  const progressHandler = (percentage: number, msg: string) => {
    percentage && setProgress({...progress, percentage})
    msg && setProgress({...progress, msg})
  }

  /**
   * Apply plugins.
   */
  useEffect(() => {
    if (applied) {
      return
    }

    compiler.applyPlugins(progressHandler)
    setApplied(true)
  }, [compiler])

  /**
   * Listen on server if available
   */
  if (compiler.getConfig().mode == 'development') {
    /** Tap stats */
    useEffect(() => {
      /** Only run if there is an untapped compiler */
      if (!compiler || tapped) return

      /** @todo compiler hook method */
      compiler.compiler.hooks.done.tap('bud-cli', statsHandler)

      /** Listen to server. */
      if (server && !listening) {
        server.listen()
        setListening(true)
      }

      /** Flag tapped */
      setTapped(true)
    }, [compiler, tapped])
  } else {
    useEffect(() => {
      if (!compiler || running) return

      compiler.run((err: Error, stats: Stats) => {
        if (err) {
          console.error(err)

          process.exit(1)
        }

        statsHandler(stats)
      })

      setRunning(true)
    })
  }

  return {listening, running, progress, stats}
}

export {useStats as default}
