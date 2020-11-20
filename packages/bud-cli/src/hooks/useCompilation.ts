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
  const [stats, statsHandler] = useStats()
  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (applied) return

    setApplied(true)

    bud.compiler.applyPlugins(progressHandler)
  })

  useEffect(() => {
    if (tapped) return

    setTapped(true)

    bud.compiler.run(statsHandler)
  })

  return {
    progress,
    stats,
  }
}

export {useCompilation, useCompilation as default}
