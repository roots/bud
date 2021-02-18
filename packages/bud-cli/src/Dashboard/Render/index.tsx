import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  useInput,
} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

import {Reporter} from './Reporter'
import {useStyle} from '@roots/ink-use-style'
import {useDisk} from '../../hooks/useDisk'
import {usePackageJson} from '../../hooks/usePackageJson'
import {useCompilation} from '../../hooks/useCompilation'

export const Render: FunctionComponent<{
  bud: Framework<any>
}> = ({bud}) => {
  const app = useApp()
  const style = useStyle(bud.store.get('theme'))
  const [disk] = useDisk(bud)
  const {stats, progress, errors} = useCompilation(bud)
  const pkg = usePackageJson(disk)

  useInput(input => {
    if (input == 'q') {
      app.exit()
      console.clear()
      process.exit()
    }
  })

  useEffect(() => {
    if (!bud.isProduction) return

    const hasErrors = errors?.length > 0
    const isComplete = progress?.decimal >= 1

    ;(isComplete || hasErrors) &&
      setTimeout(() => {
        app.exit()
      }, 100)
  }, [stats, progress, errors])

  return (
    <Reporter
      errors={errors}
      bud={bud}
      stats={stats}
      progress={progress}
      pkg={pkg}
      {...style}
    />
  )
}
