import {useState, useEffect} from '@roots/bud-support'
import {useProgress, UseProgress} from './useProgress'
import {useStats, UseStats} from './useStats'

import type {Framework} from '@roots/bud-typings'

export namespace UseCompilation {
  export interface Hook {
    (bud: Framework): Compilation
  }

  export interface Compilation {
    progress: UseProgress.Progress
    stats: UseStats.Stats
    errors?: string[]
  }
}

const useCompilation: UseCompilation.Hook = (bud: Framework) => {
  const [applied, setApplied] = useState<boolean>(false)

  const [stats, errors, statsHandler] = useStats(
    bud.compiler.statsOptions,
  )

  const [progress, progressHandler] = useProgress()

  useEffect(() => {
    if (applied) return

    setApplied(true)

    bud.compiler.compile()
    bud.compiler.applyPlugins(progressHandler)
    bud.compiler.instance.hooks.done.tap('stats', statsHandler)

    bud.mode.is('development')
      ? bud.server.run()
      : bud.compiler.run()
  }, [bud])

  return {
    progress,
    stats,
    errors,
  }
}

export {useCompilation, useCompilation as default}
