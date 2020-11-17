import React, {useEffect} from 'react'
import {useApp, useInput} from 'ink'
import {useCompilation} from '../hooks/useCompilation'
import {Reporter} from './Reporter'
import type {Bud} from '@roots/bud-typings'

const Compile: React.FunctionComponent<{framework: Bud.Ref}> = ({
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
        framework={framework}
        stats={compilation?.stats}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Compile as default}
