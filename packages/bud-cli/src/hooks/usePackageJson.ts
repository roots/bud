import type {Bud, FileContainer} from '@roots/bud-typings'
import {useEffect, useState} from 'react'

export type PkgFields = {
  [key: string]: any
  name: string
}

export const usePackageJson = (bud: Bud.Bud): PkgFields => {
  const [disk, setDisk] = useState<FileContainer>()
  const [pkg, setPkg] = useState<PkgFields>({
    name: '@roots/bud',
  })

  useEffect(() => {
    setDisk(bud.disk.get('project'))
  }, [bud])

  useEffect(() => {
    if (!disk) return

    disk.exists('package.json') &&
      setPkg({
        ...pkg,
        ...disk.readJson('package.json'),
      })
  }, [bud, disk])

  return pkg
}
