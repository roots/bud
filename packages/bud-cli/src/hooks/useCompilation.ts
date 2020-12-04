import {useState, useEffect} from 'react'
import {useProgress, UseProgress} from './useProgress'
import {useStats, UseStats} from './useStats'

import type {Bud} from '@roots/bud-typings'

export namespace UseCompilation {
  export interface Hook {
    (bud: Bud.Bud): Compilation
  }

  export interface Compilation {
    progress: UseProgress.Progress
    stats: UseStats.Stats
  }
}

const useCompilation: UseCompilation.Hook = (bud: Bud.Bud) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(false)
  const [running, setRunning] = useState<boolean>(false)

  const [stats, statsHandler] = useStats()
  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (applied) return
    setApplied(true)

    bud.compiler.compile()
    bud.compiler.applyPlugins(progressHandler)
  })

  useEffect(() => {
    if (tapped) return
    setTapped(true)

    bud.compiler.instance.hooks.done.tap('stats', statsHandler)
  })

  useEffect(() => {
    if (!tapped || running) return
    setRunning(true)

    bud.mode.is('development')
      ? bud.server.run()
      : bud.compiler.run()
  })

  return {
    progress,
    stats,
  }
}

export {useCompilation, useCompilation as default}
