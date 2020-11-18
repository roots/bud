import type {Bud} from '@roots/bud-typings'
import {useState} from 'react'

export const useBud = (budRef: Bud.Ref): Bud.Bud => {
  const [bud] = useState(budRef())

  return bud
}
