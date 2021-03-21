import {useEffect, useState} from '@roots/bud-support'
import {FileContainer} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

export type Disk = [FileContainer, React.Dispatch<string>]

export const useDisk = (app: Framework): Disk => {
  const [target, setTarget] = useState<string>('project')
  const [disk, setDisk] = useState<FileContainer>(null)

  useEffect(() => {
    setDisk(app.disk.get(target))
  }, [target])

  return [disk, setTarget]
}
