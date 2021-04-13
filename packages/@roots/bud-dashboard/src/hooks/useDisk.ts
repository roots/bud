import type {FileContainer} from '@roots/filesystem'
import {Framework} from '@roots/bud-framework'
import {React} from '@roots/bud-support'

export type Disk = [FileContainer, React.Dispatch<string>]

export const useDisk = (app: Framework): Disk => {
  const [target, setTarget] = React.useState<string>('project')
  const [disk, setDisk] = React.useState<FileContainer>(null)

  React.useEffect(() => {
    setDisk(app.disk.get(target))
  }, [target])

  return [disk, setTarget]
}
