import type {Bud} from '@roots/bud-typings'
import {useEffect, useState} from 'react'

export type PkgFields = {
  [key: string]: any
  name: string
}

export const usePackageJson = (bud: Bud.Bud): PkgFields => {
  const [pkg, setPkg] = useState<PkgFields>({
    name: '@roots/bud',
  })

  useEffect(() => {
    bud.fs.exists('package.json') &&
      setPkg({
        ...pkg,
        ...bud.fs.readJson('package.json'),
      })
  })

  return pkg
}
