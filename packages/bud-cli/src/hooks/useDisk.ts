import {useEffect, useState} from '@roots/bud-support'
import type {Framework, FileContainer} from '@roots/bud-typings'

export type Disk = [FileContainer, React.Dispatch<string>]

export const useDisk = (bud: Framework): Disk => {
  const [target, setTarget] = useState<string>('project')
  const [disk, setDisk] = useState<FileContainer>(null)

  useEffect(() => {
    setDisk(bud.disk.get(target))
  }, [target])

  return [disk, setTarget]
}
