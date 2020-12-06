import type {Bud} from '@roots/bud-typings'
import {useDisk} from './useDisk'
import {useEffect, useState} from 'react'

export type PkgFields = {
  [key: string]: any
  name: string
}

export const usePackageJson = (bud: Bud.Bud): PkgFields => {
  const [disk] = useDisk(bud)
  const [pkg, setPkg] = useState<PkgFields>({
    name: '@roots/bud',
  })

  useEffect(() => {
    if (!disk) return

    disk.exists('package.json') &&
      setPkg({
        ...pkg,
        ...disk.readJson('package.json'),
      })
  }, [disk])

  return pkg
}
