import React from 'react'
import {useApp, useInput, Text} from 'ink'
import useDevServer from './hooks/useDevServer'
import App from './containers/App'

const Serve: Framework.CLI.Serve = ({bud}) => {
  const app = useApp()

  const {
    stats,
    progress,
    errors,
    warnings,
    listening,
  } = useDevServer(bud)

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
        errors={errors}
        stats={stats}
        progress={progress}
        warnings={warnings}
      />
      {listening && <Text>Listening.</Text>}
    </>
  )
}

export {Serve as default}
