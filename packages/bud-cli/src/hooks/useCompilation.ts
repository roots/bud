import {
  useState,
  useEffect,
  isUndefined,
} from '@roots/bud-support'
import {useProgress, UseProgress} from './useProgress'
import {useStats, UseStats} from './useStats'

import type {Framework} from '@roots/bud-typings'

export interface UseCompilation {
  (bud: Framework): Compilation
}

export type CompilationAsset = {
  name: string
  active: boolean
  size: number
  hot: boolean
  info?: string
}

export interface Compilation {
  progress: UseProgress.Progress
  stats: UseStats.Stats
  assets: Array<CompilationAsset>
  errors?: string[]
}

export const useCompilation: UseCompilation = (
  bud: Framework,
) => {
  const {stats, errors, handler} = useStats(
    bud.compiler.statsOptions,
  )
  const [assets, setAssets] = useState<Array<CompilationAsset>>(
    [],
  )
  const [progress, progressHandler] = useProgress()
  const [applied, setApplied] = useState<boolean>(false)

  /**
   * Acquire compiler stats
   */
  useEffect(() => {
    if (applied) return

    setApplied(true)

    bud.compiler.compile()
    bud.compiler.applyPlugins(progressHandler)

    bud.compiler.instance.hooks.done.tap('stats', handler)

    bud.mode.is('development')
      ? bud.server.run()
      : bud.compiler.run()
  }, [bud])

  /**
   * Transform assets
   */
  useEffect(() => {
    if (isUndefined(stats?.assets) || stats?.assets.length <= 0)
      return

    setAssets(
      stats.assets?.map(asset => ({
        ...asset,
        info: Object.keys((asset as any).info)
          .filter(key => key !== 'hotModuleReplacement')
          .reduce((acc, item) => `${acc} [${item}]`, ``),
        active: asset.emitted,
        hot:
          stats.assets.filter(
            check =>
              check.name.split('.').shift() ==
                asset.name.split('.').shift() &&
              check.name.includes('hot-update'),
          ).length > 0,
      })),
    )
  }, [stats?.assets])

  return {
    progress,
    stats,
    errors,
    assets,
  }
}
