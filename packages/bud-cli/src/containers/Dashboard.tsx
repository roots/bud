import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  useInput,
  isEqual,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

import {Reporter} from './Reporter'
import {useCompilation} from '../hooks/useCompilation'
import {useDisk} from '../hooks/useDisk'
import {usePackageJson} from '../hooks/usePackageJson'

import type {Framework} from '@roots/bud-typings'

export const Dashboard: FunctionComponent<{
  bud: Framework
  mode: Framework.Webpack.Configuration['mode']
}> = ({bud, mode}) => {
  const app = useApp()
  const [disk] = useDisk(bud)
  const compilation = useCompilation(bud)
  const pkg = usePackageJson(disk)
  const style = useStyle()

  useInput(input => {
    if (input == 'q') {
      app.exit()
      console.clear()
      process.exit()
    }
  })

  /**
   * @todo setTimeout here is bad
   */
  useEffect(() => {
    if (
      isEqual(mode, 'production') &&
      compilation?.assets?.length > 0 &&
      isEqual(compilation?.progress?.percentage.decimal, 1)
    ) {
      setTimeout(() => {
        app.exit()
        process.exit()
      }, 100)
    }
  }, [compilation])

  return (
    <Reporter bud={bud} pkg={pkg} {...compilation} {...style} />
  )
}
