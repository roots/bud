import {useState, useEffect} from 'react'
import {useProgress, UseProgress} from './useProgress'
import {useStats, UseStats} from './useStats'

import type {Bud} from '@roots/bud-typings'

export namespace UseCompilation {
  export interface Hook {
    (bud: Bud.Ref): Compilation
  }

  export interface Compilation {
    progress: UseProgress.Progress
    stats: UseStats.Stats
  }
}

const useCompilation: UseCompilation.Hook = (
  budRef: Bud.Ref,
) => {
  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [stats, statsHandler] = useStats([budRef().compiler])
  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (!budRef().compiler || applied) return

    setApplied(true)
    budRef().compiler.applyPlugins(progressHandler)
  }, [budRef().compiler])

  useEffect(() => {
    if (!budRef().compiler || tapped) return

    budRef().compiler.run(statsHandler)
    setTapped(true)
  }, [budRef().compiler])

  return {
    progress,
    stats,
  }
}

export {useCompilation, useCompilation as default}
