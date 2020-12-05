import React from 'react'
import {useApp, useInput} from 'ink'
import {useCompilation} from '../hooks/useCompilation'
import {Reporter} from './Reporter'
import type {Bud} from '@roots/bud-typings'

const Serve: React.FunctionComponent<{bud: Bud.Bud}> = ({
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

  return (
    <>
      <Reporter
        bud={bud}
        stats={compilation?.stats}
        errors={compilation?.errors}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Serve, Serve as default}
