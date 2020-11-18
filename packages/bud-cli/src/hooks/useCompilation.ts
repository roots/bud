import {useState, useEffect} from 'react'
import {useProgress, UseProgress} from './useProgress'
import {useStats, UseStats} from './useStats'
import {useBud} from './useBud'

import type {Bud, Compiler} from '@roots/bud-typings'

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
  const bud = useBud(budRef)
  const [compiler] = useState<Compiler.Contract>(bud.compiler)

  const [applied, setApplied] = useState<boolean>(false)
  const [tapped, setTapped] = useState<boolean>(null)
  const [stats, statsHandler] = useStats()
  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (!compiler || applied) return

    setApplied(true)
    compiler.applyPlugins(progressHandler)
  }, [compiler])

  useEffect(() => {
    if (!compiler || tapped) return

    compiler.run(statsHandler)
    setTapped(true)
  }, [compiler])

  return {
    progress,
    stats,
  }
}

export {useCompilation, useCompilation as default}
