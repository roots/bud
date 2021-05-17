import {useEffect, useState} from 'react'
import {Framework} from '@roots/bud-framework'

type PkgFields = {
  [key: string]: any
  name?: string
}

export const usePackageJson = ({
  discovery,
}: Framework): PkgFields => {
  const [pkg, setPkg] = useState<PkgFields>(null)

  useEffect(() => {
    if (!discovery) return

    setPkg({
      ...(pkg ?? {}),
      ...discovery.getProjectInfo(),
    })
  }, [discovery])

  return pkg
}
