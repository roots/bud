import {useEffect, useState} from '@roots/bud-support'
import type {Framework} from '@roots/bud-typings'

export const useBud = (bud: Framework): {mode: typeof mode} => {
  const [mode, setMode] = useState<Framework.Mode>(null)

  useEffect(() => {
    setMode(bud.get().mode)
  })

  return {
    mode,
  }
}
