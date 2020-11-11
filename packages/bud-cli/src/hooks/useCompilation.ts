import {useState, useEffect} from 'react'
import {useProgress} from './useProgress'
import {useStats} from './useStats'
import type {UseProgress} from './useProgress'
import type {UseStats} from './useStats'

const useCompilation: UseCompilation.Hook = ({compiler}) => {
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

export namespace UseCompilation {
  export interface Hook {
    (bud: Framework.Bud): Compilation
  }

  export interface Compilation {
    progress: UseProgress.Progress
    stats: UseStats.Stats
  }
}

export {useCompilation, useCompilation as default}
