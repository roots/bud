import type {FileContainer} from '@roots/filesystem'
import {Framework} from '@roots/bud-framework'
import {useState, useEffect, Dispatch} from 'react'

export type Disk = [FileContainer, Dispatch<string>]

export const useDisk = (app: Framework): Disk => {
  const [target, setTarget] = useState<string>('project')
  const [disk, setDisk] = useState<FileContainer>(null)

  useEffect(() => {
    setDisk(app.disk.get(target))
  }, [target])

  return [disk, setTarget]
}
