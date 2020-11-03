import React, {FunctionComponent, useEffect} from 'react'
import {useApp, useInput} from 'ink'
import useCompilation from './hooks/useCompilation'
import App from './containers/App'

const Compile: FunctionComponent<{bud: Framework.Bud}> = ({
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
      <App
        bud={bud}
        stats={compilation?.stats}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Compile as default}
