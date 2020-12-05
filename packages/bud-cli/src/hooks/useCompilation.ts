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
    errors?: string[]
  }
}

const useCompilation: UseCompilation.Hook = (bud: Bud.Bud) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(false)
  const [running, setRunning] = useState<boolean>(false)

  const [stats, errors, statsHandler] = useStats(
    bud.compiler.statsOptions,
  )

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
    errors,
  }
}

export {useCompilation, useCompilation as default}
