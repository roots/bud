import {useEffect, useState} from '@roots/bud-support'
import type {Framework, Webpack} from '@roots/bud-typings'

export const useBud = (bud: Framework): {mode: typeof mode} => {
  const [mode, setMode] = useState<
    Webpack.Configuration['mode']
  >(null)

  useEffect(() => {
    setMode(bud.mode)
  })

  return {
    mode,
  }
}
