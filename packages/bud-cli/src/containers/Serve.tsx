import React from 'react'
import {useApp, useInput} from 'ink'
import {useCompilation} from '../hooks/useCompilation'
import {Reporter} from './Reporter'
import type {Bud} from '@roots/bud-typings'

const Serve: React.FunctionComponent<{framework: Bud.Ref}> = ({
  framework,
}) => {
  const app = useApp()
  const compilation = useCompilation(framework)

  useInput(input => {
    if (input == 'q') {
      app.exit()
      process.exit()
    }
  })

  return (
    <>
      <Reporter
        framework={framework}
        stats={compilation?.stats}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Serve, Serve as default}
