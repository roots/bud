import {
  React,
  useEffect,
  useApp,
  useInput,
} from '@roots/bud-support'
import {useCompilation} from '../hooks/useCompilation'
import {Reporter} from './Reporter'
import type {Framework} from '@roots/bud-typings'

const Compile: React.FunctionComponent<{bud: Framework}> = ({
  bud,
}) => {
  const app = useApp()
  const compilation = useCompilation(bud)

  useInput(input => {
    if (input == 'q') {
      app.exit()
      process.exit()
    }
  })

  useEffect(() => {
    if (
      compilation?.stats?.assets?.length > 0 &&
      compilation?.progress?.percentage.decimal == 1
    ) {
      app.exit()
      process.exit()
    }
  }, [compilation])

  return (
    <>
      <Reporter
        bud={bud}
        stats={compilation?.stats}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Compile as default}
