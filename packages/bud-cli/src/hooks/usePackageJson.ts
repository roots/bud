import {useEffect, useState} from '@roots/bud-support'
import {FileContainer} from '@roots/bud-typings'

export type PkgFields = {
  [key: string]: any
  name: string
}

export const usePackageJson = (
  disk: FileContainer,
): PkgFields => {
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
