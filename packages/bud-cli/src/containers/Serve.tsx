import React from 'react'
import {useApp, useInput} from 'ink'
import useCompilation from '../hooks/useCompilation'
import App from './App'

const Serve: Framework.CLI.Serve = ({bud}) => {
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
      <App
        bud={bud}
        stats={compilation?.stats}
        progress={compilation?.progress}
      />
    </>
  )
}

export {Serve as default}
