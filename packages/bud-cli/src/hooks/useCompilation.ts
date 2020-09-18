import {useState, useEffect} from 'react'
import {Configuration, Stats} from 'webpack'

import Server, {ServerConfig} from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'

const useStats = (
  compiler: Compiler,
  server: Server,
  webpackConfig: Configuration,
  serverConfig: ServerConfig,
): {stats: Stats.ToJsonOutput} => {
  /** Stats already tapped */
  const [tapped, setTapped] = useState(null)

  /** Compiler already running */
  const [running, setRunning] = useState(false)

  /** Server already listening */
  const [listening, setListening] = useState(false)

  /** Stats state */
  const [stats, setStats] = useState(null)

  /** Stats handler */
  const statsHandler = (stats: Stats) => {
    setStats(stats.toJson())
  }

  /**
   * Listen on server if available
   */
  if (webpackConfig.mode == 'development') {
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

  return {stats}
}

export {useStats as default}
